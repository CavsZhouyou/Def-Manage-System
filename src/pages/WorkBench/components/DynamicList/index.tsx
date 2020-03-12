/*
 * @Author: zhouyou@werun
 * @Descriptions: 动态列表
 * @TodoList: 无
 * @Date: 2020-03-12 09:16:25
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 09:22:57
 */

import React, { memo } from 'react';
import styles from './index.module.scss';

export default memo(function DynamicList() {
  return (
    <div className={styles.dynamicList}>
      <div className={styles.header}>
        <div className={styles.title}>动态</div>
      </div>
    </div>
  );
});
