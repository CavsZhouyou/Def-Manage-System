/*
 * @Author: zhouyou@werun
 * @Descriptions: 项目列表
 * @TodoList: 无
 * @Date: 2020-03-10 10:54:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-19 21:28:47
 */
import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
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
  Empty,
  message
} from 'antd';
import {
  PlusCircleOutlined,
  RocketFilled,
  RightOutlined
} from '@ant-design/icons';
import { getAppListRequest } from '@/service/apis';
import { AppInfo, GetAppListParams } from '@/service/types';
import { publishTypes } from '@/constants';
import styles from './index.module.scss';

const PAGE_SIZE = 12;

const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;

const data: AppInfo[] = [
  {
    appId: 1,
    appLogo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    appName: 'homeai-fe/design-serice',
    publishType: 'WebApp',
    description: '轻应用 weex 页面版本控制',
    iterationCount: 10
  }
];

const getData = (): AppInfo[] => {
  return [...new Array(12)].map(() => data[0]);
};

const initialValues = {
  appType: 'mine',
  publishType: 'all'
};

const showTotal = (total: number): string => `共 ${total} 条`;

const SearchForm = memo((props: { form: any; updateList: () => void }) => {
  const { form, updateList } = props;

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
        <Button className={styles.addButton} type="link">
          <PlusCircleOutlined className={styles.addIcon} />
          新建应用
        </Button>
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
  const { appName, appLogo, publishType, iterationCount, description } = props;
  const publishTypeName = publishTypes.filter(
    item => item.value === publishType
  )[0].name;

  return (
    <Card className={styles.appCard} hoverable>
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

export default memo(function AppList() {
  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AppInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const latestValues = useRef({ page });
  latestValues.current.page = page; // 保存最新的 page

  // 模拟 componentDidmount
  useEffect(() => {
    updateList();
  }, []);

  const getQueryParams = useCallback((): GetAppListParams => {
    const values = form.getFieldsValue();
    const { appType, publishType, appName } = values;
    let params: any = {};

    // 查询我的应用时，传入 userId
    if (appType === 'mine') {
      params.userId = sessionStorage.getItem('userId');
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

    params = Object.assign(params, {
      page: latestValues.current.page,
      pageSize: PAGE_SIZE
    });

    return params;
  }, [form]);

  const updateList = useCallback(async () => {
    setLoading(true);

    const params = getQueryParams();
    const result = await getAppListRequest(params);

    if (result.success) {
      const { list, total } = result.data;
      setTotal(total);
      setList(list);
    } else {
      message.error(result.message);
    }

    setLoading(false);
  }, [form]);

  const onPageChange = useCallback(
    (current: number, pageSize?: number | undefined): void => {
      // 更新 page 值
      setPage(current);
      latestValues.current.page = current;

      // 更新列表
      updateList();
    },
    [setPage, updateList]
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
