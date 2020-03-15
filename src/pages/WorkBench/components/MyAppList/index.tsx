/*
 * @Author: zhouyou@werun
 * @Descriptions: 我的项目列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:39:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 10:46:54
 */

import React, { memo, useEffect } from 'react';
import { Skeleton, Avatar, List, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import LoadMore from '@/components/LoadMore';
import Title from '@/components/Title';
import { useLoadMore } from '@/utils/hooks';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

interface AppInfo {
  id: number;
  name: string;
  description: string;
  iterationCount: number;
  loading?: boolean;
}

const data: AppInfo[] = [
  {
    id: 1,
    name: 'homeai-fe/design-serice',
    description: '设计服务',
    iterationCount: 3
  }
];

const getData = (count: number): Promise<AppInfo[]> => {
  return new Promise<AppInfo[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([...new Array(count)].map(() => data[0]));
    }, 2000);
  });
};

const Header = memo(() => {
  return (
    <div className={commonStyles.header}>
      <Title title="我的应用" />
      <div className={commonStyles.actions}>
        <a>新建应用</a>
        <div className={commonStyles.divider}>|</div>
        <a>全部应用</a>
      </div>
    </div>
  );
});

const App = memo((props: AppInfo) => {
  const { name, iterationCount, description, loading } = props;

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
          avatar={
            <Avatar
              size={40}
              src="https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png"
            />
          }
          title={<a>{name}</a>}
          description={description}
        />
        <Button className={styles.iteration} type="link">
          {`${iterationCount} 个进行中的迭代`}
          <RightOutlined className={styles.rightIcon} />
        </Button>
      </Skeleton>
    </List.Item>
  );
});

export default memo(function MyAppList() {
  const { loading, listData, loadMore } = useLoadMore<AppInfo>([], getData);

  useEffect(() => {
    // 初始化列表数据
    loadMore(5);
  }, []);

  return (
    <div className={styles.myAppList}>
      <Header />
      <div className={commonStyles.content}>
        <List
          itemLayout="horizontal"
          loadMore={<LoadMore loading={loading} loadMore={loadMore} />}
          dataSource={listData}
          renderItem={(item: AppInfo): JSX.Element => <App {...item} />}
        />
      </div>
    </div>
  );
});
