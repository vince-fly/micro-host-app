import { ITagsViewState } from '@/types/store/ITagsViewState';
import { IMenuItem } from '@/types/IMenu';
import { Store } from 'vuex';
const initState: ITagsViewState = {
  visitedViews: [
    {
      name: 'AgGridTest',
      path: 'AgGridTest',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: 'agGrid测试',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
        noCache: true,
      },
      children: [],
      title: 'agGrid测试',
    },
    {
      name: 'agGridDemo',
      path: 'agGridDemo',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: 'agGriddemo',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
        noCache: true,
      },
      title: 'agGriddemo',
      children: [],
    },
    {
      name: 'AgGridTest/showDetail.vue',
      path: 'AgGridTest/showDetail.vue',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: '测试ag-grid详情',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
        noCache: true,
      },
      children: [],
      title: '测试ag-grid详情',
    },
    {
      name: 'searchTest',
      path: 'searchTest',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: '查询设计测试',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
        noCache: true,
      },
      title: '查询设计测试',
      children: [],
    },
    {
      name: 'MenuManage',
      path: 'MenuManage',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: '菜单管理',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
        noCache: true,
      },
      title: '菜单管理',
      children: [],
    },
    {
      name: '文件',
      path: 'index',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: '文件',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
      },
      title: '文件',
    },
  ],
  cachedViews: [
    {
      name: '文件',
      path: 'index',
      component: {
        _custom: { type: 'function', display: '<span>ƒ</span> (resolve)' },
      },
      meta: {
        title: '文件',
        icon: 'el-icon-s-help',
        roles: ['admin', 'editor'],
      },
      title: '文件',
    },
  ],
};

const mutations = {
  ADD_VISITED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    if (state.visitedViews.some((v: IMenuItem) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta!.title || 'no-name',
      })
    );
  },
  REST_CACHED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    state.visitedViews = view;
    // state.cachedViews = view;
  },
  ADD_CACHED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta!.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  DEL_VISITED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },

  DEL_OTHERS_VISITED_VIEWS: (state: ITagsViewState, view: IMenuItem) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
  },
  DEL_OTHERS_CACHED_VIEWS: (state: ITagsViewState, view: IMenuItem) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },

  DEL_ALL_VISITED_VIEWS: (state: ITagsViewState) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(
      (tag: IMenuItem) => tag.meta!.affix
    );
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: (state: ITagsViewState) => {
    state.cachedViews = [];
  },

  UPDATE_VISITED_VIEW: (state: ITagsViewState, view: IMenuItem) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};

const actions = {
  addView({ dispatch }: Store<any>, view: IMenuItem) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({ commit }: Store<any>, view: IMenuItem) {
    commit('ADD_VISITED_VIEW', view);
  },
  addCachedView({ commit }: Store<any>, view: IMenuItem) {
    commit('ADD_CACHED_VIEW', view);
  },
  restCachedView({ commit }: Store<any>, view: IMenuItem) {
    commit('REST_CACHED_VIEW', view);
  },
  delView({ dispatch, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delVisitedView({ commit, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  delCachedView({ commit, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },

  delOthersViews({ dispatch, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delOthersVisitedViews({ commit, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersCachedViews({ commit, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    });
  },

  delAllViews({ dispatch, state }: Store<any>, view: IMenuItem) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delAllVisitedViews({ commit, state }: Store<any>) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews({ commit, state }: Store<any>) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    });
  },

  updateVisitedView({ commit }: Store<any>, view: IMenuItem) {
    commit('UPDATE_VISITED_VIEW', view);
  },
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions,
};
