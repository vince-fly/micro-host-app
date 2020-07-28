/**
 * 路由监听
 * @param {String} routerPrefix 路由前缀
 */

function genActiveRule(routerPrefix: string) {
  if (routerPrefix.indexOf('#') === 0) {
    return (location: Location) => location.hash.startsWith(routerPrefix);
  }
  return (location: Location) => location.pathname.startsWith(routerPrefix) || routerPrefix.startsWith(location.path);
}

export {
  genActiveRule, // 路由监听
}
