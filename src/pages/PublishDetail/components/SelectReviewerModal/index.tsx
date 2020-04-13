/*
 * @Author: zhouyou@werun
 * @Descriptions: 选择审阅人 Modal
 * @TodoList: 无
 * @Date: 2020-03-27 20:53:10
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 22:36:04
 */

import React, { memo, useState, useCallback } from 'react';
import { Modal, Form, Select, message, Input } from 'antd';
import { ApplyCodeReviewParams, ReviewerOption } from '@/service/types';
import {
  applyCodeReviewRequest,
  getReviewerOptionsRequest
} from '@/service/apis';
import { delay } from '@/utils';
import useAsyncOptions from '@/utils/hooks/useAsyncOptions';

const { Option } = Select;

interface Props {
  visible: boolean;
  publishInfo: {
    appId: number;
    iterationId: number;
    publishId: number;
  };
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

export default memo(function SelectReviewerModal(props: Props) {
  const { visible, publishInfo, hideModal } = props;
  const { appId, publishId } = publishInfo;
  const [loading, setLoading] = useState(false);
  const [reviewerOptions] = useAsyncOptions<ReviewerOption>(() => {
    return getReviewerOptionsRequest({
      creatorId: sessionStorage.getItem('userId') || '',
      appId
    });
  });
  const [form] = Form.useForm();

  const applyCodeReview = useCallback(
    async (params: ApplyCodeReviewParams): Promise<void> => {
      setLoading(true);

      const result = await applyCodeReviewRequest(params);

      if (result.success) {
        message.success('发起审阅成功！');
        await delay(1000);

        setLoading(false);
        form.resetFields();
        hideModal();
        window.location.reload();
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [form, hideModal]
  );

  const submit = useCallback(() => {
    form.validateFields().then(values => {
      const { reviewerId, reviewTitle } = values;

      applyCodeReview({
        publishId,
        userId: sessionStorage.getItem('userId') || '',
        reviewerId,
        reviewTitle
      });
    });
  }, [form, publishId, applyCodeReview]);

  const onCancel = useCallback(() => {
    form.resetFields();
    hideModal();
  }, [form, hideModal]);

  return (
    <div>
      <Modal
        title="发起代码审阅"
        visible={visible}
        onOk={submit}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Form {...formItemLayout} form={form} onFinish={submit}>
          <Form.Item
            name="reviewerId"
            label="审阅人"
            rules={[
              {
                required: true,
                message: '审阅人不能为空！'
              }
            ]}
          >
            <Select placeholder="请选择审阅人">
              {reviewerOptions.map((type, index) => (
                <Option value={type.userId} key={index}>
                  {type.userName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="reviewTitle"
            label="审阅标题"
            rules={[
              {
                required: true,
                message: '审阅标题不能为空！'
              },
              { max: 15, message: '审阅标题不能超过 15 个字符！' }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入审阅标题" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
