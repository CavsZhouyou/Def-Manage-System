/*
 * @Author: zhouyou@werun
 * @Descriptions: 列表基础逻辑 hooks 文件
 * @TodoList: 无
 * @Date: 2020-03-20 17:57:54
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 18:34:43
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Form, message } from 'antd';

interface UseListReturnValue<T> {
  form: any;
  loading: boolean;
  list: T[];
  total: number;
  page: number;
  updateList: () => void;
  onPageChange: (current: number, pageSize?: number | undefined) => void;
}

/**
 * 列表基础逻辑 hooks
 *
 * @export
 * @template T 列表项数据类型
 * @template P 请求列表参数数据类型
 * @param {number} pageSize
 * @param {(values: any) => any} initParams 初始化请求参数(自定义部分)
 * @param {(params: P) => Promise<any>} getListDataRequest 获取列表数据函数
 * @returns {UseListReturnValue<T>}
 */
export default function useList<T, P>(
  pageSize: number,
  initParams: (values: any) => any,
  getListDataRequest: (params: P) => Promise<any>
): UseListReturnValue<T> {
  const [form] = Form.useForm(); // 有查询表单时使用
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<T[]>([]);
  const [total, setTotal] = useState<number>(0);
  const latestValues = useRef({ page });
  latestValues.current.page = page; // 保存最新的 page

  // 模拟 componentDidmount
  useEffect(() => {
    updateList();
  }, []);

  // 获取列表查询参数
  const getQueryParams = useCallback((): P => {
    const values = form.getFieldsValue();

    // 根据 search 表单值初始化参数，initParams 方法外部定义
    let params: any = initParams(values);

    // 基本参数
    params = Object.assign(params, {
      page: latestValues.current.page,
      pageSize
    });

    return params;
  }, [form, initParams, pageSize]);

  // 更新列表数据
  const updateList = useCallback(async () => {
    setLoading(true);

    const params = getQueryParams();
    const result = await getListDataRequest(params);

    if (result.success) {
      const { list, total } = result.data;
      setTotal(total);
      setList(list);
    } else {
      message.error(result.message);
    }

    setLoading(false);
  }, [getListDataRequest, getQueryParams]);

  // 定义 page 修改回掉函数，配合 Pagination 组件使用
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

  return {
    form,
    loading,
    list,
    total,
    page,
    updateList,
    onPageChange
  };
}
