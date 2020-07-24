/**
 * 路由监听
 * @param {String} routerPrefix 路由前缀
 */

function genActiveRule(routerPrefix: string) {
  return (location: any) => location.pathname.startsWith(routerPrefix);
}

export {
  genActiveRule, // 路由监听
}
