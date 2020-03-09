/*
 * @Author: zhouyou@werun
 * @Descriptions: login sagas 文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:06:01
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 19:29:04
 */
import { put, call, takeEvery } from 'redux-saga/effects';
import { loginSuccess } from './actions';
import { LOGIN_REQUEST } from './types';
import { getToken } from '@/service/apis';
import { BaseResponse, TokenResponse } from '@/service/types';

function* loginAsync() {
  try {
    const result: BaseResponse<TokenResponse> = yield call(getToken);
    yield put(loginSuccess(result.data.token));
  } catch (error) {
  } finally {
  }
}

export default function* loginSagas(): Generator {
  yield takeEvery(LOGIN_REQUEST, loginAsync);
}
