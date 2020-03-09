/*
 * @Author: zhouyou@werun
 * @Descriptions: login actions creators 定义文件
 * @TodoList: 无
 * @Date: 2020-03-08 17:41:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 19:25:49
 */

import {
  UserInfo,
  LoginRequestAction,
  LOGIN_REQUEST,
  LoginSuccessAction,
  LOGIN_SUCCESS
} from './types';

export function loginRequest(userInfo: UserInfo): LoginRequestAction {
  return {
    type: LOGIN_REQUEST,
    payload: userInfo
  };
}

export function loginSuccess(status: string): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: status
  };
}
