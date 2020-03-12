/*
 * @Author: zhouyou@werun
 * @Descriptions: 动态列表
 * @TodoList: 无
 * @Date: 2020-03-12 09:16:25
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 17:21:35
 */

import React, { memo, useEffect } from 'react';
import { List, Avatar, Skeleton, Button } from 'antd';
import { useLoadMore } from '@/utils/hooks';
import IconFont from '@/components/IconFont';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

interface DynamicInfo {
  name: string;
  avatar: string;
  date: string;
  action: string;
  app: string;
  loading?: boolean;
}

const data: DynamicInfo[] = [
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  }
];

const getData = (count: number): Promise<DynamicInfo[]> => {
  return new Promise<DynamicInfo[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([...new Array(count)].map(() => data[0]));
    }, 2000);
  });
};

const LoadMore = (props: {
  loading: boolean;
  loadMore: () => void;
}): JSX.Element | null => {
  const { loading, loadMore } = props;

  if (loading) return null;

  return (
    <div className={styles.loadMore}>
      <Button className={styles.button} type="link" onClick={loadMore}>
        <IconFont className={styles.down} type="icon-down" />
        显示更多
      </Button>
    </div>
  );
};

const Dynamic = memo((props: DynamicInfo) => {
  const { name, avatar, date, action, app, loading } = props;

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
          avatar={<Avatar size={40} src={avatar} />}
          title={date}
          description={`${name}${action}  [${app}]`}
        />
      </Skeleton>
    </List.Item>
  );
});

export default memo(function DynamicList() {
  const { loading, listData, loadMore } = useLoadMore<DynamicInfo>([], getData);

  useEffect(() => {
    // 初始化列表数据
    loadMore(5);
  }, [loadMore]);

  return (
    <div className={commonStyles.dynamicList}>
      <div className={commonStyles.header}>
        <div className={commonStyles.title}>动态</div>
      </div>
      <div className={commonStyles.content}>
        <List
          itemLayout="horizontal"
          loadMore={<LoadMore loading={loading} loadMore={loadMore} />}
          dataSource={listData}
          renderItem={(item: DynamicInfo): JSX.Element => <Dynamic {...item} />}
        />
      </div>
    </div>
  );
});
