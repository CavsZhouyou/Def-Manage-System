/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情
 * @TodoList: 无
 * @Date: 2020-03-13 19:09:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 19:11:56
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, message } from 'antd';
import BreadcrumbNavbar from '@/components/BreadcrumbNavbar';
import styles from './index.module.scss';
import routes, { Route } from './config';
import { getAppMemberRoleRequest } from '@/service/apis';

const { TabPane } = Tabs;

export default memo(function AppDetail() {
  const { appInfo } = useParams();
  const { appName, appId } = JSON.parse(decodeURIComponent(appInfo || '{}'));
  const [appDetailRoutes, setAppDetailRoutes] = useState<Route[]>(routes);

  useEffect(() => {
    updateRoutes();
  }, []);

  // 根据权限过滤路由
  const updateRoutes = async () => {
    const userId = sessionStorage.getItem('userId') || '';
    const result = await getAppMemberRoleRequest({
      appId,
      userId
    });

    if (result.success) {
      const { memberRole } = result.data;
      sessionStorage.setItem('memberRole', memberRole);

      const filterRoutes = routes.filter(item => {
        // 未加入用户和一般成员，不展示设置路由
        if (item.key === '6' && (memberRole === '5003' || memberRole === '0'))
          return false;
        return true;
      });

      setAppDetailRoutes(filterRoutes);
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className={styles.appDetail}>
      <BreadcrumbNavbar mode={1} appName={appName} />
      <div className={styles.contentWrapper}>
        <Tabs defaultActiveKey="1" animated={true}>
          {appDetailRoutes.map(route => (
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
