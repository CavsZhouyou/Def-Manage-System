/*
 * @Author: zhouyou@werun
 * @Descriptions:
 * @TodoList: 无
 * @Date: 2020-03-16 20:20:04
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 20:58:24
 */

import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Tag, Avatar, Radio, message } from 'antd';
import Title from '@/components/Title';
import BreadcrumbNavbar from '@/components/BreadcrumbNavbar';
import { PublishDetail } from '@/service/types';
import { getPublishDetailRequest } from '@/service/apis';
import { publishTypes } from '@/constants';
import { formatTimeToInterval } from '@/utils';
import useModal from '@/utils/hooks/useModal';
import SelectReviewerModal from './components/SelectReviewerModal';
import styles from './index.module.scss';

const initialState = {
  publishId: 0,
  publisher: '暂无',
  publisherAvatar: '暂无',
  createTime: '0',
  commit: '暂无',
  publishType: '1002',
  publishEnv: 'online',
  publishStatus: '4003',
  reviewId: 0,
  reviewStatus: '7003',
  failReason: '暂无'
};

const viewFailReason = (reason: string): void => {
  Modal.info({
    title: '未通过原因',
    content: reason
  });
};

const getPublishStatus = (value: string): JSX.Element => {
  switch (value) {
    case '4001':
      return <Tag color="green">发布成功</Tag>;
    case '4002':
      return <Tag color="red">发布失败</Tag>;
    default:
      return <Tag color="orange">未发布</Tag>;
  }
};

const getPublishEnv = (value: string): JSX.Element => {
  switch (value) {
    case 'daily':
      return <Tag color="#2db7f5">日常</Tag>;
    default:
      return <Tag color="#f50">线上</Tag>;
  }
};

const getReviewStatus = (
  value: string,
  showModal: any,
  failReason?: string
): JSX.Element => {
  switch (value) {
    case '7001':
      return <Tag color="green">通过</Tag>;
    case '7002':
      return (
        <span>
          <Tag color="red">未通过</Tag>
          <Button
            type="link"
            onClick={() =>
              viewFailReason(failReason || '审核者未填写未通过原因')
            }
          >
            查看原因
          </Button>
        </span>
      );
    case '7003':
      return <Tag color="orange">审阅中</Tag>;
    default:
      return (
        <Button className={styles.link} type="link" onClick={() => showModal()}>
          发起审阅
        </Button>
      );
  }
};

const PublishInfo = (props: {
  appId: number;
  iterationId: number;
  publishId: number;
}): JSX.Element => {
  const { appId, iterationId, publishId } = props;
  const [visible, showModal, hideModal] = useModal();
  const [publishDetail, setPublishDetail] = useState<PublishDetail>(
    initialState
  );
  const {
    publisher,
    publisherAvatar,
    commit,
    createTime,
    publishType,
    publishEnv,
    publishStatus,
    reviewId,
    reviewStatus,
    failReason
  } = publishDetail;
  const publishTypeName = publishTypes.filter(
    item => item.value === publishType
  )[0].name;

  useEffect(() => {
    getPublishDetail();
  }, []);

  // 获取发布详情
  const getPublishDetail = async (): Promise<void> => {
    const params = {
      appId,
      iterationId,
      publishId
    };

    const result = await getPublishDetailRequest(params);

    if (result.success) {
      setPublishDetail(result.data);
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className={styles.publishInfo}>
      <Title title="发布详情" />
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>任务 ID：</span>
          <span className={styles.taskId}>{publishId}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>创建时间：</span>
          <span className={styles.createTime}>
            {formatTimeToInterval(parseInt(createTime || ''))}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>发布人：</span>
          <div className={styles.publisher}>
            <Avatar
              className={styles.publisherAvatar}
              size={30}
              src={publisherAvatar}
            />
            {publisher}
          </div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>commit：</span>
          <span className={styles.commit}>{commit}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>类型：</span>
          <span className={styles.type}>{publishTypeName}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>环境：</span>
          {getPublishEnv(publishEnv)}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>发布状态：</span>
          {getPublishStatus(publishStatus)}
        </div>
        <br />
        <br />
        <div className={styles.infoItem}>
          <span className={styles.label}>审阅状态：</span>
          {getReviewStatus(reviewStatus, showModal, failReason)}
          <SelectReviewerModal
            visible={visible}
            publishInfo={{
              appId,
              iterationId,
              publishId
            }}
            hideModal={hideModal}
          />
        </div>
      </div>
    </div>
  );
};

const PublishResult = (): JSX.Element => {
  return (
    <div className={styles.publishResult}>
      <div className={styles.header}>
        <Title title="发布日志" />
      </div>
      <Radio.Group
        className={styles.displaySwitch}
        defaultValue="a"
        buttonStyle="solid"
      >
        <Radio.Button value="a">结果</Radio.Button>
        <Radio.Button value="b">日志</Radio.Button>
      </Radio.Group>
      {/* <Descriptions bordered size="small">
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      </Descriptions> */}
      <div className={styles.publishLog}>
        Waiting...
        <br /> Connecting To OmegaXYZ.com...
        <br />
        Connection Established.
        <br />
        Copyright (c) 2018 OmegaXYZ.com All Rights Reserved.
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        <br />
        [root@host~] Login : xyjigsaw
        <br />
        [root@host~] password : ******
        <br />
        [root@host~] Access Is Granted！
        <br />
        //欢迎访问OmegaXYZ.com
        <br />
        [root@host~] Attention:请查找时简化关键字~
      </div>
    </div>
  );
};

export default memo(function PublishDetail() {
  const { publishInfo } = useParams();
  const { appId, iterationId, appName, iterationName, publishId } = JSON.parse(
    decodeURIComponent(publishInfo || '{}')
  );

  return (
    <div className={styles.publishDetail}>
      <BreadcrumbNavbar
        mode={3}
        appId={appId}
        appName={appName}
        iterationId={iterationId}
        iterationName={iterationName}
      />
      <div className={styles.content}>
        <PublishInfo
          appId={appId}
          iterationId={iterationId}
          publishId={publishId}
        />
        <PublishResult />
      </div>
    </div>
  );
});
