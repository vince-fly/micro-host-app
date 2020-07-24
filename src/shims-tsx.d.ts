import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    // __HBHOST_BASE_URL__: string;
    __HBBASE_SETTINGS__: any;
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
  }
}

declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    content: any;
    loading: any;
  }
}
