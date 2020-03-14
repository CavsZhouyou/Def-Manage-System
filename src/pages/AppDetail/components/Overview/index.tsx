/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情综合页面
 * @TodoList: 无
 * @Date: 2020-03-14 12:09:47
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-14 12:20:41
 */

import React, { memo } from 'react';
import { Row, Col } from 'antd';
import AppInfo from '../AppInfo';
import styles from './index.module.scss';

export default memo(function Overview() {
  return (
    <div className={styles.overview}>
      <Row gutter={[16, 15]}>
        <Col span={16}>
          <AppInfo />
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
});
