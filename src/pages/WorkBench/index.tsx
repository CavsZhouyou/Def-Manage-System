/*
 * @Author: zhouyou@werun
 * @Descriptions: 工作台路由模块
 * @TodoList: 无
 * @Date: 2020-03-10 10:51:05
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-11 18:08:01
 */

import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.module.scss';
import ProgressingIterationList from './components/ProgressingIterationList';
import MyProjectList from './components/MyProjectList';

const WorkBench = React.memo(
  (): JSX.Element => {
    return (
      <div className={styles.wrapper}>
        <Row gutter={[32, 16]}>
          <Col span={16}>
            <ProgressingIterationList />
          </Col>
          <Col span={8}>
            <MyProjectList />
          </Col>
        </Row>
      </div>
    );
  }
);

export default WorkBench;
