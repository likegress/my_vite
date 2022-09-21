<template>
  <div class="title">全部商品</div>
  <el-row class="list">
    <el-col :span="12">商品信息</el-col>
    <el-col :span="3">单价</el-col>
    <el-col :span="3">数量</el-col>
    <el-col :span="3">小计</el-col>
    <el-col :span="3">操作</el-col>
  </el-row>
  <el-collapse v-model="data.activeNames" @change="handleChange">
    <el-collapse-item
      :name="brandItem.brandName"
      class="brands"
      v-for="brandItem in list.data"
      :key="brandItem.brandName"
    >
      <template #title>
        <el-checkbox
          v-model="data.checked"
          :label="brandItem.brandName"
          size="small"
          @click.stop="() => {}"
        ></el-checkbox>
      </template>
      <el-row
        class="content"
        v-for="goodsItem in brandItem.cartDetailDTO"
        :key="goodsItem.brandId"
      >
        <el-col :span="12">商品信息</el-col>
        <el-col :span="3">￥{{ goodsItem.goodsPrice }}</el-col>
        <el-col :span="3">{{ goodsItem.goodsNum }}</el-col>
        <el-col :span="3">{{
          goodsItem.goodsNum * goodsItem.goodsPrice
        }}</el-col>
        <el-col :span="3"><el-button type="">x</el-button></el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "@vue/runtime-core";
import { cartList } from "../../api";
import { CartModel } from "../../model/cart";
const list = reactive({
  data: <CartModel[]>[],
});
const getCartList = async () => {
  const res = await cartList(1, 20);
  list.data = res;
  console.log(list.data);
};
const data = reactive({
  activeNames: {},
  checked: false,
});
const handleChange = (v: string) => {
  console.log(v);
  console.log(data.activeNames);
};
onMounted(() => {
  getCartList();
});
</script>

<style scoped lang="scss">
.brands {
  padding-left: 20px;
}
.title {
  width: 100%;
  height: 60px;
  background: #fff;
  text-align: center;
  // padding-left: 20px;
  line-height: 60px;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}
.list {
  font-size: 12px;
  background-color: #fbfbfb;
  color: #595e51;
  height: 48px;
  line-height: 48px;
  text-align: center;
}
.el-col {
  text-align: center;
}
</style>