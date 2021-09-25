import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { Thought, ThoughtBasic } from '@/pages/Thought/thought-typing';

/**
 * 新建 POST /blog/v1/admin/thought/create
 */
export async function createThought(info: ThoughtBasic, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/thought/create`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 更新 POST /blog/v1/admin/thought/update
 */
export async function updateThought(info: Thought, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/thought/update`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 删除项目列表 POST /blog/v1/admin/thought/update
 */
export async function deleteThought(key: string, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/thought/delete?hashKey=${key}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
