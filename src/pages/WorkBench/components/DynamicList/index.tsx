/*
 * @Author: zhouyou@werun
 * @Descriptions: 动态列表
 * @TodoList: 无
 * @Date: 2020-03-12 09:16:25
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 09:49:33
 */

import React, { memo } from 'react';
import { List, Avatar } from 'antd';
import commonStyles from '../../index.module.scss';
import styles from './index.module.scss';

interface DynamicInfo {
  name: string;
  avatar: string;
  date: string;
  action: string;
  app: string;
}

const data: DynamicInfo[] = [
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  },
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  },
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  },
  {
    name: '晓天',
    avatar:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
    date: '2020/10/2',
    action: '完成了迭代修改锚点偏移问题',
    app: 'homeai-fe/design-service'
  }
];

const Dynamic = memo((props: DynamicInfo) => {
  const { name, avatar, date, action, app } = props;

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar size={40} src={avatar} />}
        title={date}
        description={`${name}${action}  [${app}]`}
      />
    </List.Item>
  );
});

export default memo(function DynamicList() {
  return (
    <div className={commonStyles.dynamicList}>
      <div className={commonStyles.header}>
        <div className={commonStyles.title}>动态</div>
      </div>
      <div className={commonStyles.content}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: DynamicInfo): JSX.Element => <Dynamic {...item} />}
        />
      </div>
    </div>
  );
});
