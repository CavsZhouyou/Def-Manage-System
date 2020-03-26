/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用设置配置
 * @TodoList: 无
 * @Date: 2020-03-16 09:16:30
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:36:36
 */

import { lazy } from 'react';
import SuspenseWrapper from '@/components/SuspenseWrapper';

const BasicSetting = lazy(() => import('../BasicSetting'));
const CodeCheckSetting = lazy(() => import('../CodeCheckSetting'));
const CodeReviewSetting = lazy(() => import('../CodeReviewSetting'));

export default [
  {
    key: '1',
    name: '基本设置',
    component: SuspenseWrapper(BasicSetting)
  },
  {
    key: '2',
    name: '代码审阅设置',
    component: SuspenseWrapper(CodeReviewSetting)
  }
  // {
  //   key: '2',
  //   name: '代码检查设置',
  //   component: SuspenseWrapper(CodeCheckSetting)
  // }
];
