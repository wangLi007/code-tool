/**
 * @description '-'连接命名转换成小驼峰命名
 * @param {String} str 需要转换的字符串
 * @return {String} 小驼峰形式字符串
 **/
export const _toLittleCamel = function (str) {
  let newStr = str.split("-");
  if (newStr.length <= 1) return str;
  let res = newStr[0];
  for (let i = 1; i < newStr.length; i++) {
    res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
  }
  return res;
};
/**
* @description '-'连接命名转换成大驼峰命名
* @param {String} str 需要转换的字符串
* @return {String} 大驼峰形式字符串
**/
export const _toBigCamel = function (str) {
  let newStr = str.split("-");
  if (newStr.length <= 1) return str;
  let res = "";
  for (let i = 0; i < newStr.length; i++) {
    res += newStr[i][0].toUpperCase() + newStr[i].substr(1);
  }
  return res;
};
/**
* @description 驼峰命名转换成'-'连接命名
* @param {String} str 需要转换的字符串
* @return {String} '-'连接形式字符串
**/
export const camelTo_ = function (str) {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z") {
      if (i == 0) res += str[i].toLowerCase();
      else {
        res += "-" + str[i].toLowerCase();
      }
    } else {
      res += str[i];
    }
  }
  return res;
};

/**
 * 获取随机字母
 * @param size 
 * @returns 
 */

export const getRandomLetter = (size = 8) => {
  let res = "";
  for (let i = 0; i < size; i++) {
    let ind = Math.floor(Math.random() * 26);
    res += String.fromCharCode(ind + 65);
  }
  return res;
};

/**
 * 获取UID
 * @param letterNums 
 * @param numberNums 
 * @returns 
 */
export const getUId = (letterNums = 8, numberNums = 6) => {
  const uId =
    getRandomLetter(letterNums) +
    "-" +
    Math.ceil(Math.random() * Math.pow(10, numberNums));
  return uId;
};

/**
 * 现金额转大写
 * @date 2022-02-27
 * @param {Number} n
 * @returns {String}
 */
 export function digitUppercase(n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}
