/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用设置页面
 * @TodoList: 无
 * @Date: 2020-03-16 09:08:16
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:49:46
 */

import React, { memo } from 'react';
import { Tabs } from 'antd';
import Title from '@/components/Title';
import routes from './config';
import styles from './index.module.scss';

const { TabPane } = Tabs;

export default memo(function AppSettings() {
  return (
    <div className={styles.appSettings}>
      <div className={styles.header}>
        <Title title="应用设置" />
      </div>
      <div className={styles.content}>
        <Tabs defaultActiveKey="1" animated={true}>
          {routes.map(route => (
            <TabPane tab={route.name} key={route.key}>
              {route.component()}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
});
