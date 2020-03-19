/*
 * @Author: zhouyou@werun
 * @Descriptions: 主页头部栏
 * @TodoList: 无
 * @Date: 2020-03-11 09:34:27
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-19 17:54:09
 */

import React, { memo, useState, useCallback, useMemo } from 'react';
import { Layout, Menu, Dropdown, Avatar, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import Icon from '@/components/IconFont';
import { logoutRequest } from '@/service/apis';
import ChangePasswordModal from '../ChangePasswordModal';
import styles from './index.module.scss';

const { confirm } = Modal;
const { Header } = Layout;

type Props = {
  collapsed: boolean;
  toggle: () => void;
};

const logout = () => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: '确定要退出吗？',
    onOk() {
      // 退出登录
      logoutRequest({
        userId: sessionStorage.getItem('userId') || ''
      });
      // 清除用户数据
      sessionStorage.clear();
      // 重定向到登录页面
      window.location.reload();
    }
  });
};

/**
 * trigger 组件，控制左侧菜单展示
 */
const CollapseTrigger = React.memo(({ collapsed, toggle }: Props) => {
  return React.createElement(
    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    {
      className: styles.trigger,
      onClick: toggle
    }
  );
});

export default memo(function CustomHeader({ collapsed, toggle }: Props) {
  const avatar = sessionStorage.getItem('avatar') || undefined;
  const userName = sessionStorage.getItem('userName') || undefined;
  const [cpModalVisible, setCpModalVisible] = useState(false);

  const hideCpModal = useCallback(() => {
    setCpModalVisible(false);
  }, []);

  const showCpModal = useCallback(() => {
    setCpModalVisible(true);
  }, []);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item onClick={showCpModal}>
          <Icon className={styles.menuIcon} type="icon-password" />
          修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logout}>
          <Icon className={styles.menuIcon} type="icon-logout" />
          退出登录
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <Header className={styles.header}>
      <CollapseTrigger collapsed={collapsed} toggle={toggle} />
      <div className={styles.userInfo}>
        <Avatar size={36} src={avatar} />
        <span className={styles.userName}>{userName}</span>
        <Dropdown overlay={menu}>
          <Icon className={styles.down} type="icon-down" />
        </Dropdown>
        <ChangePasswordModal visible={cpModalVisible} hideModal={hideCpModal} />
      </div>
    </Header>
  );
});
