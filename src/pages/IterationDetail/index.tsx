/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代详情页面
 * @TodoList: 无
 * @Date: 2020-03-16 16:58:45
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 12:00:53
 */
import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Tag } from 'antd';
import {
  ClockCircleOutlined,
  BranchesOutlined,
  AppstoreOutlined,
  CodepenOutlined,
  UserOutlined
} from '@ant-design/icons';
import PublishTable from '@/components/PublishTable';
import Title from '@/components/Title';
import styles from './index.module.scss';

const excludeColumns: string[] = ['iterationName'];
const pageSize = 7;

const NavBar = (): JSX.Element => {
  const { iterationInfo } = useParams();
  const { appId, appName, iterationName } = JSON.parse(
    decodeURIComponent(iterationInfo || '{}')
  );

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/appList">应用列表</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link
          to={`/home/appDetail/${encodeURIComponent(
            JSON.stringify({
              appId,
              appName
            })
          )}`}
        >
          {appName}
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>迭代</Breadcrumb.Item>
      <Breadcrumb.Item>{iterationName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

const IterationInfo = (): JSX.Element => {
  return (
    <div className={styles.iterationInfo}>
      <Title title="迭代详情" />
      <div className={styles.info}>
        <div className={styles.basicInfo}>
          <div>
            <Tag color="green">已完成</Tag>
            <span className={styles.title}>商家首页数据看板</span>
          </div>
          <div className={styles.description}>迭代未填写任何描述</div>
        </div>
        <div className={styles.publishInfo}>
          <div className={styles.infoWrapper}>
            <ClockCircleOutlined />
            <span className={styles.infoValue}>16 天前</span>
          </div>
          <div className={styles.infoWrapper}>
            <BranchesOutlined />
            <span className={styles.infoValue}>daily/0.1.12</span>
          </div>
          <div className={styles.infoWrapper}>
            <AppstoreOutlined />
            <span className={styles.infoValue}>0.1.12</span>
          </div>
          <div className={styles.infoWrapper}>
            <UserOutlined />
            <span className={styles.infoValue}>晓天</span>
          </div>
          <div className={styles.infoWrapper}>
            <CodepenOutlined />
            <span className={styles.infoValue}>master</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(function IterationDetail() {
  return (
    <div className={styles.iterationDetail}>
      <NavBar />
      <div className={styles.content}>
        <IterationInfo />
        <div className={styles.publishList}>
          <Title title="发布记录" />
          <div className={styles.tableWrapper}>
            {/* <PublishTable
              data={data}
              excludeColumns={excludeColumns}
              pageSize={pageSize}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
});
