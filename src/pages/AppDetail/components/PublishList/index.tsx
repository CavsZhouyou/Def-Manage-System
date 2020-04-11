/*
 * @Author: zhouyou@werun
 * @Descriptions: 发布列表
 * @TodoList: 无
 * @Date: 2020-03-15 19:02:27
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 22:31:25
 */

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Form } from 'antd';
import Title from '@/components/Title';
import PublishTable from '@/components/PublishTable';
import styles from './index.module.scss';
import {
  PublishInfo,
  GetPublishListParams,
  MemberOption
} from '@/service/types';
import { getPublishListRequest, getMemberOptionsRequest } from '@/service/apis';
import useList from '@/utils/hooks/useList';
import useAsyncOptions from '@/utils/hooks/useAsyncOptions';
import { publishTypes, publishStatus, publishEnvTypes } from '@/constants';

interface FormValues {
  publishType: string;
  publishEnv: string;
  publishStatus: string;
  publisherId?: number | 'all';
  [index: string]: string | number | 'all' | undefined;
}

interface InitParams {
  userId: number;
  appId: number;
  iterationId?: number;
  publishEnv: string[];
  publishStatus: string[];
  publisherId: string[];
}

const { Option } = Select;
const excludeColumns: string[] = [];
const PAGE_SIZE = 7;

const getInitParams = (appId: number) => {
  return (formValues: FormValues): InitParams => {
    const params: any = {};

    params.appId = appId;

    // 查询所有状态时，传入 []
    Object.keys(formValues).forEach((key: string) => {
      const value = formValues[key];
      if (!value || value === 'all') {
        params[key] = [];
      } else {
        params[key] = [value];
      }
    });

    return params;
  };
};

const SearchForm = memo(
  (props: { form: any; appId: number; updateList: () => void }) => {
    const { form, appId, updateList } = props;
    const [memberOptions] = useAsyncOptions<MemberOption>(() => {
      return getMemberOptionsRequest({ appId });
    });

    return (
      <Form layout="inline" form={form} className={styles.form}>
        <Title title="发布列表" />
        <div className={styles.actions}>
          {/* <Form.Item name="publishType">
            <Select
              className={styles.typeSelect}
              onChange={updateList}
              placeholder="发布类型"
            >
              <Option value="all">全部</Option>
              {publishTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item name="publishEnv">
            <Select
              className={styles.typeSelect}
              onChange={updateList}
              placeholder="环境"
            >
              <Option value="all">全部</Option>
              {publishEnvTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="publishStatus">
            <Select
              className={styles.typeSelect}
              onChange={updateList}
              placeholder="状态"
            >
              <Option value="all">全部</Option>
              {publishStatus.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="publisherId">
            <Select
              className={styles.typeSelect}
              onChange={updateList}
              placeholder="用户"
            >
              <Option value="all">全部</Option>
              {memberOptions.map((type, index) => (
                <Option value={type.userId} key={index}>
                  {type.userName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    );
  }
);

export default memo(function PublishList() {
  const { appInfo } = useParams();
  const { appId } = JSON.parse(decodeURIComponent(appInfo || '{}'));
  const {
    form,
    loading,
    list,
    total,
    page,
    updateList,
    onPageChange
  } = useList<PublishInfo, GetPublishListParams>(
    PAGE_SIZE,
    getInitParams(appId),
    getPublishListRequest
  );

  return (
    <div className={styles.publishList}>
      <SearchForm form={form} appId={appId} updateList={updateList} />
      <div className={styles.content}>
        <PublishTable
          excludeColumns={excludeColumns}
          data={list}
          loading={loading}
          total={total}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});
