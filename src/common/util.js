// 防抖函数debounce
// 闭包：函数执行完，内部没引用就会销毁wai部变量
export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 如何将 时间戳 转成 时间格式化字符串 (常用)
/*
* 时间戳：15379321123(秒)
* 1.将时间戳转成Date对象
*   const date = new Date(15379321123 * 1000) // 毫秒
* 2.将date进行格式化，转成对应的字符串
* */

// 正则表达式是干什么的？字符串匹配 利器(难，规则多)
export function formatDate(date, fmt) {
  // 1.获取年份
  // y
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y? -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    // RegExp 是javascript中的一个内置对象。为正则表达式。
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(4 - RegExp.$1.length));
  }

  // 2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
