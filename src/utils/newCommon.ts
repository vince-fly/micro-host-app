import { IRawMenu, IMenuItem } from '@/types/IMenu';
//   改变数据结构
export function changeMenuStructure(data: IRawMenu[]): IMenuItem[] {
  const changeData: IMenuItem[] = [];
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < data.length; i++) {
    let menuItem: IMenuItem;
    data[i].smu_name_cn = data[i].smu_name_cn!.replace(/\([^\)]+\)/g, '');
    if (data[i].subMenus.length === 0) {
      menuItem = {
        path: '/' + data[i].smu_path,
        component: 'Layout',
        children: [],
      };
    } else {
      menuItem = {
        path: '/' + data[i].smu_path,
        redirect: 'noRedirect',
        component: 'Layout',
        meta: {
          title: data[i].smu_name_cn!,
          icon: 'el-icon-s-help',
          roles: ['admin', 'editor'],
        },
        children: [],
      };
    }

    if (data[i].subMenus && data[i].subMenus.length) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < data[i].subMenus.length; j++) {
        const menuItemJ: IMenuItem = {
          name: data[i].subMenus[j].smu_path!,
          path: data[i].subMenus[j].smu_path!,
          // redirect: 'noRedirect',
          component:
            '/' + data[i].smu_path + '/' + data[i].subMenus[j].smu_path,
          meta: {
            title: data[i].subMenus[j].smu_name_cn!,
            icon: 'el-icon-s-help',
            roles: ['admin', 'editor'],
            noCache: true,
          },
          children: [],
        };
        if (
          data[i].subMenus[j].subMenus &&
          data[i].subMenus[j].subMenus.length
        ) {
          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < data[i].subMenus[j].subMenus.length; k++) {
            menuItemJ.children!.push({
              name: data[i].subMenus[j].subMenus[k].smu_path!,
              path: data[i].subMenus[j].subMenus[k].smu_path!,
              component:
                '/' +
                data[i].smu_path +
                '/' +
                data[i].subMenus[j].smu_path +
                '/' +
                data[i].subMenus[j].subMenus[k].smu_path,
              meta: {
                title: data[i].subMenus[j].subMenus[k].smu_name_cn!,
                icon: 'el-icon-s-help',
                roles: ['admin', 'editor'],
                noCache: true,
              },
              children: [],
            });
          }
        }

        menuItem.children?.push(menuItemJ);
      }
    } else {
      menuItem.children?.push({
        name: data[i].smu_name_cn!,
        path: 'index',
        component: '/' + data[i].smu_path,
        meta: {
          title: data[i].smu_name_cn!,
          icon: 'el-icon-s-help',
          roles: ['admin', 'editor'],
        },
      });
    }

    changeData.push(menuItem);
  }
  return changeData;
}
// 字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
export const changeCase = (str: string, type: number): string => {
  type = type || 4;
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    case 2:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    case 3:
      return str
        .split('')
        .map(function(word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          } else {
            return word.toLowerCase();
          }
        })
        .join('');
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
};
// 去除空格,type: 1-所有空格 2-前后空格 3-前空格 4-后空格
export const trim = (str: string, type: number): string => {
  type = type || 1;
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
};
// 判断是否是中文
export function isChn(str: string): boolean {
  const reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(str)) {
    alert('不全是中文');
    return false;
  } else {
    alert('全是中文');
    return true;
  }
}
