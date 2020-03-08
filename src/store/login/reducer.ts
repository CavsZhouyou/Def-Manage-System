/*
 * @Author: zhouyou@werun
 * @Descriptions: login reducer 定义文件
 * @TodoList: 无
 * @Date: 2020-03-08 17:57:47
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-08 18:05:29
 */

import { LoginState, LoginActionTypes, LOGIN_REQUEST } from './types';

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
    default:
      return state;
  }
}
