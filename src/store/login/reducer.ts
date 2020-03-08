/*
 * @Author: zhouyou@werun
 * @Descriptions: login reducer 定义文件
 * @TodoList: 无
 * @Date: 2020-03-08 17:57:47
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-08 21:48:33
 */

import {
  LoginState,
  LoginActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from './types';

const initialState: LoginState = {
  username: '暂无',
  status: '未登录'
};

export default function loginReducer(
  state = initialState,
  action: LoginActionTypes
): LoginState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        status: '登陆中'
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
