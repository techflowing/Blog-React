import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { WikiDocument } from '@/pages/wiki/WikiDocument/wiki-doc-typings';

/**
 * 获取Wiki项目树 GET /blog/v1/wiki/document/tree
 */
export async function getWikiDocumentTree(projectName: string, options?: { [key: string]: any }) {
  return request<API.Response<WikiDocument[]>>(
    `/blog/v1/wiki/document/tree?projectName=${projectName}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
