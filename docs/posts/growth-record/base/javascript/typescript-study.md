---
title: TypeScript 学习笔记
date: 2023-11-02 20:00:00
tags:
 - JavaScript
 - TypeScript
categories:
 - 前端进击
---
# TypeScript 学习笔记ts
## 语言介绍
TypeScript 与 JavaScript 发展史：
<CustomImage src='/growth-record/base/javascript/tsstudy03.webp' />

TypeScript 与 JavaScript 对比：
<CustomImage src='/growth-record/base/javascript/tsstudy04.webp' />

类型的概念：类型就是人为添加的一种编程约束和用户提示

运行时做的叫做**动态类型检查**，运行之前的编译期做的叫做**静态类型检查**

动态类型检查：源码中不保留类型信息，对某个变量赋什么值、做什么操作都是允许的，写代码很灵活，但有类型不安全隐患，⽐如对 string 做了乘除，对 Date 对象调⽤了 exec ⽅法，这些都是运⾏时才能检查出来的错误

静态类型的优点：
- 有利于代码的静态分析；
- 有利于发现错误；
- IDE 支持；
- 提供代码文档；
- 有利于重构代码；

静态类型的缺点：
- 丧失代码灵活性；
- 增加编程工作量；
- 更高的学习成本；
- 引入独立的编译步骤；
- 兼容性问题；

<CustomImage src='/growth-record/base/javascript/tsstudy05.webp' />

## 基础用法
### 类型声明
TypeScript 规定，变量只有赋值后才能使用，否则就会报错
```javascript
let x:number;
console.log(x) // 报错
```

### 类型推断
类型声明不是必须的，如果没有，TypeScript 会自己推断类型

### 编译
JavaScript 的运行环境（浏览器和 Node.js）不认识 TypeScript 代码。所以，TypeScript 项目要想运行，必须先转为 JavaScript 代码，这个代码转换的过程就叫做“编译”（compile）

- 官方提供编译器；
- 类型检查只是编译时的类型检查，而不是运行时的类型检查；
- 一旦代码编译为 JavaScript，运行时就不再检查类型；

### 值与类型
TypeScript 代码只涉及类型，不涉及值。所有跟“值”相关的处理，都由 JavaScript 完成

**TypeScript 项目里面，其实存在两种代码，一种是底层的“值代码”，另一种是上层的“类型代码”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法**
它们是可以分离的，TypeScript 的编译过程，实际上就是把 **“类型代码”全部拿掉**，只保留“值代码”

### TypeScript Playground
官方在线编译练习页面：
[TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play/)

### tsc 编译器
TypeScript 官方提供的编译器叫做 tsc，可以将 TypeScript 脚本编译成 JavaScript 脚本

TypeScript 脚本文件使用 `.ts` 后缀名，JavaScript 脚本文件使用 `.js` 后缀名。tsc 的作用就是把 `.ts` 脚本转变成 `.js` 脚本

tsc 使用
```javascript
// 安装
npm install -g typescript

// 查看版本
tsc -v

// 查看帮助
tsc --help

// 编译某个文件
tsc app.ts

// 命令参数，制定编译后 JavaScript 版本
tsc --target es2015 app.ts

// 编译报错停止生成对应文件的参数
tsc --noEmitOnError app.ts

// 只校验类型是否正确，不会生成 JavaScript 文件
tsc --noEmit app.ts
```

`tsconfig.json` 配置

