/*
 * @Author: zhouyou@werun
 * @Descriptions: 我的项目列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:39:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 16:12:49
 */

import React, { memo } from 'react';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

const Header = memo(() => {
  return (
    <div className={commonStyles.header}>
      <div className={commonStyles.title}>新建应用</div>
      <div className={commonStyles.actions}>
        <a>新建应用</a>
        <div className={commonStyles.divider}>|</div>
        <a>全部应用</a>
      </div>
    </div>
  );
});

export default memo(function MyAppList() {
  return (
    <div className={styles.myAppList}>
      <Header />
    </div>
  );
});
