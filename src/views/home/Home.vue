<template>
  <div class="home">我是home</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { homeGoodList } from "../../api/index";
import { HomeAdsAndGoodsModel} from "@/model/home";
import { useRouter } from "vue-router";
let goodList = ref<HomeAdsAndGoodsModel>({});
const router = useRouter();
const getHomeInfo = async () => {
  const res = await homeGoodList();
  goodList.value = res;
  console.log(goodList);
  return res;
};
onMounted(() => {
  getHomeInfo();
});
</script>

<style scoped></style>