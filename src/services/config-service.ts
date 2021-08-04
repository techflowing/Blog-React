import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';

/** 读取配置 POST /blog/v1/config/get */
export async function readConfig(name: string, options?: { [key: string]: any }) {
  return request<API.Response<any>>(`/blog/v1/config/get?name=${name}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新配置 POST /blog/v1/admin/config/set */
export async function writeConfig(
  name: string,
  content: any,
  desc?: string,
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>(`/blog/v1/admin/config/set?name=${name}&desc=${desc}`, {
    method: 'POST',
    data: content,
    ...(options || {}),
  });
}
