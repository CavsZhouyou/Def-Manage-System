/*
 * @Author: zhouyou@werun
 * @Descriptions: 接口 api 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 17:00:55
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-22 12:31:52
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
  CreateAppResponse
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
