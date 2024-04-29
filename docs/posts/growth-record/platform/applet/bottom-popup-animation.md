---
title: 微信小程序之 animation 底部弹窗动画（两种方法）
date: 2018-10-30 20:00:00
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之 animation 底部弹窗动画（两种方法）
简单分享一下常用的底部弹窗层或下拉框弹出层（代码需要修改）的内容弹窗的动画效果，这里分享的是点击按钮后底部弹窗的动画效果。第一种方式是动态设置显示区域的高度，第二种方法是动态设置显示区域的移动的位置（使用到 `transform:translateY`）；

### （一）实现效果
<CustomImage src='/growth-record/platform/applet/bottom-popup-01.gif' />

简单说明一下，两种方法实现的效果是一样的，只有点击按钮才能出发弹窗（指定位置），弹窗弹出后，只有点击背景灰色区域弹窗才能收回，点击弹窗内容区域（粉红色部分是不能收回弹窗的），自己可以自定义粉红色部分右上角关闭按钮。

### （二）实现分析
- 第一种动态设置高度的方法是：需要一个容器为背景色（灰色区域），一个容器为弹窗内容（粉红色区域），两者是独立的，实现的原理是一样的；粉红色区域的话，就是设置好绝对位置（在屏幕的底部）和默认内容的区域样式，动态设置内容区域的高度，比如弹出：一开始高度为0（隐藏了），通过animation设置的动画时间，将高度从0到指定高度，内容慢慢就会显示了，然后保留最后一帧的动画样式就行了；收缩也是一样的道理。
- 第二种动态设置位置的方法是：需要一个容器为背景色（灰色区域），一个容器为弹窗内容（粉红色区域），两者是独立的，实现的原理是一样的；粉红色区域的话，就是设置好绝对位置（在屏幕的底部）和默认内容的区域样式，比如弹出：一开始粉红色区域的位置平移在屏幕外（隐藏了），通过animation设置的动画时间，将粉红色区域从屏幕外平移到屏幕内（默认设置在屏幕底部的位置），内容慢慢就会显示了，然后保留最后一帧的动画样式就行了；收缩也是一样的道理。
代码也有注释哈。

### （三）实现代码
#### 第一种动态设置高度方法实现：
1、wxml代码：

```html
<button catchtap='clickPup'>点击底部动画弹窗</button>

<!-- 底部弹窗动画的内容 -->
<view class='pupContent {{click? "showContent": "hideContent"}} {{option? "open": "close"}}' hover-stop-propagation='true'>
  <view class='pupContent-top'>测试一下</view>
</view>
<!-- 固定的背景 -->
<view class='pupContentBG {{click?"showBG":"hideBG"}} {{option?"openBG":"closeBG"}}' catchtap='clickPup'>
</view>
```
2、wxss代码：

```css
.pupContentBG {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
}

.pupContent {
  width: 100%;
  background: pink;
  position: absolute;
  bottom: 0;
  box-shadow: 0 0 10rpx #333;
  height: 0;
  z-index: 999;
}

/* 设置显示的背景 */

.showBG {
  display: block;
}

.hideBG {
  display: none;
}

/* 弹出或关闭动画来动态设置内容高度 */

@keyframes slideBGtUp {
  from {
    background: transparent;
  }

  to {
    background: rgba(0, 0, 0, 0.1);
  }
}

@keyframes slideBGDown {
  from {
    background: rgba(0, 0, 0, 0.1);
  }

  to {
    background: transparent;
  }
}

/* 显示或关闭内容时动画 */

.openBG {
  animation: slideBGtUp 0.5s ease-in both;
  /* animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。 */
}

.closeBG {
  animation: slideBGDown 0.5s ease-in both;
  /* animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。 */
}

/* 设置显示内容 */

.showContent {
  display: block;
}

.hideContent {
  display: none;
}

/* 弹出或关闭动画来动态设置内容高度 */

@keyframes slideContentUp {
  from {
    height: 0;
  }

  to {
    height: 800rpx;
  }
}

@keyframes slideContentDown {
  from {
    height: 800rpx;
  }

  to {
    height: 0;
  }
}

/* 显示或关闭内容时动画 */

.open {
  animation: slideContentUp 0.5s ease-in both;
  /* animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。 */
}

.close {
  animation: slideContentDown 0.5s ease-in both;
  /* animation-fill-mode: both 动画将会执行 forwards 和 backwards 执行的动作。 */
}

```
3、js代码：

```js
  data: {
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
  },

  // 用户点击显示弹窗
  clickPup: function() {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }

    if (_that.data.option) {
      _that.setData({
        option: false,
      })

      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
        })
      }, 500)

    } else {
      _that.setData({
        option: true
      })
    }
  },

```

#### 第二种动态平移内容区域位置方法实现：
相对于第一种代码修改的部分：只修改的了粉红色区域的高度和粉红色区域弹出和收回的动画效果：

```css
/* 弹出或关闭动画来动态设置内容高度 */

@keyframes slideContentUp {
  from {
    transform: translateY(100%); /*设置为正数则底部弹出来，负数则相反*/
  }

  to {
    transform: translateY(0%);
  }
}

@keyframes slideContentDown {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(100%);
  }
}
```

**参考资料：**
- [CSS3（三）Animation 入门详解](https://blog.csdn.net/u013243347/article/details/79976352)
- [微信小程序CSS3动画下拉菜单](https://blog.csdn.net/zjw_python/article/details/80720427)

**感谢阅读。**
