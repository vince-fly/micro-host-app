export default {
  menu: (state: any) => state.menu.menu,
  is_collapse: (state: any) => state.menu.is_collapse,
  msg: (state: any) => state.pager.msg,
  auth: (state: any) => state.auth,
  permission_routes: (state: any) => state.menu.routes,
  sidebar: (state: any) => state.app.sidebar,
  size: (state: any) => state.app.size,
  device: (state: any) => state.app.device,
};
