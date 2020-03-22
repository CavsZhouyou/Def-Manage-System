/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用迭代列表
 * @TodoList: 无
 * @Date: 2020-03-15 11:48:02
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 12:05:52
 */

import React, { memo } from 'react';
import { Button, Select } from 'antd';
import Title from '@/components/Title';
import IterationTable, { Iteration } from '@/components/IterationTable';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const { Option } = Select;
const excludeColumns: string[] = ['appName'];
const pageSize = 7;

const data: Iteration[] = [
  // {
  //   id: 0,
  //   key: 0,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 1,
  //   key: 1,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 2,
  //   key: 2,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 3,
  //   key: 3,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'failed'
  // },
  // {
  //   id: 4,
  //   key: 4,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 5,
  //   key: 5,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'none'
  // },
  // {
  //   id: 6,
  //   key: 6,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 7,
  //   key: 7,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 8,
  //   key: 8,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 9,
  //   key: 9,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'failed'
  // },
  // {
  //   id: 10,
  //   key: 10,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 11,
  //   key: 11,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'none'
  // }
];

const Header = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.leftActions}>
        <Title title="迭代" />
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
        {/* <IterationTable
          data={data}
          excludeColumns={excludeColumns}
          pageSize={pageSize}
        /> */}
      </div>
    </div>
  );
});
