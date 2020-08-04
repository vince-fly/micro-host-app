<template>
  <span>
    <i v-if="icon.includes('el-icon')" :class="icon ? 'sub-el-icon' : ''" />
    <svg-icon v-else icon-class="icon" />
    <span v-if="title" slot="title">{{title}}</span>
  </span>
</template>
<script lang="tsx">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';

@Component({name: 'MenuItem'})
export default class extends Vue {

  // functional: true,
  @Prop({default:''}) public icon!: string;

  @Prop({default: ''}) public title!: string;
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
