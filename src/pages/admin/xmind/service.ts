import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type {
  CreateXMindBody,
  DeleteXMindBody,
  DragXMindBody,
  RenameXMindBody,
  UpdateXMindBody,
} from '@/pages/admin/xmind/xmind-typings';

/**
 * 新建文档 POST /blog/v1/admin/xmind/create
 */
export async function createXMind(info: CreateXMindBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/create`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 重命名 POST /blog/v1/admin/xmind/rename
 */
export async function renameXMind(info: RenameXMindBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/rename`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 删除 POST /blog/v1/admin/xmind/delete
 */
export async function deleteXMind(info: DeleteXMindBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/delete`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 删除 POST /blog/v1/admin/xmind/delete
 */
export async function updateXMind(info: UpdateXMindBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/update`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 导出XMind POST /blog/v1/admin/xmind/export-xmind
 */
export async function exportXMind(info: any, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/export-xmind`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}

/**
 * 拖动排序XMind POST /blog/v1/admin/xmind/drag
 */
export async function dragXMind(info: DragXMindBody, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/admin/xmind/drag`, {
    method: 'POST',
    data: info,
    ...(options || {}),
  });
}
