/*
 * @Author: zhouyou@werun
 * @Descriptions: login sagas 文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:06:01
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 12:06:22
 */
import { put, call, takeEvery } from 'redux-saga/effects';
import { loginSuccess } from './actions';
import { LOGIN_REQUEST } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function* loginAsync(): Generator {
  yield call(delay, 2000);
  yield put(loginSuccess('登陆成功！'));
}

export default function* loginSagas(): Generator {
  yield takeEvery(LOGIN_REQUEST, loginAsync);
}
