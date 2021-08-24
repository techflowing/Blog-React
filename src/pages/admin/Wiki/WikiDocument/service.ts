import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { CreateDocumentBody } from '@/pages/admin/wiki/WikiDocument/document-typing';

/**
 * 创建Wiki 文档 POST /blog/v1/admin/wiki/document/create
 */
export async function createNewDocument(
  info: CreateDocumentBody,
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/document/create`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}
