/*
 * @Author: zhouyou@werun
 * @Descriptions: 项目列表
 * @TodoList: 无
 * @Date: 2020-03-10 10:54:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 11:53:22
 */
import React, { memo, useCallback } from 'react';
import {
  Radio,
  Button,
  Select,
  Row,
  Col,
  Card,
  Avatar,
  Input,
  Pagination,
  Form,
  Spin,
  Empty
} from 'antd';
import {
  PlusCircleOutlined,
  RocketFilled,
  RightOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { getAppListRequest } from '@/service/apis';
import { AppInfo, GetAppListParams } from '@/service/types';
import useList from '@/utils/hooks/useList';
import { publishTypes } from '@/constants';
import useModal from '@/utils/hooks/useModal';
import NewAppModal from './components/NewAppModal';
import styles from './index.module.scss';

interface FormValues {
  appType: 'mine' | 'all';
  publishType: string;
  appName?: string;
}

interface InitParams {
  userId?: number;
  publishType: string[];
  appName?: string;
}

const PAGE_SIZE = 12;
const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;

const initialValues = {
  appType: 'mine',
  publishType: 'all'
};

const showTotal = (total: number): string => `共 ${total} 条`;

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
        <Form.Item name="appType">
          <Radio.Group buttonStyle="solid" size="middle" onChange={updateList}>
            <Radio.Button value="mine">我的应用</Radio.Button>
            <Radio.Button value="all">全部应用</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button className={styles.addButton} type="link" onClick={showModal}>
          <PlusCircleOutlined className={styles.addIcon} />
          新建应用
        </Button>
        <NewAppModal visible={visible} hideModal={hideModal} />
      </div>
      <div className={styles.rightActions}>
        <Form.Item
          name="publishType"
          label="发布类型"
          className={styles.publishType}
        >
          <Select className={styles.typeSelect} onChange={updateList}>
            <Option value="all">全部</Option>
            {publishTypes.map((type, index) => (
              <Option value={type.value} key={index}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="appName">
          <Search
            className={styles.searchInput}
            placeholder="请输入应用名：group/name"
            onSearch={updateList}
            enterButton
          />
        </Form.Item>
      </div>
    </Form>
  );
});

const AppCard = memo((props: AppInfo) => {
  const {
    appId,
    appName,
    appLogo,
    publishType,
    iterationCount,
    description
  } = props;
  const history = useHistory();
  const publishTypeName = publishTypes.filter(
    item => item.value === publishType
  )[0].name;

  const viewDetail = useCallback(() => {
    history.push(`/home/appDetail/${appId}`);
  }, [history]);

  return (
    <Card className={styles.appCard} onClick={viewDetail} hoverable>
      <Meta
        avatar={<Avatar src={appLogo} />}
        title={appName}
        description={description}
      />
      <div className={styles.info}>
        <div className={styles.type}>
          <RocketFilled className={styles.typeIcon} />
          {publishTypeName}
        </div>
        <div className={styles.iteration}>
          <span className={styles.count}>{iterationCount}</span>
          个进行中的迭代
          <RightOutlined className={styles.rightIcon} />
        </div>
      </div>
    </Card>
  );
});

const List = memo((props: { list: AppInfo[] }) => {
  const { list } = props;

  if (list.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <Row gutter={[16, 8]}>
      {list.map((app: AppInfo, index: number) => (
        <Col key={index} span={6}>
          <AppCard {...app} />
        </Col>
      ))}
    </Row>
  );
});

const initParams = (formValues: FormValues): InitParams => {
  const { appType, publishType, appName } = formValues;
  const params: any = {};

  // 查询我的应用时，传入 userId
  if (appType === 'mine') {
    params.userId = parseInt(sessionStorage.getItem('userId') || '');
  }

  // 查询所有发布类型时，传入 []
  if (publishType === 'all') {
    params.publishType = [];
  } else {
    params.publishType = [publishType];
  }

  if (appName) {
    params.appName = appName;
  }

  return params;
};

export default memo(function AppList() {
  const {
    form,
    loading,
    list,
    total,
    page,
    updateList,
    onPageChange
  } = useList<AppInfo, GetAppListParams>(
    PAGE_SIZE,
    initParams,
    getAppListRequest
  );

  return (
    <div className={styles.appList}>
      <SearchForm form={form} updateList={updateList} />
      <Spin spinning={loading}>
        <div className={styles.content}>
          <List list={list} />
        </div>
      </Spin>
      <div className={styles.footer}>
        <Pagination
          current={page}
          total={total}
          showTotal={showTotal}
          pageSize={PAGE_SIZE}
          onChange={onPageChange}
          showQuickJumper
        />
      </div>
    </div>
  );
});
