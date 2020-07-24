export interface IPage {
  msg: string;
  token: string;
}
export default {
  state: {
    msg: '今天阴天多云',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  },
  mutations: {
    // 设置父应用信息
    SET_MSG_VALUE(state: IPage, data: string) {
      state.msg = data;
    },
    // 设置父应用token
    SET_TOKEN(state: IPage, data: string) {
      state.token = data;
    }
  },
  actions: {
    // 设置父应用信息
    changeMsg({ commit }: any, data: string) {
      commit('SET_MSG_VALUE', data)
    },
    // 设置父应用token
    changeToken({ commit }: any, data: string) {
      commit('SET_TOKEN', data)
    }
  }
}
