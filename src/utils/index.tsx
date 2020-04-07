/*
 * @Author: zhouyou@werun
 * @Descriptions: 常用工具函数
 * @TodoList: 无
 * @Date: 2020-03-18 17:06:13
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-23 18:17:25
 */

/**
 * 延迟 ms 时间
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取时间间隔
 *
 * @param {number} startTime 开始时间
 * @param {number} endTime 结束时间
 * @returns {string}
 */
export const getTimeInterval = (startTime: number, endTime: number): string => {
  const interval = Math.round((endTime - startTime) / 1000);
  const intervalTexts = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
  const intervalValues = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

  for (let i = 0; i <= intervalValues.length; i++) {
    const count = Math.floor(interval / intervalValues[i]);
    if (count !== 0) {
      return count + intervalTexts[i];
    }
  }

  return '刚刚';
};

/**
 * 格式化时间为 多久前
 *
 * @param {number} startTime
 * @returns {string}
 */
export const formatTimeToInterval = (startTime: number): string => {
  // 获取当前时间为结束时间，转换为秒
  const endTime = new Date().getTime();
  const interval = getTimeInterval(startTime, endTime);

  return interval === '刚刚' ? interval : interval + '前';
};

/**
 * 格式化时间戳成格式 YYYY-MM-DD hh:mm:ss
 *
 * @param {number} timestamp
 * @returns
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  const s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

/**
 * 清除所有 cookie
 *
 */
export const clearAllCookie = (): void => {
  // const domain = '.' + document.location.host;
  // const keys = document.cookie.match(/[^ =;]+(?=\=)/g);

  // console.log(keys);
  // if (keys) {
  //   for (let i = keys.length; i--; )
  //     document.cookie =
  //       keys[i] + `=0;Domain=${domain};expires=` + new Date(0).toUTCString();
  // }
  const cookies = document.cookie.split(';');

  console.log(cookies);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};
