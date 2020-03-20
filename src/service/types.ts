/*
 * @Author: zhouyou@werun
 * @Descriptions: request 和 response types 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 19:00:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 19:27:44
 */

// 基本返回数据格式
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 应用列表返回数据格式
export interface ListResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}

// get Token 返回数据格式
export interface TokenResponse {
  token: string;
}

// 登录请求参数格式
export interface LoginParams {
  account: string;
  password: string;
}

// 登录返回数据格式
export interface LoginResponse {
  userInfo: {
    userName: string;
    userId: number;
    avatar: string;
    token: string;
  };
}

// 退出登录请求参数格式
export interface LogoutParams {
  userId: string;
}

// 修改密码请求参数格式
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

// 请求应用列表参数格式
export interface GetAppListParams {
  userId?: string; // 含有 userId 则为我的应用
  appName?: string;
  publishType: string[];
  page: number;
  pageSize: number;
}

// 请求应用列表返回数据格式
export interface AppInfo {
  appId: number;
  appLogo: string;
  appName: string;
  publishType: string;
  iterationCount: number;
  description: string;
}
export type GetAppListResponse = ListResponse<AppInfo>;
