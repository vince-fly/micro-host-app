import { Component, Vue } from 'vue-property-decorator';
// import { Getter } from 'vuex-class';

@Component
export default class extends Vue {
  get device() {
    return this.$store.state.app.device;
  }
  public mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS();
  }

  public fixBugIniOS() {
    const $subMenu: any = this.$refs.subMenu;
    if ($subMenu) {
      const handleMouseleave = $subMenu.handleMouseleave;
      $subMenu.handleMouseleave = (e: any) => {
        if (this.device === 'mobile') {
          return;
        }
        handleMouseleave(e);
      };
    }
  }
}
