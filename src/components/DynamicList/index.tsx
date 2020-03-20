/*
 * @Author: zhouyou@werun
 * @Descriptions: 动态列表
 * @TodoList: 无
 * @Date: 2020-03-12 09:16:25
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-17 10:39:26
 */

import React, { memo, useEffect } from 'react';
import { List, Avatar, Skeleton } from 'antd';
import LoadMore from '@/components/LoadMore';
import Title from '@/components/Title';
import { useLoadMore } from '@/utils/hooks/useLoadMore';
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
  }, []);

  return (
    <div className={styles.dynamicList}>
      <div className={styles.header}>
        <Title title="动态" />
      </div>
      <div className={styles.content}>
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
