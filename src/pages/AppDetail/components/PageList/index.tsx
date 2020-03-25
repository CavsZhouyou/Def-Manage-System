/*
 * @Author: zhouyou@werun
 * @Descriptions: 页面列表
 * @TodoList: 无
 * @Date: 2020-03-16 08:36:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 19:58:34
 */

import React, { memo } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import { PageInfo, GetPageListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import { getPageListRequest } from '@/service/apis';
import { formatTimestamp } from '@/utils/index';
import styles from './index.module.scss';

const PAGE_SIZE = 7;

const initParams = () => {
  return {};
};

const showTotal = (total: number): string => `共 ${total} 条`;

const rowKey = (record: PageInfo): number => record.pageId;

const columns: ColumnProps<PageInfo>[] = [
  {
    title: '页面',
    dataIndex: 'pageName',
    key: 'pageName'
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version'
  },
  // {
  //   title: '页面标题',
  //   dataIndex: 'pageTitle',
  //   key: 'pageTitle'
  // },
  // {
  //   title: '页面 SPM',
  //   dataIndex: 'spm',
  //   key: 'spm',
  //   render: (text: string): JSX.Element => <a>{text}</a>
  // },
  {
    title: '最后更新时间（发布/设置等）',
    dataIndex: 'lastUpdateTime',
    key: 'lastUpdateTime',
    render: (text: string): string => formatTimestamp(parseInt(text || ''))
  },
  {
    title: '线上地址',
    dataIndex: 'onlineAddress',
    key: 'onlineAddress',
    render: (text: string): JSX.Element => <a>{text}</a>
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {/* <Button className={styles.link} type="link">
          修改配置
        </Button> */}
        <Button className={styles.link} type="link">
          版本回滚
        </Button>
        {/* <Button className={styles.link} type="link">
          删除
        </Button> */}
      </span>
    )
  }
];

export default memo(function PageList() {
  const { loading, list, total, page, onPageChange } = useList<
    PageInfo,
    GetPageListParams
  >(PAGE_SIZE, initParams, getPageListRequest);

  return (
    <div className={styles.pageList}>
      <div className={styles.header}>
        <Title title="页面列表" />
      </div>
      <div className={styles.content}>
        <Table<PageInfo>
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={rowKey}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: total,
            showTotal: showTotal,
            showQuickJumper: true,
            onChange: onPageChange
          }}
        />
      </div>
    </div>
  );
});
