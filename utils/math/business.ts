/**
 * 四舍五入 不补0
 */
export function toFixed(number: number, decimals: number) {
  var pow = Math.pow(10, decimals);
  var rounded = Math.round(number * pow) / pow;
  var result = rounded.toString();
  return result;
}

/**
 * 截断小数
 */
export function sliceNum(num: number, decimals: number) {
  const int = num.toString().indexOf('.');
  if (int !== -1) {
    return num.toString().slice(0, int + decimals + 1);
  } else {
    return num;
  }
}
