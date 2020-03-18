/*
 * @Author: zhouyou@werun
 * @Descriptions: 常用工具函数
 * @TodoList: 无
 * @Date: 2020-03-18 17:06:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-18 17:09:28
 */

/**
 * 延迟 ms 时间
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
