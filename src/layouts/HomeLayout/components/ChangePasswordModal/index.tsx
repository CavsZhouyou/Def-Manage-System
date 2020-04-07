/*
 * @Author: zhouyou@werun
 * @Descriptions: 修改密码 modal
 * @TodoList: 无
 * @Date: 2020-03-19 17:37:30
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-22 12:34:57
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { ChangePasswordParams } from '@/service/types';
import { changePasswordRequest } from '@/service/apis';
import md5 from 'md5';
import styles from './index.module.scss';

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};

export default memo(function ChangePasswordModal(props: Props) {
  const { visible, hideModal } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const changePassword = useCallback(
    async (props: ChangePasswordParams): Promise<void> => {
      setLoading(true);

      const result = await changePasswordRequest(props);

      if (result.success) {
        message.success('修改成功！');

        // 清空表单，隐藏 modal
        form.resetFields();
        hideModal();
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [form, hideModal]
  );

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const { oldPassword, newPassword } = values;

      changePassword({
        userId: sessionStorage.getItem('userId') || '',
        oldPassword: md5(oldPassword),
        newPassword: md5(newPassword)
      });
    });
  }, [changePassword, form]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  return (
    <div>
      <Modal
        title="修改登录密码"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
        className={styles.changePasswordModal}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={submit}
          labelAlign="left"
        >
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[
              {
                required: true,
                message: '原密码不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className={styles.lockIcon} />}
              placeholder="原密码"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码！'
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className={styles.lockIcon} />}
              placeholder="新密码"
            />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认新密码！'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的新密码不一致！');
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.lockIcon} />}
              placeholder="新密码"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
