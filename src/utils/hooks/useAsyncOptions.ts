/*
 * @Author: zhouyou@werun
 * @Descriptions: 异步加载 options 逻辑封装
 * @TodoList: 无
 * @Date: 2020-03-27 22:06:56
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-27 22:109:39
 */
import { useState, useEffect, useCallback } from 'react';
import { BaseResponse, ListResponse } from '@/service/types';
import { message } from 'antd';

type UseAsyncOptionsReturnType<T> = [T[]];

/**
 * 异步获取 options
 *
 * @export
 * @template T options 数据类型
 * @param {() => Promise<BaseResponse<ListResponse<T>>>} getData 异步获取数据方法
 * @returns {UseAsyncOptionsReturnType<T>}
 */
export default function useAsyncOptions<T>(
  getDataRequest: () => Promise<BaseResponse<ListResponse<T>>>
): UseAsyncOptionsReturnType<T> {
  const [options, setOptions] = useState<T[]>([]);

  useEffect(() => {
    getOptions();
  }, []);

  // 获取成员列表
  const getOptions = useCallback(async () => {
    const result = await getDataRequest();

    if (result.success) {
      setOptions(result.data.list);
    } else {
      setOptions([]);
      message.error(result.message);
    }
  }, [getDataRequest]);

  return [options];
}
