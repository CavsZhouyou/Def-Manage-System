/*
 * @Author: zhouyou@werun
 * @Descriptions: title 组件
 * @TodoList: 无
 * @Date: 2020-03-13 11:00:38
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 11:03:17
 */

import React, { memo } from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
}

export default memo(function Title(props: Props) {
  return <div className={styles.title}>{props.title}</div>;
});
