---
title: 容易被忽略的知识点（二）
date: 2020-04-26 20:00:00
tag:
 - JavaScript
categories:
 - 前端进击
---
# 容易被忽略的知识点（二）
1. for 循环中的 let 有一个单独的作用域吗？
```javascript
let i = 5;
for (let i = 0; console.log(i), i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// 输出
// 0
// abc
// 1
// abc
// 2
// abc
// 3
```
证明 `let i = 5` 跟 for 循环体的 `let i = 0` 是不在同一个作用域，否则会报错。再看，for 循环里面的 `let i = 0` 和 `let i = 'abc'` 不在同一个作用域，否则也会报错。

2. 对象的解构赋值可以取到继承的属性吗？
```javascript
const obj1 = {};
const obj2 = { name: 'xiaoming' };
Object.setPrototypeOf(obj1, obj2);

const { name } = obj1;
name // "xiaoming"

```

3. 将已声明的变量结构赋值需要加括号？
```javascript
// 错误的写法
let x;
{x} = {x: 1}; // Uncaught SyntaxError: Unexpected token '='

因为 JavaScript 引擎会将 {x} 理解为一个代码块，从而发生语法错误，需要将整个结构语句放在圆括号里。

// 正确的写法
let x;
({x} = {x: 1});

```

4. 函数的 length 属性是指函数的默认参数个数，如果默认参数里面有默认值，会出现什么问题？
```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0

上面代码中，length 属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

为什么要提这个知识点呢，因为函数柯里化通用函数里，需要用到函数默认参数的个数，也就是length属性，所以如果参数设置了默认值，会影响函数柯里化的结果。
```

5. 不知道的 `Array.from` 用法。

`Array.from` 方法用于将两类对象转为真正的数组：

- 类似数组的对象（array-like-object）；
- 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）;

定义提到了 Array.from 可以将类数组对象（注：类数组对象可以理解为有 length 属性的对象）可以转换为数组，那么如下：
```javascript
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```
`Array.from` 还可以接受第二个参数，作用类似于数组的 `map` 方法。
```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
```
如果 `map` 函数里面用到了 `this` 关键字，还可以传入 `Array.from` 的第三个参数，用来绑定 `this`。

5. 数组的 `includes` 方法和 `indexOf` 方法都可以判断是否数组中存在某一元素，它们有什么区别？
```javascript
if ([1, 2, 3].indexOf(2) !== -1) {
  // ...
}
```
`indexOf` 方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符 `（===）` 进行判断，这会导致对 `NaN` 的误判。
```javascript
[NaN].indexOf(NaN)
// -1
```
`includes` 使用的是不一样的判断算法，就没有这个问题。
```javascript
[NaN].includes(NaN)
// true
```

6. 数组的 `join()` 和 `toString()` 方法，如果数组中包括 `undefined` 或 `null` ，会被处理成空字符串。
```javascript
[1, undefined, 2].join(); // "1,,2"
[1, undefined, 2].toString()]() // "1,,2"

[1, null, 2].join(); // "1,,2"
[1, null, 2].toString()]() // "1,,2"
```

7. 遍历对象操作跟可枚举性的设置。
- 可枚举性：

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor` 方法可以获取该属性的描述对象。
```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```
描述对象的 `enumerable` 属性，称为“可枚举性”，如果该属性为 `false`，就表示某些操作会忽略当前属性。

- 属性的遍历（ES6 一共有 5 种方法可以遍历对象的属性）：

（1）`for...in` 循环遍历对象自身的和继承的可枚举属性（不含 `Symbol` 属性）。

（2）`Object.keys(obj)` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 `Symbol` 属性）的键名。

（3）`Object.getOwnPropertyNames(obj)` 返回一个数组，包含对象自身的所有属性（不含 `Symbol` 属性，但是包括不可枚举属性）的键名。

（4）`Object.getOwnPropertySymbols(obj)` 返回一个数组，包含对象自身的所有 `Symbol` 属性的键名。

（5）`Reflect.ownKeys(obj)` 返回一个数组，包含对象自身的所有键名，不管键名是 `Symbol` 或字符串，也不管是否可枚举。

**以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则：**
（1）首先遍历所有数值键，按照数值升序排列。
（2）其次遍历所有字符串键，按照加入时间升序排列。
（3）最后遍历所有 `Symbol` 键，按照加入时间升序排列。
```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```
上面代码中，`Reflect.ownKeys` 方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性 2 和 10，其次是字符串属性 b 和 a，最后是 `Symbol` 属性。

8. `WeakSet` 和 `Set` 的区别？

区别两点：

- 第一点，`WeakSet`的成员只能是对象类型，而不能是其他类型的值。
```javascript
const ws = new WeakSet();
ws.add({a: 1}) // 正确
ws.add([1,2]) // 正确
wa.add(1) //错误
```

- 第二点，`WeakSet` 中的对象都是弱引用。

同上，`WeakMap` 和 `Map` 的区别也有两点：

- 第一点，`WeakMap` 只接受对象作为键名（`null` 除外），不接受其他类型的值作为键名。
- 第二点，`WeakMap` 的键名所指向的对象，不计入垃圾回收机制。

9. 对象的属性赋值，一般情况下这个值会赋值到对象上，但有一种情况会赋值到这个对象的原型上。

为什么下面的代码输出 1？
```javascript
const handler = {
  set: function(obj, prop, value, receiver) {
    console.log(1)
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
```
原因在于，如果 `myObj` 的原型部署了 `set` 方法，并且 `myObj` 上没有 `foo` 属性，此时，给 `myObj` 的 `foo`属性赋值的话，会先看 `myObj` 对象上是否有 `foo` 属性，没有的话回去它的原型去找，此时就触发了 `proxy`的 `set` 方法，所以打印了 `1`。

10.  Promise 中的 resolve 函数如果报错，Promise 对象抛出的错误不会传递到外层代码。
```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

- 上面代码中，`someAsyncThing` 函数产生的  `Promise` 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示 `ReferenceError: x is not defined`，但是不会退出进程、终止脚本执行，`2` 秒之后还是会输出 `123`。
- 这就是说，`Promise` 内部的错误不会影响到 `Promise` 外部的代码，通俗的说法就是 `Promise` 会吃掉错误。

11. 如何通过 `generator` 函数控制流程管理？

代码如下，如何自动执行以下的 `generator` 函数（这种流程管理的代码适合同步任务，我认为可以称作 JavaScript 的职责责任链模式，非常方便流程管理）
```javascript
function* runTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
  } catch (e) {

  }
}

// 自动执行代码如下：

scheduler(runTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果 Generator 函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```
