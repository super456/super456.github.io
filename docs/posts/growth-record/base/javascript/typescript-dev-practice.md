---
title: TypeScript 开发实战笔记
date: 2023-03-07 20:00:00
tags:
 - JavaScript
 - TypeScript
categories:
 - 前端进击
---
# TypeScript 开发实战笔记
## 开篇讲解
掌握类型编程思维

三个要点：

1. 类型检查：编译代码时进行严格的类型检查，意味着编码阶段可以发现存在的隐患；
2. 语言扩展：ES6+，异步、装饰器、接口、抽象类；
3. 工具属性：只是一个工具，任何可以运行 JavaScript 的终端上，无需额外的开销，想一个工具一样；

**思维方式决定了编程习惯，编程习惯奠定了工程质量，工程质量划定了能力边界**

## 基础篇
#### 语言类型
强类型语言定义：
<CustomImage src='/growth-record/base/javascript/tskaifashizhan01.webp' />

- 强类型语言：不允许改变变量的数据类型，除非进行强制类型转换
- 弱类型语言：变量可以被赋予不同的数据类型

- 静态类型语言：在编译阶段确定所有变量的类型
- 动态类型语言：在执行阶段确定所有变量的类型

<CustomImage src='/growth-record/base/javascript/tskaifashizhan02.webp' />

<CustomImage src='/growth-record/base/javascript/tskaifashizhan03.webp' />

强类型语言：不允许程序在发生错误后继续执行。争议：C/C++ 是强类型还是弱类型？

属于弱类型语言，没有对数组越界进行检查，会导致程序崩溃

<CustomImage src='/growth-record/base/javascript/tskaifashizhan04.webp' />

新建一个 tsc 文件配置命令：`tsc --init` 生成：`tsconfig.json` 文件

#### 基础类型
<CustomImage src='/growth-record/base/javascript/tskaifashizhan05.webp' />

类型注解：

- 作用：相当于强类型语言中的类型声明
- 语法：（变量/函数）: type

`undefined` 不是保留字，全局可以修改重新定义这个变量值，一般通过 `void 0` 确保返回是 `undefined`
<CustomImage src='/growth-record/base/javascript/tskaifashizhan06.webp' />

`void` 在数组中表示么有任何返回值的类型
<CustomImage src='/growth-record/base/javascript/tskaifashizhan07.webp' />

`never` 表示永远不会有返回值，比如异常、死循环
<CustomImage src='/growth-record/base/javascript/tskaifashizhan08.webp' />

#### 枚举
角色判断
<CustomImage src='/growth-record/base/javascript/tskaifashizhan09.webp' />

TS 枚举类型解决
枚举：一组有名字的常量集合，分为：常量枚举、字符串枚举、异构枚举
原理：一个对象，反向映射（常量枚举才可以）
枚举成员的值是只读不能修改

枚举成员值的定义：
```typescript
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
  d = Math.random(),
  e = '123'.length
}

enum TestEnum {
  A = 'a',
  B = 'b',
  C = 'c',
}

// type TestTypeKey = 'A' | 'B' | 'C'
type TestTypeKey = keyof typeof TestEnum

// type TestTypeValue = 'a' | 'b' | 'c'
type TestTypeValue = keyof Record<TestEnum, string>
```

#### 接口类型
变量可以传入多余字段
鸭式变形法：一只鸟看起来像鸭子，叫起来像鸭子，就可以被看成是鸭子
<CustomImage src='/growth-record/base/javascript/tskaifashizhan10.webp' />

如果 render(变量值)，会进行类型检查：

- 类型断言
- 索引签名：字符串索引签名和数字索引签名
```typescript
interface Names {
  [x: string]: string
}
```

type 和 interface 多数情况下有相同的功能，就是定义类型。但有一些小区别：

- type：不是创建新的类型，只是为一个给定的类型起一个名字。type 还可以进行联合、交叉等操作，引用起来更简洁。
- interface：创建新的类型，接口之间还可以继承、声明合并。如果可能，建议优先使用 interface。

