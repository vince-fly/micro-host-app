<template>
  <div class="main-nav-menu-wrap main-nav-show">
    <navbar />
    <!-- <span v-if="false" class="lock-icon" @click="lockClick()">
      <i class="menu-icon" :class="locked? 'el-icon-lock': 'el-icon-unlock'"></i>
    </span>-->
    <div class="app-wrapper">
      <div class="main-container">
        <tags-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'; // 引入状态共享
import { MessageBox } from 'element-ui';
import { routerGo, getAuthUrl } from '../library/js/util'; // 引入跨应用路由跳转
import Navbar from './Navbar/index.vue';
import scssVars from '../style/variablesScss';
import store from '../store';
import TagsView from '@/components/TagsView/index.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
const { menu_background, menu_color, menu_active_color } = scssVars;

@Component({ name: 'MainNavMenu', components: { Navbar, TagsView } })
export default class extends Vue {

  @Prop({ default: 'horizontal' }) private model!: string;
  @Prop() private showMenu!: boolean;
  // props: {
  //   model: {
  //     type: String,
  //     default: 'horizontal'
  //   },
  //   showMenu: Boolean
  // },
  // data() {
  //   return {
  //     locked: true,
  //     theme_menu: {
  //       background: menu_background,
  //       text: menu_color,
  //       active_text: menu_active_color,
  //     }, // 菜单主题
  //     menu_data: [], // 菜单数据
  //   };
  // },
  // computed: {
  //   // 左侧菜单主题
  //   themeMenu() {
  //     return this.theme_menu;
  //   },
  //   // 左侧菜单默认展开
  //   menuDefaultOpeneds() {
  //     return this.menu_data.map((i) => {
  //       return i.id;
  //     });
  //   },
  //   // 导入vuex菜单数据，菜单折叠状态
  //   ...mapGetters(['menu', 'is_collapse', 'auth']),
  //   menuShow() {
  //     if (this.locked) {
  //       return true;
  //     } else {
  //       return this.showMenu;
  //     }
  //   }
  // },
  //   methods: {
  //     lockClick() {
  //   this.locked = !this.locked;
  // },
  // 跨应用路由跳转
  // goto(title, href) {
  //   routerGo(href, title);
  // },
  // authClick() {
  //   if (this.auth.token) {
  //     MessageBox.confirm('是否要退出当前账号,切换新的用户?', '账号切换', {
  //       distinguishCancelAndClose: true,
  //       confirmButtonText: '切换',
  //       cancelButtonText: '取消',
  //     }).then(() => {
  //       store.dispatch('auth/logout');
  //     }).catch(() => {
  //       // do nothing
  //     });
  //   } else {
  //     location.href = getAuthUrl();
  //     // location.href = '';
  //   }
  // },
  // logout() {
  //   MessageBox.confirm('是否退出?', '账号退出', {
  //     distinguishCancelAndClose: true,
  //     confirmButtonText: '退出',
  //     cancelButtonText: '取消',
  //   })
  //     .then(() => {
  //       store.dispatch('auth/logout');
  //     })
  //     .catch(() => {
  //       const url = getAuthUrl();
  //       console.log(url);
  //     });
  //   // location.href = '';
  // },
  //   },
}
</script>

<style lang="scss">
@import "~@/style/mixin.scss";
@import "~@/style/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.main-nav-menu-wrap {
  background-color: #4d6987;
  border-color: #2a3f54;
  margin: 0;
  padding: 0;
  .lock-icon {
    color: #fff;
    padding-right: 40px;
  }
}
.main-nav-autohide {
  opacity: 0;
  max-height: 0;
  transition: opacity 0.5s linear, max-height 0.5s linear;
}
.main-nav-show {
  opacity: 1;
  overflow: hidden;
  transition: opacity 0.5s linear, max-height 0.5s linear;
}
.main-nav-menu {
  flex: 1;
  // border-color: #2a3f54;
  .the-menu-logo {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
  .menu-icon {
    color: #fff;
  }
  .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }
  .menu-sub-title {
    margin-left: 6px;
    font-weight: 600;
  }
}
</style>