ts-node 模块：便捷方式运行 TypeScript 代码查看结果
[**ts-node**](https://github.com/TypeStrong/ts-node) **是一个非官方的 npm 模块，可以直接运行 TypeScript 代码**

### 三种特殊类型
#### any
表示没有任何限制，该类型的变量可以赋予任意类型的值
特点：

- 相当于关闭这个类型检查；
- 顶层类型（top type）；
- 污染其他变量（**它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错**）；

使用场景：

- 出于特殊原因，需要关闭某些变量的类型检查；
- 适配老项目，快速迁移；

类型推断为 any 就会报错的配置：
```javascript
tsc --noImplicitAny app.ts
```
但有个隐患：使用 let 和 var 命令声明变量，但不赋值也不指定类型，是不会报错的
```javascript
let x;

x = 123;
x = { foo: 'hello' };
```
所以：建议使用 let 和 var 声明变量时，**如果不赋值，就一定要显式声明类型，否则可能存在安全隐患**

```javascript
let x:any = 'hello';
let y:number;

y = x; // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```
污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用 any 类型的另一个主要原因

#### unknown
表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像 any 那样自由，可以视为严格版的 any

**凡是需要设置 any 类型的地方都应该优先考虑设为 unknown 类型、除了 any 外其他所有类型的全集**

跟 any 相似之处：所有类型的值都可以分配给 unknown 类型、顶层类型
```javascript
let x:unknown;

x = true; // 正确
x = 42; // 正确
x = 'Hello World'; // 正确
```
跟 any 不同之处：

- 不能直接使用——unknown 类型的变量，不能直接赋值给其他类型的变量（除了 any 类型和 unknown 类型），**避免污染变量问题，从而跟 any 类型不一样**
```javascript
let v:unknown = 123;

let v1:boolean = v; // 报错
let v2:number = v; // 报错
```

- 不能直接调用 unknown 类型的变量的方法和属性
```javascript
let v1:unknown = { foo: 123 };
v1.foo  // 报错

let v2:unknown = 'hello';
v2.trim() // 报错

let v3:unknown = (n = 0) => n + 1;
v3() // 报错
```

- unknown 类型能够进行的运算是有限的，只能进行比较运算（运算符：`==、===、!=、!==、||、&&、?`）、取反运算（运算符：`!`）、`typeof` 运算符合 `instanceof` 运算符这几种
```javascript
let a:unknown = 1;

a + 1 // 报错
a === 1 // 正确
```
使用 unknown 类型变量的方法：类型缩小——缩小 unknown 变量的类型范围，确保不会出错（明确 unknown 类型变量的实际类型，才允许使用它，防止像 any 一样乱用，变量污染）
```javascript
let a:unknown = 1;

// 类型缩小
if (typeof a === 'number') {
  let r = a + 10; // 正确
}

if (typeof a === 'string') {
  a.length; // 正确
}
```

#### never
不存在任何属于“空类型”的值，这样的类型的成为 never，即不可能有这样的值
特点：

- never 类型的变量可以赋值给任意类型（空集是任何集合的子集）；
- 唯一一个底层类型；

使用场景：一些类型运算中，保证类型运算的完整性

```javascript
function fn(x:string|number) {
  if (typeof x === 'string') {
    // ...
  } else if (typeof x === 'number') {
    // ...
  } else {
    x; // never 类型
  }
}
```

## 基本类型
JavaScript 语言（注意，不是 TypeScript）将值分成 8 种类型。

- boolean
- string
- number
- bigint
- symbol

以上 5 种为原始类型，其中 symbol、bigint 类型无法获取它们的包装对象（即 Symbol() 和 BigInt() 不能作为构造函数使用）

- object（复合类型：对象、数组和函数）
- undefined（特殊值类型）
- null（特殊值类型）

注意类型名称都是小写
**特殊：undefined 和 null 即可以作为值，也可以作为类型，取决于怎么使用他们**

注意：

- bigint 与 number 类型不兼容
```javascript
const x:bigint = 123; // 报错
const y:bigint = 3.14; // 报错
// bigint 赋值给整数和小数都会报错
```

- bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数 target 不低于 es2020）

如果没有声明类型的变量，被赋值为 undefined 或 null，在关闭编译设置 noImplicitAny 和 strictNullChecks 时，它们的类型会被推断为 any
```javascript
// 关闭 noImplicitAny 和 strictNullChecks

let a = undefined;   // any
const b = undefined; // any

let c = null;        // any
const d = null;      // any
```
### 包装对象类型
包装对象：指的是这些类型变量（`boolean、string、number`）需要时，会自动产生的对象
```javascript
'hello'.charAt(1) // 'e'
```

包装对象类型与字面量类型
```javascript
'hello' // 字面量
new String('hello') // 包装对象

Boolean 和 boolean
String 和 string
Number 和 number
BigInt 和 bigint
Symbol 和 symbol

const s1:String = 'hello'; // 正确
const s2:String = new String('hello'); // 正确

const s3:string = 'hello'; // 正确
const s4:string = new String('hello'); // 报错
```
大写类型包含包装类型和字面量类型，小写类型只包含字面量，不包含包装对象

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错

### Object 类型与 object 类型
Object 广义对象：**所有可以转成对象的值，都是 Object 类型，几乎所有的值**。`{}` （空对象）为 Object 类型的简写形式
```javascript
let obj:Object;
// 或 let obj: {}

obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;

obj = undefined; // 报错
obj = null; // 报错
```

object 侠义对象：字面量表是，只包含**对象、数组和函数**，不包括原始类型的值
```javascript
let obj:object;

obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
obj = true; // 报错
obj = 'hi'; // 报错
```
使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，**建议总是使用小写类型 object，不使用大写类型 Object**

**注意，无论是大写的 Object 类型，还是小写的 object 类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中**
```javascript
const o1:Object = { foo: 0 };
const o2:object = { foo: 0 };

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```
### undefined 和 null 的特殊性
undefined 和 null 即是值，又是类型
作为值：任何其他类型的变量都可以赋值为 undefined 或 null
```javascript
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```
并不是类型里面包含了 undefined 或 null，而是故意这样设计的，目的为了跟 JavaScript 行为保持一致

JavaScript 的行为是，变量如果等于 undefined 就表示还没有赋值，如果等于 null 就表示值为空。所以，TypeScript 就允许了任何类型的变量都可以赋值为这两个值

TypeScript 提供了一个编译选项 strictNullChecks。只要打开这个选项，undefined 和null 就不能赋值给其他类型的变量（除了 any 类型和 unknown 类型），而且 undefined 和 null 这种值不能相互赋值，但是赋值给 any 或 unknown 却没有限制

### 值类型
```typescript
let x:'hello';

x = 'hello'; // 正确
x = 'world'; // 报错

// x 的类型是 "https"
const x = 'https';

// y 的类型是 string
const y:string = 'https';

// x 的类型是 { foo: number }
const x = { foo: 1 };
// JavaScript 里面，const变量赋值为对象时，属性值是可以改变的

const x:5 = 4 + 1; // 报错
```

### 联合类型
```typescript
let setting:true|false;

let gender:'male'|'female';

let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
```
“类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）
```typescript
function printId(
  id:number|string
) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

function getPort(
  scheme: 'http'|'https'
) {
  switch (scheme) {
    case 'http':
      return 80;
    case 'https':
      return 443;
  }
}
```

### 交叉类型
指的多个类型组成的一个新类型，使用符号 `&` 表示
```typescript
let obj:
  { foo: string } &
  { bar: string };

obj = {
  foo: 'hello',
  bar: 'world'
};

type A = { foo: number };

type B = A & { bar: number };
```
### type 命令
type 命令用来定义一个类型的别名
别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型

特点：

- 别名不允许重名；
- 别名的作用域是块级作用域；
- 别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套
- type 命令属于类型相关代码，编译 JavaScript 的时候会全部删除
```typescript
type Color = 'red';
type Color = 'blue'; // 报错

type Color = 'red';

if (Math.random() < 0.5) {
  type Color = 'blue'; // 作用域问题不会报错
}

type World = "world";
type Greeting = `hello ${World}`; // 别名嵌套
```

### typeof 运算符
JavaScript 语言中，typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型
```typescript
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n // "bigint"
```
同一段代码可能存在两种 typeof 运算符，一种用在值相关的 JavaScript 代码部分（值运算），另一种用在类型相关的 TypeScript 代码部分（类型运算）

由于编译时不会进行 JavaScript 的值运算，所以TypeScript 规定，**typeof 的参数只能是标识符，不能是需要运算的表达式**
```typescript
type T = typeof Date(); // 报错
```
**typeof 命令的参数不能是类型**
```typescript
type Age = number
type MyAge = typeof Age // 报错
```

### 块级类型声明
TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效（**块级作用域**）
```typescript
if (true) {
  type T = number;
  let v:T = 5;
} else {
  type T = string; // 可以重复声明
  let v:T = 'hello';
}
```

### 类型的兼容
TypeScript 为这种情况定义了一个专门术语。如果类型 A 的值可以赋值给类型 B，那么类型 A 就称为类型 B 的子类型（subtype）

TypeScript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行

## 数组
两种声明写法
```typescript
// 字面量定义
const arr: number[] = [1]

// 泛型定义
const arr1: Array<number | string> = [1, '2']

// 注意联合类型的使用，需要搭配括号，跟优先级有关
let arr:(number|string)[];
```

TypeScript 允许使用方括号读取数组成员的类型
```typescript
type Names = string[];
type Name = Names[0]; // string
// 也可以写成这样
type Name = Names[number]
```

数组类型推断
**前提条件是初始值为空的数组**
如果没有声明数组类型，数组会根据添加的元素进行类型推断
```typescript
const arr = [];
arr // 推断为 any[]

arr.push(123);
arr // 推断类型为 number[]

arr.push('abc');
arr // 推断类型为 (string|number)[]

// 注意⚠️：类型不为空的数组
// 推断类型为 number[]
const arr = [123];

arr.push('abc'); // 报错
```

只读数组，const 断言

```typescript
// 只读数组与数组的父类型关系

function getSum(s:number[]) {
  // ...
}

const arr:readonly number[] = [1, 2, 3];

getSum(arr) // 报错

// 修改
getSum(arr as number[])
```
注意⚠️：readonly 与数组的泛型写法不能一起使用
```typescript
// 报错
const arr:readonly Array<number> = [0, 1];

// TypeScript 专门的泛型
const a1:ReadonlyArray<number> = [0, 1];

const a2:Readonly<number[]> = [0, 1];
```

通过使用 const 断言来使用只读数组
```typescript
const arr = [0, 1] as const
arr[0] = 2 // 报错
```

多维数组
```typescript
// 数组成员类型为：number
var multi:number[][] =
  [[1,2,3], [23,24,25]];
```
## 元组
成员类型写在方括号里面的就是元组，写在外面的就是数组
```typescript
// 数组
let a:number[] = [1];

// 元组
let t:[number] = [1];
```
**元组必须显式给出类型声明**
元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的
```typescript
let a:[number, number?] = [1];
```
注意⚠️：可选成员必须放在尾部（必须放在必选成员之后）

**元组的成员是有限的，越界的成员会报错，但是可以通过扩展符使用不限制成员数量**
```typescript
type NamedNums = [
  string,
  ...number[]
];

const a:NamedNums = ['A', 1, 2];
const b:NamedNums = ['B', 1, 2, 3];

// 扩展符的使用
type t1 = [string, number, ...boolean[]];
type t2 = [string, ...boolean[], number];
type t3 = [...boolean[], string, number];
```

如果不确定元组成员的类型和数量
```typescript
type Tuple = [...any[]]
```

元组的成员可以添加成员名，这个成员名是**说明性的**，可以任意取名，没有实际作用
```typescript
type Color = [
  red: number,
  green: number,
  blue: number
];

const c:Color = [255, 255, 255];
```

元组可以通过方括号，读取成员类型
```typescript
type Tuple = [string, number];
type Age = Tuple[1]; // number

// 获取所有成员的类型
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];  // string|number|Date
```

### 只读元组
```typescript
// 写法一
type t = readonly [number, string]

// 写法二
type t = Readonly<[number, string]>
```

只读元组不能替代元组
```typescript
function distanceFromOrigin([x, y]:[number, number]) {
  return Math.sqrt(x**2 + y**2);
}

let point = [3, 4] as const;

distanceFromOrigin(point); // 报错

// 使用断言解决
distanceFromOrigin(point as [number, number])
```

### 成员数量的推断
**如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）**
```typescript
function f(
  point:[number, number?, number?]
) {
  if (point.length === 4) {  // 报错
    // ...
  }
}
```

注意⚠️：使用了扩展符就将无法退出成员的数量（TypeScript 内部会把元组当做数组处理）
```typescript
const myTuple:[...string[]]
  = ['a', 'b', 'c'];

if (myTuple.length === 4) { // 正确
  // ...
}
```

### 扩展运算符与成员数量
扩展运算符（...）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的
```typescript
const arr = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 报错
```
解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，再使用扩展运算符（补充类型注解）
```typescript
// 将上面的写法改成这样
const arr:[number, number] = [1, 2];

function add(x:number, y:number){
  // ...
}

add(...arr) // 正确
```
还有一种更简单的写法，使用断言 `const` （值类型）
```typescript
const arr = [1, 2] as const
```
既可以当做数组，也可以当做元组使用

## Symbol 类型
Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是**每一个 Symbol 值都是独一无二的，与其他任何值都不相等**

使用
```typescript
let x:symbol = Symbol();
let y:symbol = Symbol();

x === y // false
```

symbol 类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值
unique symbol 表示单个的、某个具体的 Symbol 值，该类型声明的变量不能修改，只能用 const 声明
```typescript
// 正确
const x:unique symbol = Symbol();

// 报错
let y:unique symbol = Symbol();
```
**const 命令为变量赋值 Symbol 值时，变量类型默认就是 unique symbol，所以类型可以省略不写**
```typescript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();
```
注意⚠️：声明两个都是 unique symbol 的类型变量，值类型都是不相同的，也不能相互赋值
```typescript
const a:unique symbol = Symbol();
const b:unique symbol = a; // 报错
```
写成相同的类型声明：
```typescript
const a:unique symbol = Symbol();
const b:typeof a = a; // 正确
```

Symbol.for() 的使用可以创建声明不同类型的但值相等的变量
```typescript
const a:unique symbol = Symbol.for('foo');
const b:unique symbol = Symbol.for('foo');
```

**unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行**
```typescript
const a:unique symbol = Symbol();

const b:symbol = a; // 正确

const c:unique symbol = b; // 报错
```

**unique symbol 类型的一个作用，就是用作属性名**，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol
```typescript
const x:unique symbol = Symbol();
const y:symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}
```

unique symbol 类型也可以用作类（class）的属性值，但只能赋值给类的 readonly static 属性
```typescript
class C {
  static readonly foo:unique symbol = Symbol();
}
```

类型推断中有一个注意点：如果 const 变量赋值给另一个 symbol 类型的变量，则推断类型为 symbol，而不是 unique symbol
```typescript
let x = Symbol();

// 类型为 symbol
const y = x;

const x1 = Symbol();

// 类型为 symbol
let y1 = x1;
```
### 总结

- Symbol 值是独一无二的，每个值都是不相等的；
- unique symbol 表示单个的、某个具体的 Symbol 值，声明后不能修改，只能用 const 声明，是 symbol 的子类型。使用场景：用做属性名；
- 默认类型推断 let 声明的 symbol 变量跟 const 声明的 symbol，之间赋值都会被推断为 symbol 类型；

## 函数类型
#### 基本使用
函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型
```typescript
function hello(
  txt:string
):void {
  console.log('hello ' + txt);
}
```
注意：返回值的类型通常不用写，TypeScript 默认可以推断出来。但如果防止返回值类型被修改或者为了文档考虑，建议写上

如果一个变量被赋值为一个函数，声明写法有两种：
```typescript
// 写法一
const hello = function (txt:string) {
  console.log('hello ' + txt);
}

// 写法二
const hello:
  (txt:string) => void
= function (txt) {
  console.log('hello ' + txt);
};
```

函数类型里面的参数名与实际参数名，可以不一致
```typescript
let f:(x:number) => number;

f = function (y:number) {
  return y;
};
```

函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数
```typescript
let myFunc:
  (a:number, b:number) => number;

myFunc = (a:number) => a; // 正确

myFunc = (
  a:number, b:number, c:number
) => a + b + c; // 报错
```

如果一个变量要套用另一个函数类型，有一个小技巧，就是使用 typeof 运算符（返回类型），**注意：这是一个很有用的技巧，任何需要类型的地方，都可以使用 typeof 运算符从一个值获取类型**
```typescript
function add(
  x:number,
  y:number
) {
  return x + y;
}

const myAdd:typeof add = function (x, y) {
  return x + y;
}
```

函数类型声明还可以采用对象的写法：
```typescript
let add: {
  (x: number, y: number): number
}

add = function (x, y) {
	return x + y
}

// 写法公式，注意：间隔是冒号
{
  (参数列表): 返回值
}
```
**适用场景：声明函数属性类型**
```typescript
let foo: {
  (x:number): void;
  version: string
} = f;
```

Interface 写法，跟对象声明写法一样
```typescript
interface Myfn {
  (a: number, b: number): number
}

const add: Myfn = (a, b) => a + b
```

#### Function 类型
任何函数都是属于这个类型，相当于 any 收窄为具体的函数类型，Function 类型的值都可以直接执行
```typescript
function doSomething (f: Function) {
  return f(1, 2, 3)
}
```

注意⚠️：Function 类型的函数可以接受任意数量的参数，每个参数的类型都是 any，返回值的类型也是any，代表没有任何约束，**所以不建议使用这个类型，给出函数详细的类型声明会更好**

#### 箭头函数
写法：
```typescript
const repeat = (str: string, times: number): string => str.repeat(times)
```

注意返回值的声明位置：
```typescript
type Person = { name: string };

const people = ['alice', 'bob', 'jan'].map(
  (name):Person => ({name})
);
```

#### 可选参数
如果函数的某个参数可以省略，则在参数名后面加问号表示
```typescript
function f(x?:number) {
  // ...
}

f(); // OK
f(10); // OK
f(undefined) // OK
```
**参数名带有问号，表示该参数的类型实际上是 原始类型 | undefined，它有可能为undefined，**但是类型设置为 number | undefined 表是要么传入一个数值或 undefined，如果省略就会报错
函数的可选参数只能在参数列表的尾部，跟在必选参数的后面
养成习惯：可选参数永远放在尾部
如果函数参数多个情况下，前面的参数有可能为空，只能显示注明类型包括 undefined，传参时也要传入 undefined
```typescript
let myFunc:
  (
    a:number|undefined,
    b:number
  ) => number;
```

用到的可选参数记得判断该参数是否为 undefined，防止误用报错（建议设置默认值）：
```typescript
let myFunc:
  (a:number, b?:number) => number;

myFunc = function (x, y) {
  if (y === undefined) {
    return x;
  }
  return x + y;
}
```

#### 参数默认值
设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值，类型声明可以根据默认值推断出来（**注意⚠️：设置了默认值，参数传 undefined，也会触发默认值**）
```typescript
function createPoint(
  x:number = 0,
  y:number = 0
):[number, number] {
  return [x, y];
}

createPoint() // [0, 0]
```
**注意⚠️：可选参数跟默认值不能同时使用**
```typescript
function f(x?: number = 0) {} // 报错
```
具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，必须显式传入 undefined
```typescript
function add(
  x:number = 0,
  y:number
) {
  return x + y;
}

add(1) // 报错
add(undefined, 1) // 正确
```

#### 参数解构
参数解构可以结合类型别名（type 命令）一起使用，代码会看起来简洁一些
```typescript
type ABC = { a:number; b:number; c:number };

function sum({ a, b, c }:ABC) {
  console.log(a + b + c);
}
```

#### rest 参数
rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）
```typescript
// rest 参数为数组
function joinNumbers(...nums:number[]) {
  // ...
}

// rest 参数为元组
function f(...args:[boolean, number]) {
  // ...
}
```
**注意⚠️：元组需要声明每一个剩余参数的类型。如果元组里面的参数是可选的，则要使用可选参数**
```typescript
function f(
  ...args: [boolean, string?]
) {}

// m 是 rest 类型数组
function multiply(n:number, ...m:number[]) {
  return m.map((x) => n * x);
}

// 类型嵌套
function f1(...args:[boolean, ...string[]]) {
  // ...
}

// 结构
function repeat(
  ...[str, times]: [string, number]
):string {
  return str.repeat(times);
}

// 等同于
function repeat(
  str: string,
  times: number
):string {
  return str.repeat(times);
}
```

#### readonly 只读参数
```typescript
function arraySum(
  arr:readonly number[]
) {
  // ...
  arr[0] = 0; // 报错
}
```

#### void 类型
void 类型表示函数没有返回值
```typescript
function f(): void {
  console.log('xx')
}
```
注意⚠️：允许返回 undefined 或 null
```typescript
function f1(): void {
  return undefined
}

function f2(): void {
  return null
}
```
如果打开 strictNullChecks 编译选项，那么 void 类型只允许返回 undefined。如果返回 null，就会报错。这是因为 JavaScript 规定，如果函数没有返回值，就等同于返回 undefined

注意⚠️：如果变量、对象方法、函数参数是一个返回值为 void 类型的函数，那么并不代表不能赋值为有返回值的函数。恰恰相反，该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错（**原因：这个返回值不重要或者不产生作用**）
```typescript
type voidFunc = () => void;

const f:voidFunc = () => {
  return 123;
};
```
因为这时 TypeScript 认为，这里的 void 类型只是表示该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。只要不用到这里的返回值，就不会报错
```typescript
const src = [1, 2, 3];
const ret = [];

src.forEach(el => ret.push(el));
```
**注意⚠️：push() 有返回值，表示插入新元素后数组的长度。但是，对于 forEach() 方法来说，这个返回值是没有作用的，根本用不到，所以 TypeScript 不会报错**
反例：使用到了这个返回值
```typescript
type voidFunc = () => void;

const f:voidFunc = () => {
  return 123;
};

f() * 2 // 报错
```
**注意⚠️：这种情况仅限于变量、对象方法和函数参数，函数字面量如果声明了返回值是 void 类型，还是不能有返回值**
```typescript
function f():void {
  return true; // 报错
}

const f3 = function ():void {
  return true; // 报错
};
```

如果函数运行结果是抛出错误，也允许返回值写成 void
```typescript
function throwErr():void {
  throw new Error('something wrong');
}
```

除了函数，其他变量声明为 void 类型没有多大意义（可以作为一个变量类型声明），因为这时只能赋值为 undefined 或者 null（假定没有打开strictNullChecks)
```typescript
let foo: void = undefined
// 没有打开 strictNullChecks 的情况下
let bar: void = null
```

