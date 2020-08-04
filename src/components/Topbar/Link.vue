<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate'

@Component({name: 'appLink'})
export default class extends Vue {
  @Prop() public to!: string;

 get isExternal() {
      return isExternal(this.to)
    }

  get type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }

    public linkProps(to: string) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to
      }
    }

}
</script>
