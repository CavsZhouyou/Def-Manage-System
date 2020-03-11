/*
 * @Author: zhouyou@werun
 * @Descriptions: 工作台路由模块
 * @TodoList: 无
 * @Date: 2020-03-10 10:51:05
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-10 20:02:27
 */

import React from 'react';
import styles from './index.module.scss';

const WorkBench = React.memo(
  (): JSX.Element => {
    return <div className={styles.wrapper}>工作台</div>;
  }
);

export default WorkBench;