#### never 类型
never 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常的执行结束，**never 是唯一一个底层类型，所有其他类型都包括这个类型**
**使用场景：**

1. 抛出错误的函数：
```typescript
function fail(msg: string): never {
  throw new Error(msg)
}
```
**注意，只有抛出错误，才是 never 类型。如果显式用 return 语句返回一个 Error 对象，返回值就不是 never 类型**
另外，由于抛出错误的情况属于 never 类型或 void 类型，所以无法从返回值类型中获知，抛出的是哪一种错误

2. 无限执行的函数：
```typescript
const sing = funciton (): never {
  while(true) {
    ...
  }
}
```
**注意⚠️：never 类型不同于 void 类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回 undefined**
```typescript
// 正确
function sing():void {
  console.log('sing');
}

// 报错
function sing():never {
  console.log('sing');
}
```

如果一个函数抛出了异常或者陷入了死循环，那么该函数无法正常返回一个值，因此该函数的返回值类型就是 never。如果程序中调用了一个返回值类型为 never 的函数，那么就意味着程序会在该函数的调用位置终止，永远不会继续执行后续的代码
```typescript
function neverReturns():never {
  throw new Error();
}

function f(
  x:string|undefined
) {
  if (x === undefined) {
    neverReturns();
  }

  x; // 推断为 string
}
```

