/*
 * @Author: zhouyou@werun
 * @Descriptions: 接口 api 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 17:00:55
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 19:04:50
 */

import axios from './request';
import {
  TokenResponse,
  BaseResponse,
  LoginResponse,
  LoginParams
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
  return axios.post<LoginResponse>('/def/login', { params });
}
