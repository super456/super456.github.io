---
title: CSS 之实现图片叠加的层叠层问题
date: 2018-09-22 20:00:00
tag:
 - CSS
categories:
 - 前端进击
---
# CSS 之实现图片叠加的层叠层问题
在工作中，也就是在微信小程序开发的时候经常用到图片叠加及层叠层的问题，但都比较好解决，就是没有好好研究其概念原理上的东西。因为自己技术及理解有限，也在网上找了很多参考资料，学习到了很多东西，简单分享一下。

### （一）实现效果
说明一下：是通过微信开发者工具展示的小程序效果；
<CustomImage src='/growth-record/base/css/image-index-01.gif' />

### （二）实现分析
1、效果图展示的是两张图片叠加（一个是上传的图片一个是右上角的删除按钮图标）。实现的方式也是很简单：
父级容器设置样式：

```css
position:relative;
top:...
left:...
。。。（设置其他属性样式）
```
子级容器设置样式（放两张图片的）：
第一张图片是设置样式是占满整个父级的所以不用设置position；
第二张图片就要设置`position:absolute;`（脱离常规文档流，当不会脱离父级下的文档流）
```css
position:absoulte;
top:...
left:...
。。。（其他样式）
```
如果还需要设置层叠层显示问题，比如上面的子级容器下的第二张图片想越过父级容器设置并显示出来（因为文档流的问题）可以设置:`z-index:1;`
没设置前，删除符号会被遮挡：
<CustomImage src='/growth-record/base/css/image-index-02.png' />

设置后，不会被遮挡了：
<CustomImage src='/growth-record/base/css/image-index-03.png' />

### （三）推荐参考资料
- [CSS 中重要的层叠概念](https://juejin.im/post/5ba4efe36fb9a05cf52ac192)
- [CSS中重要的BFC](https://segmentfault.com/a/1190000013023485)
- [关于z-index 那些你不知道的事](https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892)
