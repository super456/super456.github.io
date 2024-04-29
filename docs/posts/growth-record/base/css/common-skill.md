---
title: CSS 常用小技巧
date: 2019-03-28 20:00:00
tag:
 - CSS
categories:
 - 前端进击
---
# CSS 常用小技巧
- 裁剪屏幕左右边缘多余部分，防止手机显示有横向滚动条

  ```css
  .gloablCon {
    width: 100vw;
    overflow-x: hidden;
  }
  ```

- 固定宽高文本溢出及省略号显示

  ```css
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all; /* 追加这一行代码 */
  ```

- 当前文本框溢出问题
`text-overflow：clip | ellipsis`

   默认值：`clip`

   适用于：所有元素

`clip`： 当对象内文本溢出时不显示省略标记（...），而是将溢出的部分裁切掉。
`ellipsis`： 当对象内文本溢出时显示省略标记（...）。

  `text-overflow: ellipsis;`

- css英文、数字自动换行，汉字正常对齐
```css
  text-align: justify; /*实现两端对齐*/
  text-justify: newspaper; /*通过增加或减少字或字母之间的空格对齐文本*/
  word-break: break-all; /*允许在单词内换行*/
```

- 图片叠加（比如删除图片后右上角的删除图标位置）

```css
/* //父级元素设置： */
position:relative;
/* //子级元素设置： */
position：absolute;
top:;
left:;
```

- 固定区域显示两行内容其他省略

```css
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;/* 超过固定区域隐藏 */
  text-overflow: ellipsis;/*显示省略号*/
  display: -webkit-box;
  -webkit-line-clamp: 2;/*固定显示两行内容*/
  -webkit-box-orient: vertical;
  align-content: center;

  /* 注意：如果需要固定高度的话，还需要设置 */
  height:rpx;
  /* 需要设置字体行高为高度及行的倍数关系 */
  line-height:rpx;
```
`-webkit-line-clamp:0; // 全部显示`

- 段落首行缩进两个字符
`text-indent: 2em;  /*em是相对单位，2em即现在一个字大小的两倍*/`

- 微信小程序修改单选框、复选框样式

```css

/*  重写 checkbox 样式  */
/* 未选中的 背景样式 */
checkbox .wx-checkbox-input{
   border-radius: 50%;/* 圆角 */
   width: 40rpx; /* 背景的宽 */
   height: 40rpx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
   border: none;
   background: red;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
   border-radius: 50%;/* 圆角 */
   width: 40rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
   height: 40rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
   line-height: 40rpx;
   text-align: center;
   font-size:30rpx; /* 对勾大小 30rpx */
   color:#fff; /* 对勾颜色 白色 */
   background: transparent;
   transform:translate(-50%, -50%) scale(1);
   -webkit-transform:translate(-50%, -50%) scale(1);
}

/*  重写 radio 样式  */

/* 未选中的 背景样式 */

radio .wx-radio-input {
  border-radius: 50%; /* 圆角 */
  width: 32rpx;
  height: 32rpx;
}

/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */

radio .wx-radio-input.wx-radio-input-checked {
  /* 定义选中的边框样式 */
  border: none;
  /* background: #ff8a00; */
}

/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */

radio .wx-radio-input.wx-radio-input-checked::before {
  border-radius: 50%; /* 圆角 */
  border: 1rpx solid #ff8a00;  /*去除边框颜色*/
  width: 32rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
  height: 32rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
  line-height: 32rpx;
  text-align: center;
  font-size: 32rpx; /* 对勾大小 30rpx */
  color: #fff; /* 对勾颜色 白色 */
  background: #ff8a00;/*定义选中的背景色*/
  /* background: transparent; */
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
```

- 文字渐变

```css
background:linear-gradinet(to right, red, blue);
-webkit-background-clip:text;
color:transparent
```
