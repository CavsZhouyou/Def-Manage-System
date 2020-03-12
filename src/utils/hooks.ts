/*
 * @Author: zhouyou@werun
 * @Descriptions: 自定义 hooks 文件
 * @TodoList: 无
 * @Date: 2020-03-12 16:20:46
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-12 17:20:48
 */

import { useState, useCallback, useRef } from 'react';

export interface UseLoadMoreReturnValue<T> {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  listData: T[];
  setListData: (list: T[]) => void;
  loadMore: (count?: number) => void;
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
export function useLoadMore<T>(
  data: T[],
  getData: (count: number) => Promise<T[]>
): UseLoadMoreReturnValue<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<T[]>(data);
  const listRef = useRef<T[]>(data);

  const loadMore = useCallback(
    (count = 3) => {
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
      getData(count).then(result => {
        setLoading(false);
        setListData(preState => {
          listRef.current = listRef.current.concat(result);

          return listRef.current;
        });
      });
    },
    [getData, data]
  );

  return { loading, setLoading, listData, setListData, loadMore };
}
