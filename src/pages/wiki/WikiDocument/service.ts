import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';

/**
 * 获取Wiki项目树 GET /blog/v1/wiki/document/tree
 */
export async function getWikiDocumentTree(projectKey: string, options?: { [key: string]: any }) {
  return request<API.Response<WikiDocument[]>>(
    `/blog/v1/wiki/document/tree?projectKey=${projectKey}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/**
 * 获取Wiki项目内容
 */
export async function getWikiDocumentContent(key: string, options?: { [key: string]: any }) {
  return request<API.Response<string>>(`/blog/v1/wiki/document/content?key=${key}`, {
    method: 'GET',
    ...(options || {}),
  });
}
