/*
 * @Author: zhouyou@werun
 * @Descriptions: 路由定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:08:16
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-10 19:57:33
 */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from '@/layouts/HomeLayout';
import LoginLayout from '@/layouts/LoginLayout';
import SuspenseWrapper from '@/components/SuspenseWrapper';
import {
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  HistoryOutlined
} from '@ant-design/icons';

const WorkBench = lazy(() => import('@/pages/WorkBench'));
const ProjectList = lazy(() => import('@/pages/ProjectList'));
const IterationList = lazy(() => import('@/pages/IterationList'));

export default [
  {
    path: '/login',
    component: LoginLayout
  },
  {
    path: '/',
    component: HomeLayout,
    routes: [
      {
        name: '工作台',
        icon: (): JSX.Element => <DeploymentUnitOutlined />,
        path: '/workBench',
        exact: true,
        component: SuspenseWrapper(WorkBench)
      },
      {
        name: '项目管理',
        icon: (): JSX.Element => <AppstoreAddOutlined />,
        path: '/projectList',
        exact: true,
        component: SuspenseWrapper(ProjectList)
      },
      {
        name: '迭代管理',
        icon: (): JSX.Element => <HistoryOutlined />,
        path: '/IterationList',
        exact: true,
        component: SuspenseWrapper(IterationList)
      }
    ]
  }
];
