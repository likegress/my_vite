import { getStore } from "./storage";
import axios, { AxiosRequestConfig } from "axios";
import router from "../router";
import { ElLoading, ElMessage } from "element-plus";
import { AxiosResponseEx } from "../model/params";
import { errorCodeType } from "../utils/error-code-type";
// 显示Loading
//loading 对象
//正在请求的数据
let requestCount = 0;
let loading: any = null;
const startLoading = () => {
  interface Options {
    lock: boolean;
    text: string;
    background: string;
    spinner?: string;
    customClass?: string;
  }
  const options: Options = {
    lock: true,
    text: "请稍后...",
    background: "rgba(0,0,0,0.7)",
  };
  loading = ElLoading.service({ ...options, fullscreen: true });
};
// 隐藏loading
const closeLoading = () => {
  loading.close();
};

const service = axios.create({
  //API的前缀,请求接口
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

//响应拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const token = getStore("token");
    if (token == null || token == "") {
      router.push("/login");
    }
    if (config.headers != null) {
      //需要设置token
      config.headers["Authorization"] = "Bearer" + token;
    }
    //get 请求转换params 参数 到url链接中
    if (config.method?.toUpperCase() == "GET" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        //获取当前属性的值
        const value = config.params[propName];
        //encodeURI编码属性名称部分
        var part = encodeURI(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            //遍历参数的值是对象的形式,需要做特殊处理
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      //去掉&符号
      url = url.slice(0, -1);
      //已经将参数转换到url路径中
      config.params = {};
      config.url = url;
      console.log(url);
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

//响应拦截器
service.interceptors.response.use(
  (res: any) => {
    //先取到状态码
    const code = res.status;
    //获取错误信息
    const msg =
      res.data["message"] ||
      errorCodeType(code.toString()) ||
      res.data["msg"] ||
      errorCodeType("default");
    if (code == 200) {
      return Promise.resolve(res.data as AxiosResponseEx);
    } else if (code == 401) {
      ElMessage.error("需要登录");
      return Promise.reject(res.data);
    } else {
      ElMessage.error(msg);
      return Promise.reject(res.data);
    }
    // return res;
  },
  (error) => {
    //错误处理卡
    let { message } = error;
    if (message == "Network Error") {
      message = "网络似乎遇到了问题, 请检查网络连接状况";
    } else if (message.includes("timeout")) {
      return Promise.reject(error);
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage.error({ message, duration: 5 * 1000 });
    return Promise.reject(error)
  }
);
export default service;
