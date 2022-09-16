<template>
  <el-result title="404" syb-title="页面跑丢了">
    <template #icon>
      <el-image
        src="https://tire-mall.oss-cn-beijing.aliyuncs.com/goods/no_img.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="handleGoHome">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const handleGoHome = async () => {
  router.push({ path: "/" });
};
</script>

<style scoped lang="scss"></style>