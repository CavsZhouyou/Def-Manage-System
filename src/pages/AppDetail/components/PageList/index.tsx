/*
 * @Author: zhouyou@werun
 * @Descriptions: 页面列表
 * @TodoList: 无
 * @Date: 2020-03-16 08:36:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 08:57:26
 */

import React, { memo } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import styles from './index.module.scss';

interface PageInfo {
  id: number;
  key: number;
  page: string;
  pageTitle: string;
  spm: string;
  lastUpdateTime: string;
  onlineAddress: string;
}

const columns: ColumnProps<PageInfo>[] = [
  {
    title: '页面',
    dataIndex: 'page',
    key: 'page'
  },
  {
    title: '页面标题',
    dataIndex: 'pageTitle',
    key: 'pageTitle'
  },
  {
    title: '页面 SPM',
    dataIndex: 'spm',
    key: 'spm',
    render: (text: string): JSX.Element => <a>{text}</a>
  },
  {
    title: '最后更新时间（发布/设置等）',
    dataIndex: 'lastUpdateTime',
    key: 'lastUpdateTime'
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
        <Button className={styles.link} type="link">
          修改配置
        </Button>
        <Button className={styles.link} type="link">
          版本回滚
        </Button>
        <Button className={styles.link} type="link">
          删除
        </Button>
      </span>
    )
  }
];

const data: PageInfo[] = [
  {
    id: 0,
    key: 0,
    page: 'index.html',
    pageTitle: 'index.html',
    spm: 'dev.content',
    lastUpdateTime: '2020/1/4',
    onlineAddress: '线上地址'
  },
  {
    id: 1,
    key: 1,
    page: 'index.html',
    pageTitle: 'index.html',
    spm: 'dev.content',
    lastUpdateTime: '2020/1/4',
    onlineAddress: '线上地址'
  },
  {
    id: 2,
    key: 22,
    page: 'index.html',
    pageTitle: 'index.html',
    spm: 'dev.content',
    lastUpdateTime: '2020/1/4',
    onlineAddress: '线上地址'
  }
];

export default memo(function PageList() {
  return (
    <div className={styles.pageList}>
      <div className={styles.header}>
        <Title title="页面列表" />
      </div>
      <div className={styles.content}>
        <Table<PageInfo>
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 7,
            showQuickJumper: true,
            showTotal: (total: number): string => `共 ${total} 条`
          }}
        />
      </div>
    </div>
  );
});
