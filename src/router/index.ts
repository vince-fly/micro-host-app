import Vue from 'vue';
import VueRouter from 'vue-router';
import { IMenuItem } from '@/types/IMenu';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes: IMenuItem[] = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // // 404
  // {
  //   path: '/err-404',
  //   name: 'err404',
  //   meta: {
  //     withoutAuth: true
  //   },
  //   component: () => import('../views/error/404.vue')
  // },
];

const createRouter = (baseUrl: string) =>
  new VueRouter({
    mode: 'history',
    base: baseUrl,
    routes: [],
  });

// const router = createRouter();

// 重置路由
export function resetRouter(baseUrl: string) {
  return createRouter(baseUrl);
  // router.matcher = newRouter.matcher // reset router
}

export default createRouter;
