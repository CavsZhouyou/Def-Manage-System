/*
 * @Author: zhouyou@werun
 * @Descriptions: login 类型定义文件
 * @TodoList: 无
 * @Date: 2020-03-08 17:37:49
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-08 21:46:06
 */

/**
 * state type 定义文件
 */

export interface UserInfo {
  username: string;
  password: string;
}

export interface LoginState {
  username: string;
  status: string;
}

/**
 * action type 定义文件
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: UserInfo;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export type LoginActionTypes = LoginRequestAction | LoginSuccessAction;
