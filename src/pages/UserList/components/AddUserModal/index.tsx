/*
 * @Author: zhouyou@werun
 * @Descriptions: 新增用户 modal
 * @TodoList: 无
 * @Date: 2020-03-23 15:49:22
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 11:03:48
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { AddUserParams, DepartmentOption, PostOption } from '@/service/types';
import {
  addUserRequest,
  getDepartmentListRequest,
  getPostListRequest
} from '@/service/apis';
import { useHistory } from 'react-router-dom';
import { delay } from '@/utils';

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
  const [departmentOptions, setDepartmentOptions] = useState<
    DepartmentOption[]
  >([]);
  const [postOptions, setPostOptions] = useState<PostOption[]>([]);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    getDepartmentOptions();
    getPostOptions();
  }, []);

  // 获取部门列表
  const getDepartmentOptions = useCallback(async () => {
    const result = await getDepartmentListRequest();

    if (result.success) {
      setDepartmentOptions(result.data.list);
    } else {
      setDepartmentOptions([]);
      message.error(result.message);
    }
  }, []);

  // 获取职位列表
  const getPostOptions = useCallback(async () => {
    const result = await getPostListRequest();

    if (result.success) {
      setPostOptions(result.data.list);
    } else {
      setPostOptions([]);
      message.error(result.message);
    }
  }, []);

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
      const { userName, department, post } = values;

      addUser({
        userName,
        department,
        post
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
            name="department"
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
            name="post"
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
