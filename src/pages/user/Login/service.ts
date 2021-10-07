import { request } from '@@/plugin-request/request';
import type { LoginParams } from '@/pages/user/Login/login-typings';
import type { API, UserInfo } from '@/services/typings';

/** 登录接口 POST /blog/v1/user/login */
export async function login(body: LoginParams, options?: { [key: string]: any }) {
  return request<API.Response<UserInfo>>('/blog/v1/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 刷新Token GET /blog/v1/admin/user/refresh-token */
export async function refreshToken(token: string, options?: { [key: string]: any }) {
  return request<API.Response<string>>('/blog/v1/admin/user/refresh-token', {
    method: 'GET',
    ...(options || {}),
  });
}
