import { IRawMenu, IMenuItem } from '@/types/IMenu';
import { routes as constantRoutes } from '@/router';
import { changeMenuStructure } from '@/utils/newCommon';
// import Layout from '@/layout/index.vue';
export interface IMenu {
  is_collapse: boolean;
  menu: any[];
  addRoutes: IMenuItem[];
  routes: IMenuItem[];
}
import { getMenus } from '@/api/menu';

// 循坏遍历转换component组件的名字
export function filterAsyncRouter(asyncRoutes: IMenuItem[]): IMenuItem[] {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRoutes: IMenuItem[] = [];
  asyncRoutes.forEach((route: IMenuItem) => {
    if (route.component) {
      if (route.component === 'Layout') {
        // Layout组件特殊处理
        route.component = null ; // Layout;
      } else {
        const component = route.component;
        route.component = (resolve: (...modules: any[]) => void) => {
          require([`@/views${component}`], resolve);
        };
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    accessedRoutes.push(route);
  });
  return accessedRoutes;
}

export default {
  namespaced: true,
  state: {
    is_collapse: false,
    menu: [],
    routes: [],
    addRoutes: [],
  },
  mutations: {
    ADD_USER_MENU(state: IMenu, data: any[]) {
      state.menu = data;
    },
    SET_COLLAPSE_STATUS(state: IMenu, data: boolean) {
      state.is_collapse = data;
    },
    SET_MENUS(state: IMenu, routes: IMenuItem[]) {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
  },
  actions: {
    setUserMenu({ commit }: any, data: any[]) {
      commit('ADD_USER_MENU', data);
    },
    // 设置折叠状态
    setCollapseStatus({ commit }: any, data: boolean) {
      commit('SET_COLLAPSE_STATUS', data);
    },
    async fetchMenus({ commit }: any, token: string): Promise<any> {
      const res = await getMenus(token);
      // console.log(menus);
      let { menuTree } = res.data;
      console.log(res.data);
      menuTree = menuTree as IRawMenu[];
      const newMenuTree = menuTree.filter(
        (m: IRawMenu) => m.smu_status === 'Y'
      );
      newMenuTree.forEach((item: IRawMenu) => {
        if (item.subMenus && item.subMenus.length > 0) {
          item.subMenus = item.subMenus.filter(
            (c: IRawMenu) => c.smu_status === 'Y'
          );
          item.subMenus.forEach((t: IRawMenu) => {
            if (t.subMenus && t.subMenus.length > 0) {
              t.subMenus = t.subMenus.filter(
                (tc: IRawMenu) => tc.smu_status === 'Y'
              );
            }
          });
        }
      });

      const data: IMenuItem[] = changeMenuStructure(newMenuTree);

      // const menuItems = filterAsyncRouter(data);
      commit('SET_MENUS', filterAsyncRouter(data));
      return data;
    },
  },
};
