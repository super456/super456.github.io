---
title: Vue 开发问题总结
date: 2020-03-22 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue 开发问题总结
## 自定义指令 removeChild 报错
### （一）发现
2018-12-08 20:40，收到反馈机构平台发现部分权限失控，前端平台报错如下：

<CustomImage src='/growth-record/frame/vue/vue-question-01.png' />

上图中，代付下发规则为运营才有的敏感操作，但它出现在了一个不该出现的位置

### （二）定位
#### 1. 从代码层
从控制台返回的信息中，我们得知是 `removeChild` 报错，那先从它开始寻找
从MDN [removeChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild) 了解到，从 DOM1 中就存在的方法，应当不存在兼容性的问题，那么回归代码，开始寻找调用 者
<CustomImage src='/growth-record/frame/vue/vue-question-02.png' />

从上图见得，调用它的是 `el.parentNode`，通过 `alert`，发现 `el.parentNode` 为 `null，parentNode` 为什么会为 `null？`
MDN 给出了以下答案
<CustomImage src='/growth-record/frame/vue/vue-question-03.png' />

这个问题有点类似 **_ref的注册时间问题， _**解决这个问题需要关心的就是 **生命周期**

回到我们本身的问题，注册指令时，官方也提供了几个生命周期

<CustomImage src='/growth-record/frame/vue/vue-question-04.png' />

问题已经很明朗了，`bind `并没有明确说明是否保证父节点存在，但在 `inserted` 时能保证父节点存在
按照找不到父节点的报错，所以需要一个稳定能获取父节点的生命周期来运行逻辑

#### 2. 从环境
首先该处代码已经历史悠久，API 接口是古老版本，且代码仓库记录已经许久未更改，那问题原因直观体现在打包构建的环境发生了变化。
依据发布脚本依据原则，存在隐患：项目每次构建会将整个代码仓库删除包括所有依赖，而项目拉取依赖未进行依赖包锁定。

### （三）修复

#### 1. 环境
立即备份一份打包机环境中项目的依赖，同时从本地备份的依赖打包压缩 scp 至打包机工程目录中，修改发布脚本发布恢复。

#### 2. 代码层
按照文档，进行了如下修改

`bind => inserted`

<CustomImage src='/growth-record/frame/vue/vue-question-05.png' />

经过测试，不再报错，22：10 发布上线，历时 1 小时 10 分

### （四）思考
1. 在被打包后的代码中定位问题时，有什么更好的方式可以替代 **alert**；
2. 错误的发现 => 解决的时间是否过长，如何更好的面对线上问题；
3. 权限的设计是否存在问题，目前的模式为没有权限 => 摧毁，采用有权限 => 生成是否会更加安全？
4. 前端自身的告警系统很有必要；
