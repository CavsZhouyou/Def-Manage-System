/*
 * @Author: zhouyou@werun
 * @Descriptions: 封装 modal 控制逻辑
 * @TodoList: 无
 * @Date: 2020-03-20 20:24:57
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-03-20 20:32:45
 */
import { useState, useCallback } from 'react';

type useModalReturnValue = [boolean, () => void, () => void];

/**
 * modal 显示控制逻辑 hooks
 *
 * @export
 * @param {boolean} [initValue=false]
 * @returns {useModalReturnValue}
 */
export default function useModal(initValue = false): useModalReturnValue {
  const [visible, setVisible] = useState<boolean>(initValue);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  return [visible, showModal, hideModal];
}
