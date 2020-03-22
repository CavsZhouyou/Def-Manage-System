/*
 * @Author: zhouyou@werun
 * @Descriptions: request 和 response types 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 19:00:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-22 12:29:19
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
  userId: number;
}

// 修改密码请求参数格式
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

// 请求应用列表参数格式
export interface GetAppListParams {
  userId?: number;
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

// 新建应用请求参数格式
export interface CreateAppParams {
  appName: string;
  repository: string;
  description: string;
  productType: string;
  publishType: string;
}

// 新建应用返回数据格式
export interface CreateAppResponse {
  appId: number;
}

// 获取迭代列表请求参数格式
export interface GetIterationListParams {
  userId: number;
  appName?: string;
  creator?: string;
  iterationType: string[];
  page: number;
  pageSize: number;
}

// 请求迭代列表返回数据格式
export interface IterationInfo {
  iterationId: number;
  appId: number;
  appLogo: string;
  appName: string;
  iterationName: string;
  createTime: string;
  endTime: string;
  branch: string;
  creator: string;
  creatorAvatar: string;
  iterationStatus: string;
  latestPublish: string;
  latestPublishStatus: string;
}

export type GetIterationListResponse = ListResponse<IterationInfo>;
