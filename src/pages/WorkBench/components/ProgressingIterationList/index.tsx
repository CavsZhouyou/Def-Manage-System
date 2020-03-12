/*
 * @Author: zhouyou@werun
 * @Descriptions: 进行中的迭代列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:10:08
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 16:04:30
 */
import React, { memo } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons';
import commonStyles from '../../index.module.scss';

interface Iteration {
  key: number;
  appName: string;
  iterationName: string;
  createTime: string;
  branch: string;
  latestPublish: string;
  latestPublishStatus: string;
}

const columns: ColumnProps<Iteration>[] = [
  {
    title: '所属应用',
    dataIndex: 'appName',
    key: 'appName',
    render: (text: string): JSX.Element => <a>{text}</a>
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
    title: '分支',
    key: 'branch',
    dataIndex: 'branch'
  },
  {
    title: '最近发布',
    key: 'latestPublish',
    dataIndex: 'latestPublish'
  },
  {
    title: '发布状态',
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

const data: Iteration[] = [
  {
    key: 0,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 1,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'failed'
  },
  {
    key: 2,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 3,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'none'
  },
  {
    key: 4,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 5,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 6,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 7,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'failed'
  },
  {
    key: 8,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 9,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'none'
  },
  {
    key: 10,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    key: 11,
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    branch: 'daily/0.0.8',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  }
];

const Header = memo(() => {
  return (
    <div className={commonStyles.header}>
      <div className={commonStyles.title}>进行中的迭代</div>
      <div className={commonStyles.actions}>
        <a>新建迭代</a>
        <div className={commonStyles.divider}>|</div>
        <a>全部迭代</a>
      </div>
    </div>
  );
});

export default memo(function ProgressingIterationList() {
  return (
    <div className={commonStyles.progressingIterationList}>
      <Header />
      <div className={commonStyles.content}>
        <Table<Iteration>
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 5,
            showQuickJumper: true,
            showTotal: (total: number): string => `共 ${total} 条`
          }}
        />
      </div>
    </div>
  );
});
