/*
 * @Author: zhouyou@werun
 * @Descriptions: 迭代列表
 * @TodoList: 无
 * @Date: 2020-03-10 11:01:12
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-25 12:16:16
 */

import React, { memo } from 'react';
import { Radio, Button, Select, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import IterationTable from '@/components/IterationTable';
import { getIterationListRequest } from '@/service/apis';
import { IterationInfo, GetIterationListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import useModal from '@/utils/hooks/useModal';
import { iterationTypes } from '@/constants';
import NewIterationModal from '@/components/NewIterationModal';
import styles from './index.module.scss';

interface FormValues {
  creator: 'mine' | 'all';
  iterationType: string;
}

interface InitParams {
  userId: number;
  appId: string;
  iterationType: string[];
}

const { Option } = Select;
const excludeColumns: string[] = ['action', 'version'];
const PAGE_SIZE = 7;

const initialValues = {
  creator: 'mine',
  iterationType: 'all'
};

const SearchForm = memo((props: { form: any; updateList: () => void }) => {
  const { form, updateList } = props;
  const [visible, showModal, hideModal] = useModal();

  return (
    <Form
      layout="inline"
      form={form}
      className={styles.form}
      initialValues={initialValues}
    >
      <div className={styles.leftActions}>
        <Form.Item name="creator">
          <Radio.Group buttonStyle="solid" size="middle" onChange={updateList}>
            <Radio.Button value="mine">我参与的</Radio.Button>
            <Radio.Button value="all">我创建的</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button className={styles.addButton} type="link" onClick={showModal}>
          <PlusCircleOutlined className={styles.addIcon} />
          新建迭代
        </Button>
        <NewIterationModal visible={visible} hideModal={hideModal} />
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
});

const initParams = (formValues: FormValues): InitParams => {
  const { creator, iterationType } = formValues;
  const params: any = {};

  params.userId = parseInt(sessionStorage.getItem('userId') || '');

  // 查询我创建的迭代时，creator 传入 userId
  if (creator === 'mine') {
    params.creator = params.userId;
  }

  // 查询所有状态时，传入 []
  if (iterationType === 'all') {
    params.iterationType = [];
  } else {
    params.iterationType = [iterationType];
  }

  return params;
};

export default memo(function IterationList() {
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
      <SearchForm form={form} updateList={updateList} />
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
