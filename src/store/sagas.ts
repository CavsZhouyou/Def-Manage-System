/*
 * @Author: zhouyou@werun
 * @Descriptions: saga 合并文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:07:42
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 22:05:14
 */

import { fork, all } from 'redux-saga/effects';

import loginSagas from './login/sagas';

export default function* rootSaga(): Generator {
  yield all([fork(loginSagas)]);
}
