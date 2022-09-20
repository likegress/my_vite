<template>
  <div class="login">
    <el-form ref="loginEl" :model="loginForm" :rules="rules" class="login-form">
      <OwlLogin :password="closeEye" />
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
          :prefix-icon="User"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          show-password
          :prefix-icon="Lock"
          @keyup.enter="handleLogin(loginEl)"
          @focus="closeEye = true"
          @blur="closeEye = false"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="isConfirmAgreement">
        <el-checkbox
          v-model="loginForm.isConfirmAgreement"
          style="margin: 0px 0px 10px 0px"
          >是否同意用户协议</el-checkbox
        >
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(loginEl)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { userLogin } from "../../api/index";
import { LoginModel } from "../../model/login";
import { User, Lock } from "@element-plus/icons-vue";
import type { FormRules, FormInstance } from "element-plus";
import OwlLogin from "@/components/OwlLogin.vue";
import { setStore } from "../../utils/storage";
import { useRouter } from "vue-router";

const router = useRouter();
let closeEye = ref<boolean>(false);
const loginForm = reactive<LoginModel>({
  username: "18866668888",
  password: "Asdf1234",
  isConfirmAgreement: false,
});
// 自定义验证
const isConfirmAgreement = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请勾选协议"));
  } else {
    callback();
  }
};

//验证规则
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  isConfirmAgreement: [
    { required: true, message: "请勾选协议", trigger: "blur" },
    { validator: isConfirmAgreement, trigger: "blur" },
  ],
});
let loading = ref<boolean>(false);
const loginEl = ref<FormInstance>();

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    const { username, password, isConfirmAgreement } = loginForm;
    const res = await userLogin(username, password, isConfirmAgreement);
    console.log(res);
    if (res && res != "") {
      setStore("token", res);
      loading.value = false;
      router.push({path:"/"})
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: rgb(0, 0, 0, 0.6);
  width: 400px;
  padding: 25px 25px 5px 25px;
  position: relative;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
svg {
  height: 33px !important;
}
</style>