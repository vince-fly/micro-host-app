export interface IPage {
  msg: string;
  token: string;
}
export default {
  state: {
    msg: '今天阴天多云',
  },
  mutations: {
    // 设置父应用信息
    SET_MSG_VALUE(state: IPage, data: string) {
      state.msg = data;
    }
  },
  actions: {
    // 设置父应用信息
    changeMsg({ commit }: any, data: string) {
      commit('SET_MSG_VALUE', data)
    }
  }
}
