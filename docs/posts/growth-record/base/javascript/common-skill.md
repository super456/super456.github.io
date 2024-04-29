---
title: JavaScript 常用小技巧
date: 2019-03-21 20:00:00
tag:
 - JavaScript
categories:
 - 前端进击
---
# JavaScript 常用小技巧
### （一）判断对象是否为空值

```javascript
// 1. 将 json 对象转化为 json 字符串，再判断该字符串是否为 "{}"
var data = {}
var b = (JSON.stringify(data) == '{}')
alert(b) // true

// 2. for in 循环判断
const obj = {}
var b = function () {
  for (const key in obj)
    return false

  return true
}
alert(b()) // true

// 3.jquery 的 isEmptyObject 方法
// 此方法是 jquery 将 2 方法 (for in) 进行封装，使用时需要依赖 jquery
var data = {}
var b = $.isEmptyObject(data)
alert(b) // true

// 4. Object.getOwnPropertyNames() 方法
// 此方法是使用 Object 对象的 getOwnPropertyNames 方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的 length 来判断此对象是否为空
// 注意：此方法不兼容 ie8，其余浏览器没有测试
var data = {}
var arr = Object.getOwnPropertyNames(data)
alert(arr.length == 0) // true

// 5. 使用 ES6 的 Object.keys()方法
// 与 4 方法类似，是 ES6 的新方法, 返回值也是对象中属性名组成的数组
var data = {}
var arr = Object.keys(data)
alert(arr.length == 0) // true
```

### （二）正则表达式验证

- 校验手机号：`/^[1][3,4,5,7,8][0-9]{9}$/`

    `let pattern = /0?(13|14|15|17|18|19)[0-9]{9}/;`

```javascript
const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
if (!regPhone.test(_that.data.phoneValue)) {

} else {
  wx.showToast({
    title: '联系方式输入格式不正确！',
    icon: 'none',
    duration: 2000
  })
}
```

- 校验2-4个中文姓名：`/^[\u4e00-\u9fa5]{2,4}$/g`
- 替换中文字符为其他字符：`.replace(/([^\u0000-\u00FF])/g, '/')`

### （三）常用操作时间格式

创建 `Date` 对象时可以传入三个参数，分别是年、月（0~11，0 表示一月）、日，如果日的参数为0，那创建出来的对象表示的就是上个月的最后一天，如此就可以知道上个月有多少天了。
- `date.getFullYear()`; // 获取完整的年份(4位,1970)
- `date.getMonth()`; // 获取月份(0-11,0代表1月,用的时候记得加上1)
- `date.getDate()`; // 获取日(1-31)
- `date.getTime()`; // 获取时间(从1970.1.1开始的毫秒数)
- `date.getHours()`; // 获取小时数(0-23)
- `date.getMinutes()`; // 获取分钟数(0-59)
- `date.getSeconds()`; // 获取秒数(0-59)

1. `Date()` 参数形式有 7 种：
```javascript
new Date("month dd,yyyy hh:mm:ss");
new Date("month dd,yyyy");
new Date("yyyy/MM/dd hh:mm:ss");
new Date("yyyy/MM/dd");
new Date(yyyy,mth,dd,hh,mm,ss);
new Date(yyyy,mth,dd);
new Date(ms);

const date = new Date(2013, 2, 0)
date.getDate() // 28
```

2. 获取当前时间戳方法

```javascript
// 方法一
const timestamp = (new Date()).getTime()
console.log(timestamp) // 1495302061441

// 方法二
const timestamp2 = (new Date()).valueOf()
console.log(timestamp2) // 1495302061447

// 方法三
const timestamp3 = Date.parse(new Date())
console.log(timestamp3)// 1495302061000
 ```

  第一种和第二种是获取了当前毫秒的时间戳
  最后一种获取的时间戳是把毫秒改成 000 显示

3. 将时间戳转换成日期格式：

```javascript
function timestampToTime(timestamp) {
  const date = new Date(timestamp * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`
  const D = `${date.getDate()} `
  const h = `${date.getHours()}:`
  const m = `${date.getMinutes()}:`
  const s = date.getSeconds()
  return Y + M + D + h + m + s
}
timestampToTime(1403058804)
console.log(timestampToTime(1403058804))// 2014-06-18 10:33:24
```

**注意**：如果是 Unix 时间戳记得乘以 1000。比如：PHP 函数 `time()` 获得的时间戳就要乘以 1000

4. 将日期格式转换成时间戳：

```javascript
const date = new Date('2014-04-23 18:55:49:123')
// 有三种方式获取
const time1 = date.getTime()
const time2 = date.valueOf()
const time3 = Date.parse(date)
console.log(time1)// 1398250549123
console.log(time2)// 1398250549123
console.log(time3)// 1398250549000
```

```javascript
  //获取当前月份的总天数
  function getDays() {
    let date = new Date();
    //将当前月份加1，下移到下一个月
   date.setMonth(date.getMonth() + 1);
    //将当前的日期置为0，
    date.setDate(0);
    //再获取天数即取上个月的最后一天的天数
    let days = date.getDate();`
    return days;
  }
```

```javascript
/**
 * 获取某个月的总天数
 *
 */
function getDaysOfMonth(year, month) {
  const date = new Date(year, month, 0)
  const days = date.getDate()
  return days
}
```
