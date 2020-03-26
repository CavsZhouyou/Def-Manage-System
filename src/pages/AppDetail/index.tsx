/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情
 * @TodoList: 无
 * @Date: 2020-03-13 19:09:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 20:10:55
 */

import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, Breadcrumb } from 'antd';
import styles from './index.module.scss';
import routes from './config';

const { TabPane } = Tabs;

const NavBar = (): JSX.Element => {
  const { appInfo } = useParams();
  let { appName } = JSON.parse(appInfo || '');
  appName = decodeURIComponent(appName);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/home/appList">应用列表</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{appName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default memo(function AppDetail() {
  return (
    <div className={styles.appDetail}>
      <NavBar />
      <div className={styles.contentWrapper}>
        <Tabs defaultActiveKey="6" animated={true}>
          {routes.map(route => (
            <TabPane
              tab={
                <span>
                  {route.icon()}
                  {route.name}
                </span>
              }
              key={route.key}
            >
              {route.component()}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
});
