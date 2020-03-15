/*
 * @Author: zhouyou@werun
 * @Descriptions: 代码审阅记录
 * @TodoList: 无
 * @Date: 2020-03-16 06:40:28
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 07:06:27
 */

import React, { memo } from 'react';
import { Avatar, Tag, Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { ClockCircleOutlined } from '@ant-design/icons';
import Title from '@/components/Title';
import styles from './index.module.scss';

interface CodeReviewInfo {
  id: number;
  key: number;
  createTime: string;
  iterationName: string;
  version: string;
  reviewTitle: string;
  creator: string;
  creatorAvatar: string;
  reviewer: string;
  reviewerAvatar: string;
  reviewStatus: string;
}

const columns: ColumnProps<CodeReviewInfo>[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text: string, record: CodeReviewInfo): JSX.Element => (
      <div>
        <ClockCircleOutlined />
        <span className={styles.createTime}>{text}</span>
      </div>
    )
  },
  {
    title: '迭代名称',
    dataIndex: 'iterationName',
    key: 'iterationName',
    render: (text: string): JSX.Element => <a>{text}</a>
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
        case 'success':
          return <Tag color="green">通过</Tag>;
        case 'failed':
          return <Tag color="red">未通过</Tag>;
        default:
          return <Tag color="orange">审阅中</Tag>;
      }
    }
  },
  {
    title: '详情',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button className={styles.link} type="link">
          查看
        </Button>
      </span>
    )
  }
];

const data: CodeReviewInfo[] = [
  {
    id: 0,
    key: 0,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.1.1',
    reviewTitle: 'sdk 版本更新',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    reviewerAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    reviewer: '晓天',
    reviewStatus: 'success'
  },
  {
    id: 1,
    key: 1,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.1.1',
    reviewTitle: 'sdk 版本更新',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    reviewerAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    reviewer: '晓天',
    reviewStatus: 'failed'
  },
  {
    id: 2,
    key: 22,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.3.4',
    reviewTitle: 'sdk 版本更新',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    reviewerAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    reviewer: '晓天',
    reviewStatus: 'progressing'
  }
];

export default memo(function CodeReviewList() {
  return (
    <div className={styles.codeReviewList}>
      <div className={styles.header}>
        <Title title="代码审阅记录" />
      </div>
      <div className={styles.content}>
        <Table<CodeReviewInfo>
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 7,
            showQuickJumper: true,
            showTotal: (total: number): string => `共 ${total} 条`
          }}
        />
      </div>
    </div>
  );
});
