/*
 * @Author: zhouyou@werun
 * @Descriptions: 新建迭代 modalj
 * @TodoList: 无
 * @Date: 2020-03-22 18:16:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-22 21:06:06
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import {
  CreateIterationParams,
  AppOption,
  BranchOption
} from '@/service/types';
import {
  createIterationRequest,
  getMyAppListRequest,
  getAppBranchesRequest
} from '@/service/apis';
import { useHistory } from 'react-router-dom';
import { delay } from '@/utils';

const { Option } = Select;

interface Props {
  appId?: number;
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

export default memo(function NewIterationModal(props: Props) {
  const { visible, hideModal, appId } = props;
  const [myAppOptions, setMyAppOptions] = useState<AppOption[]>([]);
  const [branchOptions, setBranchOptions] = useState<BranchOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const initialValues = {
    appId
  };

  // 模拟 componentDidmount
  useEffect(() => {
    getAppOptions();

    // 应用确定时，直接获取分支
    if (initialValues.appId) {
      getBranchOptions(initialValues.appId);
    }
  }, []);

  // 获取应用列表
  const getAppOptions = useCallback(async () => {
    const result = await getMyAppListRequest({ userId });

    if (result.success) {
      setMyAppOptions(result.data.list);
    } else {
      setMyAppOptions([]);
      message.error(result.message);
    }
  }, [userId]);

  // 获取分支列表
  const getBranchOptions = useCallback(async appId => {
    const result = await getAppBranchesRequest({ appId });

    if (result.success) {
      setBranchOptions(result.data.list);
    } else {
      setBranchOptions([]);
      message.error(result.message);
    }
  }, []);

  const createIteration = useCallback(
    async (params: CreateIterationParams): Promise<void> => {
      setLoading(true);

      const result = await createIterationRequest(params);

      if (result.success) {
        message.success('创建成功！');
        await delay(1000);

        const { iterationId } = result.data;
        history.push(`/home/iterationDetail/${iterationId}`);
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [history]
  );

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const { appId, branch, iterationName, description } = values;

      createIteration({
        appId: parseInt(appId || ''),
        userId: parseInt(sessionStorage.getItem('userId') || ''),
        branch,
        iterationName,
        description
      });
    });
  }, [form, createIteration]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  // 选择应用回掉，更新分支列表
  const onAppIdChange = useCallback(
    async value => {
      getBranchOptions(value);
    },
    [getBranchOptions]
  );

  return (
    <div>
      <Modal
        title="新建迭代"
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
            name="appId"
            label="关联应用"
            rules={[
              {
                required: true,
                message: '关联应用不能为空！'
              }
            ]}
          >
            <Select
              placeholder="请关联应用"
              onChange={onAppIdChange}
              disabled={!!initialValues.appId}
            >
              {myAppOptions.map((type, index) => (
                <Option value={type.appId} key={index}>
                  {type.appName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="branch"
            label="关联分支"
            rules={[
              {
                required: true,
                message: '关联分支不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择关联分支">
              {branchOptions.map((type, index) => (
                <Option value={type.branchId} key={index}>
                  {type.branchName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="iterationName"
            label="迭代名称"
            rules={[
              {
                required: true,
                message: '迭代名称不能为空！'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入迭代名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="迭代描述"
            rules={[
              {
                required: true,
                message: '迭代描述不能为空！'
              },
              { max: 30, message: '迭代描述不能超过 30 个字符！' }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入迭代描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
