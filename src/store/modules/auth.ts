import pager from '../../util/pager';
import { getTokenFromCookie } from '../../library/js/util';
const initToken = getTokenFromCookie();

export interface IToken {
  token: string | undefined;
  exp: number;
}

export default {
  namespaced: true,
  state: {
    token: initToken?.token || undefined,
    exp: initToken?.exp || 0
  },

  mutations: {
    SAVE_TOKEN(state: IToken, token: IToken) {
      state.token = token.token;
      state.exp = token.exp;
    },
    CLEAN_TOKEN(state: IToken) {
      // state = {token: undefined, exp: 0};
      state.token = undefined;
      state.exp = 0;
    }
  },

  actions: {
    setToken({commit}: any, data: IToken) {
      const cn: string = `HBTOKEN=${encodeURIComponent(data.token!)};expires=${new Date().getTime() + data.exp}`;
      document.cookie = cn;
      commit('SAVE_TOKEN', data);
      pager.next({data, from: 'master'});
    },
    logout({commit}: any) {
      // remove token
      const token = getTokenFromCookie();
      if (token && token.token) {
        const cn = `HBTOKEN=;expires=${new Date().getTime() - 1000}`;
        document.cookie = cn;
      }
      commit('CLEAN_TOKEN');
      pager.next({data: {token: undefined, exp: 0}, from: 'master'})
    }
  }
}
