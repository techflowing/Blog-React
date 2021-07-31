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
