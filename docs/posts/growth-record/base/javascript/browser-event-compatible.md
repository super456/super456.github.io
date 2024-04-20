---
title: 主流浏览器事件兼容写法
date: 2020-03-21 20:00:00
tag:
 - JavaScript
categories:
 - 前端进击
---
# 主流浏览器事件兼容写法
### （一）事件处理统一封装：
```javascript
const EventHandle = {
    // element : 元素 ， type： 点击事件 ，handle ： 实行的方法
    //添加句柄
    addEventHandle: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);//---false  //代表冒泡 dom2级
        }
        else if (element.attachEvent) {
            element.attachEvent("on"+type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    //删除句柄  事件处理不起作用
    removeEventHandle: function (element, type, handler) {
        if (element.removeEventListener) {   // 支持dom2级的事件处理  type是 onclick
            element.removeEventListener(type, handler, false); //---false  //代表冒泡
        }
        else if (element.detachEvent) {
            element.detachEvent("on"+type, handler);  //支持IE
        } else {
            element["on" + type] = null;// dom0级事件处理   传统的点击事件
        }
    },

    //获取事件对象 兼容浏览器的所有对象
    getEvent: function (event) {
        return event ? event : window.event;  //在IE浏览器的低版本中需要的是window.event
    },

    //获取事件类型  是点击呢还是鼠标移动
    getType:function(event){
        return event.type;
    },

    //获取当前的那个元素
    getElement: function (event) {
        return event.target || event.srcElement;
    },

    //阻止事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },

    //阻止事件冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    },

    //js获取键盘按下的键值有event.keyCode,event.charCode和event.which
    /*
    *谷歌浏览器对event.keyCode,event.charCode和event.which都兼容。
    *火狐浏览器对event.keyCode部分键值有效，如上下左右键(37,38,39,40)，enter键(13)，PgUp(33),PgDn(34)等部分*有效，对数字键，字母键无效。
    *event.which也是部分键值有效，如字母键，数字键，enter键，Backspace键等有效，对上下左右键，*PgUp(33),PgDn(34)键无效。
    *event.charCode也是对部分键值有效，如字母键，数字键，，Backspace键等有效，对enter键，上下左右键，*PgUp(33),PgDn(34)键无效。
    *ie浏览器中，IE8及以下浏览器对event.charCode无效，event.keyCode和event.which对大部分键值能获得，但是有*少部分也不能获得
    */

    getKeyPress(evt){
    //兼容写法
    evt = (evt) ? evt : ((window.event) ? window.event : "")
    return evt.keyCode||evt.which||evt.charCode;
    }
}
```

### （二）键盘事件 `keyCode` 兼容性写法：

```javascript
var inp = document.getElementById('inp')
var result = document.getElementById('result')

function getKeyCode(e) {
  e = e ? e : (window.event ? window.event : "")
  return e.keyCode ? e.keyCode : e.which
}

inp.onkeypress = function(e) {
  result.innerHTML = getKeyCode(e)
}
```

### （三）求窗口大小的兼容写法：

```javascript
// 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
// 1600 * 525
var client_w = document.documentElement.clientWidth || document.body.clientWidth;
var client_h = document.documentElement.clientHeight || document.body.clientHeight;

// 网页内容实际宽高（包括工具栏和滚动条等边线）
// 1600 * 8
var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
// 1600 * 8
var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

// 滚动的高度
var scroll_Top = document.documentElement.scrollTop || document.body.scrollTop;
```
