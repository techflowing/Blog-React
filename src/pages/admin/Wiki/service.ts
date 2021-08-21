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
