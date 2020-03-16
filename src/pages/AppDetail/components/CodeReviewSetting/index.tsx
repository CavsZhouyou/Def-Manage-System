/*
 * @Author: zhouyou@werun
 * @Descriptions: 代码审阅设置
 * @TodoList: 无
 * @Date: 2020-03-16 10:32:44
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:48:11
 */

import React, { memo } from 'react';
import { Form, Switch, Button, Select } from 'antd';
import styles from './index.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

export default memo(function CodeReviewSetting() {
  const onFinish = () => {
    console.log('Success:');
  };

  const onFinishFailed = () => {
    console.log('Failed:');
  };
  return (
    <div className={styles.codeReviewSetting}>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="codeReview" label="开启代码审阅">
          <Switch />
        </Form.Item>
        <Form.Item name="product" label="可选审阅人">
          <Select
            className={styles.select}
            placeholder="请选择审阅人范围"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
