---
title: 微信小程序之 scroll-view 横向滚动不能显示
date: 2018-08-22 20:03:07
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之 scroll-view 横向滚动不能显示
之前在写scroll-view（可滚动视图区域）遇到一个问题，花一点时间记录分享一下，竖向滚动视图没什么大问题，只需要设置`height：rpx;` 滚动高度区域，然而横向滚动区域就需要注意两个问题了。

### （一）实现效果
<CustomImage src='/growth-record/platform/applet/scroll-view-01.gif' />

###（二）注意设置两个属性
一开始以为只要照着微信官方的文档介绍就可以想怎么写就怎么写了，结果一直调试不出来，按照官方介绍的属性设置了，子元素容器会各占一行，而且，父元素容器会内容换行，试了很多CSS属性，才发现需要设置的两个属性就可以了：

1、`display:inline-block;` 设置子元素容器为行间模块：

> 解释一下display的几个常用的属性值，inline ， block， inline-block<br />
>
> **inline:**（1） 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行.<br />
> （2）不能更改元素的height，width的值，大小由内容撑开.<br />
> （3）可以使用padding，margin的left和right产生边距效果，但是top和bottom就不行.<br />
>
>
> **block:**（1）使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度.<br />
> （2）能够改变元素的height，width的值.<br />
>（3） 可以设置padding，margin的各个属性值，top，left，bottom，right都能够产生边距效果.<br />
> **inline-block:** 结合了inline与block的一些特点，结合了上述inline的第1个特点和block的第2,3个特点.<br />
> 用通俗的话讲，就是不独占一行的块级元素。[详细说明可以查看这篇文章](https://www.cnblogs.com/Ry-yuan/p/6848197.html)

<CustomImage src='/growth-record/platform/applet/scroll-view-02.png' />

2、设置父元素容器`  white-space: nowrap;`容器不换行显示：
<CustomImage src='/growth-record/platform/applet/scroll-view-03.png' />

如果还有遇到的其他问题，欢迎留言交流。
