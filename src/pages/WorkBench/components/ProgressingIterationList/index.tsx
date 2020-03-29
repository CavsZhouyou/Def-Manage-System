/*
 * @Author: zhouyou@werun
 * @Descriptions: 进行中的迭代列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:10:08
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 15:56:53
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import IterationTable from '@/components/IterationTable';
import Title from '@/components/Title';
import NewIterationModal from '@/components/NewIterationModal';
import { getIterationListRequest } from '@/service/apis';
import { IterationInfo, GetIterationListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import useModal from '@/utils/hooks/useModal';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

interface InitParams {
  userId: number;
  iterationType: string[];
}

const excludeColumns: string[] = [
  'timeConsumption',
  'creator',
  'iterationStatus',
  'version',
  'action'
];

const PAGE_SIZE = 5;

const Header = memo(() => {
  const [visible, showModal, hideModal] = useModal();

  return (
    <div className={commonStyles.header}>
      <Title title="进行中的迭代" />
      <div className={commonStyles.actions}>
        <Button className={styles.addButton} type="link" onClick={showModal}>
          新建迭代
        </Button>
        <div className={commonStyles.divider}>|</div>
        <Link to="/home/iterationList">全部迭代</Link>
        <NewIterationModal visible={visible} hideModal={hideModal} />
      </div>
    </div>
  );
});

export default memo(function ProgressingIterationList() {
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const initParams = (): InitParams => ({
    userId,
    iterationType: ['3002']
  });
  const { loading, list, total, page, onPageChange } = useList<
    IterationInfo,
    GetIterationListParams
  >(PAGE_SIZE, initParams, getIterationListRequest);
  return (
    <div className={commonStyles.progressingIterationList}>
      <Header />
      <div className={commonStyles.content}>
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
