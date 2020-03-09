/*
 * @Author: zhouyou@werun
 * @Descriptions: reducer 合并文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:07:23
 * @Last Modified by:   zhouyou@werun
 * @Last Modified time: 2020-03-09 12:07:23
 */
import { combineReducers } from 'redux';
import loginReducer from './login/reducer';

const rootReducer = combineReducers({
  loginReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
