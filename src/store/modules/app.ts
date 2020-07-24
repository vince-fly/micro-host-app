export interface IAppState {
  size: number;
  token: string;
}
export default {
  namespaced: true,
  state: {
    size: 10, // 分页大小
    token: '',
  },
  mutations: {
    SET_PAGE_SIZE(state: IAppState, data: number) {
      state.size = data;
    },
    SET_TOKEN(state: IAppState, data: string) {
      state.token = data;
    },
  },
  actions: {
    setPageSize({commit}: any, data: number) {
      commit('SET_PAGE_SIZE', data);
    },
    setToken({ commit }: any, data: string) {
      commit('SET_TOKEN', data);
    }
  }
}
