<template>
  <el-row :style="{ paddingLeft: '20px' }">
    <el-col :span="12">
      <el-checkbox
        v-model="props.item.checked"
        @change="handlerChange"
        :size="'large'"
        :style="{ float: 'left' }"
      ></el-checkbox>
      <el-image
        :fit="'contain'"
        :src="props.item.goodsLogo"
        :style="{ width: '80px', height: '100px', float: 'float' }"
      ></el-image>
      <div class="describe">
        <!-- 描述区域 -->
        <p>{{ props.item.goodsSpec }}</p>
        <p>{{ props.item.goodsName }} {{ props.item.goodsSn }}</p>
        <p>
          周期<b>{{ props.item.batchNo }}</b>
        </p>
      </div>
    </el-col>
    <el-col :span="3">￥{{ props.item.goodsPrice }}</el-col>
    <el-col :span="3">x{{ props.item.goodsNum }}</el-col>
    <el-col :span="3"
      >￥{{ props.item.goodsPrice * props.item.goodsNum }}</el-col
    >
    <el-col :span="3">
      <el-popconfirm
        confirm-button-text="确认"
        cancel-button-text="取消"
        confirm-button-type="danger"
        title="确定删除?"
        @confirm="handleRemove(props.item.cartId)"
        :icon="Delete"
      >
        <template #reference>
          <el-button :style="{ height: '24px', width: '24px' }" circle
            >x</el-button
          >
        </template>
      </el-popconfirm>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { cartRemove } from "../../../api";
import { CartDetailModel } from "../../../model/cart";

interface PropsModel {
  item: CartDetailModel;
}
const props = defineProps<PropsModel>();

const emit = defineEmits(["deleted", "checked"]);
const data = reactive({
  cartId: "",
});
const removeCartItem = async () => {
  if (data.cartId == "") return;
  const res = await cartRemove(data.cartId);
  if (res) {
    ElMessage({ message: "已删除", type: "success" });
    // 本地也需要删除
    emit("deleted", data.cartId);
  } else {
    ElMessage({ message: "删除失败", type: "warning" });
  }
};
const handleRemove = (id: number) => {
  data.cartId = id.toString();
  emit("deleted");
  removeCartItem();
};

// 勾选框事件
const handlerChange = (checked: boolean) => {
  emit("checked");
};
</script>

<style scoped>
.describe {
  display: inline-block;
}
.describe p {
  margin: 4px 0;
}
</style>
