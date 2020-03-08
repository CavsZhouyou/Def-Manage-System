// import { takeEvery } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { loginSuccess } from './actions';
import { LOGIN_REQUEST } from './types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function* loginAsync() {
  yield call(delay, 2000);
  yield put(loginSuccess('登陆成功！'));
}

export default function* loginSagas() {
  yield takeEvery(LOGIN_REQUEST, loginAsync);
}
