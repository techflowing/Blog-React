import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { WikiProject } from '@/pages/wiki/WikiProject/wiki-typings';

/**
 * 获取Wiki项目列表 POST /blog/v1/wiki/project/list
 */
export async function getWikiProjectList(options?: { [key: string]: any }) {
  return request<API.Response<WikiProject[]>>(`/blog/v1/wiki/project/list`, {
    method: 'GET',
    ...(options || {}),
  });
}
