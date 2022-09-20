<template>
  <!-- 给login页面用的 -->
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<style scoped></style>
