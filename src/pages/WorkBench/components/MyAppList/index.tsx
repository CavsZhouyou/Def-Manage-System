/*
 * @Author: zhouyou@werun
 * @Descriptions: 我的项目列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:39:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 16:07:29
 */

import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Avatar, List, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import LoadMore from '@/components/LoadMore';
import Title from '@/components/Title';
import useLoadMore from '@/utils/hooks/useLoadMore';
import useModal from '@/utils/hooks/useModal';
import NewAppModal from '@/components/NewAppModal';
import { GetAppListResponse, BaseResponse, AppInfo } from '@/service/types';
import { getAppListByCountRequest } from '@/service/apis';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

const getData = (userId: number) => {
  return (
    loadedCount: number,
    count: number
  ): Promise<BaseResponse<GetAppListResponse>> => {
    return getAppListByCountRequest({
      userId,
      publishType: [],
      loadedCount,
      count
    });
  };
};

const renderItem = (item: AppInfo): JSX.Element => <App {...item} />;

const Header = memo(() => {
  const [visible, showModal, hideModal] = useModal();

  return (
    <div className={commonStyles.header}>
      <Title title="我的应用" />
      <div className={commonStyles.actions}>
        <Button className={styles.addButton} type="link" onClick={showModal}>
          新建应用
        </Button>
        <div className={commonStyles.divider}>|</div>
        <Link to="/home/appList">全部应用</Link>
        <NewAppModal visible={visible} hideModal={hideModal} />
      </div>
    </div>
  );
});

const App = memo((props: any) => {
  const { appName, appLogo, iterationCount, description, loading } = props;

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
          avatar={<Avatar size={40} src={appLogo} />}
          title={<a>{appName}</a>}
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
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const { loading, listData, loadMore, hasMore } = useLoadMore<AppInfo>(
    [],
    getData(userId)
  );

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
          loadMore={
            <LoadMore loading={loading} loadMore={loadMore} hasMore={hasMore} />
          }
          dataSource={listData}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
});