混合接口一般是为第三方类库写声明文件时会用到，很多类库名称可以直接当函数调用，也可以有些属性和方法。例子你可以看一下@types/jest/index.d.ts 里面有一些混合接口。

用混合接口声明函数和用接口声明类的区别是，接口不能声明类的构造函数（既不带名称的函数），但混合接口可以，其他都一样。

#### 函数重载
进一步匹配约束类型
```typescript
// 前两条声明是重载，目的是将参数类型约束为 number 或 string；最后的实现不是重载，要遵循前面的声明，比如传 boolean 就不可以了。
function add (...rest: string[]): string
function add (...rest: number[]): number
function add (...rest: any[]): any {
  const first = rest[0];
  if (typeof first === 'string') {
    return rest.join(',')
  }

  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => cur + pre)
  }
}

console.log(add(1, 2, 2))
console.log(add('1', '2', '2'))

```

#### 类特性

- 成员属性都是实例属性而不是原型属性；
- 成员方法都是原型方法而不是实例方法；
```typescript
class Dog {
  constructor(name: string) {
    this.name = name
  }
  public name: string = 'test'
  private pri () {

  }
  protected pro() {}
  readonly age: number = 20
  static food: string = 'bones'
  run() {

  }
}

console.log(Dog.prototype)
const dog = new Dog('wangwang')
// dog.pri() // ❌
// dog.pro() // ❌
// dog.age = 21
// dog.food
console.log('food', Dog.food)
console.log(dog)

class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name) // 父类的实例
    this.color = color
    // this.pri() // ❌
    // this.pro() // ✅
  }
  color: string
}

console.log('Husky', Husky.food)
```
**JS 的继承方式是原型式继承，原型上的属性和方法是所有实例共享的，不需要共享的就放在构造函数中（也就是实例自己的属性和方法）。当调用实例的属性或方法时，先看实例自身有没有，如果没有就会沿着原型链查找。**

- public：对所有都是可见的，默认访问控制符
- protected： 修饰成员属性和方法，当前类和子类内部可以访问； 修饰构造方法， 该类不能被实例化，但可以被子类继承；只能在类本身或者子类中访问，不能在实例中访问
- protected constructor： 类只能被继承，不能被实例化，相当于基类
- private： 只能在类本身调用，不能被实例或者子类调用
- private constructor： 类不能被继承，也不能被实例化
- readonly： 修饰用来修饰只读属性， 必须设置初始值；必须要初始化，不能被修改
- static： 修饰的成员属性和方法， 只能被当前类和子类访问， 不能被类的实例访问；只能通过类名来调用，不能用实例来访问，可以被子类继承

#### 抽象类与多态
抽象类只能被继承，无法创建实例
<CustomImage src='/growth-record/base/javascript/tskaifashizhan11.webp' />

好处：

- 抽离事务的共性，有利于代码抽离复用
- 实现多态：父类中定义一个抽象方法，多个子类中对这个方法有不同的实现，程序运行时根据不同的实例对象执行不同的操作，运行时绑定

this 类型实现链式调用
```typescript
class WorkFlow {
  step1() {
    console.log('Step1')
    return this
  }

  step2() {
    console.log('Step2')
    return this
  }
}

const workFlow = new WorkFlow()
// workFlow.step1().step2()

class MyFlow extends WorkFlow {
  next () {
    console.log('next')
    return this
  }
}

const myFlow = new MyFlow()
myFlow.next().step1().step2().next()
```

#### 类与接口

## 工程篇

## 实战篇

待更新🚀...

## 学习资料
- [极客时间《TypeScript 开发实战》梁宵](https://time.geekbang.org/course/intro/100032201?utm_campaign=geektime_search&utm_content=geektime_search&utm_medium=geektime_search&utm_source=geektime_search&utm_term=geektime_search)
