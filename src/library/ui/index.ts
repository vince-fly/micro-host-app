
import WlContainer from './wl-container';
import WlContextmenu from './wl-contextmenu';
import WlFadein from './wl-fadein';
import WlScroll from './wl-scroll';
import { VueConstructor } from 'vue/types/umd';

const components = [WlContainer, WlContextmenu, WlFadein, WlScroll];

const install = (Vue: VueConstructor) => {
  components.forEach((component: any) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  WlContainer,
  WlContextmenu,
  WlFadein,
  WlScroll
};