省略 never 类型声明的情况：一个函数在某些情况下是正常返回值的，另一些情况下会抛出错误
```typescript
function sometimesThrow():number {
  if (Math.random() > 0.5) {
    return 100;
  }

  throw new Error('Something went wrong');
}

const result = sometimesThrow();
```

#### 局部类型
函数内部允许声明其他类型，该类型只在函数内部有效，称为局部类型
```typescript
function hello(txt:string) {
  type message = string;
  let newTxt:message = 'hello ' + txt;
  return newTxt;
}

const newTxt:message = hello('world'); // 报错
```

#### 高阶函数
一个函数的返回值是一个函数，那么前一个函数就称为高阶函数（higher-order function）
```typescript
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

#### 函数重载
有些函数可以**接受不同类型**或**不同个数的参数**，并且根据参数的不同，会有**不同的函数行为**。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载（function overload）
```typescript
function reverse(str:string):string;
function reverse(arr:any[]):any[];

reverse('abc') // 'cba'
reverse([1, 2, 3]) // [3, 2, 1]
```
**注意⚠️：到这里并没有结束，后面还必须对函数 reverse() 给予完整的类型声明**
```typescript
function reverse(str:string):string;
function reverse(arr:any[]):any[];
function reverse(
  stringOrArray:string|any[]
):string|any[] {
  if (typeof stringOrArray === 'string')
    return stringOrArray.split('').reverse().join('');
  else
    return stringOrArray.slice().reverse();
}
// 前两行类型声明列举了重载的各种情况。第三行是函数本身的类型声明，它必须与前面已有的重载声明兼容
```
```typescript
function add(
  x:number,
  y:number
):number;
function add(
  x:any[],
  y:any[]
):any[];
function add(
  x:number|any[],
  y:number|any[]
):number|any[] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && Array.isArray(y)) {
    return [...x, ...y];
  }

  throw new Error('wrong parameters');
}
```
**注意⚠️：重载的各个类型描述与函数的具体实现之间，不能有其他代码，否则报错**

**重载声明的排序很重要**，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，**所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明**
```typescript
function f(x:any):number;
function f(x:string): 0|1;
function f(x:any):any {
  // ...
}

const a:0|1 = f('hi'); // 报错
```

对象的方法也可以实现重载：
```typescript
class StringBuilder {
  #data = '';

  add(num:number): this;
  add(bool:boolean): this;
  add(str:string): this;
  add(value:any): this {
    this.#data += String(value);
    return this;
  }

  toString() {
    return this.#data;
  }
}

```

函数重载可以用来精确描述函数参数与返回值之间的关系：
```typescript
function createElement(
  tag:'a'
):HTMLAnchorElement;
function createElement(
  tag:'canvas'
):HTMLCanvasElement;
function createElement(
  tag:'table'
):HTMLTableElement;
function createElement(
  tag:string
):HTMLElement {
  // ...
}
```
可以通过对象声明表示：
```typescript
type CreateElement = {
  (tag:'a'): HTMLAnchorElement;
  (tag:'canvas'): HTMLCanvasElement;
  (tag:'table'): HTMLTableElement;
  (tag:string): HTMLElement;
}
```

建议：一般函数重载存在比较复杂的类型声明关系，**优先使用联合类型替代函数重载，除非多个参数之间、或者某个参数与返回值之间，存在对应关系。**相对来说，使用联合类型比使用函数重载会简洁很多
```typescript
// 写法一
function len(s:string):number;
function len(arr:any[]):number;
function len(x:any):number {
  return x.length;
}

// 写法二
function len(x:any[]|string):number {
  return x.length;
}
```

#### 构造函数
JavaScript 语言是使用构造函数，生成对象的实例的。构造函数最大的特点就是，必须使用 new 命令调用
```typescript
const d = new Date();

class Animal {
  numLegs:number = 4;
}

type AnimalConstructor = new () => Animal;

function create(c:AnimalConstructor):Animal {
  return new c();
}

const a = create(Animal);
```

构造函数类型声明（注意：new 命令）：
```typescript
type F = {
  new (s: string)： object;
}

// 如果既可以当做普通函数，又可以当做构造函数，声明写法如下：
type F = {
  new (s: string): object;
  (n?: number): number
}
```

### 总结

## 对象类型
#### 基本使用
```typescript
const obj:{
  x:number;
  y:number;
} = { x: 1, y: 1 };
```
注意⚠️：属性的类型可以用分号结尾，也可以用逗号结尾
```typescript
// 属性类型以分号结尾
type MyObj = {
  x: number;
  y: number;
}

// 属性类型以逗号结尾
type MyObj = {
  x: number,
  y: number,
}

// 最后一个属性后面，可以写分号或逗号，也可以不写
```

对象的方法描述函数：
```typescript
const obj:{
  x: number;
  y: number;
  add(x:number, y:number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) {
    return x + y;
  }
};
```
**对象类型可以使用方括号读取属性的类型：**
```typescript
type User = {
  name: string,
  age: number
}

