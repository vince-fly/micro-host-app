export interface IMenu {
  is_collapse: boolean;
  menu: any[]
}

export default {
  namespaced: true,
  state: {
    is_collapse: false,
    menu: []
  },
  mutations: {
    ADD_USER_MENU(state: IMenu, data: any[]) {
      state.menu = data;
    },
    SET_COLLAPSE_STATUS(state: IMenu, data: boolean) {
      state.is_collapse = data;
    }
  },
  actions: {
    setUserMenu({ commit }: any, data: any[]) {
      commit('ADD_USER_MENU', data)
    },
    // 设置折叠状态
    setCollapseStatus({ commit }: any, data: boolean) {
      commit('SET_COLLAPSE_STATUS', data)
    }
  }

}
