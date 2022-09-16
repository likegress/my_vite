/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: Number;
  VITE_APP_BASE_URL: string;
}
