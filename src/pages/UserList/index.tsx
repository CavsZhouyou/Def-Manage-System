/*
 * @Author: zhouyou@werun
 * @Descriptions: 用户列表
 * @TodoList: 无
 * @Date: 2020-03-17 11:32:50
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 12:22:59
 */

import React, { memo } from 'react';
import { Form, Table, Avatar, Button, Input } from 'antd';
import { ColumnProps } from 'antd/es/table';
import Title from '@/components/Title';
import { getUserListRequest } from '@/service/apis';
import { UserInfo, GetUserListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import useModal from '@/utils/hooks/useModal';
import styles from './index.module.scss';

interface FormValues {
  userName?: string;
}

interface InitParams {
  userName?: string;
}

const { Search } = Input;
const PAGE_SIZE = 7;

const columns: ColumnProps<UserInfo>[] = [
  {
    title: '用户',
    dataIndex: 'userName',
    key: 'userName',
    render: (text: string, record: UserInfo): JSX.Element => (
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
    title: '工号',
    dataIndex: 'userId',
    key: 'userId'
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

const showTotal = (total: number): string => `共 ${total} 条`;
const rowKey = (record: UserInfo): number => record.userId;

const initParams = (formValues: FormValues): InitParams => {
  const { userName } = formValues;
  const params: any = {};

  if (userName) {
    params.userName = userName;
  }

  return params;
};

const SearchForm = memo((props: { form: any; updateList: () => void }) => {
  const { form, updateList } = props;
  const [visible, showModal, hideModal] = useModal();

  return (
    <Form layout="inline" form={form} className={styles.form}>
      <div className={styles.leftActions}>
        <Title title="用户列表" />
      </div>
      <div className={styles.rightActions}>
        <Button className={styles.addButton} type="primary">
          添加成员
        </Button>
        <Form.Item name="userName">
          <Search
            className={styles.searchInput}
            placeholder="请输入用户名"
            onSearch={updateList}
            enterButton
          />
        </Form.Item>
      </div>
      {/* <NewIterationModal visible={visible} hideModal={hideModal} /> */}
    </Form>
  );
});

export default memo(function UserList() {
  const {
    form,
    loading,
    list,
    total,
    page,
    updateList,
    onPageChange
  } = useList<UserInfo, GetUserListParams>(
    PAGE_SIZE,
    initParams,
    getUserListRequest
  );

  return (
    <div className={styles.userList}>
      <SearchForm form={form} updateList={updateList} />
      <div className={styles.content}>
        <Table<UserInfo>
          rowKey={rowKey}
          columns={columns}
          dataSource={list}
          loading={loading}
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
