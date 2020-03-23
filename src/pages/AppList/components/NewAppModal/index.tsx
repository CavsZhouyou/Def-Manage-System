/*
 * @Author: zhouyou@werun
 * @Descriptions: 新建应用 Modal
 * @TodoList: 无
 * @Date: 2020-03-20 20:17:26
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 15:48:00
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { publishTypes, productTypes } from '@/constants';
import { CreateAppParams } from '@/service/types';
import { createAppRequest } from '@/service/apis';
import { useHistory } from 'react-router-dom';
import { delay } from '@/utils';

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
  const history = useHistory();

  const createApp = useCallback(
    async (params: CreateAppParams): Promise<void> => {
      setLoading(true);

      const result = await createAppRequest(params);

      if (result.success) {
        message.success('创建成功！');
        await delay(1000);

        const { appId } = result.data;
        history.push(`/home/appDetail/${appId}`);
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [history]
  );

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const {
        appName,
        repository,
        description,
        productType,
        publishType
      } = values;

      createApp({
        appName,
        repository,
        description,
        productType,
        publishType
      });
    });
  }, [form, createApp]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

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
            name="productType"
            label="关联产品"
            rules={[
              {
                required: true,
                message: '关联产品不能为空！'
              }
            ]}
          >
            <Select placeholder="请关联产品">
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
          >
            <Select placeholder="请选择发布类型">
              {publishTypes.map((type, index) => (
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
