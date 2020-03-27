/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代详情页面
 * @TodoList: 无
 * @Date: 2020-03-16 16:58:45
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 12:00:53
 */
import React, { memo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Tag, message } from 'antd';
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
import { IterationDetail } from '@/service/types';
import { iterationTypes } from '@/constants';
import { getIterationDetailRequest } from '@/service/apis';
import { formatTimeToInterval } from '@/utils';

const excludeColumns: string[] = ['iterationName'];
const pageSize = 7;

const initialState = {
  iterationName: '暂无',
  iterationStatus: '3001',
  description: '暂无',
  createTime: '0',
  branch: '暂无',
  version: '暂无',
  creator: '暂无',
  master: '暂无'
};

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

const getIterationStatus = (value: string): JSX.Element => {
  switch (value) {
    case '3001':
      return <Tag color="green">已完成</Tag>;
    case '3002':
      return <Tag color="blue">进行中</Tag>;
    default:
      return <Tag color="red">已废弃</Tag>;
  }
};

const IterationInfo = (): JSX.Element => {
  const { iterationInfo } = useParams();
  const { appId, iterationId } = JSON.parse(
    decodeURIComponent(iterationInfo || '{}')
  );
  const [iterationDetail, setIterationDetail] = useState<IterationDetail>(
    initialState
  );
  const {
    iterationName,
    iterationStatus,
    description,
    createTime,
    branch,
    version,
    creator,
    master
  } = iterationDetail;

  useEffect(() => {
    getIterationDetail();
  }, []);

  // 获取迭代信息
  const getIterationDetail = async (): Promise<void> => {
    const params = {
      appId,
      iterationId
    };

    const result = await getIterationDetailRequest(params);

    if (result.success) {
      setIterationDetail(result.data);
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className={styles.iterationInfo}>
      <Title title="迭代详情" />
      <div className={styles.info}>
        <div className={styles.basicInfo}>
          <div>
            {getIterationStatus(iterationStatus)}
            <span className={styles.title}>{iterationName}</span>
          </div>
          <div className={styles.description}>
            {description || '迭代未填写任何描述'}
          </div>
        </div>
        <div className={styles.publishInfo}>
          <div className={styles.infoWrapper}>
            <ClockCircleOutlined />
            <span className={styles.infoValue}>
              {formatTimeToInterval(parseInt(createTime || ''))}
            </span>
          </div>
          <div className={styles.infoWrapper}>
            <BranchesOutlined />
            <span className={styles.infoValue}>{branch}</span>
          </div>
          <div className={styles.infoWrapper}>
            <AppstoreOutlined />
            <span className={styles.infoValue}>{version}</span>
          </div>
          <div className={styles.infoWrapper}>
            <UserOutlined />
            <span className={styles.infoValue}>{creator}</span>
          </div>
          <div className={styles.infoWrapper}>
            <CodepenOutlined />
            <span className={styles.infoValue}>{master}</span>
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
