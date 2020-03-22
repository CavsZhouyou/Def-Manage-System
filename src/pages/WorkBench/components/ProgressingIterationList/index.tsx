/*
 * @Author: zhouyou@werun
 * @Descriptions: 进行中的迭代列表
 * @TodoList: 无
 * @Date: 2020-03-11 17:10:08
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-15 11:05:50
 */
import React, { memo } from 'react';
import IterationTable, { Iteration } from '@/components/IterationTable';
import Title from '@/components/Title';
import commonStyles from '../../index.module.scss';

const excludeColumns: string[] = [
  'timeConsumption',
  'creator',
  'iterationStatus'
];
const pageSize = 5;

const data: Iteration[] = [
  // {
  //   id: 0,
  //   key: 0,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 1,
  //   key: 1,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 2,
  //   key: 2,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 3,
  //   key: 3,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'failed'
  // },
  // {
  //   id: 4,
  //   key: 4,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 5,
  //   key: 5,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'none'
  // },
  // {
  //   id: 6,
  //   key: 6,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 7,
  //   key: 7,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 8,
  //   key: 8,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 9,
  //   key: 9,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'success',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'failed'
  // },
  // {
  //   id: 10,
  //   key: 10,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'failed',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'success'
  // },
  // {
  //   id: 11,
  //   key: 11,
  //   appLogo:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/html_logo.png',
  //   appName: 'homeai-fe/design-service',
  //   iterationName: '修复锚点偏移问题',
  //   createTime: '2020/02/02',
  //   endTime: '15天',
  //   branch: 'daily/0.0.8',
  //   creatorAvatar:
  //     'https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/avatar',
  //   creator: '晓天',
  //   iterationStatus: 'progressing',
  //   latestPublish: '2020/02/12',
  //   latestPublishStatus: 'none'
  // }
];

const Header = memo(() => {
  return (
    <div className={commonStyles.header}>
      <Title title="进行中的迭代" />
      <div className={commonStyles.actions}>
        <a>新建迭代</a>
        <div className={commonStyles.divider}>|</div>
        <a>全部迭代</a>
      </div>
    </div>
  );
});

export default memo(function ProgressingIterationList() {
  return (
    <div className={commonStyles.progressingIterationList}>
      <Header />
      <div className={commonStyles.content}>
        {/* <IterationTable
          data={data}
          excludeColumns={excludeColumns}
          pageSize={pageSize}
        /> */}
      </div>
    </div>
  );
});
