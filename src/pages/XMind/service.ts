import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { Xmind } from '@/pages/XMind/components/XMindMenu/xmind-typings';

/**
 * 获取目录 GET /blog/v1/xmind/tree
 */
export async function getXmindTree(options?: Record<string, any>) {
  return request<API.Response<Xmind[]>>(`/blog/v1/xmind/tree`, {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取内容 GET /blog/v1/xmind/content
 */
export async function getXmindContent(key: string, options?: Record<string, any>) {
  return request<API.Response<Xmind[]>>(`/blog/v1/xmind/content?key=${key}`, {
    method: 'GET',
    ...(options || {}),
  });
}
