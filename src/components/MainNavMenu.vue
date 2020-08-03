<template>
  <div class="main-nav-menu-wrap" :class="menuShow? 'main-nav-show': 'main-nav-autohide'">
    <el-menu
      class="main-nav-menu"
      :text-color="themeMenu.text"
      :default-openeds="menuDefaultOpeneds"
      :background-color="themeMenu.background"
      :active-text-color="themeMenu.active_text"
      mode="horizontal"
    >
      <el-submenu v-for="sub of menu" :key="sub.id" :index="sub.id">
        <template slot="title">
          <i class="menu-icon" :class="sub.icon"></i>
          <span class="menu-sub-title">{{ sub.title }}</span>
        </template>
        <el-menu-item
          v-for="item of sub.children"
          :key="item.id"
          :index="item.id"
          @click="goto(sub.module, item.url)"
        >
          <span class="menu-item-title">{{ item.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu key="user_login" index="user_login_main">
        <template slot="title">
          <i class="menu-icon el-icon-user-solid"></i>
          <span class="menu-sub-title">个人用户</span>
        </template>
        <el-menu-item @click="authClick()" key="user_login" index="user_10001">
          <span v-if="auth.token" class="menu-item-title">切换用户</span>
          <span v-else class="menu-item-title">登录</span>
        </el-menu-item>
        <el-menu-item key="user_logout" v-if="auth.token" @click="logout()" index="user_10002">
          <span class="menu-item-title">退出</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <span class="lock-icon" @click="lockClick()">
      <i class="menu-icon" :class="locked? 'el-icon-lock': 'el-icon-unlock'"></i>
    </span>
  </div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex'; // 引入状态共享
import { MessageBox } from 'element-ui';
import { routerGo, getAuthUrl } from '../library/js/util'; // 引入跨应用路由跳转

import scssVars from '../style/variablesScss';
import store from '../store';

const { menu_background, menu_color, menu_active_color } = scssVars;
export default Vue.extend({
  name: 'MainNavMenu',
  props: {
    model: {
      type: String,
      default: 'horizontal'
    },
    showMenu: Boolean
  },
  data() {
    return {
      locked: true,
      theme_menu: {
        background: menu_background,
        text: menu_color,
        active_text: menu_active_color,
      }, // 菜单主题
      menu_data: [], // 菜单数据
    };
  },
  computed: {
    // 左侧菜单主题
    themeMenu() {
      return this.theme_menu;
    },
    // 左侧菜单默认展开
    menuDefaultOpeneds() {
      return this.menu_data.map((i) => {
        return i.id;
      });
    },
    // 导入vuex菜单数据，菜单折叠状态
    ...mapGetters(['menu', 'is_collapse', 'auth']),
    menuShow() {
      if (this.locked) {
        return true;
      } else {
        return this.showMenu;
      }
    }
  },
  methods: {
    lockClick() {
      this.locked = !this.locked;
    },
    // 跨应用路由跳转
    goto(title, href) {
      routerGo(href, title);
    },
    authClick() {
      if (this.auth.token) {
        MessageBox.confirm('是否要退出当前账号,切换新的用户?', '账号切换', {
          distinguishCancelAndClose: true,
          confirmButtonText: '切换',
          cancelButtonText: '取消',
        }).then(() => {
          store.dispatch('auth/logout');
        }).catch(() => {
          // do nothing
        });
      } else {
        location.href = getAuthUrl();
        // location.href = '';
      }
    },
    logout() {
      MessageBox.confirm('是否退出?', '账号退出', {
        distinguishCancelAndClose: true,
        confirmButtonText: '退出',
        cancelButtonText: '取消',
      })
        .then(() => {
          store.dispatch('auth/logout');
        })
        .catch(() => {
          const url = getAuthUrl();
          console.log(url);
        });
      // location.href = '';
    },
  },
});
</script>

<style lang="scss">
.main-nav-menu-wrap {
  background-color: #4d6987;
  border-color: #2a3f54;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  .lock-icon {
    color: #fff;
    padding-right: 40px;
  }
  max-height: 60px;
}
.main-nav-autohide {
  opacity: 0;
  max-height: 0;
  transition: opacity 0.5s linear, max-height 0.5s linear;
}
.main-nav-show {
  opacity: 1;
  max-height: 60;
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
