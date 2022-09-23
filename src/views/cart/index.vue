<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { cartList, cartRemove } from "../../api";
import { CartModel } from "../../model/cart";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import CartGoodsCard from "@/views/cart/components/CartGoodsCard.vue";
const router = useRouter();

const list = reactive({
  data: <CartModel[]>[],
});

const data = reactive({
  cartIds: <number[]>[],
  activeNames: <string[]>[],
  checkedAll: false,
  isIndeterminate: false,
});

const getCartList = async () => {
  const res = await cartList(1, 20);
  list.data = res;

  data.activeNames = list.data.map((cItem) => {
    return cItem.brandName;
  });
};

const handlerChange = (v: string) => {
  console.log(data.activeNames);
};

const handleGoShopping = () => {
  router.push({ name: "goods" });
};
// 子级调用的方法
const handlerDeleted = (cartId: string, msg: string) => {
  ElMessage(`父级被调用了~~~~~ID= ${cartId} msg=${msg}`);
  list.data.forEach((brandItem, i) => {
    brandItem.cartDetailDTO.forEach((cartItem, index) => {
      if (cartItem.cartId.toString() === cartId) {
        brandItem.cartDetailDTO.splice(index, 1);
        if (brandItem.cartDetailDTO.length === 0) {
          list.data.splice(i, 1);
        }
      }
    });
  });
};

// 品牌的Checked事件
const handlerCheckedChange = (name: string, v: boolean) => {
  console.log(name,v);

  list.data.forEach((brandItem) => {
    // 确定是操作了哪个品牌
    if (brandItem.brandName === name) {
      brandItem.isIndeterminate = false;
      // 将操作结果覆盖到子列表中
      brandItem.cartDetailDTO.forEach((cartItem) => {
        cartItem.checked = brandItem.checked;
      });
    }
  });
  computedCheckedAll();
};

const handlerChildChecked = (brandItem: CartModel) => {
  console.log(brandItem);

  const checkedCount = brandItem.cartDetailDTO.reduce(
    (prev, cur, index, arr) => {
      if (cur.checked) {
        return prev + 1;
      }
      return prev;
    },
    0
  );
  // 半选状态
  brandItem.isIndeterminate =
    checkedCount > 0 && checkedCount < brandItem.cartDetailDTO.length;
  // 全选状态
  brandItem.checked = checkedCount === brandItem.cartDetailDTO.length;
  computedCheckedAll();
};

// 计算当前是否为全选状态 / 半选状态
const computedCheckedAll = () => {
  // 判断所有品牌是否都被选中了
  data.checkedAll = list.data.every((item) => item.checked);

  // 计算多少品牌被选中
  const checkedCount = list.data.reduce((prev, cur, index, arr) => {
    if (cur.checked) {
      return prev + 1;
    }
    return prev;
  }, 0);
  // 计算有多少品牌被半选
  const isIndeterminate = list.data.reduce((prev, cur, index, arr) => {
    if (cur.checked) {
      return prev + 1;
    }
    return prev;
  }, 0);
  // 分别判断品牌是否所有项没有都被选中 和 品牌不全是半选状态
  data.isIndeterminate =
    (checkedCount > 0 && checkedCount < list.data.length) ||
    (isIndeterminate > 0 && isIndeterminate < list.data.length);
};

// 全选/反选
const handlerCheckedAll = (v: boolean) => {
  data.isIndeterminate = false;

  list.data.forEach((brandItem) => {
    brandItem.checked = v;
    brandItem.cartDetailDTO.forEach((cartItem) => {
      cartItem.checked = v;
    });
  });
  // 空状态

  // 全选状态
  // 半选
};

onMounted(() => {
  getCartList();
});
</script>

<template>
  <div class="carat-container">
    <div class="title">全部商品</div>
    <el-row class="list">
      <el-col :span="12">商品信息</el-col>
      <el-col :span="3">单价</el-col>
      <el-col :span="3">数量</el-col>
      <el-col :span="3">小计</el-col>
      <el-col :span="3">操作</el-col>
    </el-row>
    <el-empty
      v-if="list.data.length === 0"
      :style="{ backgroundColor: '#fff' }"
    >
      <template #description>购物车空空如也~</template>
      <el-button type="primary" @click="handleGoShopping">去购物</el-button>
    </el-empty>
    <div v-else>
      <el-collapse v-model="data.activeNames" @change="handlerChange">
        <el-collapse-item
          title="Consistency"
          :name="brandItem.brandName"
          v-for="(brandItem, index) in list.data"
          :key="index"
        >
          <template #title>
            <el-checkbox
              v-model="brandItem.checked"
              :indeterminate="brandItem.isIndeterminate"
              @change="handlerCheckedChange(brandItem.brandName, $event)"
              :label="brandItem.brandName"
              size="large"
              @click.stop="() => {}"
            />
          </template>
          <div class="content">
            <CartGoodsCard
              @deleted="handlerDeleted"
              @checked="handlerChildChecked(brandItem)"
              :item="goodsItem"
              v-for="(goodsItem, index) in brandItem.cartDetailDTO"
              :key="index"
              :style="{ marginBottom: '10px' }"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-row class="cart-footer">
        <el-col :span="6">
          <el-checkbox
            v-model="data.checkedAll"
            :indeterminate="data.isIndeterminate"
            @change="handlerCheckedAll"
            label="全选"
            size="large"
            @click.stop="() => {}"
          />
        </el-col>
        <el-col :span="6">删除选中的商品</el-col>
        <el-col :span="6">统计部分</el-col>
        <el-col :span="6"><el-button type="primary">去结算</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  padding: 20px 0px;
  background: #fff;
}
.brands {
  padding-left: 20px;
}
.title {
  width: 100%;
  height: 60px;
  background: #fff;
  text-align: left;
  line-height: 60px;
  font-weight: bold;
  font-size: 14px;
  /* margin-left: 20px; */
  margin-bottom: 10px;
}
.list {
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  color: #595e51;
  text-align: left;
  background-color: #fbfbfb;
  padding-left: 20px;
}
.content {
  text-align: left;
}
.cart-footer {
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  text-align: left;
  padding: 0 20px;
}
</style>