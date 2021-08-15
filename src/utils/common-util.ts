import customConfig from './../../config/customConfig';
import type { UserInfo } from '@/services/typings';

const storage_key_user = 'site_user_info';

/**
 * 存储用户信息到本地
 */
export const saveUserInfoToLocalStorage = (user: UserInfo) => {
  window.localStorage.setItem(storage_key_user, JSON.stringify(user));
};

/**
 * 从本地读取用户信息
 */
export const getUserFromLocalStorage = (): UserInfo => {
  const user = window.localStorage.getItem(storage_key_user);
  return user !== null ? JSON.parse(user) : undefined;
};

/**
 * 清除用户信息
 */
export const clearUserInfo = () => {
  window.localStorage.removeItem(storage_key_user);
};

/**
 * 是否是生产环境
 */
export const isProdEnv = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * 获取网络请求BaseUrl
 */
export const getBaseUrl = (): string => {
  return isProdEnv() ? customConfig.baseUrl : customConfig.devBaseUrl;
};

/**
 * 判断一个文本是否是JSON数据
 */
export const isJsonString = (content: string): boolean => {
  try {
    return typeof JSON.parse(content) === 'object';
  } catch (e) {
    return false;
  }
};

/**
 * 输入log
 * @param msg 信息
 */
export const consoleLog = (msg: any) => {
  if (isProdEnv()) {
    return;
  }
  console.log(JSON.stringify(msg));
};

/**
 * 动态插入 Script 标签
 * @param src
 * @param async
 */
export const insertScript = (src: string, async: boolean = false) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.async = async;
    script.src = src;
    // @ts-ignore
    if (script.readyState) {
      // IE
      // @ts-ignore
      script.onreadystatechange = () => {
        // @ts-ignore
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          // @ts-ignore
          script.onreadystatechange = null;
          resolve(true);
        }
      };
    } else {
      // 其他浏览器
      script.onload = () => {
        resolve(true);
      };
    }
    document.body.appendChild(script);
  });
};
