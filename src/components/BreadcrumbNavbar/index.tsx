/*
 * @Author: zhouyou@werun
 * @Descriptions: 顶部导航栏组件
 * @TodoList: 无
 * @Date: 2020-03-27 17:51:48
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 19:11:31
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

interface Props {
  mode: number;
  appId?: number;
  appName?: string;
  iterationId?: number;
  iterationName?: string;
}

export default memo(function BreadcrumbNavbar(props: Props) {
  const { mode, appId, appName, iterationId, iterationName } = props;
  const AppName = <Breadcrumb.Item>{appName}</Breadcrumb.Item>;
  const AppNameWithLink = (
    <Breadcrumb.Item>
      <Link
        to={`/home/appDetail/${encodeURIComponent(
          JSON.stringify({
            appId,
            appName
          })
        )}`}
      >
        {appName}
      </Link>
    </Breadcrumb.Item>
  );
  const IterationName = <Breadcrumb.Item>{iterationName}</Breadcrumb.Item>;
  const IterationNameWithLink = (
    <Breadcrumb.Item>
      <Link
        to={`/home/iterationDetail/${encodeURIComponent(
          JSON.stringify({
            appId,
            appName,
            iterationId,
            iterationName
          })
        )}`}
      >
        {iterationName}
      </Link>
    </Breadcrumb.Item>
  );

  switch (mode) {
    case 1:
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/appList">应用列表</Link>
          </Breadcrumb.Item>
          {AppName}
        </Breadcrumb>
      );
    case 2:
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/appList">应用列表</Link>
          </Breadcrumb.Item>
          {AppNameWithLink}
          <Breadcrumb.Item>迭代</Breadcrumb.Item>
          {IterationName}
        </Breadcrumb>
      );
    case 3:
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/appList">应用列表</Link>
          </Breadcrumb.Item>
          {AppNameWithLink}
          <Breadcrumb.Item>迭代</Breadcrumb.Item>
          {IterationNameWithLink}
          <Breadcrumb.Item>发布</Breadcrumb.Item>
        </Breadcrumb>
      );
    default:
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home/appList">应用列表</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      );
  }
});
