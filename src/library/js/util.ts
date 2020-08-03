/**
 * 跨应用路由跳转
 * @param {String} href url地址
 * @param {Object} stateObj 状态参数 可以通过history.state读取
 * @param {String} title 标题 暂时没有用
 */
// const HOSTPATH = window.__HBHOST_BASE_URL__ || '';
function routerGo(href: string = '/', title: string, stateObj = {}) {
  // window.history.pushState(stateObj, title, `${HOSTPATH}${href}`);
  const { SITE_PATH } = window.__HBBASE_SETTINGS__.Auth;
  if (href.startsWith('#')) {
    history.pushState(stateObj, title, SITE_PATH ? SITE_PATH : '/');
    location.hash = href;
    return ;
  }
  window.history.pushState(stateObj, title, href);
}

function getHashValue(key: string): string | null {
  const matches = location.hash.match(new RegExp(key + '=([^&]*)'));
  return matches ? matches[1] : null ;
}

function getTokenFromCookie() {
  // cookie.getItem('')
  let arr;
  const reg = new RegExp('(^| )HBTOKEN=([^;]*)(;|$)'); // 匹配字段
  arr = document.cookie.match(reg);
  if (arr && arr[2].trim().length > 0) {
    return { token: decodeURIComponent(arr[2]), exp: 0 };
  } else {
    return null ;
  }
}

function getAuthUrl(): string {
  const { Auth } = window.__HBBASE_SETTINGS__;
  // // $DOMAIN_OAUTH_PATH?client_id=$APPLICATION_ID&response_type=token&state=程序生成的36位的数字字符串&redirect_uri=$DOMAIN_NAME + $SITE_PATH? + 网站预定义的回调处理入口
  // https://passport.hb56saas.com/oauth
  return `${Auth.PASSPORT_HOST}?client_id=${
    Auth.APPLICATION_ID
  }&response_type=token&state=ee604f1f-eb5c-4165-a3e0-a9f0fb774dc1&redirect_uri=${encodeURIComponent(
    Auth.DOMAIN_NAME
  )}`;
}

export {
  routerGo, // 跨应用路由跳转
  getHashValue,
  getTokenFromCookie,
  getAuthUrl,
};
