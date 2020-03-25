/*
 * @Author: zhouyou@werun
 * @Descriptions: 修改成员权限 modal
 * @TodoList: 无
 * @Date: 2020-03-25 10:30:42
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 11:02:32
 */

import React, { memo, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Form, Select, message } from 'antd';
import { ChangeMemberRightsParams } from '@/service/types';
import { changeMemberRightsRequest } from '@/service/apis';
import { delay } from '@/utils';
import { memberRoles, useTimeTypes } from '@/constants';

const { Option } = Select;

interface Props {
  visible: boolean;
  userInfo: {
    userId: number;
    role: string;
  };
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

export default memo(function ChangeMemberRightsModal(props: Props) {
  const { visible, userInfo, hideModal, updateList } = props;
  const { userId, role } = userInfo;
  const initialValues = {
    role
  };
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const changeMemberRights = useCallback(
    async (params: ChangeMemberRightsParams): Promise<void> => {
      setLoading(true);

      const result = await changeMemberRightsRequest(params);

      if (result.success) {
        message.success('修改成功！');
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
      const { role, useTime } = values;

      changeMemberRights({
        userId,
        useTime,
        role
      });
    });
  }, [form, changeMemberRights, userId]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  return (
    <div>
      <Modal
        title="修改应用成员权限"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={submit}
          initialValues={initialValues}
        >
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
