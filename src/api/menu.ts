import request from './request';
import { IRawMenu } from '@/types/IMenu';
// 获取全部菜单（树状结构）
export async function getMenus(id: number | string): Promise<any> {
  return request({
    url: '/menuTree',
    method: 'get',
    params: {
      userId: id
    }
  });
}

// 添加或者编辑菜单
export function addObj(obj: any) {
  return request({
    url: '/menu',
    method: 'post',
    data: obj,
  });
}
// 根据主键获取菜单;
export function getObj(id: string | number) {
  return request({
    url: '/menu/' + id,
    method: 'get',
  });
}
// 删除菜单
export function delObj(id: string | number) {
  return request({
    url: '/menu/' + id,
    method: 'delete',
  });
}
