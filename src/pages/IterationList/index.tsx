/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代列表
 * @TodoList: 无
 * @Date: 2020-03-10 11:01:12
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 17:03:12
 */

import React, { memo } from 'react';
import { Radio, Button, Select, Avatar, Tag, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const { Option } = Select;

interface Iteration {
  id: number;
  appLogo: string;
  appName: string;
  iterationName: string;
  createTime: string;
  timeConsumption: string;
  branch: string;
  creator: string;
  creatorAvatar: string;
  iterationStatus: string;
  latestPublish: string;
  latestPublishStatus: string;
}

const columns: ColumnProps<Iteration>[] = [
  {
    title: '所属应用',
    dataIndex: 'appName',
    key: 'appName',
    render: (text: string, record: Iteration): JSX.Element => (
      <a>
        <Avatar src={record.appLogo} />
        {text}
      </a>
    )
  },
  {
    title: '迭代名称',
    dataIndex: 'iterationName',
    key: 'iterationName',
    render: (text: string): JSX.Element => <a>{text}</a>
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '耗时',
    dataIndex: 'timeConsumption',
    key: 'timeConsumption'
  },
  {
    title: '分支',
    key: 'branch',
    dataIndex: 'branch'
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    render: (text: string, record: Iteration): JSX.Element => (
      <div>
        <Avatar
          className={styles.creatorAvatar}
          size={30}
          src={record.creatorAvatar}
        />
        {text}
      </div>
    )
  },
  {
    title: '迭代状态',
    key: 'iterationStatus',
    dataIndex: 'iterationStatus',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case 'success':
          return <Tag color="green"> 已完成</Tag>;
        case 'progressing':
          return <Tag color="blue">进行中</Tag>;
        default:
          return <Tag color="red">已废弃</Tag>;
      }
    }
  },
  {
    title: '最近发布',
    key: 'latestPublish',
    dataIndex: 'latestPublish'
  },
  {
    title: '最近发布状态',
    key: 'latestPublishStatus',
    dataIndex: 'latestPublishStatus',
    align: 'center',
    render: (text: string): JSX.Element => {
      switch (text) {
        case 'success':
          return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        case 'failed':
          return <CloseCircleTwoTone twoToneColor="#FF4D50" />;
        default:
          return <MinusCircleTwoTone twoToneColor="#808080" />;
      }
    }
  }
];

const data: Iteration[] = [
  {
    id: 0,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'success',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 1,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'failed',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 2,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'progressing',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 3,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'success',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'failed'
  },
  {
    id: 4,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'failed',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 5,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'progressing',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'none'
  },
  {
    id: 6,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'success',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 7,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'failed',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 8,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'progressing',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 9,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'success',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'failed'
  },
  {
    id: 10,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'failed',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'success'
  },
  {
    id: 11,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-service',
    iterationName: '修复锚点偏移问题',
    createTime: '2020/02/02',
    timeConsumption: '15天',
    branch: 'daily/0.0.8',
    creatorAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    creator: '晓天',
    iterationStatus: 'progressing',
    latestPublish: '2020/02/12',
    latestPublishStatus: 'none'
  }
];
const Header = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.leftActions}>
        <Radio.Group defaultValue="a" buttonStyle="solid" size="middle">
          <Radio.Button value="a">我参与的</Radio.Button>
          <Radio.Button value="b">我创建的</Radio.Button>
        </Radio.Group>
        <Button className={styles.addButton} type="link">
          <PlusCircleOutlined className={styles.addIcon} />
          新建迭代
        </Button>
      </div>
      <div className={styles.rightActions}>
        <span className={styles.label}>迭代状态:</span>
        <Select className={styles.typeSelect} defaultValue="001">
          <Option value="001">全部</Option>
          <Option value="002">已完成</Option>
          <Option value="003">进行中</Option>
          <Option value="004">已废弃</Option>
        </Select>
      </div>
    </div>
  );
});

export default memo(function IterationList() {
  return (
    <div className={styles.iterationList}>
      <Header />
      <div className={styles.content}>
        <Table<Iteration>
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
