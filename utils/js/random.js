/**
 * 描述 随机生成颜色
 * @date 2022-02-27
 * @returns {String}
 */
 function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}


/**
 * 生成指定范围[min, max] 的随机数
 * @date 2022-02-27
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
 function randomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
