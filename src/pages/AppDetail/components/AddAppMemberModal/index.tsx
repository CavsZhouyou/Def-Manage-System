/*
 * @Author: zhouyou@werun
 * @Descriptions: 新增应用成员 modal
 * @TodoList: 无
 * @Date: 2020-03-25 10:30:14
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 11:03:14
 */
import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { AddAppMemberParams } from '@/service/types';
import { addAppMemberRequest } from '@/service/apis';
import { delay } from '@/utils';
import { memberRoles, useTimeTypes } from '@/constants';

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

export default memo(function AddAppMemberModal(props: Props) {
  const { visible, hideModal, updateList } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const addAppMember = useCallback(
    async (params: AddAppMemberParams): Promise<void> => {
      setLoading(true);

      const result = await addAppMemberRequest(params);

      if (result.success) {
        message.success('添加成功！');
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
      const { userName, role, useTime } = values;

      addAppMember({
        userName,
        useTime,
        role
      });
    });
  }, [form, addAppMember]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  return (
    <div>
      <Modal
        title="添加应用成员"
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
            name="role"
            label="成员角色"
            rules={[
              {
                required: true,
                message: '成员角色不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择成员角色">
              {memberRoles.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="useTime"
            label="使用时长"
            rules={[
              {
                required: true,
                message: '使用时间不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择使用时长">
              {useTimeTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
