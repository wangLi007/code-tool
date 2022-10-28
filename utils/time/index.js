/**
 * 格式化时间
 * @date 2022-08-07
 * @param {String} formater 格式化格式 'YYYY-MM-DD HH:mm:ss' 'YYYY-MM-DD' 'YYYYMMDDHHmm'
 * @param {Date | String} t 可以不传，不传默认 new Date()。
 * @returns {String} 格式化后的日期字符串 
 * @example dateFormater('YYYY-MM-DD', '2020.11.29') => '2020-11-29'
 */
 function dateFormater(formater, t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substring(2, 4))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}


/**
 * 将指定字符串由一种时间格式转化为另一种。from 的格式应对应 str 的位置
 * @date 2022-08-07
 * @param {String} str 原始的日期字符串
 * @param {String} from 匹配原始字符串的格式
 * @param {String} to 想要转换的日期字符串格式
 * @returns {String} 格式化后的日期字符串 
 * @example 
 *  dateStrForma('20220807', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2022年08月07日
 *  dateStrForma('121220220807', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2022年08月07日
 *  dateStrForma('2022年08月07日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20220807
 * 
 * // 一般的也可以使用正则来实现
 * '2022年08月07日'.replace(/(\d{4})年(\d{2})月(\d{2})日/, '$1-$2-$3') ==> 2022-08-07
 */
 function dateStrFormat(str, from, to){
  //'20220807' 'YYYYMMDD' 'YYYY年MM月DD日'
  str += ''
  let Y = ''
  if(~(Y = from.indexOf('YYYY'))){
    Y = str.substring(Y, Y+4)
    to = to.replace(/YYYY|yyyy/g,Y)
  }else if(~(Y = from.indexOf('YY'))){
    Y = str.substring(Y, Y+2)
    to = to.replace(/YY|yy/g,Y)
  }

  let k,i
  ['M','D','H','h','m','s'].forEach(s =>{
    i = from.indexOf(s+s)
    k = ~i ? str.substring(i, i+2) : ''
    to = to.replace(s+s, k)
  })
  return to
}

/**
 * 格式化${startTime}距现在的已过时间
 * @param  {Date} startTime '2020-11-29' 
 * @return {String} '1天前' '1年前'
 */
 function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - Date.parse(new Date(startTime)),
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}


/**
 * 计算从一个时间到现在过去多久
 * @date 2022-02-24
 * @param {String} 字符串日期 '2020-11-29'
 * @returns {String} '451天15小时17分钟25秒'
 */
 function formatRemainTime(time) {
  const nowStamp = new Date().getTime()
  const targetStamp = new Date(time.replace(/-/g, '/')).getTime()
  const difference = nowStamp - targetStamp
  const allSeconds = Math.floor(difference / 1000)
  const allMinutes = Math.floor(allSeconds / 60)
  const allHours = Math.floor(allMinutes / 60)
  const day = Math.floor(allHours / 24)
  const hours = allHours % 24
  const minutes = allMinutes % 60
  const seconds = allSeconds % 60
  return `${day}天${hours}小时${minutes}分钟${seconds}秒`
}

/**
 * 是否为闰年
 * @date 2022-02-27
 * @param {Number} year
 * @returns {Boolean}
 */
 function isLeapYear(year) {
  if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) {
    return true
  }
  return false
}

/**
 * 判断是否为同一天
 * @date 2022-02-27
 * @param {Date} date1
 * @param {Date} date2 可选 / 默认值：当天
 * @returns {Boolean}
 */
 function isSameDay(date1, date2) {
  if (!date2) {
    date2 = new Date();
  }
  var date1_year = date1.getFullYear(),
    date1_month = date1.getMonth() + 1,
    date1_date = date1.getDate();
  var date2_year = date2.getFullYear(),
    date2_month = date2.getMonth() + 1,
    date2_date = date2.getDate()
  return date1_date === date2_date && date1_month === date2_month && date1_year === date2_year;
}

/**
 * 获取指定日期月份的总天数
 * @date 2022-02-27
 * @param {Date} time
 * @returns {Number}
 */
 function monthDays(time) {
  time = new Date(time)
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  return new Date(year, month, 0).getDate()
}


/**
 * ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
 * @param { Date | String } startTime
 * @param { Date | String } endTime
 * @returns { Object } { d, h, m, s } 天 时 分 秒
 */
 function timeLeft(startTime, endTime) {
  if (!startTime || !endTime) {
    return
  }
  var startDate, endDate;
  if (startTime instanceof Date) {
    startDate = startTime;
  } else {
    startDate = new Date(startTime.replace(/-/g, '/')) //开始时间
  }
  if (endTime instanceof Date) {
    endDate = endTime;
  } else {
    endDate = new Date(endTime.replace(/-/g, '/')) //结束时间
  }
  var t = endDate.getTime() - startDate.getTime()
  var d = 0,
    h = 0,
    m = 0,
    s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return {
    d,
    h,
    m,
    s
  }
}

/*
 * @Descripttion:
 * @Author: wenshaochang
 * @Date: 2022-06-09 21:55:32
 * @LastEditors: wenshaochang
 * @LastEditTime: 2022-06-09 22:41:59
 */
/**
 * 根据指定的两个日期，计算并返回中间的所有日期。
 * @date 2022-06-09
 * @param {String} startDay 开始日期 '2022-06-01'
 * @param {String} endDay 结束日期 '2022-06-09'
 * @returns {Array} 包含所有日期的集合 ['2022-06-01', '2022-06-02', '2022-06-03', '2022-06-04', '2022-06-05', '2022-06-06', '2022-06-07', '2022-06-08', '2022-06-09']
 */
 function twoDateBetweenAllDay(startDay, endDay) {
  let arr = []
  let dates = []
  // 设置两个日期 UTC 时间
  const sd = new Date(startDay)
  const ed = new Date(endDay)
  // 获取两个日期 GTM 时间
  const s = sd.getTime() - 24 * 60 * 60 * 1000
  const e = ed.getTime() - 24 * 60 * 60 * 1000
  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= e; ) {
    i = i + 24 * 60 * 60 * 1000
    arr.push(parseInt(i))
  }
  // 获取每一天的时间 YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j])
    const year = time.getFullYear(time)
    const month = String(time.getMonth() + 1).padStart(2, '0')
    const day = String(time.getDate()).padStart(2, '0')
    const YYMMDD = `${year}-${month}-${day}`
    dates.push(YYMMDD)
  }
  return dates
}


/**
 * 两个日期之间的天数
 * @date 2022-06-16
 * @param {Date} startDay 开始日期 '2022-06-16'
 * @param {Date} endDay 结束日期 '2022-06-20'
 * @returns {Number} 两个日期之间的天数 4
 */
 const twoDaysBetweenNum = (startDay, endDay) => {
  if (
    startDay === '' ||
    startDay === null ||
    startDay === undefined ||
    endDay === '' ||
    endDay === null ||
    endDay === undefined
  ) {
    return null
  }
  const startDate = Date.parse(startDay)
  const endDate = Date.parse(endDay)
  if (startDate == endDate) {
    return 0
  }
  const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
  return days
}
