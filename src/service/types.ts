/*
 * @Author: zhouyou@werun
 * @Descriptions: response types 定义文件
 * @TodoList: 无
 * @Date: 2020-03-09 19:00:23
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-09 19:27:44
 */

// 基本返回数据格式
export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// get Token 返回数据格式
export interface TokenResponse {
  token: string;
}