type Name = User['name']
```
interface 命令写法：
```typescript
// 写法一
type MyObj = {
  x:number;
  y:number;
};

const obj:MyObj = { x: 1, y: 1 };

// 写法二
interface MyObj {
  x: number;
  y: number;
}

const obj:MyObj = { x: 1, y: 1 };
```
**注意⚠️：TypeScript 不会区分对象自身的属性和继承的属性，一律视为对象的属性**
```typescript
interface MyInterface {
  toString(): string // 继承的属性
  prop: number // 自身属性
}

const obj: MyInterface = { // 正确
  prop: 123
}
```

#### 可选属性
```typescript
const obj: {
  x: number;
  y?: number;
} = { x: 1 };

```
**注意⚠️：可选属性等同于允许赋值为 undefined **
```typescript
type User = {
  firstName: string;
  lastName?: string;
};

// 等同于
type User = {
  firstName: string;
  lastName?: string|undefined;
};

const obj: {
  x: number;
  y?: number;
} = { x: 1, y: undefined };
```

TypeScript 提供编译设置 ExactOptionalPropertyTypes，只要同时打开这个设置和 strictNullChecks，可选属性就不能设为 undefined
```typescript
// 打开 ExactOptionsPropertyTypes 和 strictNullChecks
const obj: {
  x: number;
  y?: number;
} = { x: 1, y: undefined }; // 报错
```

**注意⚠️：可选属性与允许设为 undefined 的必选属性是不等价的**
```typescript
type A = { x:number, y?:number };
type B = { x:number, y:number|undefined };

const ObjA:A = { x: 1 }; // 正确
const ObjB:B = { x: 1 }; // 报错
```

#### 只读属性
属性名前面加上 readonly 关键字，表示这个属性是只读属性，不能修改
**注意⚠️：只读属性只能在对象初始化期间赋值，此后就不能修改属性**
```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

const p:Point = { x: 0, y: 0 };

p.x = 100; // 报错
```

**但是⚠️，如果属性是一个对象，readonly 修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象**
```typescript
interface Home {
  readonly resident: {
    name: string;
    age: number
  };
}

const h:Home = {
  resident: {
    name: 'Vicky',
    age: 42
  }
};

h.resident.age = 32; // 正确
h.resident = {
  name: 'Kate',
  age: 23
} // 报错
```

**高端操作：另一个需要注意的地方是，如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量**
```typescript
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let w:Person = {
  name: 'Vicky',
  age: 42,
};

let r:ReadonlyPerson = w;

w.age += 1;
r.age // 43
```

**注意⚠️：另一种声明只读属性：赋值时，在对象后面加上只读断言 `as const`，对象后面加上就变成只读对象，不能修改属性**
```typescript
const myUser = {
  name: 'xxx'
} as const

myUser.name = '1111' // 报错
```
注意，上面的 as const 属于 TypeScript 的类型推断，如果变量明确地声明了类型，那么 TypeScript 会以声明的类型为准
```typescript
const myUser:{ name: string } = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 正确
```

#### 属性名的索引类型
使用属性名表达式的写法来描述类型
```typescript
type MyObj = {
  // property 表示属性名，这个是可以随便起的
  [property: string]: string
}

const obj: MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c'
}

type T1 = {
  [property: number]: string
};

type T2 = {
  [property: symbol]: string
};

type MyArr = {
  [n:number]: number;
};

const arr:MyArr = [1, 2, 3];
// 或者
const arr:MyArr = {
  0: 1,
  1: 2,
  2: 3,
};
```
对象可以有多种类型索引，比如数值索引和字符串索引。但是数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在 JavaScript 语言内部，所有的数值属性名都会自动转为字符串属性名
同样地，可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名符合属性名索引的范围，两者不能有冲突，否则报错
```typescript
type MyType = {
  [x: number]: boolean; // 报错
  [x: string]: string;
}

type MyType = {
  foo: boolean; // 报错
  [x: string]: string;
}
```

**注意⚠️：慎重使用，属性名的声明太宽泛了，约束太少。另外，属性名的数值索引不宜用来声明数组，因为采用这种方式声明数组，就不能使用各种数组方法以及 length属性，因为类型里面没有定义这些东西**
```typescript
type MyArr = {
  [n:number]: number;
};

const arr:MyArr = [1, 2, 3];
arr.length // 报错
```

#### 解构赋值
解构赋值用于直接从对象中提取属性
```typescript
const {id, name, price}:{
  id: string;
  name: string;
  price: number
} = product;

// 解构赋值类型的写法，跟为对象声明类型是一样的
const { id, name, price }: {
  id: string;
  name: string;
  price: number
} = product

let { x: foo, y: bar }: { x: string; y: number } = obj;

function draw({
  shape: Shape,
  xPos: number = 100,
  yPos: number = 100
}) {
  let myShape = shape; // 报错
  let x = xPos; // 报错
}
```
注意⚠️：目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途

#### 结构类型原则
只要对象 B 满足对象 A 的**结构特征（跟类型名无关）**，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则，**简单说 B 包含 A，使用 A 的地方可以使用 B 替代**
```typescript
type A = {
  x: number;
};

type B = {
  x: number;
  y: number;
};

const B = {
  x: 1,
  y: 1
};

const A:{ x: number } = B; // 正确
```
**如果类型 B 可以赋值给类型 A，TypeScript 就认为 B 是 A 的子类型，A 是 B 的父类型。子类型满足父类型的所有特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型**

```typescript
type MyObj = {
  x: number,
  y: number,
};

function getSum(obj:MyObj) {
  let sum = 0;

  for (const n of Object.keys(obj)) {
    const v = obj[n]; // 报错，所有兼容的 MyObj 对象都可以使用，可能为 any
    sum += Math.abs(v);
  }

  return sum;
}

// 修改：使用明确的属性值
type MyObj = {
  x: number,
  y: number,
};

function getSum(obj:MyObj) {
  return Math.abs(obj.x) + Math.abs(obj.y);
}
```

#### 严格字面量检查
**如果对象使用字面量表示（直接字面量赋值），会触发 TypeScript 的严格字面量检查**（strict object literal checking）。如果字面量的结构跟类型定义的不一样（比如多出了未定义的属性），就会报错
```typescript
const point:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
};
```
如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的
```typescript
const myPoint = {
  x: 1,
  y: 1,
  z: 1
};

const point:{
  x:number;
  y:number;
} = myPoint; // 正确
```
TypeScript 对字面量进行严格检查的目的，主要是防止拼写错误。一般来说，字面量大多数来自手写，容易出现拼写错误，或者误用 API
```typescript
type Options = {
  title:string;
  darkMode?:boolean;
};

const obj:Options = {
  title: '我的网页',
  darkmode: true, // 报错
};

// 如果为了规避严格字面量检查，可以使用中间变量赋值
let myOptions = {
  title: '我的网页',
  darkmode: true,
};

const obj:Options = myOptions;

// 使用类型断言规避严格字面量检查报错问题
const obj:Options = {
  title: '我的网页',
  darkmode: true,
} as Options;

// 设置允许多余的属性
let x: {
  foo: number,
  [y: string]: any
}

x= { foo: 1, baz: 2 }

// 不能有多余的属性
interface Point {
  x: number;
  y: number;
}

function computeDistance(point: Point) { /*...*/ }

computeDistance({ x: 1, y: 2, z: 3 }); // 报错，编译器选项suppressExcessPropertyErrors，可以关闭多余属性检查
computeDistance({x: 1, y: 2}); // 正确
```

#### 最小可选属性规则
弱类型检查，防止一个类型对象都是可选属性，任意对象都满足的情况问题
```typescript
type Options = {
  a?:number;
  b?:number;
  c?:number;
};

const opts = { d: 123 };

const obj:Options = opts; // 报错
```
**报错原因是，如果某个类型的所有属性都是可选的，那么该类型的对象必须至少存在一个可选属性，不能所有可选属性都不存在。这就叫做“最小可选属性规则”**
如果想规避这条规则，要么在类型里面增加一条索引属性（`[propName: string]: someType`），要么使用类型断言（`opts as Options`）

#### 空对象
空对象是 TypeScript 的一种特殊值，也是一种特殊类型
```typescript
const obj = {} // const obj:{} = {};
obj.prop = 123 // 报错
obj.toString() // 正确

