import variables from '@/style/element-variables';
import { ISettingsState } from '@/types/store/ISettingsState';

const initState: ISettingsState = {
  theme: variables.colorPrimary,
};

const mutations = {
  CHANGE_SETTING: (state: ISettingsState | any, { key, value }: any) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }: any, data: ISettingsState) {
    commit('CHANGE_SETTING', data);
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};
