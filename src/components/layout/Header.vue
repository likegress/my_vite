<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { remove} from "../../utils/storage";
import logoImg from "@/assets/images/logo.jpg";
import {
  Search,
  BellFilled,
  UserFilled,
  ShoppingCartFull,
} from "@element-plus/icons-vue";

const router = useRouter();
const activeIndex = ref("home");
const data = reactive({ keywords: "" });
let handleSelect = (key: string) => {
  // activeIndex.value = key;
  router.push({ name: key });
};
const handlerSearch = () => {
  console.log(data.keywords);
  router.push({ name: "goods", query: { k: data.keywords } });
};

let logout = () => {
  remove("token");
  router.push("/login");
};
</script>

<template>
  <div class="container">
    <el-row class="top-bar">
      <el-col :span="6">
        <el-image class="logo" :src="logoImg" />
        <div class="logo-title">BUBA订货商城</div>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="data.keywords"
          placeholder="请输入关键字进行搜索"
          class="input-with-select"
        >
          <template #append>
            <el-button :icon="Search" @click="handlerSearch" />
          </template>
        </el-input>
      </el-col>
      <el-col :span="6"><router-link to="/goods">全部商品</router-link></el-col>
      <el-col :span="6">
        <el-button :icon="BellFilled" circle />
        <el-button :icon="UserFilled" circle />
        <el-button :icon="ShoppingCartFull" circle />
      </el-col>
    </el-row>
  </div>
  <div class="menu-container">
    <el-affix class="content" :offset="0">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="goods">商品列表</el-menu-item>
        <el-menu-item index="cart">购物车</el-menu-item>
        <el-menu-item index="order">我的订单</el-menu-item>
      </el-menu>
    </el-affix>
  </div>
</template>

<style scoped>
/* .flex-grow {
  flex-grow: 1;
} */
.menu-container {
  border-bottom: 1px solid #dcdfe6;
}
.content {
  width: 1280px;
  margin: 0 auto;
}
.container {
  background-color: #000;
}
.logo {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  float: left;
}
.top-bar {
  height: 100px;
  width: 1280px;
  background-color: #000;
  color: #fff;
  align-items: center;
  margin: 0 auto;
}
.logo-title {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  float: left;
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
}
</style>