// 错误
const pt = {};
pt.x = 3;
pt.y = 4;

// 正确
const pt = {
  x: 3,
  y: 4
};

// 使用分布声明一个对象，使用扩展运算符
const pt0 = {};
const pt1 = { x: 3 };
const pt2 = { y: 4 };

const pt = {
  ...pt0, ...pt1, ...pt2
};
```
**注意⚠️：空对象没有自定义属性，所以对自定义属性赋值就会报错。空对象只能使用继承的属性，即继承自原型对象 Object.prototype 的属性**

**空对象作为类型**
```typescript
let d:{};
// 等同于
// let d:Object;

d = {};
d = { x: 1 };
d = 'hello';
d = 2;
```
各种类型的值（除了null 和 undefined）都可以赋值给空对象类型，跟 Object 类型的行为是一样的
**因为 Object 可以接受各种类型的值，而空对象是 Object 类型的简写，所以它不会有严格字面量检查，赋值时总是允许多余的属性，只是不能读取这些属性**

```typescript
interface Empty { }
const b:Empty = {myProp: 1, anotherProp: 2}; // 正确
b.myProp // 报错 变量b的类型是空对象，视同Object类型，不会有严格字面量检查，但是读取多余的属性会报错
```
如果想强制使用没有任何属性的对象，可以采用下面的写法：
```typescript
interface WithoutProperties {
  [key: string]: never
}

// 报错
const a: WithoutProperties = { prop: 1 }
```
**`[key: string]: never` 表示字符串属性名是不存在的，因此其他对象进行赋值时就会报错**

### 总结

## Interface 接口
interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构
```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
```
方括号运算符可以取出 interface 某个属性的类型
```typescript
interface Foo {
  a: string;
}

type A = Foo['a']; // string
```

表示对象的常见 5 种语法形式：

- 对象属性
- 对象的属性索引
- 对象方法
- 函数
- 构造函数

1. 对象属性：（注意⚠️：属性之间使用分号或逗号分隔，最后一个属性结尾的分号或逗号可以省略）
```typescript
interface Point {
  x: number
  y: number
}
```

2. 对象的属性索引：
```typescript
interface A {
  [prop: string]: number
}
```
**注意：属性索引共用 string、number、symbol 三种类型**

一个接口中，最多只能定义一个字符串索引。**字符串索引会约束该类型中所有名字为字符串的属性**
```typescript
interface MyObj {
  [prop: string]: number;

  a: boolean;      // 编译错误
}
```

**属性的数值索引，指的是数组的类型**
```typescript
interface A {
  [prop：number]: string
}

const obj: A = ['a', 'b']
```

如果一个 interface 同时定义了字符串索引和数值索引，那么数值索引必须服从于字符串索引。因为在 JavaScript 中，**数值属性名最终是自动转换成字符串属性名**
```typescript
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错，数值索引必须兼容字符串索引的类型声明
}

interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确
}
```

3. 对象的方法：
```typescript
// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string;
}

// 写法三
interface C {
  f: { (x: boolean): string };
}
```
或属性名使用表达式：
```typescript
const f = 'f';

interface A {
  [f](x: boolean): string;
}
```

类型方法重载：
```typescript
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}
```
注意：由于没有给出重载的实现方法，需要额外在对象外部给出函数方法的实现
```typescript
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(
  x?:boolean|string, y?:string
):number|boolean|string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === 'boolean' && y === undefined) return true;
  if (typeof x === 'string' && typeof y === 'string') return 'hello';
  throw new Error('wrong parameters');
}

const a:A = {
  f: MyFunc
}
```

4. 函数：声明独立的函数
```typescript
interface Add {
  (x: number, y: number)： number
}
```

5. 构造函数：内部使用  new 关键字，表示构造函数
```typescript
interface ErrorConstructor {
  new (message?: string): Error
}
```

### 继承

1. interface 继承 interface，使用 extends 关键字，会从继承的接口里面拷贝属性，这样就不用书写重复属性类型声明
```typescript
interface Shape {
  name: string
}

interface Circle extends Shape {
  radius: number
}

interface Style {
  color: string
}

// 多重继承，相当于多个父接口的合并
interface Circle extends Shape, Style {
  radius: number
}
```
**注意⚠️：子接口与父接口存在同名属性情况下，子接口会覆盖父接口的属性。而且，子接口与父接口的同名属性类型必须是兼容，不能有冲突，否则会报错：**
```typescript
interface Foo {
  id: string;
}

interface Bar extends Foo {
  id: number; // 报错
}
```
**而且，多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错：**
```typescript
interface Foo {
  id: string;
}

interface Bar {
  id: number;
}

// 报错
interface Baz extends Foo, Bar {
  type: string;
}
```

2. interface 继承 type：
```typescript
type Country = {
  name: string
  capital: string
}

interface CountryWithPop extends Country {
  population: number
}
```
**注意⚠️：type 声明的是对象才可以继承**

3. interface 继承 class

继承 class 的所有成员属性
```typescript
class A {
  x: string = ''

  y (): boolean {
    return true
  }
}

interface B extends A {
  z: number
}
```
**注意⚠️：某些类拥有私有成员和保护成员，interface 可以继承这样的类，但是意义不大**
```typescript
class A {
  private x: string = '';
  protected y: string = '';
}

interface B extends A {
  z: number
}

// 报错，对象不能实现这些成员
const b:B = { /* ... */ }

// 报错，这个 class 与 A 之间无法构成父子类关系
class C implements B {
  // ...
}
```

### 接口合并
多个同名接口会合并成一个接口（注意⚠️：同一个属性有多个类型声明，不能有类型冲突）
```typescript
interface Box {
  height: number
  width: number
}

interface Box {
  length: number
}

interface A {
  a: number;
}

interface A {
  a: string; // 报错
}
```
为了兼容 JavaScript 的行为。JavaScript 开发者常常对全局对象或者外部库，添加自己的属性和方法。那么，只要使用 interface 给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便
使用举例：
```typescript
// Web 网页开发经常会对windows对象和document对象添加自定义属性，但是 TypeScript 会报错，因为原始定义没有这些属性。解决方法就是把自定义属性写成 interface，合并进原始定义

interface Document {
  foo: string;
}

document.foo = 'hello';
```

同名接口合并中，同名方法有不同的类型声明，会发生函数重载（**注意⚠️：顺序很重要，越靠后定义，优先级越高，排在函数重载的越前面**）：
```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```
**但有一个例外，同名方法中，如果有一个参数是字面量类型，字面量类型有更高的优先级：**
```typescript
interface A {
  f(x:'foo'): boolean;
}

interface A {
  f(x:any): void;
}

// 等同于
interface A {
  f(x:'foo'): boolean;
  f(x:any): void;
}

// createElement 方法可以根据不同的参数生成不同的 HTML 节点对象
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 等同于，参数为字面量的类型声明会排到最前面，返回具体的 HTML 节点对象。类型越不具体的参数，排在越后面，返回通用的 HTML 节点对象
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}
```

注意：如果使用了联合类型声明，对应的同名属性也是联合类型
```typescript
interface Circle {
  area: bigint;
}

interface Rectangle {
  area: number;
}

declare const s: Circle | Rectangle;

s.area;   // bigint | number
```

### interface 与 type 的异同
很多对象类型既可以用 interface 表示，也可以用 type 表示。而且，两者往往可以换用，几乎所有的 interface 命令都可以改写 type 命令
#### 相同点

1. 都能为对象类型起名：
```typescript
type Country = {
  name: string;
  capital: string;
}

interface Country {
  name: string;
  capital: string;
}
```
注意：跟 class 定义一个类，同时定义一个对象类型不一样，class 会创造一个值，编译后依然存在，只想要一个类型的话，最好使用 type 或 interface

#### 不同点

1. type 能够表示非对象类型，而 interface 只能表示对象类型（包括数组、函数等）；
2. interface 可以继承，type 不支持继承（可以使用 & 运算符合并，重新定义一个类型）；

**注意⚠️：继承时， type 和 interface 可以换用，interface 也可以继承 type（两种方式写法不一样）**
```typescript
type Foo = { x: number }
interface Bar extends Foo {
  y: number
}

