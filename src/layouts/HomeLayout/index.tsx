/*
 * @Author: zhouyou@werun
 * @Descriptions: 主页 layout
 * @TodoList: 无
 * @Date: 2020-03-10 10:20:58
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-11 21:17:08
 */
import React, { useState, useCallback } from 'react';
import { Layout } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import { renderRoutes } from 'react-router-config';
import RouterMenu from './components/RouterMenu';
import CustomHeader from './components/Header';
import styles from './index.module.scss';

const { Sider, Content, Footer } = Layout;

const HomeLayout = React.memo(
  (props: any): JSX.Element => {
    const [collapsed, updateCollapsed] = useState<boolean>(true);
    const { route } = props;

    const toggle = useCallback((): void => {
      updateCollapsed(prevState => {
        return !prevState;
      });
    }, []);

    return (
      <Layout className={styles.wrapper}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>DEF</span>
            工程研发平台
          </div>
          <RouterMenu routes={route.routes}></RouterMenu>
        </Sider>
        <Layout className="site-layout">
          <CustomHeader collapsed={collapsed} toggle={toggle}></CustomHeader>
          <Content className={styles.content}>
            {renderRoutes(route.routes)}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright © 2019-现在，淘宝（中国）软件有限公司 版权所有 |
            浙ICP备09109183号-73
          </Footer>
        </Layout>
      </Layout>
    );
  }
);

export default HomeLayout;
