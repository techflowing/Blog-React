import type { UserInfo } from '@/services/typings';
import { consoleLog } from '@/utils/common-util';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: UserInfo | undefined }) {
  const { currentUser } = initialState || {};
  consoleLog(initialState);
  consoleLog(currentUser);
  return {
    canAdmin: currentUser && currentUser.user.isAdmin,
  };
}
