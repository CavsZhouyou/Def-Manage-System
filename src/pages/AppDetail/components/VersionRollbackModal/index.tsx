/*
 * @Author: zhouyou@werun
 * @Descriptions: 版本回退 modal
 * @TodoList: 无
 * @Date: 2020-03-25 19:50:27
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 20:02:11
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { ReviewPublishParams } from '@/service/types';
import { reviewPublishRequest } from '@/service/apis';

interface Props {
  reviewId: number;
  visible: boolean;
  hideModal: () => void;
  updateList: () => void;
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

export default memo(function NotPassModal(props: Props) {
  const { visible, hideModal, reviewId, updateList } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const notPassReview = async (props: ReviewPublishParams): Promise<void> => {
    setLoading(true);

    const result = await reviewPublishRequest(props);

    if (result.success) {
      message.success('审核成功！');

      // 清空表单，隐藏 modal
      form.resetFields();
      setLoading(false);
      hideModal();
      updateList();
    } else {
      message.error(result.message);
      setLoading(false);
    }
  };

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const { failReason } = values;

      notPassReview({
        userId: sessionStorage.getItem('userId') || '',
        reviewId,
        reviewResult: '7002',
        failReason
      });
    });
  }, []);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, []);

  return (
    <div>
      <Modal
        title="审阅结果"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
        okType="danger"
        okText="不通过"
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={submit}
          labelAlign="left"
        >
          <Form.Item
            name="failReason"
            label="未通过原因"
            rules={[
              {
                required: true,
                message: '未通过原因不能为空！'
              }
            ]}
          >
            <Input.TextArea rows={3} placeholder="请输入未通过原因" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
