import Cookies from 'js-cookie';
import { IAppState, ISidebar } from '@/types/store/IAppState';

const initState: IAppState = {
  sidebar: {
    // opened: parseInt(Cookies.get('sidebarStatus') || '0') > 0,
    withoutAnimation: false,
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
};

const mutations = {
  TOGGLE_SIDEBAR: (state: IAppState) => {
    // state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false;
    // if (state.sidebar.opened) {
    //   Cookies.set('sidebarStatus', 1)
    // } else {
    //   Cookies.set('sidebarStatus', 0)
    // }
  },
  CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    // Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: IAppState, device: string) => {
    state.device = device;
  },
  SET_SIZE: (state: IAppState, size: string) => {
    state.size = size;
    Cookies.set('size', size);
  },
};

const actions = {
  toggleSideBar({ commit }: any) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }: any, { withoutAnimation }: ISidebar) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }: any, device: string) {
    commit('TOGGLE_DEVICE', device);
  },
  setSize({ commit }: any, size: string) {
    commit('SET_SIZE', size);
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};
