/*
 * @Author: zhouyou@werun
 * @Descriptions: 异步加载 options 逻辑封装
 * @TodoList: 无
 * @Date: 2020-03-27 22:06:56
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 22:109:39
 */
import { useState, useEffect, useCallback } from 'react';
import { BaseResponse } from '@/service/types';
import { message } from 'antd';

type UseAsyncStateReturnType<T> = [T];

/**
 * 异步获取 state， 非 list 数据
 *
 * @export
 * @template T state 数据类型
 * @template P 异步请求返回数据类型
 * @returns {UseAsyncStateReturnType<T>}
 */
export default function useAsyncState<T>(
  initialData: T,
  getDataRequest: () => Promise<BaseResponse<T>>
): UseAsyncStateReturnType<T> {
  const [state, setState] = useState<T>(initialData);

  useEffect(() => {
    getData();
  }, []);

  // 获取数据
  const getData = useCallback(async () => {
    const result = await getDataRequest();

    if (result.success) {
      setState(result.data);
    } else {
      setState(initialData);
      message.error(result.message);
    }
  }, [initialData]);

  return [state];
}
