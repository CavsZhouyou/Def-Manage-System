/*
 * @Author: zhouyou@werun
 * @Descriptions: 成员列表组件
 * @TodoList: 无
 * @Date: 2020-03-15 11:59:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 19:07:21
 */

import React, { memo } from 'react';
import { Table, Avatar, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import styles from './index.module.scss';

interface Member {
  key: number;
  id: number;
  name: string;
  avatar: string;
  joinTime: string;
  expiredTime: string;
  lastPublishTime: string;
  role: string;
}

const data: Member[] = [
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    joinTime: '2019/7/8',
    expiredTime: '2020/2/9',
    lastPublishTime: '2020/1/23',
    role: '管理员'
  },
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    joinTime: '2019/7/8',
    expiredTime: '2020/2/9',
    lastPublishTime: '2020/1/23',
    role: '管理员'
  },
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    joinTime: '2019/7/8',
    expiredTime: '2020/2/9',
    lastPublishTime: '2020/1/23',
    role: '管理员'
  }
];

const columns: ColumnProps<Member>[] = [
  {
    title: '用户',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: Member): JSX.Element => (
      <div>
        <Avatar className={styles.userAvatar} size={30} src={record.avatar} />
        {text}
      </div>
    )
  },
  {
    title: '加入时间',
    dataIndex: 'joinTime',
    key: 'joinTime'
  },
  {
    title: '过期时间',
    dataIndex: 'expiredTime',
    key: 'expiredTime'
  },
  {
    title: '最后发布',
    dataIndex: 'lastPublishTime',
    key: 'lastPublishTime'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="link" style={{ marginRight: 16 }}>
          修改权限
        </Button>
        <Button type="link">删除</Button>
      </span>
    )
  }
];

export default memo(function MemberList() {
  return (
    <div className={styles.memberList}>
      <div className={styles.header}>
        <Title title="成员列表" />
        <Button type="primary">添加成员</Button>
      </div>
      <div className={styles.content}>
        <Table<Member>
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
