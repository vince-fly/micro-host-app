import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getter';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((module: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  module[moduleName] = value.default;
  return module;
}, {});
console.log(modules);
console.log(getters);
const store = new Vuex.Store({
  modules,
  getters
});

export default store;
