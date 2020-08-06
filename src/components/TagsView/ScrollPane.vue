<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';

const tagAndTagSpacing = 4 // tagAndTagSpacing
@Component({name: 'ScrollPane'})
export default class extends Vue {
  private _left: number = 0;
  get left(): number {
    return this._left;
  }
  set left(val: number) {
    this._left = val;
  }


  get scrollWrapper() {
    return (this.$refs.scrollContainer as any).$refs.wrap
  }

  mounted() {
    this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
  }
  beforeDestroy() {
    this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
  }

  handleScroll(e: any) {
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    const $scrollWrapper = this.scrollWrapper
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  }
  emitScroll() {
    this.$emit('scroll')
  }
  moveToTarget(currentTag: any) {
    const $container = (this.$refs.scrollContainer as any).$el
    const $containerWidth = $container.offsetWidth
    const $scrollWrapper = this.scrollWrapper
    const tagList: any = this.$parent.$refs.tag

    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
      firstTag = tagList[0]
      lastTag = tagList[tagList.length - 1]
    }

    if (firstTag === currentTag) {
      $scrollWrapper.scrollLeft = 0
    } else if (lastTag === currentTag) {
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
    } else {
      // find preTag and nextTag
      const currentIndex = tagList.findIndex((item: any) => item === currentTag)
      const prevTag = tagList[currentIndex - 1]
      const nextTag = tagList[currentIndex + 1]

      // the tag's offsetLeft after of nextTag
      const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

      // the tag's offsetLeft before of prevTag
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

      if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
        $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
      } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
        $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
