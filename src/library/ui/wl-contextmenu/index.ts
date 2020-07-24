import WlContextmenu from './index.vue';
import {VueConstructor} from 'vue';

// WlContextmenu.install = function(Vue: VueConstructor) {
//   Vue.component(WlContextmenu.name, WlContextmenu);
// };

export default {
  install(Vue: VueConstructor) {
    Vue.component(WlContextmenu.name, WlContextmenu);
  },
  ...WlContextmenu
}
