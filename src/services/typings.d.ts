declare namespace API {
  /**
   * API 返回数据定义
   */
  type Response<T> = {
    code: number;
    message: string;
    data: T;
  };

  /**
   * 分页数据定义
   */
  type Page<T> = {
    page: number;
    size: number;
    total: number;
    content: T[];
  };
}

/**
 * 用户信息
 */
export type UserInfo = {
  user: {
    username: string;
    mobile: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    roleDesc: string;
  };
  token: string;
};
