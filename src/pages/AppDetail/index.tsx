/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情
 * @TodoList: 无
 * @Date: 2020-03-13 19:09:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 20:24:36
 */

import React, { memo } from 'react';
import { Tabs } from 'antd';
import styles from './index.module.scss';
import routes from './config';

const { TabPane } = Tabs;

export default memo(function AppDetail() {
  return (
    <div className={styles.appDetail}>
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
  );
});
