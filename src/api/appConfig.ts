import request from './_request';

// 1获取菜单数据接口
export function getAppConfigApi(data: any = {}) {
  let query: string = '';

  // tslint:disable-next-line: forin
  for (const item in data) {
    query += `${item}=${data[item]}&`;
  }
  console.log(query);
  // return request({
  //   url: '/api/apps',
  //   method: 'get'
  // });
  return new Promise(resolve => {resolve({data: [
    {
      id: '1',
      title: 'hb-ui组件',
      icon: 'el-icon-monitor',
      module: 'hb-m1',
      defaultRegister: true,
      devEntry: '//localhost/hb1/',
      depEntry: '//localhost/hb1/',
      routerBase: '/host/hb1',
      children: [
        {
          id: '1-1',
          title: '表格',
          url: '/host/hb1'
        },
        {
          id: '1-2',
          title: '日历',
          url: '/host/hb1/about'
        }
      ]
    },
    {
      id: '2',
      title: 'hb-ui2',
      icon: 'el-icon-date',
      module: 'hb-m2',
      defaultRegister: false,
      devEntry: '//localhost:3002',
      depEntry: '//localhost:3002',
      routerBase: '/host/hb2',
      children: [
        {
          id: '2-1',
          title: '报表',
          url: '/host/hb2'
        },
        {
          id: '2-2',
          title: '穿梭框',
          url: '/host/hb2/about',
          children: [
            {
              id: '2-3',
              title: '日历',
              // url: '/host/hb2/calendar'
            }
          ]
        },
        {
          id: '2-3',
          title: '日历',
          url: '/host/hb2/calendar'
        }
      ]
    },
    {
      id: '3',
      title: 'DEMO',
      icon: 'el-icon-menu',
      module: 'hb-m3',
      defaultRegister: false,
      devEntry: '//localhost/hb3/',
      depEntry: '//localhost/hb3/',
      routerBase: '/host/hb3',
      children: [
        {
          id: '3-1',
          title: '首页',
          url: '/host/hb3'
        },
        {
          id: '3-2',
          title: '关于',
          url: '/host/hb3/about'
        },
        {
          id: '3-3',
          title: 'TODO',
          url: '/host/hb3/todo'
        }
      ]
    }
  ]})})
}
