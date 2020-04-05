/*
 * @Author: zhouyou@werun
 * @Descriptions: 新增用户 modal
 * @TodoList: 无
 * @Date: 2020-03-23 15:49:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 22:42:38
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import {
  AddUserParams,
  DepartmentOption,
  PostOption,
  UserRoleOption
} from '@/service/types';
import {
  addUserRequest,
  getDepartmentListRequest,
  getPostListRequest,
  getUserRoleListRequest
} from '@/service/apis';
import { delay } from '@/utils';
import useAsyncOptions from '@/utils/hooks/useAsyncOptions';

const { Option } = Select;

interface Props {
  visible: boolean;
  hideModal: () => void;
  updateList: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

export default memo(function AddUserModal(props: Props) {
  const { visible, hideModal, updateList } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [departmentOptions] = useAsyncOptions<DepartmentOption>(
    getDepartmentListRequest
  );
  const [postOptions] = useAsyncOptions<PostOption>(getPostListRequest);
  const [userRoleOptions] = useAsyncOptions<UserRoleOption>(
    getUserRoleListRequest
  );

  const addUser = useCallback(
    async (params: AddUserParams): Promise<void> => {
      setLoading(true);

      const result = await addUserRequest(params);

      if (result.success) {
        message.success('创建成功！');
        await delay(1000);

        setLoading(false);
        form.resetFields();
        hideModal();
        updateList();
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [form, hideModal, updateList]
  );

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const { userName, userId, userRoleId, departmentId, postId } = values;

      addUser({
        userName,
        userId,
        userRoleId,
        departmentId,
        postId
      });
    });
  }, [form, addUser]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  return (
    <div>
      <Modal
        title="新增用户"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Form {...formItemLayout} form={form} onFinish={submit}>
          <Form.Item
            name="userName"
            label="用户名称"
            rules={[
              {
                required: true,
                message: '用户名称不能为空！'
              },
              { max: 4, message: '应用描述不能超过 4 个字符！' }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item
            name="userId"
            label="用户工号"
            rules={[
              {
                required: true,
                message: '用户工号不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入用户工号" />
          </Form.Item>
          <Form.Item
            name="roleId"
            label="用户角色"
            rules={[
              {
                required: true,
                message: '用户角色不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择用户角色">
              {userRoleOptions.map((type, index) => (
                <Option value={type.roleId} key={index}>
                  {type.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="departmentId"
            label="所属部门"
            rules={[
              {
                required: true,
                message: '所属部门不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择所属部门">
              {departmentOptions.map((type, index) => (
                <Option value={type.departmentId} key={index}>
                  {type.departmentName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="postId"
            label="用户职位"
            rules={[
              {
                required: true,
                message: '用户职位不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择用户职位">
              {postOptions.map((type, index) => (
                <Option value={type.postId} key={index}>
                  {type.postName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