interface Foo = { x: numebr }
type Bar = Foo & { y: number }
```

3. 同名 interface 会自动合并，而 type 会报错，type 不允许同名多次定义，说明 interface 是开放的，可以添加属性，type 则是封闭的，不能添加属性，只能定义新的 type；
4. interface 不能包含属性映射，但是 type 可以：
```typescript
interface Point {
  x: number;
  y: number;
}

// 正确
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};

// 报错
interface PointCopy2 {
  [Key in keyof Point]: Point[Key];
};
```

5. this 关键字只能用于 interface：
```typescript
// 正确
interface Foo {
  add(num: number): this;
}

// 报错
type Foo = {
  add(num： number): this;
}

// 实例
class Calculator implements Foo {
  result = 0

  add (num: number) {
    this.result += num

    return this
  }
}
```

6. type 可以扩展原始数据类型，interface 不行：
```typescript
// 正确
type MyStr = string & {
  type: 'new'
}

// 报错
interface MyStr extends string {
  type: 'new'
}
```

7. interface 无法表达某些复杂类型（比如交叉类型和联合类型），但是 type 可以：
```typescript
type A = { /* ... */ };
type B = { /* ... */ };

type AorB = A | B;
type AorBwithName = AorB & {
  name: string
};
```

**综上所述：如果有复杂的类型运算，那么没有其他选择只能使用 type；一般情况下，interface 灵活性比较高，便于扩充类型或自动合并，建议优先使用**

### 总结

## Class 类型
#### 基本使用
类的属性可以在顶层声明，也可以在构造方法内部声明

1. 顶层声明属性：
```typescript
class Point {
  x: number;
  y: number;
}

// 不声明，默认是 any
class Point {
  x;
  y;
}

// 声明给初始值，不声明类型，自动推断
class Point {
  x = 0;
  y = 0;
}

// 非空断言
class Point {
  x!: number;
  y!: number;
}
```
TypeScript strictPropertyInitialization 设置默认初始化值

2. readonly 只读修饰符：
```typescript
class A {
  readonly id = 'foo';
}

const a = new A();
a.id = 'bar'; // 报错

class A {
  readonly id:string;

  constructor() {
    this.id = 'bar'; // 正确，设置只读属性的初始值
  }
}

class A {
  readonly id:string = 'foo';

  constructor() {
    this.id = 'bar'; // 正确，修改只读属性的初始值
  }
}
```
**注意⚠️：构造方法修改只读属性的值也是可以的。或者说，如果两个地方都设置了只读属性的值，以构造方法为准。在其他方法修改只读属性都会报错**

3. 方法的类型

类的方法就是普通函数，跟函数的声明方式一致，可以使用参数默认值和函数重载
```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  add(point:Point) {
    return new Point(
      this.x + point.x,
      this.y + point.y
    );
  }
}

// 参数默认值
class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

// 函数重载
class Point {
  constructor(x:number, y:string);
  constructor(s:string);
  constructor(xs:number|string, y?:string) {
    // ...
  }
}
```
**注意⚠️：构造方法不能返回值类型，否则报错，因为总是返回实例对象**

1.4 存储器方法
存取器是特殊的类方法，包括取值器（读取属性）和存值器（写入属性）
```typescript
class C {
  _name = '';
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}

// 如果只设置 get 则默认只读
class C {
  _name = 'foo';

  get name() {
    return this._name;
  }
}

const c = new C();
c.name = 'bar'; // 报错
```
get 和 set 方法，TypeScript 5.1 版之前必须类型兼容，之后可以不兼容，但是可访问性必须一致，要么都为公开方法，要么都为私有方法

1.5 属性索引
可以定义属性索引
```typescript
class MyClass {
  [s: string]: boolean | ((s: string) => boolean)

  get (s: string) {
    return this[s] as boolean
  }
}
```
**注意⚠️：由于类的方法是一种特殊属性（属性值为函数的属性），所以属性索引的类型定义也涵盖了方法。如果一个对象同时定义了属性索引和方法，那么前者必须包含后者的类型**
```typescript
class MyClass {
  [s:string]: boolean;
  f() { // 报错
    return true;
  }
}

// 修改
class MyClass {
  [s:string]: boolean | (() => boolean);
  f() {
    return true;
  }
}

// 属性存储器视同属性
class MyClass {
  [s:string]: boolean;

  get isInstance() { // 不会报错
    return true;
  }
}
```

#### 类的 interface 接口

1. implements 关键字

interface 接口或 type 别名，可以用对象的形式，为 class 指定一组检查条件。然后，类使用 implements 关键字，表示当前类满足这些**外部类型条件**的限制
```typescript
interface Country {
  name:string;
  capital:string;
}
// 或者
type Country = {
  name:string;
  capital:string;
}

class MyCountry implements Country {
  name = '';
  capital = '';
}
```
注意⚠️：interface 只是指定检查条件，如果不满足这些条件就会报错，它并不能代替 class 自身的类型声明
```typescript
interface A {
  get(name:string): boolean;
}

class B implements A {
  get(s) { // s 的类型是 any，不能替代自身的类型声明
    return true;
  }
}

// 修改
class B implements A {
  get(s:string) {
    return true;
  }
}

interface A {
  x: number;
  y?: number;
}

class B implements A {
  x = 0;
}

const b = new B();
b.y = 10; // 报错

// 修改
class B implements A {
  x = 0;
  y?: number;
}

// 类可以定义接口没有声明的方法和属性
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x = 1;
  y = 1;
  z:number = 1;
}
```
implements 关键字后面，不仅可以是接口，也可以是另一个类，这时后面的类将会被当做接口处理
```typescript
class Car {
  id:number = 1;
  move():void {};
}

class MyCar implements Car {
  id = 2; // 不可省略
  move():void {};   // 不可省略
}
```
**注意⚠️：interface 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。这是因为 TypeScript 设计者认为，私有属性是类的内部实现，接口作为模板，不应该涉及类的内部代码写法**
```typescript
interface Foo {
  private member: {} // 报错
}
```

2. 实现多个接口

类可以实现多个接口（相当于接受多重限制），每个接口之间使用逗号隔离
```typescript
class Car implements MotorVehicle, Flyable, Swimmable {

}
```
建议：同时实现多个接口并不是一个好的方法，容易使代码难以维护管理，推荐以下方法改造：

- 类的继承
```typescript
class Car implements MotorVehicle {
}

class SecretCar extends Car implements Flyable, Swimmable {
}

// 也可以修改
interface MotorVehicle {
  // ...
}
interface Flyable {
  // ...
}
interface Swimmable {
  // ...
}

interface SuperCar extends MotoVehicle, Flyable, Swimmable {
  // ...
}

class SecretCar implements SuperCar {
  // ...
}
```

- 接口的继承
```typescript
interface A {
  a: number
}

interface B extends A {
  b: number
}
```
**注意⚠️：发生多重实现时（即一个接口同时实现多个接口），不同接口不能有互相冲突的属性**

3. 类与接口的合并

注意⚠️：不允许有两个同名的类，如果有一个类和一个接口同名，那么接口就会被合并到类里面
```typescript
class A {
  x:number = 1;
}

interface A {
  y:number;
}

let a = new A();
a.y = 10;

a.x // 1
a.y // 10
```
注意：合并进类的非空属性，可能为 undefined，没有赋值
```typescript
class A {
  x:number = 1;
}

interface A {
  y:number;
}

let a = new A();
a.y // undefined
```

#### Class 类型

1. 实例类型

**类本身就是一种类型，但是它代表该类的实例类型，而不是 class 的自身类型**
```typescript
class Color {
  name:string;

  constructor(name:string) {
    this.name = name;
  }
}

const green:Color = new Color('green');

// 其他写法
interface MotorVehicle {
}

class Car implements MotorVehicle {
}

// 写法一
const c1:Car = new Car();
// 写法二
const c2:MotorVehicle = new Car();

```
TypeScript 有三种方法可以为对象类型起名：type、interface 和 class

获取一个类的自身类型：typeof 运算符
```typescript
class Point {
  x:number;
  y:number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}

