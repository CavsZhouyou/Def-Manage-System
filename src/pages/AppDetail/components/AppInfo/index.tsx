/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用信息组件
 * @TodoList: 无
 * @Date: 2020-03-14 12:15:33
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-29 12:15:29
 */

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import Title from '@/components/Title';
import { publishTypes, productTypes } from '@/constants';
import { AppBasicInfo } from '@/service/types';
import { getAppBasicInfoRequest } from '@/service/apis';
import { formatTimestamp } from '@/utils';
import styles from './index.module.scss';
import useAsyncState from '@/utils/hooks/useAsyncState';

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
  productType: {
    code: '0000',
    name: '无'
  },
  repository: '暂无',
  onlineAddress: '',
  dailyAddress: '',
  version: '',
  isJoin: false,
  joinTime: '',
  publishType: {
    code: '0000',
    name: '无'
  },
  pagePrefix: '暂无'
};

export default memo(function AppInfo() {
  const { appInfo: app } = useParams();
  const { appId } = JSON.parse(decodeURIComponent(app || '{}'));
  const userId = sessionStorage.getItem('userId') || '';
  const [appInfo] = useAsyncState<AppBasicInfo>(initialState, () =>
    getAppBasicInfoRequest({
      appId,
      userId
    })
  );
  const {
    description,
    productType,
    repository,
    isJoin,
    joinTime,
    publishType,
    pagePrefix,
    onlineAddress,
    dailyAddress,
    version
  } = appInfo;

  return (
    <div className={styles.appInfo}>
      <div className={styles.header}>
        <Title title={'应用信息'} />
      </div>
      <div className={styles.content}>
        <Description label="应用描述" value={description} />
        <Description label="产品" value={productType.name} />
        <Description
          label="仓库"
          value={
            <a href={repository} target="blank">
              {repository}
            </a>
          }
        />
        <Description
          label="加入时间"
          value={isJoin ? formatTimestamp(parseInt(joinTime || '')) : '未加入'}
        />
        <Description label="发布类型" value={publishType.name} />
        {/* <Description label="页面前缀" value={pagePrefix} /> */}
        <Description label="当前版本" value={version ? version : '暂无发布'} />
        <Description
          label="预发地址"
          value={
            dailyAddress ? (
              <a href={dailyAddress} target="blank">
                {dailyAddress}
              </a>
            ) : (
              '暂无发布'
            )
          }
        />
        <Description
          label="线上地址"
          value={
            onlineAddress ? (
              <a href={onlineAddress} target="blank">
                {onlineAddress}
              </a>
            ) : (
              '暂无发布'
            )
          }
        />
      </div>
    </div>
  );
});
