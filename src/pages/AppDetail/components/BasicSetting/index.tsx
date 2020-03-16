/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用基本设置
 * @TodoList: 无
 * @Date: 2020-03-16 09:36:07
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:08:10
 */

import React, { memo } from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './index.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

export default memo(function BasicSetting() {
  const onFinish = () => {
    console.log('Success:');
  };

  const onFinishFailed = () => {
    console.log('Failed:');
  };

  return (
    <div className={styles.basicSetting}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="仓库" name="repository">
          <a href="">https://github.com/CavsZhouyou/def-manage-system</a>
        </Form.Item>
        <Form.Item
          label="应用描述"
          name="description"
          rules={[
            { required: true, message: '应用描述不能为空！' },
            { max: 30, message: '应用描述不能超过 30 个字符！' }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item name="product" label="产品关联">
          <Select placeholder="请选择关联产品" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
