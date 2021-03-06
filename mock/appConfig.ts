
const appConfig = [
  {
    id: '1',
    title: 'hb-ui组件',
    icon: 'el-icon-monitor',
    module: 'subapp-ui',
    defaultRegister: true,
    devEntry: '//localhost:3001',
    depEntry: 'http://ui.mfe.hbui.com.cn/',
    routerBase: '/ui',
    children: [
      {
        id: '1-1',
        title: '表格',
        url: '/ui'
      },
      {
        id: '1-2',
        title: '日历',
        url: '/ui/about'
      }
    ]
  },
  {
    id: '2',
    title: '博客',
    icon: 'el-icon-date',
    module: 'subapp-blog',
    defaultRegister: false,
    devEntry: '//localhost:3002',
    depEntry: 'http://blog.mfe.hbui.com.cn',
    routerBase: '/blog',
    children: [
      {
        id: '2-1',
        title: '报表',
        url: '/blog'
      },
      {
        id: '2-2',
        title: '穿梭框',
        url: '/blog/about'
      }
    ]
  }
]

export default [
  {
    url: '/Api/GetAppConfigs',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: appConfig
      }
    }
  },
]
