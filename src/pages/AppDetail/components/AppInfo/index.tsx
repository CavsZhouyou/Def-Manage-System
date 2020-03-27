/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用信息组件
 * @TodoList: 无
 * @Date: 2020-03-14 12:15:33
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 18:17:53
 */

import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import Title from '@/components/Title';
import { publishTypes, productTypes } from '@/constants';
import { AppBasicInfo } from '@/service/types';
import { getAppBasicInfoRequest } from '@/service/apis';
import { formatTimestamp } from '@/utils';
import styles from './index.module.scss';

interface DescriptionProps {
  label: string;
  value: string | React.ReactNode;
}

const Description = (props: DescriptionProps): JSX.Element => {
  const { label, value } = props;

  return (
    <div className={styles.description}>
      <div className={styles.label}>{`${label}:`}</div>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

const initialState = {
  description: '暂无',
  product: '2001',
  repository: '暂无',
  onlineAddress: '未发布',
  isJoin: false,
  joinTime: '',
  publishType: '1002',
  pagePrefix: '暂无'
};

export default memo(function AppInfo() {
  const [appInfo, setAppInfo] = useState<AppBasicInfo>(initialState);
  const {
    description,
    product,
    repository,
    isJoin,
    joinTime,
    publishType,
    pagePrefix,
    onlineAddress
  } = appInfo;
  const publishTypeName = publishTypes.filter(
    item => item.value === publishType
  )[0].name;
  const productName = productTypes.filter(item => item.value === product)[0]
    .name;
  const { appInfo: app } = useParams();

  useEffect(() => {
    getAppBasicInfo();
  }, []);

  // 获取应用信息
  const getAppBasicInfo = async (): Promise<void> => {
    const { appId } = JSON.parse(decodeURIComponent(app || '{}'));
    const userId = parseInt(sessionStorage.getItem('userId') || '');
    const params = {
      appId,
      userId
    };

    const result = await getAppBasicInfoRequest(params);

    if (result.success) {
      setAppInfo(result.data);
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className={styles.appInfo}>
      <div className={styles.header}>
        <Title title={'应用信息'} />
      </div>
      <div className={styles.content}>
        <Description label="应用描述" value={description} />
        <Description label="产品" value={productName} />
        <Description
          label="仓库"
          value={<a href={repository}>{repository}</a>}
        />
        <Description
          label="加入时间"
          value={isJoin ? formatTimestamp(parseInt(joinTime || '')) : '未加入'}
        />
        <Description label="发布类型" value={publishTypeName} />
        <Description label="页面前缀" value={pagePrefix} />
        <Description
          label="线上地址"
          value={<a href={onlineAddress}>{onlineAddress}</a>}
        />
      </div>
    </div>
  );
});
