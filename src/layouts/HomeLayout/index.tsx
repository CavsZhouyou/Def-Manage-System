/*
 * @Author: zhouyou@werun
 * @Descriptions: 主页 layout
 * @TodoList: 无
 * @Date: 2020-03-10 10:20:58
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-10 12:06:57
 */
import React, { useState, useCallback } from 'react';
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import RouterMenu from './components/RouterMenu';
import styles from './index.module.scss';

const { Header, Sider, Content, Footer } = Layout;

const HomeLayout = (props: any): JSX.Element => {
  const [collapsed, updateCollapsed] = useState(false);
  const { route } = props;

  const toggle = useCallback((): void => {
    updateCollapsed(prevState => {
      return !prevState;
    });
  }, []);

  return (
    <Layout className={styles.wrapper}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <RouterMenu routes={route.routes}></RouterMenu>
      </Sider>
      <Layout className="site-layout">
        <Header className={styles.header} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: styles.trigger,
              onClick: toggle
            }
          )}
        </Header>
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
};

export default HomeLayout;
