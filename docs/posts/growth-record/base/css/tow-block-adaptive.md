---
title: 两个模块列自适应布局问题
date: 2020-03-28 20:00:00
tag:
 - CSS
categories:
 - 前端进击
---
# 两个模块列自适应布局问题
## 一、实现效果
<CustomImage src='/growth-record/base/css/blockadaptive01.webp' />

两个模块下排版列分开，左边内容固定宽度，右边内容适配宽度排列。

在小屏幕排列如下：

<CustomImage src='/growth-record/base/css/blockadaptive02.webp' />

## 二、实现分析
就是利用左右两边模块固定同一父容器（设置：`display:flex;`），左边模块固定宽度，右边模块自适应可用空间（不考虑适配到移动端屏幕）。

## 三、实现代码
一开始想用`width` 自带的两个属性值设置（`fill-available` 充分利用可用空间，`fit-content` 收缩到合适），但是兼容性问题不乐观，放弃了这个想法。

直接使用：
```html
<div class="contact-content__item">
  <div class="contact-content__item__left">
    服务宗旨：
  </div>

  <div class="contact-content__item__right">
    引导用户快速完成实名认证、开卡、绑定店铺；费率调整、增卡、活动了解，帮助用户增收提效。引导用户快速完成实名认证、开卡、绑定店铺；费率调整、增卡、活动了解，帮助用户增收提效。引导用户快速完成实名认证、开卡、绑定店铺；费率调整、增卡、活动了解，帮助用户增收提效。引导用户快速完成实名认证、开卡、绑定店铺；费率调整、增卡、活动了解，帮助用户增收提效。
  </div>
</div>

.contact-content__item {
  line-height: 30px;
  display: flex;

  .contact-content__item__left {
  	width: 80px;
  }

  .contact-content__item__right {
  	width: 100%;
  }
 }
```
