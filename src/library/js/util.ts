/**
 * 跨应用路由跳转
 * @param {String} href url地址
 * @param {Object} stateObj 状态参数 可以通过history.state读取
 * @param {String} title 标题 暂时没有用
 */
const HOSTPATH = window.__HBHOST_BASE_URL__ || '';
function routerGo(href: string = '/', title: string , stateObj = {}) {
  // window.history.pushState(stateObj, title, `${HOSTPATH}${href}`);
  window.history.pushState(stateObj, title, href);
}

export {
  routerGo // 跨应用路由跳转
}
