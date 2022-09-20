<template>
  <div class="home">我是home</div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { homeGoodList } from "../../api/index";


const getHomeInfo = async () => {
  const res = await homeGoodList();
  console.log(res);
  return res;
};
onMounted(() => {
  const res = getHomeInfo();
  console.log(res);
  
});
</script>

<style scoped></style>