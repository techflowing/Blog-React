import customConfig from './../../config/customConfig';

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
