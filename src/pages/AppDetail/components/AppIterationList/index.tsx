/*
 * @Author: zhouyou@werun
 * @Descriptions: 应用迭代列表
 * @TodoList: 无
 * @Date: 2020-03-15 11:48:02
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 12:05:52
 */

import React, { memo } from 'react';
import { Button, Select, Form } from 'antd';
import Title from '@/components/Title';
import IterationTable, { Iteration } from '@/components/IterationTable';
import useModal from '@/utils/hooks/useModal';
import { iterationTypes } from '@/constants';
import NewIterationModal from '@/components/NewIterationModal';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getIterationListRequest } from '@/service/apis';
import { IterationInfo, GetIterationListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import styles from './index.module.scss';

interface FormValues {
  creator: 'mine' | 'all';
  iterationType: string;
}

interface InitParams {
  userId: number;
  appId: number;
  iterationType: string[];
}

const { Option } = Select;
const excludeColumns: string[] = ['appName'];
const PAGE_SIZE = 7;

const initialValues = {
  iterationType: 'all'
};

const SearchForm = memo(
  (props: { form: any; appId: number; updateList: () => void }) => {
    const { form, updateList, appId } = props;
    const [visible, showModal, hideModal] = useModal();

    return (
      <Form
        layout="inline"
        form={form}
        className={styles.form}
        initialValues={initialValues}
      >
        <div className={styles.leftActions}>
          <Title title="迭代" />
          <Button className={styles.addButton} type="link" onClick={showModal}>
            <PlusCircleOutlined className={styles.addIcon} />
            新建迭代
          </Button>
          <NewIterationModal
            visible={visible}
            hideModal={hideModal}
            appId={appId}
          />
        </div>
        <div className={styles.rightActions}>
          <Form.Item
            name="iterationType"
            label="迭代类型"
            className={styles.iterationType}
          >
            <Select className={styles.typeSelect} onChange={updateList}>
              <Option value="all">全部</Option>
              {iterationTypes.map((type, index) => (
                <Option value={type.value} key={index}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    );
  }
);

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
  const { appInfo: app } = useParams();
  const { appId } = JSON.parse(app || '');
  const initParams = (formValues: FormValues): InitParams => {
    const userId = parseInt(sessionStorage.getItem('userId') || '');
    const { iterationType } = formValues;
    const params: any = {
      userId,
      appId
    };

    // 查询所有状态时，传入 []
    if (iterationType === 'all') {
      params.iterationType = [];
    } else {
      params.iterationType = [iterationType];
    }

    return params;
  };
  const {
    form,
    loading,
    list,
    total,
    page,
    updateList,
    onPageChange
  } = useList<IterationInfo, GetIterationListParams>(
    PAGE_SIZE,
    initParams,
    getIterationListRequest
  );

  return (
    <div className={styles.iterationList}>
      <SearchForm form={form} updateList={updateList} appId={appId} />
      <div className={styles.content}>
        <IterationTable
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
