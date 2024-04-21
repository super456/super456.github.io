---
title: 微信小程序之真机键盘弹窗遮挡样式问题
date: 2018-09-01 20:00:00
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之真机键盘弹窗遮挡样式问题
遇到了一个比较常见，但不注意就会犯错的问题：小程序里面经常会用到组件input，属性也很丰富，如果在页面排版中，将输入固定在底部作为评论之类的，可能就会遇到一个问题，在真机上测试（移动端），点击input组件默认会将键盘弹起时，自动上推页面，就会发现，因为弹窗很容易遮住input组件相关的内容及样式。
### （一）问题详情
1、默认没有点击input输入框（评论框）的时候：
<CustomImage src='/growth-record/platform/applet/keyboard-masking-01.jpeg' />

2、点击input输入框（评论框）的时候：
<CustomImage src='/growth-record/platform/applet/keyboard-masking-02.jpeg' />

### （二）问题分析
**注意：**这个是input组件在页面底部的时候，input在页面其他位置可能效果是不一样的。
这个是因为点击了input组件，键盘弹起时，自动上推页面，默认键盘弹窗弹出到位置是input组件输入聚焦位置（就是输入框的光标一直闪烁的位置）；所以就是没有设置input组件和键盘的位置距离导致的覆盖相关样式现象。

### （三）解决方法
1、查找了一些网上资料说可以设置`cursor-spacing` 的属性距离。
<CustomImage src='/growth-record/platform/applet/keyboard-masking-03.png' />

但是我尝试了好几次设置都没有什么作用效果，有点悲催，可能我没有get到这个属性的点。
没办法，只能使用自己的办法了：
<CustomImage src='/growth-record/platform/applet/keyboard-masking-04.png' />

使用`bindfocus`、`bindblur` 操作函数来动态设置底部组件框与底部之间的距离（外边距）：`margin-bottom:50rpx;`

解决问题流程：

 - js data里面设置一个变量：`   inputMarBot: false, //评论框聚焦时，让评论框距离底部的距离为50rpx`
 - wxml 页面：使用三元表示设置style input组件的父元素容器与底部外边距：`<view class='write-comment' style="{{inputMarBot?'margin-bottom:50rpx':''}}">`（关键，主要跟input的聚焦和是去焦点有关）及input组件定义属性：`bindfocus='settingMbShow' bindblur='settingMbNoShow'`
 - js 定义聚焦和是去焦点函数：

```
 // 评论输入框聚焦时，设置与底部的距离
  settingMbShow: function () {
    this.setData({
      inputMarBot: true
    })
  },
  //  评论输入框失去聚焦时，设置与底部的距离（默认状态）
  settingMbNoShow: function () {
    this.setData({
      inputMarBot: false
    })
  },
```
**实现效果：**
<CustomImage src='/growth-record/platform/applet/keyboard-masking-05.jpeg' />

如果还有其他实现可行方法，欢迎留言交流。
