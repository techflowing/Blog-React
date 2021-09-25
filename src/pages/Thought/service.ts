import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { Thought } from '@/pages/Thought/thought-typing';

/**
 * 获取项目列表 GET /blog/v1/thought/list
 */
export async function getThoughtList(options?: { [key: string]: any }) {
  return request<API.Response<API.Page<Thought>>>(`/blog/v1/thought/list`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取tag POST /blog/v1/thought/tags
 */
export async function getThoughtTags(options?: { [key: string]: any }) {
  return request<API.Response<Record<string, number>>>(`/blog/v1/thought/tags`, {
    method: 'GET',
    ...(options || {}),
  });
}
