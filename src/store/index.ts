import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas';

// 日志记录
const logger = createLogger({
  collapsed: true //收缩
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(sagas);

export default store;
