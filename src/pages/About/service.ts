import { request } from '@@/plugin-request/request';
import type { API } from '@/services/typings';
import type { VisitorStatisticModel } from '@/pages/About/about-typing';

/**
 * 获取页面访问统计
 */
export async function getVisitorStatistic(options?: { [key: string]: any }) {
  return request<API.Response<VisitorStatisticModel[]>>(`/blog/v1/statistic/visitor/count`, {
    method: 'GET',
    ...(options || {}),
  });
}
