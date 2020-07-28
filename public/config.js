(function(obj){
  const data = {
    "Auth": {
      "API_HOST": "https://api.hb56saas.com",
      "APPLICATION_ID": "419157391758721024",
      "PASSPORT_HOST": "https://passport.hb56saas.com/oauth",
      "DOMAIN_NAME": "http://localhost:8080",
      "SITE_PATH": "",
      "SERVICE_ID": "419183804306042880"
    },
    "Apps": [
      {
        "id": "1",
        "title": "hb-ui组件",
        "icon": "el-icon-monitor",
        "module": "hb-m1",
        "defaultRegister": true,
        "devEntry": "//localhost/hb1/",
        "depEntry": "//localhost/hb1/",
        "routerBase": "/hb1",
        "children": [
          {
            "id": "1-1",
            "title": "表格",
            "url": "/hb1"
          },
          {
            "id": "1-2",
            "title": "日历",
            "url": "/hb1/about"
          }
        ]
      },
      {
        "id": "3",
        "title": "DEMO",
        "icon": "el-icon-menu",
        "module": "hb-m3",
        "defaultRegister": false,
        "devEntry": "//localhost:3003",
        "depEntry": "//localhost/hb3/",
        "routerBase": "#/hb3",
        "children": [
          {
            "id": "3-1",
            "title": "首页",
            "url": "#/hb3"
          },
          {
            "id": "3-2",
            "title": "关于",
            "url": "#/hb3/about"
          },
          {
            "id": "3-3",
            "title": "TODO",
            "url": "#/hb3/todo"
          }
        ]
      }
    ],
    "hb1": {
      "API_HOST": "https://api.hb56saas.com"
    },
    "hb2": {
      "API_HOST": "https://api.hb56saas.com"
    }
  }


  obj.__HBBASE_SETTINGS__ = data;
}(window))