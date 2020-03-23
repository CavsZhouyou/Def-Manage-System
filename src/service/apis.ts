/*
 * @Author: zhouyou@werun
 * @Descriptions: 接口 api 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 17:00:55
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 11:52:35
 */

import axios from './request';
import {
  TokenResponse,
  BaseResponse,
  LoginResponse,
  LoginParams,
  LogoutParams,
  ChangePasswordParams,
  GetAppListParams,
  GetAppListResponse,
  CreateAppParams,
  CreateAppResponse,
  GetIterationListParams,
  GetIterationListResponse,
  CreateIterationParams,
  CreateIterationResponse,
  GetMyAppListParams,
  GetMyAppListResponse,
  GetAppBranchesParams,
  GetAppBranchesResponse,
  GetUserListResponse,
  GetUserListParams
} from './types';

export function getToken(): Promise<BaseResponse<TokenResponse>> {
  return axios.get<TokenResponse>('/def/getToken');
}

/**
 * 登录请求
 */
export function loginRequest(
  params: LoginParams
): Promise<BaseResponse<LoginResponse>> {
  return axios.post<LoginResponse>('/def/login', { ...params });
}

/**
 * 退出登录请求
 */
export function logoutRequest(
  params: LogoutParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/logout', { ...params });
}

/**
 * 修改密码请求
 */
export function changePasswordRequest(
  params: ChangePasswordParams
): Promise<BaseResponse<void>> {
  return axios.post<void>('/def/changePassword', { ...params });
}

/**
 * 获取应用列表请求
 */
export function getAppListRequest(
  params: GetAppListParams
): Promise<BaseResponse<GetAppListResponse>> {
  return axios.post<GetAppListResponse>('/def/getAppList', { ...params });
}

/**
 * 创建应用请求
 */
export function createAppRequest(
  params: CreateAppParams
): Promise<BaseResponse<CreateAppResponse>> {
  return axios.post<CreateAppResponse>('/def/createApp', { ...params });
}

/**
 * 获取迭代列表请求
 */
export function getIterationListRequest(
  params: GetIterationListParams
): Promise<BaseResponse<GetIterationListResponse>> {
  return axios.post<GetIterationListResponse>('/def/getIterationList', {
    ...params
  });
}

/**
 * 创建迭代请求
 */
export function createIterationRequest(
  params: CreateIterationParams
): Promise<BaseResponse<CreateIterationResponse>> {
  return axios.post<CreateIterationResponse>('/def/createIteration', {
    ...params
  });
}

/**
 * 获取我的应用列表请求
 */
export function getMyAppListRequest(
  params: GetMyAppListParams
): Promise<BaseResponse<GetMyAppListResponse>> {
  return axios.post<GetMyAppListResponse>('/def/getMyAppList', {
    ...params
  });
}

/**
 * 获取应用分支列表请求
 */
export function getAppBranchesRequest(
  params: GetAppBranchesParams
): Promise<BaseResponse<GetAppBranchesResponse>> {
  return axios.post<GetAppBranchesResponse>('/def/getAppBranches', {
    ...params
  });
}

/**
 * 获取用户列表请求
 */
export function getUserListRequest(
  params: GetUserListParams
): Promise<BaseResponse<GetUserListResponse>> {
  return axios.post<GetUserListResponse>('/def/getUserList', {
    ...params
  });
}
