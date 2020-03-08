import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

// 日志记录
const logger = createLogger({
  collapsed: true //收缩
});

const middleware = [logger];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
