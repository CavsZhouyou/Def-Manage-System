/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用基本设置
 * @TodoList: 无
 * @Date: 2020-03-16 09:36:07
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:49:26
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { message, Form, Input, Button, Select } from 'antd';
import { EditBasicInfoParams, ProductType } from '@/service/types';
import {
  getAppBasicInfoRequest,
  editBasicInfoRequest,
  getProductTypeListRequest
} from '@/service/apis';
import { delay } from '@/utils';
import styles from './index.module.scss';
import useAsyncOptions from '@/utils/hooks/useAsyncOptions';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

const initialValues = {
  description: '暂无',
  product: '2001'
  // repository: '暂无'
};

export default memo(function BasicSetting() {
  const [loading, setLoading] = useState<boolean>(false);
  const { appInfo } = useParams();
  const { appId } = JSON.parse(decodeURIComponent(appInfo || '{}'));
  const userId = sessionStorage.getItem('userId') || '';
  const [form] = Form.useForm();
  const [productTypes] = useAsyncOptions<ProductType>(
    getProductTypeListRequest
  );

  useEffect(() => {
    getAppBasicInfo();
  }, []);

  // 获取应用基本设置信息
  const getAppBasicInfo = async (): Promise<void> => {
    const params = {
      appId,
      userId
    };

    const result = await getAppBasicInfoRequest(params);

    if (result.success) {
      const {
        description,
        productType: { code: product }
      } = result.data;
      form.setFieldsValue({
        description,
        product
      });
    } else {
      message.error(result.message);
    }
  };

  const editBasicInfo = useCallback(
    async (params: EditBasicInfoParams): Promise<void> => {
      setLoading(true);

      const result = await editBasicInfoRequest(params);

      if (result.success) {
        message.success('修改成功');
        await delay(1000);
        setLoading(false);
        window.location.reload();
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    []
  );

  const submit = useCallback(
    (values): void => {
      const { description, product } = values;
      editBasicInfo({ description, product, appId, userId });
    },
    [editBasicInfo, appId, userId]
  );

  const onFinishFailed = () => {
    console.log('Failed:');
  };

  return (
    <div className={styles.basicSetting}>
      <Form
        {...layout}
        name="basic"
        form={form}
        onFinish={submit}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        {/* <Form.Item label="仓库" name="repository">
          <a href={initialValues.repository}>{initialValues.repository}</a>
        </Form.Item> */}
        <Form.Item
          label="应用描述"
          name="description"
          rules={[
            { required: true, message: '应用描述不能为空！' },
            { max: 30, message: '应用描述不能超过 30 个字符！' }
          ]}
        >
          <Input maxLength={30} placeholder="请输入应用描述" />
        </Form.Item>
        <Form.Item
          name="product"
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
              <Option value={type.code} key={index}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
