import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';

/**
 * 创建Wiki项目列表 POST /blog/v1/wiki/project/list
 */
export async function createWikiProject(info: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/project/add`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 删除 Wiki 项目
 */
export async function deleteWikiProject(info: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/project/delete`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}
