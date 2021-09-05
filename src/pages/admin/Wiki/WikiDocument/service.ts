import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type {
  CreateDocumentBody,
  DeleteDocumentBody,
  DragDocumentBody,
} from '@/pages/admin/wiki/WikiDocument/document-typing';
import type { RenameDocumentBody } from '@/pages/admin/wiki/WikiDocument/document-typing';
import type { UpdateDocumentBody } from '@/pages/admin/wiki/WikiDocument/document-typing';

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

/**
 * 重命名Wiki 文档 POST /blog/v1/admin/wiki/document/rename
 */
export async function renameDocument(info: RenameDocumentBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/document/rename`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 删除Wiki 文档 POST /blog/v1/admin/wiki/document/delete
 */
export async function deleteDocument(info: DeleteDocumentBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/document/delete`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 移动Wiki 文档 POST /blog/v1/admin/wiki/document/drag
 */
export async function dragDocument(info: DragDocumentBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/document/drag`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 更新Wiki 文档 POST /blog/v1/admin/wiki/document/update
 */
export async function updateDocument(info: UpdateDocumentBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/wiki/document/update`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}
