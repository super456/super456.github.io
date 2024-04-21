---
title: 微信小程序之 Grid 表格布局
date: 2018-09-03 20:00:00
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之 Grid 表格布局
在工作中常用的就是flex布局和grid布局了，因为本人对grid布局不是很熟练，这次主要是想模拟获取后台的动态数据来动态的设置表格布局，算是一个简单的尝试，毕竟之前没有用过。分享一下。

 如果对css grid布局不熟的建议看着篇文章，介绍的很详细：[CSS Grid 布局完全指南(图解 Grid 详细教程)](http://www.css88.com/archives/8510/comment-page-1)

### （一）实现效果
跟我上一篇文章[微信小程序之自定义 table 表格布局](https://super456.github.io/posts/growth-record/platform/applet/custom-table-layout.html)实现的效果很像，但是我是要写这篇文章，因为这个方法优化了很多代码，值得参考学习。
<CustomImage src='/growth-record/platform/applet/grid-table-layout.png' />

### （二）实现过程
1、js 设置很简单，通过数组对象格式来模拟获取到的后台数据格式：

```js
Page({
  data: {
    tableData: [{ // 模拟动态获取到的后台数据：数组对象格式
      id: 0,
      name: 'table-th-cell'
    }, {
      id: 1,
      name: 'table-th-cell'
    }, {
      id: 2,
      name: 'table-th-cell'
    }, {
      id: 3,
      name: 'table-tr-cell'
    }, {
      id: 4,
      name: 'table-tr-cell'
    }, {
      id: 5,
      name: 'table-tr-cell'
    }, {
      id: 6,
      name: 'table-tr-cell'
    }, {
      id: 7,
      name: 'table-tr-cell'
    }, {
      id: 8,
      name: 'table-tr-cell'
    },],
  },
  onLoad() {
  },
})
```

2、设置wxml也是一些常用的布局格式：

```html
<view class="table">

  <block wx:for='{{tableData}}' wx:key='*this'>
    <view class='table-th' wx:if='{{index<3}}'>{{item.name}}</view>
    <view class='table-td' wx:else>{{item.name}}</view>
  </block>
</view>
```

3、wxss设置，主要通过父容器设置为块级网格，然后设置 父容器的列、行大小 ，fr单位是等分分配列空间； 设置有多余数据时，自动添加新行时默认行高为：200rpx ；设置网格线大小 ；子元素的话可以根据自己自定义样式内容：

```css
.table {
  display: grid;
  width: 100%;
  overflow-x: hidden;
  /* 设置列、行大小 fr单位是等分分配列空间*/
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200rpx 200rpx;
  /* 有多余数据时，自动添加新行时默认行高为：200rpx */
  grid-auto-rows: 200rpx;
  /* 设置网格线大小 */
  grid-gap: 10rpx;
}

.table-th {
  font-weight: bold;
  background-color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-td {
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

```

总的来说，相对于`display:table` 来布局网格简化了很多代码，更轻松了一点。
**注意：** 微信小程序很多安卓手机不兼容这个布局，亲测扎心了。
