/*
 * @Author: zhouyou@werun
 * @Descriptions: 发布列表
 * @TodoList: 无
 * @Date: 2020-03-15 19:22:02
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 19:53:49
 */
import React, { memo, useMemo } from 'react';
import { Avatar, Tag, Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ClockCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export interface Publish {
  id: number;
  key: number;
  createTime: string;
  iterationName: string;
  version: string;
  publisher: string;
  publisherAvatar: string;
  commit: string;
  publishType: string;
  publishEnv: string;
  publishStatus: string;
}

interface Props {
  data: Publish[];
  excludeColumns: string[];
  pageSize: number;
}

const columns: ColumnProps<Publish>[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text: string, record: Publish): JSX.Element => (
      <div>
        <ClockCircleOutlined />
        <span className={styles.createTime}>{text}</span>
      </div>
    )
  },
  {
    title: '迭代名称',
    dataIndex: 'iterationName',
    key: 'iterationName',
    render: (text: string): JSX.Element => <a>{text}</a>
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
    render: (text: string, record: Publish): JSX.Element => (
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
  {
    title: '发布类型',
    dataIndex: 'publishType',
    key: 'publishType'
  },
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
        case 'success':
          return <Tag color="green">成功</Tag>;
        default:
          return <Tag color="red">失败</Tag>;
      }
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button className={styles.link} type="link">
          查看
        </Button>
      </span>
    )
  }
];

const getColumns = (excludeColumns: string[]) => {
  return columns.filter(item => excludeColumns.indexOf((item as any).key) < 0);
};

export default memo(function PublishTable(props: Props) {
  const { data, excludeColumns, pageSize } = props;
  const tableColumns = useMemo(() => getColumns(excludeColumns), [
    excludeColumns
  ]);

  return (
    <Table<Publish>
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
