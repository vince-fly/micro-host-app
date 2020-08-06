<template>
  <div class="navbar">
    <!-- 原先的代码 -->
    <!-- <hamburger id="hamburger-container"
               :is-active="sidebar.opened"
               class="hamburger-container"
    @toggleClick="toggleSideBar" />-->
    <!-- 替换后的代码 -->
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />-->
    <div class="left-menu">
      <div class="ig">
        <img
          src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
          alt
          class="sidebar-logo"
        />
      </div>
      <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
      <div class="title">云Tops</div>
    </div>
    <div class="center">
      <sidebar class="sidebar-container" />
      <!-- <div id="focusD">
        <span id="left">&lt;</span><span id="right">&gt;</span>
      </div>-->
    </div>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <theme-picker
          class="right-menu-item hover-effect"
          style="float: right;height: 50px;top:22%;"
          @change="themeChange"
        />-->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <div class="avatar-left">
            <!-- <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              class="user-avatar"
              alt=""
            />-->
            <i class="el-icon-user user-avatar"></i>
          </div>
          <div class="avatar-center">
            <span class="user-name">admin</span>
          </div>
          <div class="avatar-right">
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>-->
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// import { throttle } from 'lodash'
import { mapGetters } from 'vuex';
import Screenfull from '@/components/Screenfull/index.vue';
// 引入菜单组件
import Sidebar from '../Topbar/index.vue';
// 引入主题
import ThemePicker from '@/components/ThemePicker/index.vue';
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ISidebar } from '@/types/store/IAppState';
@Component({name: 'Navbar', components: {
    Screenfull,
    Sidebar,
    ThemePicker
  }})
export default class extends Vue {

  private avatar: string = '';

  @Getter('sidebar') public sidebar!: ISidebar ;
  @Getter('device') public device!: string;
  // @Getter('avatar') avatar!:
  // computed: {
  //   ...mapGetters(['sidebar', 'avatar', 'device'])
  // },

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    }
    async logout() {
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // console.log('退出');
      //移除cookie
      // removeToken();
      // this.$router.push('/login');
    }
    // 改变主题颜色
    themeChange(val: string) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      });
    }

  // mounted () {
  //   // 初始化判断
  //   // 默认判断父元素和子元素的大小，以确定初始情况是否显示滚动
  //   window.addEventListener('load', this.checkScroll)
  //   // 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
  //   this.throttledCheckScroll = throttle(this.checkScroll, 300)
  //   window.addEventListener('resize', this.throttledCheckScroll)
  // },
  //  beforeDestroy () {
  //   // 取消监听
  //   window.removeEventListener('resize', this.throttledCheckScroll)
  //   window.removeEventListener('load', this.checkScroll)
  // }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  /* position: relative; */
  width: 100%;
  display: flex;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .left-menu {
    height: 100%;
    width: 230px;
    /* position: absolute; */
    flex: 0 0 230px;
    left: 0;
    top: 0;
    .ig {
      width: 30px;
      height: 30px;
      /* float: left; */
      display: inline-block;
      line-height: 50px;
      margin: 9px;
      z-index: -1;
      .sidebar-logo {
        width: 100%;
        height: 100%;
        /* position: fixed; */
        /* left: 0; */
      }
    }
    .title {
      min-width: 100px;
      line-height: 50px;
      height: 100%;
      /* float: left; */
      display: inline-block;
      font-weight: 700;
      color: #666;
      font-size: 24px;
      z-index: -1;
      vertical-align: top;
    }
  }
  .center {
    /* margin: 0 230px 0 400px; */
    flex: 1 1 auto;
    overflow: hidden;
    position: relative;
    /* padding: 0 20px; */
    box-sizing: border-box;
    /* padding: 0 100px; */
    /* box-sizing: border-box; */
    #focusD span {
      /* width: 50px; */
      height: 50px;
      position: absolute;
      left: 5px;
      top: 50%;
      margin-top: -20px;
      background: #fff;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      font-weight: bold;
      font-family: "黑体";
      font-size: 30px;
      color: #000;
      opacity: 0.3;
      border: 1px solid #fff;
    }

    #focusD #right {
      left: auto;
      right: 5px;
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    /* position: absolute; */
    flex: 0 0 230px;
    /* top: 0; */
    /* right: 0; */
    width: 230px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        width: 100px;
        display: flex;
        /* justify-content: space-between; */
        /* margin: 10px; */
        /* margin-top: 8px; */
        position: relative;
        .avatar-left {
          /* margin: 10px; */
          .user-avatar {
            cursor: pointer;
            width: 35px;
            /* flex: 0 0 40px; */
            background-color: #f4f4f5;
            color: #1890ff;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-radius: 50%;
            margin-right: 50px;
          }
        }
        .avatar-center {
          flex: 1;
          margin: 10px;
          .user-name {
            display: inline-block;
            height: 50px;
            width: 60px;
            line-height: 50px;
            /* flex: 1; */
            position: absolute;
            top: 1px;
            right: -5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .avatar-right {
          /* margin: 10px; */
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            /* flex: 0 0 5px; */
            width: 5px;
            right: -10px;
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
