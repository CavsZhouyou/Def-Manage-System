/*
 * @Author: zhouyou@werun
 * @Descriptions: 新建应用 Modal
 * @TodoList: 无
 * @Date: 2020-03-20 20:17:26
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 20:20:41
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
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

export default memo(function NewAppModal(props: Props) {
  const { visible, hideModal } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const submit = useCallback(() => {
    form.validateFields().then(values => {});
  }, []);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, []);

  return (
    <div>
      <Modal
        title="新建应用"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Form {...formItemLayout} form={form} onFinish={submit}>
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
