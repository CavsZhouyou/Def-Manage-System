/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代列表表格
 * @TodoList: 无
 * @Date: 2020-03-15 09:25:07
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 20:27:51
 */

import React, { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal, Avatar, Tag, Table, Button, message } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons';
import { IterationInfo } from '@/service/types';
import { formatTimeToInterval, getTimeInterval } from '@/utils/index';
import styles from './index.module.scss';
import { rollbackVersionRequest } from '@/service/apis';

export type Iteration = IterationInfo;

interface Props {
  data: IterationInfo[];
  excludeColumns: string[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (current: number, pageSize?: number | undefined) => void;
}

const { confirm } = Modal;

const rollbackVersion = (
  userId: number,
  appId: number,
  rollbackVersion: string,
  rollbackVersionId: number
): void => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `你确定要将版本回滚到${rollbackVersion}吗？`,
    onOk: async () => {
      const result = await rollbackVersionRequest({
        userId,
        appId,
        rollbackVersionId
      });

      if (result.success) {
        message.success('回滚成功!');
      } else {
        message.error(result.message);
      }
    }
  });
};

const getColumns = (
  appId: number,
  userId: number,
  excludeColumns: string[]
): any => {
  const columns: ColumnProps<IterationInfo>[] = [
    {
      title: '所属应用',
      dataIndex: 'appName',
      key: 'appName',
      render: (text: string, record: IterationInfo): JSX.Element => (
        <Link to={`/home/appDetail/${record.appId}`}>
          <Avatar src={record.appLogo} />
          {text}
        </Link>
      )
    },
    {
      title: '迭代名称',
      dataIndex: 'iterationName',
      key: 'iterationName',
      render: (text: string, record: IterationInfo): JSX.Element => (
        <Link to={`/home/iterationDetail/${record.iterationId}`}>{text}</Link>
      )
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string): string =>
        formatTimeToInterval(parseInt(text || ''))
    },
    {
      title: '耗时',
      dataIndex: 'timeConsumption',
      key: 'timeConsumption',
      render: (text: string, record: IterationInfo): string =>
        getTimeInterval(
          parseInt(record.createTime || ''),
          parseInt(record.endTime || '')
        )
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
      render: (text: string, record: IterationInfo): JSX.Element => (
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
          case '3001':
            return <Tag color="green">已完成</Tag>;
          case '3002':
            return <Tag color="blue">进行中</Tag>;
          default:
            return <Tag color="red">已废弃</Tag>;
        }
      }
    },
    {
      title: '最近发布',
      key: 'latestPublish',
      dataIndex: 'latestPublish',
      render: (text: string): string =>
        formatTimeToInterval(parseInt(text || ''))
    },
    {
      title: '最近发布状态',
      key: 'latestPublishStatus',
      dataIndex: 'latestPublishStatus',
      align: 'center',
      render: (text: string): JSX.Element => {
        switch (text) {
          case '4001':
            return <CheckCircleTwoTone twoToneColor="#52c41a" />;
          case '4002':
            return <CloseCircleTwoTone twoToneColor="#FF4D50" />;
          default:
            // return <CloseCircleTwoTone twoToneColor="#FF4D50" />;
            return <MinusCircleTwoTone twoToneColor="#808080" />;
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: IterationInfo): JSX.Element | null => {
        if (record.iterationStatus !== '3001') return null;

        return (
          <span>
            <Button
              className={styles.link}
              type="link"
              onClick={() =>
                rollbackVersion(userId, appId, record.version, record.versionId)
              }
            >
              回滚
            </Button>
          </span>
        );
      }
    }
  ];
  return columns.filter(item => excludeColumns.indexOf((item as any).key) < 0);
};

const showTotal = (total: number): string => `共 ${total} 条`;

const rowKey = (record: Iteration): number => record.iterationId;

export default memo(function IterationTable(props: Props) {
  const { appInfo: app } = useParams();
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const { appId } = JSON.parse(app || '{}');
  const {
    data,
    excludeColumns,
    loading,
    total,
    pageSize,
    page,
    onPageChange
  } = props;
  const tableColumns = useMemo(
    () => getColumns(appId, userId, excludeColumns),
    [appId, userId, excludeColumns]
  );

  return (
    <Table<IterationInfo>
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
