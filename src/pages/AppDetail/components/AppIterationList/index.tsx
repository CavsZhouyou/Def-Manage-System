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
  iterationStatus: string;
}

interface InitParams {
  userId: number;
  appId: number;
  iterationStatus: string[];
}

const { Option } = Select;
const excludeColumns: string[] = ['appName'];
const PAGE_SIZE = 7;

const initialValues = {
  iterationStatus: 'all'
};

const SearchForm = memo(
  (props: { form: any; appId: number; updateList: () => void }) => {
    const { form, updateList, appId } = props;
    const [visible, showModal, hideModal] = useModal();
    const memberRole = sessionStorage.getItem('memberRole');
    const isNewButtonShow = memberRole && memberRole !== '0';

    return (
      <Form
        layout="inline"
        form={form}
        className={styles.form}
        initialValues={initialValues}
      >
        <div className={styles.leftActions}>
          <Title title="迭代" />
          {isNewButtonShow && (
            <Button
              className={styles.addButton}
              type="link"
              onClick={showModal}
            >
              <PlusCircleOutlined className={styles.addIcon} />
              新建迭代
            </Button>
          )}
          <NewIterationModal
            visible={visible}
            hideModal={hideModal}
            appId={appId}
          />
        </div>
        <div className={styles.rightActions}>
          <Form.Item
            name="iterationStatus"
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

export default memo(function IterationList() {
  const { appInfo: app } = useParams();
  const { appId } = JSON.parse(decodeURIComponent(app || ''));
  const initParams = (formValues: FormValues): InitParams => {
    const { iterationStatus } = formValues;
    const params: any = {
      appId
    };

    // 查询所有状态时，传入 []
    if (iterationStatus === 'all') {
      params.iterationStatus = [];
    } else {
      params.iterationStatus = [iterationStatus];
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
