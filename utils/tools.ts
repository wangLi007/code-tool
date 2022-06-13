import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
// import { Toast } from 'vant';
// import i18n from '@/locales/i18n';
// import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(duration);

/**
 *
 * @param timestamp 时间戳
 * @returns 获得'YYYY/MM/DD HH:mm' 格式时间
 */

export function getFormatDate(timestamp) {
  if (!timestamp) return;
  const len = timestamp.toString().length;
  if (len === 10) {
    //秒级时间戳
    return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:mm");
  } else {
    return dayjs(Number(timestamp)).format("YYYY/MM/DD HH:mm");
  }
}

/**
 * 地址略写
 * @param {String} str 全地址
 * @param {Number} frontLen 前面多少位
 * @param {Number} endLen 结尾多少位
 * @returns {String}
 */
export function plusXing(str, frontLen, endLen) {
  if (!str) return;
  var xing = "****";
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

// vant pick组件 时间选择表单格式化 很多页面用到
export function formatter(value) {
  if (+value === 0) return "";
  if (!isNaN(Number(value))) {
    return getFormatDate(value);
  } else {
    return value;
  }
}

/**
 * 复制合约地址
 * @param address 传入要复制的dom对象
 */
export async function copyToClipBoard(address) {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return new Promise((resolve, reject) => {
      var oInput = document.createElement("input");
      oInput.value = address;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("copy"); // 执行浏览器复制命令
      oInput.style.display = "none";
      resolve(true);
    });
  } else {
    return navigator.clipboard.writeText(address);
  }
}

/**
 * 小狐狸错误消息提示
 */
export function forMatError(obj) {
  if (obj?.message) {
    if (obj.message.length > 100) {
      return "error";
    } else {
      return obj.message;
    }
  }
  if (obj?.data?.message) {
    return obj.data.message;
  }
  return "error";
}
