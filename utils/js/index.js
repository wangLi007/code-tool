/**
 * 防抖： 保证一个函数在多少毫秒内不再被触发，只会执行一次。
 * @param {Function} func 逻辑函数
 * @param {Number} wait 执行逻辑的间隔（毫秒）
 * @param {Boolean} immediate 是否立即执行
 */

// timeout接收setTimeout返回的唯一值，result接收最终返回值
// 定时器的声明不能放在函数内部，否则将会持续新建函数，造成多次执行问题
let timeout,result;

function debounce(func,wait,immediate) {
  let debounced = function() {
    let context = this;         //将this用context接收
    let args = arguments;       //将arguments用args接收

    if (timeout) clearTimeout(timeout); //如果有timeout在执行，清除它
    if(immediate) {
      let callNow = !timeout;         // 是否需要绑定this指向，和arguments
      timeout = setTimeout(function(){  // 设置一个
        timeout = null;
      },wait)
      if(callNow) result = func.apply(context, args);
    } else {  // 如果不用立即执行的话
      timeout = setTimeout(function(){
        func.apply(context,args)
      }, wait)
    }
    return result;
  };

  return debounced();
}


/**
 * 节流
 * flag 开始为 true 则进入函数之后会执行计时器， 在一秒之后会执行
 * 继续向下之后flag被变为false， 那么在此进入函数之后将不再执行计时器
 * 在计时器执行完成之后， 将 flag变为true 之后才可以继续执行
 * 节流起到了可控制高频事件逻辑执行的次数
 * @param {Function} fn 延迟毫秒后执行的函数。
 * @param {Number} wait 延迟的毫秒数
 * @param {Boolean} immediate 为true时，fn在可以执行时立即执行，否则必须延时wait后才能执行
 */
 function throttle(fn, wait, immediate = false) {
  let timeout = null
  return (...args) => {
    if (!timeout) {
      immediate && fn.apply(this, args)
      timeout = setTimeout(() => {
        !immediate && fn.apply(this, args)
        timeout = null
      }, wait)
    }
  }
}


