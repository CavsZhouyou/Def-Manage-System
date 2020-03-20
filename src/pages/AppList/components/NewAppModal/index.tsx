/*
 * @Author: zhouyou@werun
 * @Descriptions: 新建应用 Modal
 * @TodoList: 无
 * @Date: 2020-03-20 20:17:26
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 21:57:54
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { publishTypes, productTypes } from '@/constants';
import styles from './index.module.scss';

const { Option } = Select;

interface Props {
  visible: boolean;
  hideModal: () => void;
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

export default memo(function NewAppModal(props: Props) {
  const { visible, hideModal } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      console.log(values);
    });
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
            name="appName"
            label="应用名称"
            rules={[
              {
                required: true,
                message: '应用名称不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item
            name="repository"
            label="应用仓库"
            rules={[
              {
                required: true,
                message: '应用仓库不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入应用仓库地址" />
          </Form.Item>
          <Form.Item
            name="description"
            label="应用描述"
            rules={[
              {
                required: true,
                message: '应用描述不能为空！'
              },
              { max: 30, message: '应用描述不能超过 30 个字符！' }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入应用描述" />
          </Form.Item>
          <Form.Item
            name="productTypes"
            label="产品"
            rules={[
              {
                required: true,
                message: '发布类型不能为空！'
              }
            ]}
            hasFeedback
          >
            <Select placeholder="请选择产品">
              {productTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="publishType"
            label="发布类型"
            rules={[
              {
                required: true,
                message: '发布类型不能为空！'
              }
            ]}
            hasFeedback
          >
            <Select placeholder="请选择发布类型">
              {publishTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="pagePrefix"
            label="页面前缀"
            rules={[
              {
                required: true,
                message: '页面前缀不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入页面前缀" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
