/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用信息组件
 * @TodoList: 无
 * @Date: 2020-03-14 12:15:33
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-16 09:40:58
 */

import React, { memo } from 'react';
import Title from '@/components/Title';
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

export default memo(function AppInfo() {
  return (
    <div className={styles.appInfo}>
      <div className={styles.header}>
        <Title title={'应用信息'} />
      </div>
      <div className={styles.content}>
        <Description label="应用描述" value="iHome 店铺二楼 全景漫游" />
        <Description
          label="产品"
          value="淘系技术部 - 行业 - iHome - 家居家装导购"
        />
        <Description
          label="仓库"
          value={
            <a href="">https://github.com/CavsZhouyou/def-manage-system</a>
          }
        />
        <Description label="加入时间" value="2019-08-07 14:07:10" />
        <Description label="发布类型" value="WebApp" />
        <Description
          label="页面前缀"
          value="app/homeai-fe/iHome-shop-panorama"
        />
      </div>
    </div>
  );
});
