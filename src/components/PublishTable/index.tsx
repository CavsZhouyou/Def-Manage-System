/*
 * @Author: zhouyou@werun
 * @Descriptions: 发布列表
 * @TodoList: 无
 * @Date: 2020-03-15 19:22:02
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 20:39:24
 */
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Tag, Table } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import { PublishInfo } from '@/service/types';
import { publishTypes } from '@/constants';
import { formatTimestamp } from '@/utils';
import styles from './index.module.scss';

interface Props {
  data: PublishInfo[];
  excludeColumns: string[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (current: number, pageSize?: number | undefined) => void;
}

const columns: ColumnProps<PublishInfo>[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text: string, record: PublishInfo): JSX.Element => (
      <div>
        <ClockCircleOutlined />
        <span className={styles.createTime}>
          {formatTimestamp(parseInt(text || ''))}
        </span>
      </div>
    )
  },
  {
    title: '迭代名称',
    dataIndex: 'iterationName',
    key: 'iterationName',
    render: (text: string, record: PublishInfo): JSX.Element => {
      const { appId, appName, iterationId, iterationName } = record;

      return (
        <Link
          to={`/home/iterationDetail/${encodeURIComponent(
            JSON.stringify({
              appId,
              appName,
              iterationId,
              iterationName
            })
          )}`}
        >
          {text}
        </Link>
      );
    }
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version'
  },
  {
    title: '发布人',
    dataIndex: 'publisher',
    key: 'publisher',
    render: (text: string, record: PublishInfo): JSX.Element => (
      <div>
        <Avatar
          className={styles.publisherAvatar}
          size={30}
          src={record.publisherAvatar}
        />
        {text}
      </div>
    )
  },
  {
    title: 'commit',
    dataIndex: 'commit',
    key: 'commit',
    render: (text: string): JSX.Element => <a>{text}</a>
  },
  // {
  //   title: '发布类型',
  //   dataIndex: 'publishType',
  //   key: 'publishType',
  //   render: (text: string) => {
  //     return publishTypes.filter(item => item.value === text)[0].name;
  //   }
  // },
  {
    title: '发布环境',
    key: 'publishEnv',
    dataIndex: 'publishEnv',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case 'daily':
          return <Tag color="#2db7f5">日常</Tag>;
        default:
          return <Tag color="#f50">线上</Tag>;
      }
    }
  },
  {
    title: '发布状态',
    key: 'publishStatus',
    dataIndex: 'publishStatus',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case '4001':
          return <Tag color="green">成功</Tag>;
        case '4002':
          return <Tag color="red">失败</Tag>;
        case '4003':
          return <Tag color="orange">未发布</Tag>;
        default:
          return <Tag color="blue">发布中</Tag>;
      }
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text: string, record: PublishInfo): JSX.Element => {
      const { appId, appName, iterationId, iterationName, publishId } = record;
      return (
        <Link
          to={`/home/publishDetail/${encodeURIComponent(
            JSON.stringify({
              appId,
              appName,
              iterationId,
              iterationName,
              publishId
            })
          )}`}
        >
          查看
        </Link>
      );
    }
  }
];

const getColumns = (excludeColumns: string[]) => {
  return columns.filter(item => excludeColumns.indexOf((item as any).key) < 0);
};

const showTotal = (total: number): string => `共 ${total} 条`;

const rowKey = (record: PublishInfo): number => record.publishId;

export default memo(function PublishTable(props: Props) {
  const {
    data,
    excludeColumns,
    loading,
    total,
    pageSize,
    page,
    onPageChange
  } = props;
  const tableColumns = useMemo(() => getColumns(excludeColumns), [
    excludeColumns
  ]);

  return (
    <Table<PublishInfo>
      columns={tableColumns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
        showTotal: showTotal,
        showQuickJumper: true,
        onChange: onPageChange
      }}
    />
  );
});
