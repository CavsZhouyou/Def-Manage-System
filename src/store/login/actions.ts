/*
 * @Author: zhouyou@werun
 * @Descriptions: login 模块 actions creators 定义文件
 * @TodoList: 无
 * @Date: 2020-03-08 17:41:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-08 17:56:41
 */

import * as types from './types';

export function loginRequest(
  userInfo: types.UserInfo
): types.LoginRequestAction {
  return {
    type: types.LOGIN_REQUEST,
    payload: userInfo
  };
}
