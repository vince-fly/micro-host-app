import Vue from 'vue';
import { Message } from 'element-ui';
import { LoadableApp } from 'qiankun';
import App from './App.vue';
import { getAuthUrl } from '@/library/js/util';
import { filter } from 'rxjs/operators';
Vue.config.productionTip = process.env.NODE_ENV === 'production';

import createRouter from './router';
import store from './store';
// 导入乾坤函数
import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 有个子应用加载完毕回调
  start, // 启动qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from 'qiankun';
// 按需导入element-ui
import './plugin/element';
// 导入封装后的ui组件
import './library/ui/install';
// 导入路由监听函数
import { genActiveRule } from './utils';
/**
 * 主应用公共资源下发子应用
 */
// 导入主应用ui库
import LibraryUi from './library/ui/';
// 导入主应用工具类库
import LibraryJs from './library/js';
// 导入主应用需要下发的emit函数
import * as childEmit from './utils/childEmit';
// 定义传入子应用的数据
import pager from './utils/pager';

const tokenStr = LibraryJs.getHashValue('token');
const exp = LibraryJs.getHashValue('exp') || 0;
let token;
if (tokenStr) {
  token = { token: tokenStr, exp };
} else {
  token = LibraryJs.getToken();
}
const state = {
  message: '',
  time: new Date().toString(),
  from: 'master',
};

// 在主应用注册官方通信方案
const actions = initGlobalState(state);
// 导入应用间通信介质：呼机
const msg = {
  data: store.getters, // 从主应用仓库读出的数据
  components: LibraryUi, // 从主应用读出的组件库
  utils: LibraryJs, // 从主应用读出的工具类库
  emitFnc: childEmit, // 从主应用下发emit函数来收集子应用反馈
  pager, // 从主应用下发应用间通信呼机
  actions,
  state, // 便于展示官方通信示例的临时数据
};

// 在主应用注册呼机
pager.subscribe((v: any) => {
  console.log(`监听到子应用${v.from}发来消息：`, v);
  // store.dispatch('app/setToken', v.token);
});
pager
  .pipe(filter((subMsg: any) => subMsg.data.type === 'auth'))
  .subscribe(({ data }) => {
    // 用户信息过期
    console.log(data);
    const url = getAuthUrl();
    console.log(url);
    if (url) {
      // location.href = url;
    }
  });
// 注册消息监听函数
actions.onGlobalStateChange((stat, prev) =>
  console.log(`主应用应用监听到来自${stat.from}发来消息：`, state, prev)
);

// 主应用渲染函数
let app: Vue;

function render({ appContent, loading }: any = {}) {
  if (!app) {
    app = new Vue({
      el: '#container',
      router: createRouter(''),
      store,
      data() {
        return {
          content: appContent,
          loading,
          authUrl: '',
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}
render();

const isDev = process.env.NODE_ENV === 'development';
function buildApps(): any {
  const { Apps, Auth } = window.__HBBASE_SETTINGS__;
  if (!Apps) {
    return [];
  }

  const arr: any[] = [];
  if (!Array.isArray(Apps)) {
    arr.push({
      name: Apps.module,
      entry: isDev ? Apps.devEntry : Apps.depEntry,
      render,
      activeRule: genActiveRule(Apps.routerBase),
      props: {
        ...msg,
        ROUTES: Apps.children,
        systemSettings: Auth,
        routerBase: Apps.routerBase,
        hostPath: location.pathname,
        moduleSettings: window.__HBBASE_SETTINGS__[Apps.module] || {},
      },
    });
    return { apps: arr, defaultApp: Apps.routerBase };
  }
  let defaultApp = '';

  Apps.map((item) => {
    arr.push({
      name: item.module,
      entry: isDev ? item.devEntry : item.depEntry,
      render,
      activeRule: genActiveRule(item.routerBase),
      props: {
        ...msg,
        ROUTES: item.children,
        systemSettings: Auth,
        routerBase: item.routerBase,
        moduleSettings: window.__HBBASE_SETTINGS__[item.module] || {},
      },
    });
    if (item.defaultRegister) {
      // defaultApp = `${HOSTPATH}${item.routerBase}`;
      defaultApp = item.routerBase;
    }
  });

  return { apps: arr, defaultApp };
}

// 获取app注册表
// getAppConfigApi().then(({ data }: any) =>
function registerApps(globalActions: any, currToken: any): void {
  const data = buildApps();
  // 处理菜单
  if (data.apps.length === 0) {
    Message({
      type: 'error',
      message: '没有可以注册的子应用数据',
    });
    return ;
  }
  // 处理子应用注册数据

  let defaultApp = data.defaultApp;

  // 注册子应用
  registerMicroApps(data.apps, {
    beforeLoad: [
      (capp: LoadableApp) => {
        console.log('before load', capp);
        return Promise.resolve(true);
      },
    ],
    beforeMount: [
      (capp) => {
        console.log('before mount', capp);
        return Promise.resolve(true);
      },
    ],
    afterUnmount: [
      (capp) => {
        console.log('after unload', capp);
        return Promise.resolve(true);
      },
    ],
  });
  // 设置默认子应用
  if (!defaultApp) {
    defaultApp = data.apps[0].routerBase;
  }
  setDefaultMountApp(defaultApp);
  // 第一个子应用加载完毕回调
  runAfterFirstMounted(() => {
    console.log('第一个子应用加载完毕');
    if (currToken) {
      // store.dispatch('auth/setToken', currToken);
      globalActions.setGlobalState(currToken);
    }
  });
  // 启动微服务
  start({ prefetch: true, sandbox: true });
  // 设置全局未捕获一场处理器
  addGlobalUncaughtErrorHandler((event) => {
    console.log(event);
  });
}

registerApps(actions, token);
if (token?.token) {
  store.dispatch('auth/setToken', token);
  // 根据用户信息，加载菜单
} else {
  const url = getAuthUrl();
  if (url) {
    location.href = url;
  }
}
store.dispatch('menu/fetchMenus', '126');
store.dispatch('menu/setUserMenu', window.__HBBASE_SETTINGS__.Apps);

// $DOMAIN_OAUTH_PATH?client_id=$APPLICATION_ID&response_type=token&state=程序生成的36位的数字字符串&redirect_uri=$DOMAIN_NAME + $SITE_PATH? + 网站预定义的回调处理入口
