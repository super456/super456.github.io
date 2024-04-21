---
title: HTML 知识点
date: 2021-03-22 20:04:05
tag:
 - HTML
categories:
 - 前端进击
---
# HTML 知识点
<CustomImage src='/growth-record/base/html/html-00.png' />

## 概要
<CustomImage src='/growth-record/base/html/html-01.png' />

- [HTML5 标签含义之元素周期表在线版](http://www.html5star.com/manual/html5label-meaning/)
- 资源学习网站：[HTML5 星空](http://www.html5star.com/)

## 语义化
### 概述
1. 语义化的标签：说明让标签有自己的含义
2. 存在的意义：让前端开发人员，在开发过程中，更容易去阅读代码，以及明白这些代码的意义
3. 建议
- 少使用无意义的 `<div>/<span>` 标签等
- 在 `<label>` 标签中设置 for 属性和对应的 `<input>` 关联起来
- 在设置 `<img>` 标签的 alt 属性，给 `<a>` 标签设置 title 属性，利于 SEO
- 在页面的标题部分使用 `<h1>~<h6>` 标签，不需要给它们加多余的样式
- 与表单、有序列表、无序列表相关的标签不要单独使用
4. 好处
- 能够更好的展示内容结构
- 便于团队的维护与开发
- 有利于 SEO
- 爬虫可以分析每个关键词的权重
- 方便其他设备解析（如屏幕阅读器）

### 示例
<CustomImage src='/growth-record/base/html/html-02.png' />

- `<header>` 标签通常放在页面或页面某个区域的顶部，用来设置页眉
- `<nav>` 标签可以用来定义导航链接的集合，点击链接可以跳转到其他页面
- `<article>` 标签中的内容比较独立，可以是一篇新闻报道，一篇博客，它可以独立于页面的其他内容进行阅读
- `<section>` 标签表示页面中的一个区域，通常对页面进行分块或对内容进行分段，`<section>` 标签和 `<article>` 标签可以互相嵌套
- `<aside>` 标签用来表示除页面主要内容之外的内容，比如侧边栏
- `<footer>` 标签位于页面或页面某个区域的底部，用来设置页脚，通常包含版权信息，联系方式等

## SEO

## DOCTYPE

## link 与 @import

## async 与 defer

## 捕捉、冒泡与委托

## 渐进增强与优雅降级

## 标签元素

## HTML5 常用基础 API

## 参考资料

## 刷题
