<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <span
        v-for="tag in visitedViews"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        @click="onRouteClick(tag)"
      >
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </span>
      <!-- <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item active"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>-->
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag">刷新</li>
      <li v-if="!isAffix" @click="closeSelectedTag()">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch, ProvideReactive } from 'vue-property-decorator';
import { IMenuItem } from '@/types/IMenu';
import ScrollPane from './ScrollPane.vue';
import path from 'path';

@Component({name: 'TagsView', components: { ScrollPane }})
export default class extends Vue {

  private visible: boolean = false;
  private top: number = 0;
  private left: number = 0;
  private selectedTag: IMenuItem = {} as any; // this.$store.state.tagsView.visitedViews[0];
  private affixTags: IMenuItem[] = [];

  get visitedViews() {
    if(this.$store.state.tagsView.visitedViews.length>6){

      this.$alert('tab标签最大长度为6个', '警告', {
        confirmButtonText: '确定',
        showClose:false
        // callback: action => {
        //   this.$message({
        //     type: 'warning',
        //     // message: `action: ${ action }`
        //   });
        // }
      });
      this.$store.state.tagsView.visitedViews.length = 6
    }
    return this.$store.state.tagsView.visitedViews
  }
  get routes() {
    return this.$store.state.menu.routes;
  }
  @Watch('$route')
  onRouteChange(val: string) {
    this.addTags()
    this.moveToCurrentTag()
    if (val) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }
  mounted() {
    this.initTags()
    this.addTags()
  }

  isActive(route: IMenuItem) {
    if (null == route || this.selectedTag === undefined) return false;
    return route.path === this.selectedTag.path;
  }
  isAffix(tag?: IMenuItem): boolean {
    return tag !== undefined;
  }
  filterAffixTags(routes: IMenuItem[], basePath = '/'): IMenuItem[] {

    let tags: IMenuItem[] = []
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    });

    return tags
  }
  initTags() {
    const affixTags = this.affixTags = this.filterAffixTags(this.routes);

    for (const tag of affixTags) {
      // Must have tag name
      if (tag.name) {
        this.$store.dispatch('tagsView/addVisitedView', tag)
      }
    }
  }
  addTags() {
    const { name } = this.$route
    // console.log(this.$route)
    if (name) {
      this.$store.dispatch('tagsView/addView', this.$route)
    }
    return false
  }
  moveToCurrentTag() {
    const tags: any = this.$refs.tag
    if(tags === undefined) return;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {

          (this.$refs.scrollPane as any).moveToTarget(tag)
          // when query is different then update
          if (tag.to.fullPath !== this.$route.fullPath) {
            this.$store.dispatch('tagsView/updateVisitedView', this.$route)
          }
          break
        }
      }
    })
  }
  refreshSelectedTag() {
    if (this.selectedTag === undefined) return;
    this.$store.dispatch('tagsView/delCachedView', this.selectedTag).then(() => {
      const { fullPath } = this.selectedTag!;
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    })
  }
  closeSelectedTag() {
    if(this.selectedTag === undefined) return;
    this.$store.dispatch('tagsView/delView', this.selectedTag).then(({ visitedViews }) => {
      if (this.isActive(this.selectedTag!)) {
        this.toLastView(visitedViews, this.selectedTag!)
      }
    })
  }
  closeOthersTags() {
    if (this.selectedTag === undefined) return;
    this.$router.push(this.selectedTag)
    this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
      this.moveToCurrentTag()
    })
  }
  closeAllTags() {
    if (this.selectedTag === undefined) return;
    this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
      if (this.affixTags.some((tag: IMenuItem) => tag.path === this.selectedTag!.path)) {
        return
      }
      this.toLastView(visitedViews, this.selectedTag!)
    })
  }
  toLastView(visitedViews: any, view: IMenuItem) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      this.$router.push(latestView.fullPath)
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router.replace({ path: '/redirect' + view.fullPath })
      } else {
        this.$router.push('/')
      }
    }
  }
  openMenu(tag: IMenuItem, e: any) {
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as any).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right

    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }

    this.top = e.clientY
    this.visible = true
    this.selectedTag = tag
  }
  closeMenu() {
    this.visible = false
  }
  handleScroll() {
    this.closeMenu()
  }
  onRouteClick(tag: IMenuItem) {
    this.selectedTag = tag;
    if (location.hash.includes('settings')) {
      this.$routerGo('#/profile', '', {})
    } else {
      this.$routerGo('#/profile/settings', '', {})
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
