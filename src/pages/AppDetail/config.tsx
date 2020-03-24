/*
 * @Author: zhouyou@werun
 * @Descriptions: 顶部栏配置
 * @TodoList: 无
 * @Date: 2020-03-13 19:55:33
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 09:13:24
 */

import React, { lazy } from 'react';
import SuspenseWrapper from '@/components/SuspenseWrapper';
import {
  SwitcherFilled,
  GoldFilled,
  TeamOutlined,
  HddFilled,
  SecurityScanFilled,
  FileFilled,
  SettingFilled
} from '@ant-design/icons';

const Overview = lazy(() => import('./components/Overview'));
const AppIterationList = lazy(() => import('./components/AppIterationList'));
const MemberList = lazy(() => import('./components/MemberList'));
const PublishList = lazy(() => import('./components/PublishList'));
const CodeReviewList = lazy(() => import('./components/CodeReviewList'));
const PageList = lazy(() => import('./components/PageList'));
const AppSettings = lazy(() => import('./components/AppSettings'));

export default [
  {
    key: '1',
    name: '综合',
    icon: (): JSX.Element => <SwitcherFilled />,
    component: SuspenseWrapper(Overview)
  },
  {
    key: '2',
    name: '迭代',
    icon: (): JSX.Element => <GoldFilled />,
    component: SuspenseWrapper(AppIterationList)
  },
  {
    key: '3',
    name: '成员',
    icon: (): JSX.Element => <TeamOutlined />,
    component: SuspenseWrapper(MemberList)
  },
  {
    key: '4',
    name: '发布记录',
    icon: (): JSX.Element => <HddFilled />,
    component: SuspenseWrapper(PublishList)
  },
  {
    key: '5',
    name: '代码审阅记录',
    icon: (): JSX.Element => <SecurityScanFilled />,
    component: SuspenseWrapper(CodeReviewList)
  },
  {
    key: '6',
    name: '页面列表',
    icon: (): JSX.Element => <FileFilled />,
    component: SuspenseWrapper(PageList)
  },
  {
    key: '7',
    name: '设置',
    icon: (): JSX.Element => <SettingFilled />,
    component: SuspenseWrapper(AppSettings)
  }
];
