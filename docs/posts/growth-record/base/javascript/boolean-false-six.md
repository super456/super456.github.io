---
title: JavaScript 布尔值为 false 的六种情况
date: 2020-05-13 20:00:00
tag:
 - JavaScript
categories:
 - 前端进击
---
# JavaScript 布尔值为 false 的六种情况
## 一、六种情况
1. `undefined`：全局对象的一个属性，未定义，找不到值时出现；
2. `null`：字面量意思，表示缺少的标识，指示变量未指向任何对象，特指对象的值未设置，把 null 作为尚未创建的对象，也许更好理解。在 API 中，null 常在返回类型应是一个对象，但没有关联的值的地方使用；
3. `false`：布尔值的 `false`，字符串 “false” 的布尔值为 `true`；
4. `0`：数字零，字符串 “0” 的布尔值为 `true`；
5. `NaN`：不是常量，非数字值，无法计算结果时出现，但是 `typeof NaN === "number"` 为 `true`；
6. `""`（双引号）或 `''`（单引号）：空字符串，中间有空格时也是 `true`。

**注意：空数组、空对象、负数值、Infinity转化的布尔值都为** `true`。
```perl
console.log(Boolean([])) // true
console.log(Boolean({})) // true
console.log(Boolean(-1)) // true
console.log(Boolean(Infinity)) // true
```
## 二、不同类型转化布尔值
| **数据类型** | **转为true的值** | **转为false的值** |
| --- | --- | --- |
| Boolean | true | false |
| String | 任何非空字符串 | `''`（空字符串） |
| Number | 任何非零数字值（包括无穷大） | `0` 和 `NaN` |
| Object | 任何对象 | `null` |
| Undefined | n/a | `undefined` |

"`!!`" 将表达式进行强制转化为 bool 值的运算，运算结果为 `true` 或者 `false`。
```javascript
const num = 0
console.log(!num) // true
console.log(!!num) // false

const str = '0'
console.log(!str) // false
console.log(!!str) // true
```
## 三、出现 undefined 情况

1. 未初始化的变量：变量未定义 或 变量定义了没有赋值  或者 函数形参未赋值
```javascript
console.log(a) // undefined
```

2. 不返回任何结果的函数的调用结果，函数 return 没有值
```javascript
function show1(){
   return
}
console.log(show1())   // undefined

function show2(){
}
console.log(show2())  // undefined
```

3. 不存在的对象属性或方法
```javascript
let favoriteMovie = {
  title: 'Blade Runner'
}
favoriteMovie.actors // => undefined
```

4. 越界索引数组元素
```javascript
const colors = ['blue', 'white', 'red']
colors[5]  // => undefined
colors[-1] // => undefined
```
## 四、出现 null 情况

1. 在 JS 的 DOM 元素获取中，如果没有获取到指定的元素对象，结果一般是 `null`。
2. `Object.prototype._proto_` 的值也是 `null`。
3. 在正则捕获的时候，如果没有捕获到结果，默认也是 `null`。
```javascript
console.log(''.match(/[aeiou]/gi)) // null
```
