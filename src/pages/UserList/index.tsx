/*
 * @Author: zhouyou@werun
 * @Descriptions: 用户列表
 * @TodoList: 无
 * @Date: 2020-03-17 11:32:50
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-17 11:34:05
 */

import React, { memo } from 'react';
import { Table, Avatar, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import styles from './index.module.scss';

interface User {
  key: number;
  id: number;
  name: string;
  avatar: string;
  department: string;
  post: string;
}

const data: User[] = [
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    department: '淘系技术部',
    post: '实习前端工程师'
  },
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    department: '淘系技术部',
    post: '实习前端工程师'
  },
  {
    key: 0,
    id: 0,
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    department: '淘系技术部',
    post: '实习前端工程师'
  }
];

const columns: ColumnProps<User>[] = [
  {
    title: '用户',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: User): JSX.Element => (
      <div>
        <Avatar className={styles.userAvatar} size={30} src={record.avatar} />
        {text}
      </div>
    )
  },
  {
    title: '工号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: '职位',
    dataIndex: 'post',
    key: 'post'
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <Button className={styles.link} type="link">
          重置密码
        </Button>
        <Button className={styles.link} type="link">
          删除用户
        </Button>
      </span>
    )
  }
];

export default memo(function UserList() {
  return (
    <div className={styles.userList}>
      <div className={styles.header}>
        <Title title="用户列表" />
        <Button type="primary">添加成员</Button>
      </div>
      <div className={styles.content}>
        <Table<User>
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
