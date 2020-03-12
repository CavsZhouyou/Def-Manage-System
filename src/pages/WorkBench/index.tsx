/*
 * @Author: zhouyou@werun
 * @Descriptions: 工作台路由模块
 * @TodoList: 无
 * @Date: 2020-03-10 10:51:05
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 09:19:29
 */

import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import ProgressingIterationList from './components/ProgressingIterationList';
import MyAppList from './components/MyAppList';
import DynamicList from './components/DynamicList';

const WorkBench = React.memo(
  (): JSX.Element => {
    return (
      <div className={styles.wrapper}>
        <Row gutter={[32, 16]}>
          <Col span={16}>
            <ProgressingIterationList />
            <DynamicList />
          </Col>
          <Col span={8}>
            <MyAppList />
          </Col>
        </Row>
      </div>
    );
  }
);

export default WorkBench;
