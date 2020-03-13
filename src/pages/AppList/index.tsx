/*
 * @Author: zhouyou@werun
 * @Descriptions: 项目列表
 * @TodoList: 无
 * @Date: 2020-03-10 10:54:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-13 15:57:28
 */
import React, { memo } from 'react';
import {
  Radio,
  Button,
  Select,
  Row,
  Col,
  Card,
  Avatar,
  Input,
  Pagination
} from 'antd';
import {
  PlusCircleOutlined,
  RocketFilled,
  RightOutlined
} from '@ant-design/icons';
import styles from './index.module.scss';

const { Option } = Select;
const { Meta } = Card;
const { Search } = Input;

interface AppInfo {
  id: number;
  logo: string;
  name: string;
  type: string;
  iterationCount: number;
  description: string;
}

const data: AppInfo[] = [
  {
    id: 1,
    logo:
      'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
    name: 'homeai-fe/design-serice',
    type: 'WebApp',
    description: '轻应用 weex 页面版本控制',
    iterationCount: 10
  }
];

const getData = (): AppInfo[] => {
  return [...new Array(12)].map(() => data[0]);
};

const Header = memo(() => {
  return (
    <div className={styles.header}>
      <div className={styles.leftActions}>
        <Radio.Group defaultValue="a" buttonStyle="solid" size="middle">
          <Radio.Button value="a">我的应用</Radio.Button>
          <Radio.Button value="b">全部应用</Radio.Button>
        </Radio.Group>
        <Button className={styles.addButton} type="link">
          <PlusCircleOutlined className={styles.addIcon} />
          新建应用
        </Button>
      </div>
      <div className={styles.rightActions}>
        <span className={styles.label}>发布类型:</span>
        <Select className={styles.typeSelect} defaultValue="001">
          <Option value="001">全部</Option>
          <Option value="002">Weex</Option>
          <Option value="003">WebApp</Option>
          <Option value="004">TNPM 发布</Option>
          <Option value="005">Windmill 轻应用</Option>
          <Option value="006">Assets 非覆盖</Option>
        </Select>
        <Search
          className={styles.searchInput}
          placeholder="请输入应用名：group/name"
          onSearch={value => console.log(value)}
          enterButton
        />
      </div>
    </div>
  );
});

const AppCard = memo((props: AppInfo) => {
  const { name, logo, type, iterationCount, description } = props;

  return (
    <Card className={styles.appCard} hoverable>
      <Meta
        avatar={<Avatar src={logo} />}
        title={name}
        description={description}
      />
      <div className={styles.info}>
        <div className={styles.type}>
          <RocketFilled className={styles.typeIcon} />
          {type}
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

export default memo(function AppList() {
  const listData = getData();

  return (
    <div className={styles.appList}>
      <Header />
      <div className={styles.content}>
        <Row gutter={[16, 8]}>
          {listData.map((app: AppInfo, index: number) => (
            <Col span={6}>
              <AppCard key={index} {...app} />
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles.footer}>
        <Pagination
          total={32}
          showTotal={total => `共 ${total} 条`}
          pageSize={16}
          defaultCurrent={1}
          showQuickJumper
        />
      </div>
    </div>
  );
});
