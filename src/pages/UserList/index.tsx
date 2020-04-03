/*
 * @Author: zhouyou@werun
 * @Descriptions: 用户列表
 * @TodoList: 无
 * @Date: 2020-03-17 11:32:50
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 20:14:23
 */

import React, { memo, useMemo } from 'react';
import { Modal, Form, Table, Avatar, Button, Input, message } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Title from '@/components/Title';
import {
  getUserListRequest,
  deleteUserRequest,
  resetPasswordRequest
} from '@/service/apis';
import {
  UserInfo,
  GetUserListParams,
  DepartmentOption,
  PostOption
} from '@/service/types';
import useList from '@/utils/hooks/useList';
import useModal from '@/utils/hooks/useModal';
import AddUserModal from './components/AddUserModal';
import styles from './index.module.scss';

interface FormValues {
  userName?: string;
}

interface InitParams {
  userName?: string;
}

const { confirm } = Modal;
const { Search } = Input;
const PAGE_SIZE = 7;

const getColumns = (updateList: () => void): ColumnProps<UserInfo>[] => {
  return [
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
      key: 'department',
      render: (department: DepartmentOption): string =>
        department.departmentName
    },
    {
      title: '职位',
      dataIndex: 'post',
      key: 'post',
      render: (post: PostOption): string => post.postName
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: UserInfo): JSX.Element => (
        <span>
          <Button
            className={styles.link}
            type="link"
            onClick={() => resetPassword(record.userId, record.userName)}
          >
            重置密码
          </Button>
          <Button
            className={styles.link}
            type="link"
            onClick={() =>
              deleteUser(record.userId, record.userName, updateList)
            }
          >
            删除用户
          </Button>
        </span>
      )
    }
  ];
};

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

const deleteUser = (
  userId: number,
  userName: string,
  updateList: () => void
): void => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `你确定要删除用户${userName}吗？`,
    okType: 'danger',
    onOk: async () => {
      const result = await deleteUserRequest({ userId });

      if (result.success) {
        message.success('删除成功!');
        updateList();
      } else {
        message.error(result.message);
      }
    }
  });
};

const resetPassword = (userId: number, userName: string): void => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `你确定要重置用户${userName}的密码吗？`,
    onOk: async () => {
      const result = await resetPasswordRequest({ userId });

      if (result.success) {
        message.success('重置成功!');
      } else {
        message.error(result.message);
      }
    }
  });
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
        <Button className={styles.addButton} type="primary" onClick={showModal}>
          添加用户
        </Button>
        <Form.Item name="userName">
          <Search
            className={styles.searchInput}
            placeholder="请输入用户名"
            onSearch={updateList}
            enterButton
          />
        </Form.Item>
        <AddUserModal
          visible={visible}
          hideModal={hideModal}
          updateList={updateList}
        />
      </div>
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
  const columns = useMemo(() => getColumns(updateList), [updateList]);

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
