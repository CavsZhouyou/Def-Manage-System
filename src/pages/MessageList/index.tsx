/*
 * @Author: zhouyou@werun
 * @Descriptions:  消息列表
 * @TodoList: 无
 * @Date: 2020-03-17 10:27:49
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 20:44:38
 */

import React, { memo, useEffect } from 'react';
import { Radio, List, Avatar, Skeleton } from 'antd';
import LoadMore from '@/components/LoadMore';
import useLoadMore from '@/utils/hooks/useLoadMore';
import styles from './index.module.scss';

interface Message {
  name: string;
  avatar: string;
  date: string;
  action: string;
  app: string;
  loading?: boolean;
}

const data: Message[] = [
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  }
];

const getData = (count: number): Promise<Message[]> => {
  return new Promise<Message[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([...new Array(count)].map(() => data[0]));
    }, 2000);
  });
};

const MessageItem = memo((props: Message) => {
  const { name, avatar, date, action, app, loading } = props;

  return (
    <List.Item actions={[<a href="">通过</a>, <a>不通过</a>]}>
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

export default memo(function MessageList() {
  // const { loading, listData, loadMore } = useLoadMore<Message>([], getData);

  useEffect(() => {
    // 初始化列表数据
    // loadMore(7);
  }, []);
  return (
    <div className={styles.messageList}>
      <div className={styles.header}>
        <Radio.Group defaultValue="a" buttonStyle="solid" size="middle">
          <Radio.Button value="a">审核消息</Radio.Button>
          <Radio.Button value="b">系统消息</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.content}>
        {/* <List
          itemLayout="horizontal"
          loadMore={<LoadMore loading={loading} loadMore={loadMore} />}
          dataSource={listData}
          renderItem={(item: Message): JSX.Element => <MessageItem {...item} />}
        /> */}
      </div>
    </div>
  );
});
