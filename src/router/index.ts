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
