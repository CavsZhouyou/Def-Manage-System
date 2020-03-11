/*
 * @Author: zhouyou@werun
 * @Descriptions: 主页头部栏
 * @TodoList: 无
 * @Date: 2020-03-11 09:34:27
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-11 16:47:16
 */

import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Icon from '@/components/IconFont';
import styles from './index.module.scss';

const { Header } = Layout;

type Props = {
  collapsed: boolean;
  toggle: () => void;
};

// trigger 组件
const CollapseTrigger = React.memo(({ collapsed, toggle }: Props) => {
  return React.createElement(
    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    {
      className: styles.trigger,
      onClick: toggle
    }
  );
});

const menu = (
  <Menu>
    <Menu.Item>
      <Icon className={styles.menuIcon} type="icon-password" />
      修改密码
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Icon className={styles.menuIcon} type="icon-logout" />
      登出
    </Menu.Item>
  </Menu>
);

const CustomHeader = React.memo(
  ({ collapsed, toggle }: Props): JSX.Element => {
    const avatar =
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar';
    return (
      <Header className={styles.header}>
        <CollapseTrigger
          collapsed={collapsed}
          toggle={toggle}
        ></CollapseTrigger>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src={avatar} alt="用户头像" />
          <Dropdown overlay={menu}>
            <Icon className={styles.down} type="icon-down" />
          </Dropdown>
        </div>
      </Header>
    );
  }
);

export default CustomHeader;
