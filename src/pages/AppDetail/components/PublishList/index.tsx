/*
 * @Author: zhouyou@werun
 * @Descriptions: 发布列表
 * @TodoList: 无
 * @Date: 2020-03-15 19:02:27
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 19:47:52
 */

import React, { memo } from 'react';
import { Select } from 'antd';
import Title from '@/components/Title';
import PublishTable, { Publish } from '@/components/PublishTable';
import styles from './index.module.scss';

const { Option } = Select;
const excludeColumns: string[] = [];
const pageSize = 7;

const data: Publish[] = [
  {
    id: 0,
    key: 0,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.1.1',
    publisherAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    publisher: '晓天',
    commit: 'c522b66',
    publishType: 'WebApp',
    publishEnv: 'daily',
    publishStatus: 'success'
  },
  {
    id: 1,
    key: 1,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.1.1',
    publisherAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    publisher: '晓天',
    commit: 'c522b66',
    publishType: 'WebApp',
    publishEnv: 'online',
    publishStatus: 'success'
  },
  {
    id: 2,
    key: 22,
    createTime: '2020/02/02 14:19:29',
    iterationName: '修复锚点偏移问题',
    version: '1.1.1',
    publisherAvatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    publisher: '晓天',
    commit: 'c522b66',
    publishType: 'WebApp',
    publishEnv: 'online',
    publishStatus: 'failed'
  }
];

const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <Title title="发布列表" />
      <div className={styles.actions}>
        <Select className={styles.typeSelect} placeholder="发布类型">
          <Option value="001">全部</Option>
          <Option value="002">已完成</Option>
          <Option value="003">进行中</Option>
          <Option value="004">已废弃</Option>
        </Select>
        <Select className={styles.typeSelect} placeholder="环境">
          <Option value="001">全部</Option>
          <Option value="002">日常环境</Option>
          <Option value="003">线上环境</Option>
          <Option value="004">已废弃</Option>
        </Select>
        <Select className={styles.typeSelect} placeholder="状态">
          <Option value="001">全部</Option>
          <Option value="002">成功</Option>
          <Option value="003">失败</Option>
        </Select>
        <Select className={styles.typeSelect} placeholder="用户">
          <Option value="001">全部</Option>
          <Option value="002">已完成</Option>
          <Option value="003">进行中</Option>
          <Option value="004">已废弃</Option>
        </Select>
      </div>
    </div>
  );
};

export default memo(function PublishList() {
  return (
    <div className={styles.publishList}>
      <Header />
      <div className={styles.content}>
        <PublishTable
          data={data}
          excludeColumns={excludeColumns}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
});
