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
 * 获取登录后缓存在本地的Token
 */
export const getAuthorizeToken = (): string => {
  const user = getUserFromLocalStorage();
  return user !== undefined && user !== null ? user.token : '';
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
        } else {
          // @ts-ignore
          consoleLog(`加载异常：${script.readyState}`);
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

/**
 * 动态加载JS，去重，同 Src，不做重复加载
 * @param srcArray 数据
 */
export const insertScriptWithNoRepeat = (srcArray: string[], serial: boolean = false) => {
  /**
   * 序列执行
   */
  const sequencePromise = async (array: Promise<any>[]) => {
    for (const p of array) {
      // eslint-disable-next-line no-await-in-loop
      await p;
    }
  };

  return new Promise((resolve) => {
    const current = document.getElementsByTagName('script');
    const set = new Set<string>();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < current.length; i++) {
      const src = current[i].getAttribute('src');
      if (src !== null) {
        set.add(src);
      }
    }
    if (set.size === 0) {
      resolve(true);
      return;
    }
    // 最终要动态插入的Script 地址
    const final = new Array<Promise<any>>();
    srcArray.forEach((value) => {
      if (!set.has(value)) {
        final.push(insertScript(value));
      }
    });
    if (serial) {
      // @ts-ignore
      sequencePromise(final).then(() => resolve(true));
    } else {
      Promise.all(final).then(() => {
        resolve(true);
      });
    }
  });
};

/**
 * base64转换为图片blob
 */
export const dataURLtoBlob = (dataurl: any) => {
  const arr = dataurl.split(',');
  // 注意base64的最后面中括号和引号是不转译的
  // eslint-disable-next-line no-underscore-dangle
  const _arr = arr[1].substring(0, arr[1].length - 2);
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(_arr);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
};
