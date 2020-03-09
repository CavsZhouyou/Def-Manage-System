/*
 * @Author: zhouyou@werun
 * @Descriptions: 路由定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 12:08:16
 * @Last Modified by:   zhouyou@werun
 * @Last Modified time: 2020-03-09 12:08:16
 */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from '@/layouts/HomeLayout';
import LoginLayout from '@/layouts/LoginLayout';
import SuspenseWrapper from '@/components/SuspenseWrapper';

export default [
  {
    path: '/login',
    component: LoginLayout
  },
  {
    path: '/',
    component: SuspenseWrapper(HomeLayout)
  }
];
