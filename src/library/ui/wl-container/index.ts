import WlContainer from './index.vue';

(WlContainer as any).install = function(Vue: any ) {
  Vue.component(WlContainer.name, WlContainer);
};

export default WlContainer;
