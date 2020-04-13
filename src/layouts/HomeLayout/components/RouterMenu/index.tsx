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

const RouterMenu = React.memo(
  (props: Props): JSX.Element => {
    let { routes } = props;
    const selectedMenu = sessionStorage.getItem('selectedMenu') || '0';
    const defaultSelectedKeys = [selectedMenu];
    const userRole = sessionStorage.getItem('userRole');

    // 路由权限过滤
    routes = routes.filter(item => {
      if (!item.menu) return false;

      if (item.path === '/home/userList' && userRole !== '6002') return false;

      return true;
    });

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {routes.map((route: RouteType, key) => {
          return (
            <Menu.Item
              key={key}
              onClick={() => {
                sessionStorage.setItem('selectedMenu', key.toString());
              }}
            >
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
