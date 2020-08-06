<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :unique-opened="true"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { mapGetters } from 'vuex';
// import Logo from './Logo';
import SidebarItem from './SidebarItem.vue';
import variables from '../../style/variables.scss';

@Component({ components: { SidebarItem } })
export default class extends Vue {

  get activeMenu() {
    const route = this.$route;
    // debugger
    // console.log(route);
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }

  get variables() {
    return variables;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }
  @Getter('sidebar') private sidebar: any;

  @Getter('permission_routes') private permission_routes: any;
  // private permission_routes = [

  // ];

  public created() {
    this.undateLeftMenu();
  }

  // public mounted() {
  //   console.log(this.permission_routes);
  // }

  public async undateLeftMenu() {
    // const roles = ['admin', 'editor'];
    // const accessRoutes = await this.$store.dispatch(
    //   'permission/generateRoutes',
    //   roles
    // );
    // this.$router.addRoutes(accessRoutes);
  }

};
</script>
