/*
 * @Author: zhouyou@werun
 * @Descriptions: 路由定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:08:16
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-19 12:04:46
 */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import routes from './config';
import './index.scss';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'forward'
};

const Routes = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  console.log(location.pathname.split('/')[1]);

  return (
    <TransitionGroup
      className={'router-wrapper'}
      childFactory={child =>
        React.cloneElement(child, {
          classNames: ANIMATION_MAP[history.action]
        })
      }
    >
      <CSSTransition timeout={500} key={location.pathname.split('/')[1]}>
        {renderRoutes(routes, {}, { location })}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
