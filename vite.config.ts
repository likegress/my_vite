import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({commond,mode})=>{
 return defineConfig({
   plugins: [vue()],
   //服务端配置
   server: {
     host: "127.0.0.1",
     port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
     strictPort: true, // 占用端口退出
     https: false,
     open: true, //自动打开浏览器
     proxy: {
       "/api": {
         target: loadEnv(mode, process.cwd()).VITE_APP_PORT,
         changeOrigin: true, //跨域配置
         rewrite: (path) => path.replace(/^\/api/, ""),
       },
     },
     hmr: {
       overlay: false, //屏蔽服务器报错
     },
   },
   //解析 设置项目文件导入路径
   resolve: {
     alias: { "@": path.resolve(__dirname, "src") },
   },
   css: {
     //css预处理器
     //导入的路径最后需要加上
     preprocessorOptions: {
       scss: {
         // additionalData:'@import "@/ass"'
       },
     },
   },
   //分块打包配置
   build:{
    chunkSizeWarningLimit:1500, //分块, 将大块分解成更小的块
    rollupOptions:{
      output:{
        manualChunks(id){
          if(id.includes('node_modules')){
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
 }); 
}
