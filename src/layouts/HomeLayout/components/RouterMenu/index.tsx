/*
 * @Author: zhouyou@werun
 * @Descriptions: 侧边栏路由菜单
 * @TodoList: 无
 * @Date: 2020-03-10 11:20:24
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 19:08:01
 */

import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

type RouteType = {
  menu: boolean;
  name: string;
  path: string;
  icon: () => {};
};

interface Props {
  routes: Array<RouteType>;
}

// 默认选中菜单
const DEFAULT_SELECTED_KEYS = ['0'];

const RouterMenu = React.memo(
  (props: Props): JSX.Element => {
    let { routes } = props;
    routes = routes.filter(item => item.menu);

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={DEFAULT_SELECTED_KEYS}
      >
        {routes.map((route: RouteType, key) => {
          return (
            <Menu.Item key={key}>
              {route.icon()}
              <NavLink to={route.path}>
                <span>{route.name}</span>
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
);

export default RouterMenu;
