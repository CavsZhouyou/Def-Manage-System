/*
 * @Author: zhouyou@werun
 * @Descriptions: 成员列表组件
 * @TodoList: 无
 * @Date: 2020-03-15 11:59:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-17 11:04:32
 */

import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Table, Avatar, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import { MemberInfo, GetAppMemberListParams } from '@/service/types';
import {
  getAppMemberListRequest,
  deleteAppMemberRequest
} from '@/service/apis';
import useList from '@/utils/hooks/useList';
import { formatTimestamp, formatTimeToInterval } from '@/utils';
import { memberRoles } from '@/constants';
import styles from './index.module.scss';

const PAGE_SIZE = 5;
const { confirm } = Modal;

const deleteMember = (
  appId: number,
  userId: number,
  userName: string,
  updateList: () => void
): void => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `你确定要删除成员${userName}吗？`,
    okType: 'danger',
    onOk: async () => {
      const result = await deleteAppMemberRequest({ userId, appId });

      if (result.success) {
        message.success('删除成功!');
        updateList();
      } else {
        message.error(result.message);
      }
    }
  });
};

const getColumns = (
  appId: number,
  updateList: () => void
): ColumnProps<MemberInfo>[] => {
  return [
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string, record: MemberInfo): JSX.Element => (
        <div>
          <Avatar
            className={styles.userAvatar}
            size={30}
            src={record.userAvatar}
          />
          {text}
        </div>
      )
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
      key: 'joinTime',
      render: (text: string): string => formatTimestamp(parseInt(text || ''))
    },
    {
      title: '过期时间',
      dataIndex: 'expiredTime',
      key: 'expiredTime',
      render: (text: string): string => formatTimestamp(parseInt(text || ''))
    },
    {
      title: '最后发布',
      dataIndex: 'lastPublishTime',
      key: 'lastPublishTime',
      render: (text: string): string =>
        formatTimeToInterval(parseInt(text || ''))
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text: string): string =>
        memberRoles.filter(item => item.value === text)[0].name
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        if (record.role === '5001') return '';

        return (
          <span>
            <Button className={styles.link} type="link">
              修改权限
            </Button>
            <Button
              className={styles.link}
              type="link"
              onClick={() =>
                deleteMember(appId, record.userId, record.userName, updateList)
              }
            >
              删除
            </Button>
          </span>
        );
      }
    }
  ];
};

const initParams = () => {
  return {};
};

const showTotal = (total: number): string => `共 ${total} 条`;

const rowKey = (record: MemberInfo): number => record.userId;

export default memo(function MemberList() {
  const { loading, list, total, page, onPageChange, updateList } = useList<
    MemberInfo,
    GetAppMemberListParams
  >(PAGE_SIZE, initParams, getAppMemberListRequest);
  const { appInfo: app } = useParams();
  const { appId } = JSON.parse(app || '');
  const columns = useMemo(() => getColumns(appId, updateList), [
    appId,
    updateList
  ]);

  return (
    <div className={styles.memberList}>
      <div className={styles.header}>
        <Title title="成员列表" />
        <Button type="primary">添加成员</Button>
      </div>
      <div className={styles.content}>
        <Table<MemberInfo>
          dataSource={list}
          columns={columns}
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
