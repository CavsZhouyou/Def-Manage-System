/*
 * @Author: zhouyou@werun
 * @Descriptions: router 配置文件
 * @TodoList: 无
 * @Date: 2020-03-19 12:01:39
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 14:53:26
 */

import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from '@/layouts/HomeLayout';
import LoginLayout from '@/layouts/LoginLayout';
import SuspenseWrapper from '@/components/SuspenseWrapper';
import {
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  HistoryOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons';

const WorkBench = lazy(() => import('@/pages/WorkBench'));
const AppList = lazy(() => import('@/pages/AppList'));
const IterationList = lazy(() => import('@/pages/IterationList'));
const AppDetail = lazy(() => import('@/pages/AppDetail'));
const IterationDetail = lazy(() => import('@/pages/IterationDetail'));
const PublishDetail = lazy(() => import('@/pages/PublishDetail'));
const MessageList = lazy(() => import('@/pages/MessageList'));
const UserList = lazy(() => import('@/pages/UserList'));

/**
 * 登录权限验证
 */
const requireAuth = (Layout: React.ComponentType, props: any) => {
  if (sessionStorage.getItem('token')) {
    return <Layout {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default [
  {
    path: '/login',
    component: LoginLayout
  },
  {
    path: '/home',
    component: HomeLayout,
    routes: [
      {
        name: '工作台',
        icon: (): JSX.Element => <DeploymentUnitOutlined />,
        menu: true,
        path: '/home/workBench',
        exact: true,
        component: SuspenseWrapper(WorkBench)
      },
      {
        name: '应用管理',
        icon: (): JSX.Element => <AppstoreAddOutlined />,
        menu: true,
        path: '/home/appList',
        exact: true,
        component: SuspenseWrapper(AppList)
      },
      {
        name: '迭代管理',
        icon: (): JSX.Element => <HistoryOutlined />,
        menu: true,
        path: '/home/iterationList',
        exact: true,
        component: SuspenseWrapper(IterationList)
      },
      {
        name: '人员管理',
        icon: (): JSX.Element => <UserOutlined />,
        menu: true,
        path: '/home/userList',
        exact: true,
        component: SuspenseWrapper(UserList)
      },
      // {
      //   name: '消息管理',
      //   icon: (): JSX.Element => <BellOutlined />,
      //   menu: true,
      //   path: '/home/messageList',
      //   exact: true,
      //   component: SuspenseWrapper(MessageList)
      // },
      {
        menu: false,
        path: '/home/appDetail/:appInfo',
        exact: true,
        component: SuspenseWrapper(AppDetail)
      },
      {
        menu: false,
        path: '/home/iterationDetail/:iterationInfo',
        exact: true,
        component: SuspenseWrapper(IterationDetail)
      },
      {
        menu: false,
        path: '/home/publishDetail/:publishInfo',
        exact: true,
        component: SuspenseWrapper(PublishDetail)
      }
    ]
  }
];
