---
title: Uni-app 项⽬开发问题及解决⽅案记录
date: 2023-07-08 20:07:08
tag:
 - uni-app
categories:
 - 前端进击
---
# Uni-app 项⽬开发问题及解决⽅案记录
## 基础问题
1. `<template>` 模板：
- 使⽤ `v-for` 或其他语法，命名 `key` 赋值时候不能使⽤字符串模板，⽐如

```
  :key=`customer-${item.id}`
```

否则会导致编译报错；
- Mustache 语法（双⼤括号）不⽀持使⽤对象扩展符，⽐如：
  ```
  {{ ...objectContent }}
  ```
否则会导致编译报错；
- Mustache 语法（双⼤括号）不⽀持使⽤可选连操作符，⽐如：
  ```
  {{ objectContent?.id }}
  ```
否则会导致编译报错；

1. 系统应⽤问题
- ⻚⾯滚动条卡住问题：
<CustomImage src='/growth-record/platform/uni/uni-question-01.png' />

打包构建

1. 微信⼩程序运⾏报错：
<CustomImage src='/growth-record/platform/uni/uni-question-02.png' />

⼩程序本地开发命令运⾏报错，删除 dist ⽂件夹重新运⾏即可

## 总结
1. 因为 App 版本发版存在时差，且需要⼿动升级版本，所以旧功能迭代需要考虑向下兼容，防⽌只
能最新版本才能正常使⽤情况。⽐如新版使⽤新接⼝，旧版使⽤旧接⼝，⽽不是直接修改旧接⼝
⼊参或返回值或停⽤旧接⼝

## 参考资料
- [uniapp 项⽬开发经验总结 - 掘⾦](https://juejin.cn/post/7321410861997686794?utm_source=gold_browser_extension)
- [uni-app开发微信⼩程序和H5⼿机端记录 - 掘⾦](https://juejin.cn/post/7311604023152640054)
