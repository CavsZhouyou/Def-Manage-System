/*
 * @Author: zhouyou@werun
 * @Descriptions: 消息列表组件
 * @TodoList: 无
 * @Date: 2020-03-12 20:45:18
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 11:09:21
 */

import React, { memo, useEffect } from 'react';
import { Skeleton, List, Tag } from 'antd';
import LoadMore from '@/components/LoadMore';
import Title from '@/components/Title';
import { useLoadMore } from '@/utils/hooks';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

interface MessageInfo {
  id: number;
  type: '001' | '002';
  title: string;
  loading?: boolean;
}

const MESSAGE_TYPE_MAP = {
  '001': {
    name: '系统公告',
    color: 'orange'
  },
  '002': {
    name: '功能更新',
    color: 'blue'
  }
};

const data: MessageInfo[] = [
  {
    id: 1,
    type: '001',
    title: '外包线上发布环境管控'
  }
];

const getData = (count: number): Promise<MessageInfo[]> => {
  return new Promise<MessageInfo[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([...new Array(count)].map(() => data[0]));
    }, 2000);
  });
};

const Message = memo((props: MessageInfo) => {
  const { title, type, loading } = props;
  const tag = MESSAGE_TYPE_MAP[type];

  return (
    <List.Item>
      <Skeleton title={false} loading={loading} active>
        {tag && <Tag color={tag.color}>{tag.name}</Tag>}
        <div className={styles.title}>{title}</div>
      </Skeleton>
    </List.Item>
  );
});

const Header = memo(() => {
  return (
    <div className={commonStyles.header}>
      <Title title="最新消息" />
      <div className={commonStyles.actions}>
        <a>全部消息</a>
      </div>
    </div>
  );
});

export default memo(function MessageList() {
  const { loading, listData, loadMore } = useLoadMore<MessageInfo>([], getData);

  useEffect(() => {
    // 初始化列表数据
    loadMore(3);
  }, []);

  return (
    <div className={styles.messageList}>
      <Header />
      <div className={commonStyles.content}>
        <List
          itemLayout="horizontal"
          loadMore={<LoadMore loading={loading} loadMore={loadMore} />}
          dataSource={listData}
          renderItem={(item: MessageInfo): JSX.Element => <Message {...item} />}
        />
      </div>
    </div>
  );
});
