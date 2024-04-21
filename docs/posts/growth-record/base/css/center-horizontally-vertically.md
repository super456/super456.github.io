---
title: DIV + CSS 设置水平垂直居中方法
date: 2018-07-15 20:09:09
tag:
 - CSS
categories:
 - 前端进击
---
# DIV + CSS 设置水平垂直居中方法
**之前写前端页面经常会遇到这个问题，所以抽了个时间总结了一下这些常用的方法，通常分为两种情况来设置：已知宽高和未知。简单的分享一下经验。**

### （一）已知宽高情况的设置
1. `position：absolute;`，`margin：auto;`使用position的绝对定位和margin的居中定位 ，四个方向位置距离设置成一样就行了（通过填充父元素的可用空间 ，子元素设定了宽高，那么多余的空间，被margin：auto平均分配的原理）：

   ```
   //html代码
     <div class="box1">
	        <div class="box2">div+css设置水平垂直居中显示</div>
    </div>
    //css样式代码
        .box1 {
        width: 400px;
        height: 400px;
        margin: auto;
        border: 1px solid red;
                /* 位置值设置相等即可*/
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }
   ```
   运行结果：
<CustomImage src='/growth-record/base/css/center-01.png' />

2. 设置 使用position的绝对定位和margin的居中定位，top和left设置与屏幕相距成50%，然后用transform向左（上）平移它自己宽度（高度）的50%即可：
   ```
       .box1 {
        width: 400px;
        height: 400px;
        margin: auto;
        border: 1px solid red;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%,-50%);
    }
   ```
 运行结果一样。
3. 设置 使用position的绝对定位和margin的居中定位，top和left设置与屏幕相距成50%，使用`margin:高的一半px 0 0 宽的一半px;` 即可：

   ```
       .box1 {
        width: 400px;
        height: 400px;
        margin: auto;
        border: 1px solid red;
        top: 50%;
        left: 50%;
        position: absolute;
        margin: -200px 0 0 -200px;
    }
   ```
### （二）未知元素宽高
这里是使用了两个div的class为box1和box2，方便区别显示，主要设置box2来显示；

1. 通过position的绝对定位和固定定位left和top都设置相对屏幕的50%距离，然后使用transform的translate负偏移来显示：
   ```
   //html
       <div class="box1">
        <div class="box2">div+css设置水平垂直居中显示</div>
    </div>
    //css
        .box2 {
        border: 5px solid green;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

    }
   ```
   运行结果：
<CustomImage src='/growth-record/base/css/center-02.png' />

2. 通过css设置父元素为display: table，子元素为 display: table-cell，这种方法是让元素包含的内容居中，但是会占据整个父元素，因为子元素没有设置宽高的，如下所示（红线方框是设置宽高的父元素）：
<CustomImage src='/growth-record/base/css/center-03.png' />

3. 最实用的方法：css3新的布局方法——弹性布局 display: flex。在这个方法中，不管是在已知或未知元素宽高的情况下，都能使元素居中显示（推荐使用）。
```
//css
.box1 {
        width: 400px;
        height: 400px;
        margin: auto;
        border: 5px solid red;
        display: flex;
        align-items: center;/*垂直居中*/
        justify-content: center;/*水平居中*/

    }
    .box2 {
        border: 5px solid green;
    }
```
运行结果：
<CustomImage src='/growth-record/base/css/center-04.png' />
