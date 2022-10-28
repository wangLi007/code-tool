/**
 * 获取滚动条距顶部的距离
 * @returns {Number}
 */
 export function getScrollTop() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/**
 * 获取一个元素距离文档（document）的位置，类似于JQ中的offset()
 * @param {HTMLElement} ele 元素
 * @returns { {left: number, top: number} } 距离文档左侧、顶部的距离
 */
 export function offset(ele) {
  var pos = {
    left: 0,
    top: 0
  }
  while (ele) {
    pos.left += ele.offsetLeft;
    pos.top += ele.offsetTop;
    ele += ele.offsetParent;
  }
  return pos;
}

var requestAnimFrame = (function () {
  // window.requestAnimationFrame 要求浏览器在下次重绘之前调用指定的回调函数更新动画。
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

/**
 * 在 duration 时间内，滚动条平滑滚动到 to 指定位置
 * @param {Number} to 滚动位置的值
 * @param {Number} duration 时间-毫秒数
 */
export function scrollTo(to, duration) {
  if (duration < 0) {
    setScrollTop(to);
    return
  }
  var diff = to - getScrollTop()
  if (diff === 0) return
  var step = diff / duration * 10;
  requestAnimFrame(
    function () {
      if (Math.abs(step) > Math.abs(diff)) {
        setScrollTop(getScrollTop() + diff);
        return;
      }
      setScrollTop(getScrollTop() + step);
      if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
        return;
      }
      scrollTo(to, duration - 16);
    }
  )
}


/**
 * 设置滚动条距顶部的距离
 * @param {Number} value 距顶部的距离的值
 */
 function setScrollTop(value) {
  window.scrollTo(0, value);
  return value;
}

/**
 * H5软键盘缩回、弹起回调
 * 当软件键盘弹起会改变当前 window.innerHeight， 监听这个值变化
 * @date 2022-02-24
 * @param {Function} downCb 当软键盘弹起后，缩回的回调
 * @param {any} upCb 当软键盘弹起的回调
 */
 export function windowResize(downCb, upCb) {
  var clientHeight = window.innerHeight;
  downCb = typeof downCb === 'function' ? downCb : function () {}
  upCb = typeof upCb === 'function' ? upCb : function () {}
  window.addEventListener('resize', () => {
    var height = window.innerHeight;
    if (height === clientHeight) {
      downCb();
    }
    if (height < clientHeight) {
      upCb();
    }
  })
}





