/*
 * @Author: zhouyou@werun
 * @Descriptions: 代码审阅记录
 * @TodoList: 无
 * @Date: 2020-03-16 06:40:28
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 19:53:20
 */

import React, { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Avatar, Tag, Table, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import { CodeReviewInfo, GetCodeReviewListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import Title from '@/components/Title';
import { getCodeReviewListRequest, reviewPublishRequest } from '@/service/apis';
import { ClockCircleOutlined } from '@ant-design/icons';
import { formatTimestamp } from '@/utils';
import useModal from '@/utils/hooks/useModal';
import NotPassModal from '../NotPassModal';
import styles from './index.module.scss';

const PAGE_SIZE = 7;
const { confirm } = Modal;

const initParams = () => {
  return {};
};

const showTotal = (total: number): string => `共 ${total} 条`;

const rowKey = (record: CodeReviewInfo): number => record.reviewId;

const viewFailReason = (reason: string): void => {
  Modal.info({
    title: '未通过原因',
    content: reason
  });
};

const passReview = (
  reviewId: number,
  reviewTitle: string,
  updateList: () => void
): void => {
  confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `你确定通过审核 “${reviewTitle}” 吗？`,
    onOk: async () => {
      const result = await reviewPublishRequest({
        userId: parseInt(sessionStorage.getItem('userId') || ''),
        reviewId,
        reviewResult: 'pass'
      });

      if (result.success) {
        message.success('审核成功!');
        updateList();
      } else {
        message.error(result.message);
      }
    }
  });
};

const getColumns = (
  updateList: () => void,
  showModal: () => void,
  setReviewId: any
): ColumnProps<CodeReviewInfo>[] => {
  return [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string, record: CodeReviewInfo): JSX.Element => (
        <div>
          <ClockCircleOutlined />
          <span className={styles.createTime}>
            {formatTimestamp(parseInt(text || ''))}
          </span>
        </div>
      )
    },
    {
      title: '迭代名称',
      dataIndex: 'iterationName',
      key: 'iterationName',
      render: (text: string, record: CodeReviewInfo): JSX.Element => {
        const { appId, appName, iterationId, iterationName } = record;

        return (
          <Link
            to={`/home/iterationDetail/${encodeURIComponent(
              JSON.stringify({
                appId,
                appName,
                iterationId,
                iterationName
              })
            )}`}
          >
            {text}
          </Link>
        );
      }
    },
    {
      title: '迭代版本号',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '审阅标题',
      dataIndex: 'reviewTitle',
      key: 'reviewTitle'
    },
    {
      title: '发起人',
      dataIndex: 'creator',
      key: 'creator',
      render: (text: string, record: CodeReviewInfo): JSX.Element => (
        <div>
          <Avatar
            className={styles.avatar}
            size={30}
            src={record.creatorAvatar}
          />
          {text}
        </div>
      )
    },
    {
      title: '审阅人',
      dataIndex: 'reviewer',
      key: 'reviewer',
      render: (text: string, record: CodeReviewInfo): JSX.Element => (
        <div>
          <Avatar
            className={styles.avatar}
            size={30}
            src={record.reviewerAvatar}
          />
          {text}
        </div>
      )
    },
    {
      title: '审核结果',
      key: 'reviewStatus',
      dataIndex: 'reviewStatus',
      align: 'center',
      render: (text: string): JSX.Element => {
        switch (text) {
          case '7001':
            return <Tag color="green">通过</Tag>;
          case '7002':
            return <Tag color="red">未通过</Tag>;
          default:
            return <Tag color="orange">审阅中</Tag>;
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: CodeReviewInfo): JSX.Element => {
        const userId = parseInt(sessionStorage.getItem('userId') || '');
        let isShowReviewAction =
          record.reviewStatus === '7003' && record.reviewerId === userId;
        let isShowFailReason = record.reviewStatus === '7002';

        isShowReviewAction = true;
        isShowFailReason = true;

        const reviewAction = (
          <span>
            <Button
              className={styles.link}
              type="link"
              onClick={() =>
                passReview(record.reviewId, record.reviewTitle, updateList)
              }
            >
              通过
            </Button>
            <Button
              className={styles.link}
              type="link"
              onClick={() => {
                setReviewId(record.reviewId);
                showModal();
              }}
            >
              不通过
            </Button>
          </span>
        );

        const failReason = (
          <Button
            className={styles.link}
            type="link"
            onClick={() =>
              viewFailReason(record.failReason || '审核者未填写未通过原因')
            }
          >
            不通过原因
          </Button>
        );
        return (
          <span>
            <Button className={styles.link} type="link">
              查看详情
            </Button>
            {isShowReviewAction && reviewAction}
            {isShowFailReason && failReason}
          </span>
        );
      }
    }
  ];
};

export default memo(function CodeReviewList() {
  const [reviewId, setReviewId] = useState<number>(0);
  const { loading, list, total, page, onPageChange, updateList } = useList<
    CodeReviewInfo,
    GetCodeReviewListParams
  >(PAGE_SIZE, initParams, getCodeReviewListRequest);
  const [visible, showModal, hideModal] = useModal();
  const columns = useMemo(
    () => getColumns(updateList, showModal, setReviewId),
    [updateList, showModal, setReviewId]
  );

  return (
    <div className={styles.codeReviewList}>
      <div className={styles.header}>
        <Title title="代码审阅记录" />
        <NotPassModal
          visible={visible}
          hideModal={hideModal}
          reviewId={reviewId}
          updateList={updateList}
        />
      </div>
      <div className={styles.content}>
        <Table<CodeReviewInfo>
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey={rowKey}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: total,
            showTotal: showTotal,
            showQuickJumper: true,
            onChange: onPageChange
          }}
        />
      </div>
    </div>
  );
});
