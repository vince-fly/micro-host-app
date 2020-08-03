<template>
  <div id="root" class="main-container" @mouseover="onMouseover">
    <!-- 头菜单区 -->
    <main-nav-menu class="main-menu-box" :show-menu="showHeader" />
    <!-- 下侧视图 -->
    <div class="main-container-content">
      <!-- 子应用渲染区 -->
      <div class="main-container-view">
        <el-scrollbar class="wl-scroll">
          <div id="sub-app-layout" class="app-view-box" v-html="content"></div>
          <div v-if="loading" class="subapp-loading"></div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNavMenu from '@/components/MainNavMenu.vue';

export default Vue.extend({
  name: 'rootView',
  components: {
    MainNavMenu
  },
  props: {
    loading: Boolean,
    content: String,
    authUrl: String
  },
  data() {
    return {
      showHeader: false
    }
  },
  // created() {
  //   console.log(this);
  // },
  methods: {
    onMouseover(e: MouseEvent) {
      if (e.clientY > 60 && this.showHeader) {
        this.showHeader = false;
      }
      if (this.showHeader) {
        return;
      }
      if (e.clientY < 60) {
      let stout = setTimeout(() => {
              stout = 0;
              this.showHeader = true;
            }, 600);
      }
    },
    onMouseleave(e: MouseEvent) {

      if (!this.showHeader) {
        return;
      }
      let stout = setTimeout(() => {
        stout = 0;
        this.showHeader = false;
      }, 600);
    }
  }
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.main-container-content {
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  > .main-container-view {
    padding: 8px;
    width: 100%;
    height: calc(100% - 60px);
    background: $main-base-color;
    box-sizing: border-box;
    > .wl-scroll {
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 4px;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .app-view-box {
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
    }
  }
}
.subapp-loading {
  background: url("~@/assets/images/loading.gif");
}
</style>
