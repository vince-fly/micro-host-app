<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts">
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';

@Component({name: 'ThemePicker'})
export default class extends Vue {
  get chalk() {
    return this._chalk;
  }
  set chalk(v: boolean) {
    this._chalk = v;
  }
  get defaultTheme() {
      return this.$store.state.settings.theme
    }
  private _chalk: boolean = false;
  private theme: string = ORIGINAL_THEME;


    public updateStyle(style: any, oldCluster: any, newCluster: any) {
      let newStyle = style
      oldCluster.forEach((color: string, index: number) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    }

    public getCSSString(url: string, variable: string) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        const that: any = this;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            that[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    }

    public getThemeCluster(theme: string) {
      const tintColor = (color: string, tint: number) => {
        let red: number | string = parseInt(color.slice(0, 2), 16);
        let green: number | string = parseInt(color.slice(2, 4), 16);
        let blue: number | string = parseInt(color.slice(4, 6), 16);

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color: string, shade: number) => {
        let red: number | string = parseInt(color.slice(0, 2), 16)
        let green: number | string = parseInt(color.slice(2, 4), 16)
        let blue: number | string = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }


  @Watch('defaultTheme', {immediate: true})
  private async onDefaultThemeChange(val: string) {
    console.log(val);
    this._theme = val;
    const oldVal = this._chalk? this._theme : ORIGINAL_THEME;
    // if (typeof val === 'string') {
    //   return;
    // }
    const themeCluster = this.getThemeCluster(val.replace('#', ''));
    const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
    const $message = this.$message({
        message: '  Compiling the theme',
        customClass: 'theme-message',
        type: 'success',
        duration: 0,
        iconClass: 'el-icon-loading'
      });

    const getHandler = (variable: string, id: string) => {
        const that: any = this;
        return () => {
          const _originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''));
          if (!that[variable]) {
            return;
          }
          const newStyle = this.updateStyle(that[variable], _originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

    if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        await this.getCSSString(url, 'chalk')
      }

    const chalkHandler = getHandler('chalk', 'chalk-style')

    chalkHandler()

    const styles: HTMLStyleElement[] = [].slice.call(document.querySelectorAll('style'))
        .filter((style: HTMLStyleElement) => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
    styles.forEach((style: HTMLStyleElement) => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })

    this.$emit('change', val)

    $message.close()
  }

}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
