/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情
 * @TodoList: 无
 * @Date: 2020-03-13 19:09:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 19:11:56
 */

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import BreadcrumbNavbar from '@/components/BreadcrumbNavbar';
import styles from './index.module.scss';
import routes from './config';

const { TabPane } = Tabs;

export default memo(function AppDetail() {
  const { appInfo } = useParams();
  const { appName } = JSON.parse(decodeURIComponent(appInfo || '{}'));

  return (
    <div className={styles.appDetail}>
      <BreadcrumbNavbar mode={1} appName={appName} />
      <div className={styles.contentWrapper}>
        <Tabs defaultActiveKey="1" animated={true}>
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
