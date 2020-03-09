/*
 * @Author: zhouyou@werun
 * @Descriptions: redux 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:07:03
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 12:16:37
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas';

// 日志记录
const logger = createLogger({
  collapsed: true //收缩
});

// 处理异步 action
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

// 配置 redux-devtools-extension
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(sagas);

export default store;
