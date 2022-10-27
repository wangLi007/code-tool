/**
 * 获取本地存储
 * @param {string} name 本地存储名称
 */
export function getStorage(name) {
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

/**
 * 删除本地存储
 * @param {string} name 本地存储名称
 * @returns {boolean} 删除成功 true，否则 false
 */
export function removeStorage(name) {
  return window.localStorage.removeItem(name);
}

/**
 * 添加本地存储
 * @param {string} name 本地存储名称
 * @param {*} data 本地存储数据
 */
export function setStorage(name, data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(name, data);
}
