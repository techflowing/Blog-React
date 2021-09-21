import { request } from '@@/plugin-request/request';
import type { API, UserInfo } from '@/services/typings';
import type { ChangePwdParam } from '@/pages/admin/UserProfile/user-profile-typing';

/** 修改密码 POST /blog/v1/admin/user/change-pwd */
export async function changePwd(body: ChangePwdParam, options?: { [key: string]: any }) {
  return request<API.Response<UserInfo>>('/blog/v1/admin/user/change-pwd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
