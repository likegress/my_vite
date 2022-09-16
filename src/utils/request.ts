import {AxiosRequestConfig} from "axios"
import {getStore} from "./storage"
import axios from "axios";
import router from "../router";
import { ElLoading } from "element-plus";
// 显示Loading
//loading 对象
//正在请求的数据
let requestCount = 0;
let loading:any = null;
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
    text: '请稍后...',
    background: 'rgba(0,0,0,0.7)',
  };
  loading = ElLoading.service({ ...options, fullscreen: true });
};
// 隐藏loading
const closeLoading = () => {
  loading.close();
};

const service = axios.create({
  //API的前缀,请求接口
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  headers: { "Content-type": "application/json;charset=utf-8" },
});


//响应拦截器
service.interceptors.request.use((config:AxiosRequestConfig<any>)=>{
    const token = getStore("token");
    if(token == null || token == ""){
        router.push("/login")
    }
})