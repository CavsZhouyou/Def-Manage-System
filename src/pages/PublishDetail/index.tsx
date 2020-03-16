/*
 * @Author: zhouyou@werun
 * @Descriptions:
 * @TodoList: 无
 * @Date: 2020-03-16 20:20:04
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 21:40:22
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tag, Avatar, Radio, Descriptions } from 'antd';
import Title from '@/components/Title';
import styles from './index.module.scss';

const NavBar = (): JSX.Element => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/appList">应用列表</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>ihome-fe/design-service</Breadcrumb.Item>
      <Breadcrumb.Item>迭代</Breadcrumb.Item>
      <Breadcrumb.Item>商家首页数据看板</Breadcrumb.Item>
      <Breadcrumb.Item>发布</Breadcrumb.Item>
    </Breadcrumb>
  );
};

const PublishInfo = (): JSX.Element => {
  return (
    <div className={styles.publishInfo}>
      <Title title="发布详情" />
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>任务 ID：</span>
          <span className={styles.taskId}>2375418</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>创建时间：</span>
          <span className={styles.createTime}>1 天前</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>发布人：</span>
          <div className={styles.publisher}>
            <Avatar
              className={styles.publisherAvatar}
              size={30}
              src="https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar"
            />
            晓天
          </div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>commit：</span>
          <span className={styles.commit}>ecc13b3</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>类型：</span>
          <span className={styles.type}>WebApp</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>环境：</span>
          <Tag color="#f50">线上</Tag>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>状态：</span>
          <Tag color="green">成功</Tag>
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
  return (
    <div className={styles.publishDetail}>
      <NavBar />
      <div className={styles.content}>
        <PublishInfo />
        <PublishResult />
      </div>
    </div>
  );
});
