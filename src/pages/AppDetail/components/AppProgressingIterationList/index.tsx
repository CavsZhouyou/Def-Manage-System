/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用详情进行中的迭代列表
 * @TodoList: 无
 * @Date: 2020-03-15 11:01:47
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 11:09:45
 */

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import IterationTable from '@/components/IterationTable';
import { getIterationListRequest } from '@/service/apis';
import { IterationInfo, GetIterationListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import Title from '@/components/Title';
import styles from './index.module.scss';

const excludeColumns: string[] = [
  'appName',
  'timeConsumption',
  'creator',
  'iterationStatus',
  'version',
  'action'
];

interface InitParams {
  userId: number;
  appId: number;
  iterationType: string[];
}

const PAGE_SIZE = 5;

export default memo(function AppProgressingIterationList() {
  const { appInfo: app } = useParams();
  const initParams = (): InitParams => {
    const { appId } = JSON.parse(decodeURIComponent(app || ''));
    const userId = parseInt(sessionStorage.getItem('userId') || '');

    return {
      userId,
      appId,
      iterationType: ['3002']
    };
  };
  const { loading, list, total, page, onPageChange } = useList<
    IterationInfo,
    GetIterationListParams
  >(PAGE_SIZE, initParams, getIterationListRequest);

  return (
    <div className={styles.appProgressingIterationList}>
      <div className={styles.header}>
        <Title title="进行中的迭代" />
      </div>
      <div className={styles.content}>
        <IterationTable
          excludeColumns={excludeColumns}
          data={list}
          loading={loading}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});
