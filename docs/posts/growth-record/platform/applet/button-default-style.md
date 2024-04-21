---
title: 微信小程序之去除 Button 默认样式
date: 2018-08-10 20:08:08
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之去除 Button 默认样式
在小程序开发过程中，使用率蛮高的组件button，因为经常要去除默认样式，然后再自定义样式，所以经常写，自己也总结分享一下简单的实现步骤。

### （一）实现效果
1、实现前（默认样式）：
<CustomImage src='/growth-record/platform/applet/button-default-01.png' />

2、实现后（去除默认边框和背景色）：
<CustomImage src='/growth-record/platform/applet/button-default-02.png' />

### （二）实现过程
首先了解一下默认的样式有哪些，然后根据自己的UI来实现：
```css
button {
position:relative;
display:block;
margin-left:auto;
margin-right:auto;
padding-left:14px;
padding-right:14px;
box-sizing:border-box;
font-size:18px;
text-align:center;
text-decoration:none;
line-height:2.55555556;
border-radius:5px;
-webkit-tap-highlight-color:transparent;
overflow:hidden;
color:#000000;
background-color:#F8F8F8;
}
```

1、使用`::after` 伪类选择器，因为button的边框样式是通过`::after`方式实现的，如果在button上定义边框就会出现两条边框线，所以我们可以使用`::after`的方式去覆盖默认值。

```css
button::after {
  border: none;
}
```
2、还需要在将按钮背景色设置为白色，因为按钮默认背景色是灰色的。

```css
button {
  background-color: #fff;
}
```
3、去掉默认的圆角：
```css
button {
  border-radius:0;
}
```

这样就可以搞定小程序按钮默认样式了，只是相当于一个文本的样式，还是有很多button的默认样式没有去除的，这个需要根据个人需求来设置的，这里不过多说明，如果需要自定义可以在按钮上一个类选择器就可以搞定。
