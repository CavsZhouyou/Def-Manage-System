/*
 * @Author: zhouyou@werun
 * @Descriptions: 列表 loadMore hooks 文件
 * @TodoList: 无
 * @Date: 2020-03-12 16:20:46
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 20:36:37
 */

import { useState, useCallback, useRef } from 'react';
import { BaseResponse, ListResponse } from '@/service/types';
import { message } from 'antd';

export interface UseLoadMoreReturnValue<T> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  listData: T[];
  setListData: (list: T[]) => void;
  loadMore: (count?: number) => Promise<void>;
  hasMore: boolean;
}

/**
 * 列表组件加载更多逻辑 hook
 *
 * @export
 * @template T 数据类型
 * @param {T[]} data 初始数据
 * @param {() => Promise<T[]>} getData 获取更多数据函数
 * @returns {UseLoadMoreReturnValue<T>}
 */
export default function useLoadMore<T>(
  data: T[],
  getData: (
    loadedCount: number,
    count: number
  ) => Promise<BaseResponse<ListResponse<T>>>
): UseLoadMoreReturnValue<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [listData, setListData] = useState<T[]>(data);
  const listRef = useRef<T[]>(data);
  const loadedCountRef = useRef<number>(0);

  const loadMore = useCallback(
    async (count = 3) => {
      // 解决默认参数值没有生效问题
      count = typeof count === 'number' ? count : 3;

      // 展示 loading 动画
      setLoading(true);
      setListData(preState => {
        return preState.concat(
          [...new Array(count)].map(() => {
            return { loading: true, ...data[0] };
          })
        );
      });

      // 获取 list 数据
      const result = await getData(loadedCountRef.current, count);

      if (result.success) {
        setListData(preState => {
          listRef.current = listRef.current.concat(result.data.list);

          return listRef.current;
        });

        setLoading(false);

        if (!result.data.hasMore) {
          setHasMore(false);
        }

        loadedCountRef.current = loadedCountRef.current + count;
      } else {
        message.error(result.message);
        setLoading(false);
      }
    },
    [getData, data]
  );

  return { loading, setLoading, listData, setListData, loadMore, hasMore };
}
