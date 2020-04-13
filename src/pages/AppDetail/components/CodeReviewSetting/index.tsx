/*
 * @Author: zhouyou@werun
 * @Descriptions: 代码审阅设置
 * @TodoList: 无
 * @Date: 2020-03-16 10:32:44
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 10:48:11
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import { message, Form, Switch, Button, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { reviewerScopeTypes } from '@/constants';
import { EditCodeReviewSettingParams } from '@/service/types';
import {
  getCodeReviewSettingRequest,
  editCodeReviewSettingRequest
} from '@/service/apis';
import { delay } from '@/utils';
import styles from './index.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

const initialValues = {
  isOpen: false,
  reviewerScop: '8001'
};

export default memo(function CodeReviewSetting() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { appInfo } = useParams();
  const { appId } = JSON.parse(decodeURIComponent(appInfo || '{}'));
  const userId = parseInt(sessionStorage.getItem('userId') || '');
  const [form] = Form.useForm();

  useEffect(() => {
    getCodeReviewSetting();
  }, []);

  // 获取应用代码审阅设置信息
  const getCodeReviewSetting = async (): Promise<void> => {
    const params = {
      appId
    };

    const result = await getCodeReviewSettingRequest(params);

    if (result.success) {
      setIsOpen(result.data.isOpen);
      form.setFieldsValue(result.data);
    } else {
      message.error(result.message);
    }
  };

  const editCodeReviewInfo = useCallback(
    async (params: EditCodeReviewSettingParams): Promise<void> => {
      setLoading(true);

      const result = await editCodeReviewSettingRequest(params);

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
      const { isOpen, reviewerScope } = values;
      editCodeReviewInfo({ isOpen, reviewerScope, appId, userId });
    },
    [editCodeReviewInfo, appId, userId]
  );

  const onFinishFailed = () => {
    console.log('Failed:');
  };

  const onOpenChange = useCallback(values => {
    setIsOpen(values);
  }, []);

  return (
    <div className={styles.codeReviewSetting}>
      <Form
        {...layout}
        form={form}
        name="basic"
        onFinish={submit}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <Form.Item name="isOpen" label="开启代码审阅" valuePropName="checked">
          <Switch onChange={onOpenChange} />
        </Form.Item>
        <Form.Item name="reviewerScope" label="可选审阅人">
          <Select
            className={styles.select}
            placeholder="请关联可选审阅人范围"
            disabled={!isOpen}
          >
            {reviewerScopeTypes.map((type, index) => (
              <Option value={type.value} key={index}>
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
