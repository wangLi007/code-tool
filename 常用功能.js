/**
 * debounce 防抖  触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
 * 防抖常应用于用户进行搜索输入节约请求资源，window触发resize事件时进行防抖只触发一次。
 * 实现 创建一个定时器Id 每调用一次 => 清除定时器 => 生成一个新的定时器  相同点 都用到了闭包
 * eg: const fn = debounce(fn,1000)
 */
const debounce = (fn, time) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

/**
 * 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。
 * 节流常应用于鼠标不断点击触发、监听滚动事件。 不断点击发布按钮 点击加入购物车等
 * 实现 创建一个flag => 当flag为false 停止 => 执行一次就将flag置为flag => 当定时器执行完成的时候再将flag置为true  相同点 都用到了闭包
 * const f = throttle((args)=>console.log(args,123),1500) //1500秒触发一次
 */
function throttle(fun, delay) {
  let last, deferTimer;
  return function (args) {
    let that = this;
    let _args = arguments;
    let now = +new Date();
    if (last && now < last + delay) {
      // message.error("操作太快了，请稍后再试！");
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fun.apply(that, _args);
      }, delay);
    } else {
      last = now;
      fun.apply(that, _args);
    }
  };
}

/**
 * 深拷贝  WeakMap避免循环引用
 */
const cloneDeep1 = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target);

  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep1(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    });
  }

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] =
        typeof target[i] === 'object' && target[i] !== null
          ? cloneDeep1(target[i], hash)
          : target[i];
    }
  }
  return cloneTarget;
};

/**
 * 图片懒加载  可以给img标签统一自定义属性data-src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
 */
function lazyload() {
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}
// 可以使用节流优化一下
// window.addEventListener('scroll', lazyload);

/**
 * 滚动加载  原理就是监听页面滚动事件，分析clientHeight、scrollTop、scrollHeight三者的属性关系。
 */
function handleScroll() {
  window.addEventListener(
    'scroll',
    function () {
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      if (clientHeight + scrollTop >= scrollHeight) {
        // 检测到滚动至页面底部，进行后续操作
        // ...
      }
    },
    false
  );
}

/**
 * 格式化文件大小
 * eg: formatSize('10240') // 10KB
 * eg: formatSize('10240000') // 9.77MB
 */
const formatSize = (size) => {
  if (typeof +size !== 'number') {
    throw new Error('Argument(s) is illegal !');
  }
  const unitsHash = 'B,KB,MB,GB'.split(',');
  let index = 0;
  while (size > 1024 && index < unitsHash.length) {
    size /= 1024;
    index++;
  }
  return Math.round(size * 100) / 100 + unitsHash[index];
};

/**
 * 生成随机UID
 * eg:
 * genUid.soup_ = '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
 * genUid() // ;l`yCPc9A8IuK}?N6,%}
 */
const genUid = () => {
  var length = 20;
  var soupLength = genUid.soup_.length;
  var id = [];
  for (var i = 0; i < length; i++) {
    id[i] = genUid.soup_.charAt(Math.random() * soupLength);
  }
  return id.join('');
};

/**
 * 瀑布流布局
 */
function waterFall() {
  let box = document.querySelector('.news-content__left>.content__box');
  let items = box.children;
  if (!items.length) {
    return;
  }
  const gap = 14; //间距
  const pageWidth = box.clientWidth;
  const itemWidth = items[0].offsetWidth;
  let columns = parseInt(pageWidth / (itemWidth + gap));
  var arr = [];

  for (var i = 0; i < items.length; i++) {
    if (i < columns) {
      items[i].style.top = 0;
      items[i].style.left = (itemWidth + gap) * i + 'px';
      arr.push(items[i].offsetHeight);
    } else {
      var minHeight = arr[0];
      var index = 0;
      for (var j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
          minHeight = arr[j];
          index = j;
        }
      }
      items[i].style.top = arr[index] + gap + 'px';
      items[i].style.left = items[index].offsetLeft + 'px';
      arr[index] = arr[index] + items[i].offsetHeight + gap;
    }
  }
}

//url编码
function urlencode(str) {
  str = (str + '').toString();
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}
