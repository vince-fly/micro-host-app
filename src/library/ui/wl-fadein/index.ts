import WlFadein from './index.vue';
import { VueConstructor } from 'vue';
// WlFadein.install = function (Vue) {
//   Vue.component(WlFadein.name, WlFadein);
// };

export default {
  install(Vue: VueConstructor) {
    Vue.component(WlFadein.name, WlFadein);
  },
  ...WlFadein
}
