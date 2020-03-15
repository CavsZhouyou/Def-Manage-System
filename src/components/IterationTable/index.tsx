/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代列表表格
 * @TodoList: 无
 * @Date: 2020-03-15 09:25:07
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 19:21:44
 */

import React, { memo, useMemo } from 'react';
import { Avatar, Tag, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons';
import styles from './index.module.scss';

export interface Iteration {
  id: number;
  key: number;
  appLogo: string;
  appName: string;
  iterationName: string;
  createTime: string;
  timeConsumption: string;
  branch: string;
  creator: string;
  creatorAvatar: string;
  iterationStatus: string;
  latestPublish: string;
  latestPublishStatus: string;
}

interface Props {
  data: Iteration[];
  excludeColumns: string[];
  pageSize: number;
}

const columns: ColumnProps<Iteration>[] = [
  {
    title: '所属应用',
    dataIndex: 'appName',
    key: 'appName',
    render: (text: string, record: Iteration): JSX.Element => (
      <a>
        <Avatar src={record.appLogo} />
        {text}
      </a>
    )
  },
  {
    title: '迭代名称',
    dataIndex: 'iterationName',
    key: 'iterationName',
    render: (text: string): JSX.Element => <a>{text}</a>
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '耗时',
    dataIndex: 'timeConsumption',
    key: 'timeConsumption'
  },
  {
    title: '分支',
    key: 'branch',
    dataIndex: 'branch'
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    render: (text: string, record: Iteration): JSX.Element => (
      <div>
        <Avatar
          className={styles.creatorAvatar}
          size={30}
          src={record.creatorAvatar}
        />
        {text}
      </div>
    )
  },
  {
    title: '迭代状态',
    key: 'iterationStatus',
    dataIndex: 'iterationStatus',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case 'success':
          return <Tag color="green"> 已完成</Tag>;
        case 'progressing':
          return <Tag color="blue">进行中</Tag>;
        default:
          return <Tag color="red">已废弃</Tag>;
      }
    }
  },
  {
    title: '最近发布',
    key: 'latestPublish',
    dataIndex: 'latestPublish'
  },
  {
    title: '最近发布状态',
    key: 'latestPublishStatus',
    dataIndex: 'latestPublishStatus',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case 'success':
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        case 'failed':
          return <CloseCircleTwoTone twoToneColor="#FF4D50" />;
        default:
          return <MinusCircleTwoTone twoToneColor="#808080" />;
      }
    }
  }
];

const getColumns = (excludeColumns: string[]) => {
  return columns.filter(item => excludeColumns.indexOf((item as any).key) < 0);
};

export default memo(function IterationTable(props: Props) {
  const { data, excludeColumns, pageSize } = props;
  const tableColumns = useMemo(() => getColumns(excludeColumns), [
    excludeColumns
  ]);

  return (
    <Table<Iteration>
      columns={tableColumns}
      dataSource={data}
      pagination={{
        total: data.length,
        pageSize: pageSize,
        showQuickJumper: true,
        showTotal: (total: number): string => `共 ${total} 条`
      }}
    />
  );
});