// 错误
function createPoint(
  PointClass:Point,
  x: number,
  y: number
) {
  return new PointClass(x, y);
}

// 修改为
function createPoint(
  PointClass:typeof Point,
  x:number,
  y:number
):Point {
  return new PointClass(x, y);
}
```
JavaScript 中，**类只是构造函数的一种语法糖，本质上是构造函数的另一种写法**。所以，类的自身类型可以写成构造函数的形式
```typescript
// 如上代码可以修改为
function createPoint(
  PointClass: new (x: number, y: number) => Point,
  // 或者对象形式
  // PointClass: {
    // new (x:number, y:number): Point
  // }
  x: number,
  y: number
): Point {
  return new PointClass(x, y);
}

// 抽离出来
interface PointConstructor {
  new(x:number, y:number):Point;
}
```

#### 结构类型原则
Class 也遵循“结构类型原则”。一个对象只要满足 Class 的实例结构，就跟该 Class 属于同一个类型
```typescript
class Foo {
  id!:number;
}

function fn(arg:Foo) {
  // ...
}

const bar = {
  id: 10,
  amount: 100,
};

fn(bar); // 正确
```
如果两个类的实例结构相同，那么这两个类就是兼容的，可以用在对方的使用场合
```typescript
class Person {
  name: string;
  age: number;
}

class Customer {
  name: string;
}

// 正确
const cust:Customer = new Person();
```
总之，只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 兼容 B 的类型
```typescript
// 其他对象跟类的使用结构也是如此
class Person {
  name: string;
}

const obj = { name: 'John' };
const p:Person = obj; // 正确
```

空类不包含任何成员，任何其他类都可以看作与空类结构相同。因此，凡是类型为空类的地方，所有类（包括对象）都可以使用
```typescript
class Empty {}

function fn(x:Empty) {
  // ...
}

fn({});
fn(window);
fn(fn);
```
注意⚠️：确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法
```typescript
class Point {
  x: number;
  y: number;
  static t: number;
  constructor(x:number) {}
}

class Position {
  x: number;
  y: number;
  z: number;
  constructor(x:string) {}
}

const point:Point = new Position('');
```
如果类中存在私有成员（private）或保护成员（protected），那么确定兼容关系时，TypeScript 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系
```typescript
// 情况一
class A {
  private name = 'a';
}

class B extends A {
}

const a:A = new B();

// 情况二
class A {
  protected name = 'a';
}

class B extends A {
  protected name = 'b';
}

const a:A = new B();
```

#### 类的继承
类（这里又称“子类”）可以使用 extends 关键字继承另一个类（这里又称“基类”）的所有属性和方法
子类可以覆盖基类的同名方法：
```typescript
class B extends A {
  greet(name?: string) {
    if (name === undefined) {
      super.greet(); // 注意⚠️：一般使用 super 关键词代替基类的常见做法
    } else {
      console.log(`Hello, ${name}`);
    }
  }
}

// 但是子类的同名方法不能与基类的类型定义冲突
class A {
  greet() {
    console.log('Hello, world!');
  }
}

class B extends A {
  // 报错
  greet(name:string) {
    console.log(`Hello, ${name}`);
  }
}
```
子类与基类的可访问性设置：
```typescript
class A {
  protected x: string = '';
  protected y: string = '';
  protected z: string = '';
}

class B extends A {
  // 正确
  public x:string = '';

  // 正确
  protected y:string = '';

  // 报错
  private z: string = '';
}
```
**注意⚠️：extends 关键词后面不一定是类名，可以是表达式，只要它的类型有构造函数就可以**
```typescript
// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

// 例三
class A {
  greeting() {
    return 'Hello from A';
  }
}
class B {
  greeting() {
    return 'Hello from B';
  }
}

interface Greeter {
  greeting(): string;
}

interface GreeterConstructor {
  new (): Greeter;
}

function getGreeterBase():GreeterConstructor {
  return Math.random() >= 0.5 ? A : B;
}

class Test extends getGreeterBase() {
  sayHello() {
    console.log(this.greeting());
  }
}
```
例三，执行之后也是一个表达式

只设置了类型、没有设置初值的顶层属性，有一个比较重要的说明：
```typescript
interface Animal {
  animalStuff: any;
}

interface Dog extends Animal {
  dogStuff: any;
}

class AnimalHouse {
  resident: Animal;

  constructor(animal:Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  resident: Dog;

  constructor(dog:Dog) {
    super(dog);
  }
}

// 如果编译代码 target 大于等于 ES2022

const dog = {
  animalStuff: 'animal',
  dogStuff: 'dog'
};

const dogHouse = new DogHouse(dog);

console.log(dogHouse.resident) // 注意这里拿不到基类的值：undefined

// 修改如下：
class DogHouse extends AnimalHouse {
  declare resident: Dog;

  constructor(dog:Dog) {
    super(dog);
  }
}

```

#### 可访问性修饰符

- public：默认修饰符，如果省略不写，实际上就带有改修饰符，类的属性和方法默认都是外部可访问的；
- private：修饰符表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员；
- protected：修饰符表示该成员是保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用；

### 总结

## 泛型
使用方式：`类型名<泛型列表>`

#### 1、常见命名规则
惯例：类型参数名称是单个大写字母：用于区分类型变量和普通类或接口名称之间的区别

- `T(Type)`：类型参数名；
- `K(Key)`：对象的键类型；
- `V(Value)`：对象的值类型；
- `P(Property)`：对象的属性类型；
- `R(Result)`：类型推导的结果类型；

#### 2、泛型条件
`T extends U ? X : Y`

```ts
// 字符串或数字判断
type IsStr = 'super' extends 'super456' ? true : false
type IsNum = 123 extends 123456 ? true : false

// 对象类型收窄
type IsObj = { status: true, age: 18 } extends { status: true } ? true : false

// Exclude
type Exclude<T, U> = T extends U ? never : T

type T = Exclude<1 | 2, 1 | 3>
// => (1 extends 1 | 3 ? never : 1) | (2 extends 1 | 3 ? never : 2)
// => never | 2
// => 2
```

#### 3、泛型推断 infer
```ts
type FunctionParamType<T> = T extends (...args: infer P) => any ? P : T
```

实际案例：
```ts
interface Person {
  name: string
  age: number
}

type GetAge = (person: Person) => void
const getAge: GetAge = (person) => {}

type Age = FunctionParamType<GetAge> // Person
type TestString = FunctionParamType<string> // string
```

### 分布式条件类型
_泛型参数与裸类型参数_

#### 1、理解分布式条件类型

#### 2、从 TypeScript 源码层面看分布式判断

#### 3、条件类型在工具类型中的重要作用

### TypeScript 内置工具类型
<CustomImage src='/growth-record/base/javascript/tsstudy01.webp' />

- `Partial<T>`：将传入属性变成可选；
- `Required<T>`：将传入属性变成必选；
- `Readonly<T>`：将传入属性变成只读；
- `Record<T, U>`：将 T 作为属性，U 作为类型生成新的对象类型；
- `Pick<T, U>`：从 T 抽取包含 U 的属性；
- `Omit<T, U>`：从 T 删除包含 U 的属性；
- `Exclude<T, U>`：从 T 中过滤 U 不存在的属性；
- `Extract<T, U>`：从 T 中过滤存在 U 的属性；

**函数相关**：

- Parameters：函数参数作为元组类型返回；
- ReturnType：获取函数的返回类型；
- ConstructorParameters：把构建函数作为一个元素类型返回；

常见 React 类型：
<CustomImage src='/growth-record/base/javascript/tsstudy02.png' />

#### 1、TypeScript 内置工具类型的进阶实现
Partial、Required：
1. 面向实际项目需求的工具类型；
2. 递归的 Deep 实现；
3. 更细粒度的部分修饰；

Pick、Omit：
1. 通过映射类型与索引类型实现接口裁剪；
2. 更严格的 Omit；
3. 基于键值类型的接口与裁剪，以及更严格的类型比较；

Exclude 与 Extract：
1. 又见分布式条件类型；
2. 交、并、补、差集；
3. 对象键名的交、并、补、差集；
4. 类型层面的对象合并；

待更新🚀...

## 学习资料
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TypeScript 教程-阮一峰](https://wangdoc.com/typescript/)
