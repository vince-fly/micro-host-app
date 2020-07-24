import WlScroll from './index.vue';
import { VueConstructor } from 'vue';

// WlScroll.install = function(Vue) {
//   Vue.component(WlScroll.name, WlScroll);
// };

export default {
  install(Vue: VueConstructor) {
    Vue.component(WlScroll.name, WlScroll);
  },
  ...WlScroll
};
