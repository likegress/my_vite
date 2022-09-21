<template>
  <div
    :style="{ height: '100px', width: '100%', backgroundColor: '#000' }"
  ></div>
  <el-affix :offset="0">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="home">首页</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="goods">商品列表</el-menu-item>
      <el-menu-item index="cart">购物车</el-menu-item>
      <el-menu-item index="order">我的订单</el-menu-item>

    </el-menu>
  </el-affix>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useRouter} from "vue-router";
const activeIndex = ref('1');
const router = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
  router.push({name:key})
};
</script>

<style scoped lang="scss">
.el-affix {
  text-align: center;
}
.flex-grow {
  flex-grow: 1;
}
</style>