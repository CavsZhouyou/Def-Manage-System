/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情综合页面
 * @TodoList: 无
 * @Date: 2020-03-14 12:09:47
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 11:25:43
 */

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import DynamicList from '@/components/DynamicList';
import AppInfo from '../AppInfo';
import AppProgressingIterationList from '../AppProgressingIterationList';
import styles from './index.module.scss';

export default memo(function Overview() {
  const { appInfo: app } = useParams();
  const { appId } = JSON.parse(app || '');

  return (
    <div className={styles.overview}>
      <Row gutter={[16, 15]}>
        <Col span={16}>
          <AppInfo />
          <AppProgressingIterationList />
        </Col>
        <Col span={8}>
          <DynamicList appId={appId} />
        </Col>
      </Row>
    </div>
  );
});
