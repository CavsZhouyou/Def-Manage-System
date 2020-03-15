/*
 * @Author: zhouyou@werun
 * @Descriptions: 顶部栏配置
 * @TodoList: 无
 * @Date: 2020-03-13 19:55:33
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 12:03:08
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

const WorkBench = lazy(() => import('@/pages/WorkBench'));
const Overview = lazy(() => import('./components/Overview'));
const AppIterationList = lazy(() => import('./components/AppIterationList'));
const MemberList = lazy(() => import('./components/MemberList'));

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
    component: SuspenseWrapper(WorkBench)
  },
  {
    key: '5',
    name: '代码审阅记录',
    icon: (): JSX.Element => <SecurityScanFilled />,
    component: SuspenseWrapper(WorkBench)
  },
  {
    key: '6',
    name: '页面列表',
    icon: (): JSX.Element => <FileFilled />,
    component: SuspenseWrapper(WorkBench)
  },
  {
    key: '7',
    name: '设置',
    icon: (): JSX.Element => <SettingFilled />,
    component: SuspenseWrapper(WorkBench)
  }
];
