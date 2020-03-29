/*
 * @Author: zhouyou@werun
 * @Descriptions: 动态列表
 * @TodoList: 无
 * @Date: 2020-03-12 09:16:25
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 15:59:47
 */

import React, { memo, useEffect } from 'react';
import { List, Avatar, Skeleton } from 'antd';
import LoadMore from '@/components/LoadMore';
import Title from '@/components/Title';
import useLoadMore from '@/utils/hooks/useLoadMore';
import {
  DynamicInfo,
  BaseResponse,
  GetDynamicListResponse
} from '@/service/types';
import { getDynamicListRequest } from '@/service/apis';
import { formatTimeToInterval } from '@/utils';
import styles from './index.module.scss';

const getData = (userId: number, appId?: number) => {
  return (
    loadedCount: number,
    count: number
  ): Promise<BaseResponse<GetDynamicListResponse>> => {
    return getDynamicListRequest({
      userId,
      appId,
      loadedCount,
      count
    });
  };
};

const renderItem = (item: DynamicInfo): JSX.Element => <Dynamic {...item} />;

const Dynamic = memo((props: any) => {
  const { userAvatar, operateTime, content, loading } = props;

  return (
    <List.Item>
      <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
          avatar={<Avatar size={40} src={userAvatar} />}
          title={formatTimeToInterval(operateTime)}
          description={content}
        />
      </Skeleton>
    </List.Item>
  );
});

export default memo(function DynamicList(props: { appId?: number }) {
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const { appId } = props;
  const { loading, listData, loadMore, hasMore } = useLoadMore<DynamicInfo>(
    [],
    getData(userId, appId)
  );

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
