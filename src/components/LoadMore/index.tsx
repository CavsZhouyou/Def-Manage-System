/*
 * @Author: zhouyou@werun
 * @Descriptions: 加载更多按钮
 * @TodoList: 无
 * @Date: 2020-03-12 19:09:55
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 20:18:18
 */

import React, { memo } from 'react';
import { Button } from 'antd';
import IconFont from '@/components/IconFont';
import styles from './index.module.scss';

interface Props {
  loading: boolean;
  loadMore: () => void;
}

export default memo(function LoadMore(props: Props) {
  const { loading, loadMore } = props;

  if (loading)
    return (
      <div className={styles.loadMore}>
        <Button className={styles.button} type="link">
          正在加载...
        </Button>
      </div>
    );

  return (
    <div className={styles.loadMore}>
      <Button className={styles.button} type="link" onClick={loadMore}>
        <IconFont className={styles.down} type="icon-down" />
        显示更多
      </Button>
    </div>
  );
});
