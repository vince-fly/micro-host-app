<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import * as screen from 'screenfull';

@Component({name: 'Screenfull'})
export default class extends Vue {

  private isFullscreen: boolean = true;


  public mounted() {
    this.init()
  }
  public beforeDestroy() {
    this.destroy()
  }

    public click() {
      if (!screen.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screen.toggle()
    }
    public change() {
      this.isFullscreen = screen.isEnabled && screen.isFullscreen
    }
    public init() {
      if (screen.isEnabled) {
        screen.on('change', this.change)
      }
    }
    public destroy() {
      if (screen.isEnabled) {
        screen.off('change', this.change)
      }
    }

}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
