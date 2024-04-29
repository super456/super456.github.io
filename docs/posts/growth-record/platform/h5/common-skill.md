---
title: H5 开发常用技巧
date: 2019-07-01 20:08:08
tag:
 - H5
categories:
 - 前端进击
---
# H5 开发常用技巧
## （一）、viewport 设置

- 语法设置：
`<meta name='viewport' content='name=value,name=value'>`

- 五个属性值：
```html
width: 设置布局 viewport 的特定值（“device-width”），默认是 980px，如 width=320 (不需要添加引号)
initial-scale: 设置页面的初始缩放
minimum-scale: 最小缩放
maximum-scale: 最大缩放
user-scalable: 用户能否缩放
```

- 获取当前屏幕的尺寸大小（布局）
`document.body.clientWidth`

- 获取当前度量（视化）的屏幕大小
`window.innerWidth`

- 布局viewport=设备宽度=度量viewport
`<meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=no'`

## （二）、响应式设计

- 媒体查询
```css
@media screen and (max-width:1024px){
    #pagewrap{
        width:95.5%
    }
    #content{
        width:62%
    }
    #content,
}
```

- 百分比布局

- 1 像素边框
```css
li:before{
    position:absolute;
    top:-1px;
    left:0;
    content:'';
    width:100%;
    height:1px;
    border-top:1px solid #ddd;
    -webkit-transform:scaleY(0.5);
}
```

- 相对单位 rem
em: 是根据父节点的 font-size 为相对单位

rem: 是根据 html 的 font-size 为相对单位 (rem=screen.width/20)

```css
html{font-size:32px}
@media screen (min-device-width:375px){
    html{font-size:37.5px}
}
```

- 局部滚动开启弹性滚动
```css
voerflow:scroll;
-webkit-voerflow-scrolling:touch;
```

- 响应式 rem 设计
```css
*{
    margin:0 ;
    padding:0;
}

li{
    list-style: none;
}

a{
    text-decoration: none;
}

@media screen and (min-width: 320px) {html{font-size:50px;}}
@media screen and (min-width: 360px) {html{font-size:56.25px;}}
@media screen and (min-width: 375px) {html{font-size:58.59375px;}}
@media screen and (min-width: 400px) {html{font-size:62.5px;}}
@media screen and (min-width: 414px) {html{font-size:64.6875px;}}
@media screen and (min-width: 440px) {html{font-size:68.75px;}}
@media screen and (min-width: 480px) {html{font-size:75px;}}
@media screen and (min-width: 520px) {html{font-size:81.25px;}}
@media screen and (min-width: 560px) {html{font-size:87.5px;}}
@media screen and (min-width: 600px) {html{font-size:93.75px;}}
@media screen and (min-width: 640px) {html{font-size:100px;}}
@media screen and (min-width: 680px) {html{font-size:106.25px;}}
@media screen and (min-width: 720px) {html{font-size:112.5px;}}
@media screen and (min-width: 760px) {html{font-size:118.75px;}}
@media screen and (min-width: 800px) {html{font-size:125px;}}
@media screen and (min-width: 960px) {html{font-size:150px;}}

.cd-primary-nav{
    position: fixed;
    top:0rem;
    right:-8rem;
    width: 3rem;
    height:100%;
    display: none;
    background: #2e3233;
    z-index: 99;
}

.cd-primary-nav li a{
    text-align: center;
    display: block;
    height: 1rem;
    line-height: 1rem;
    padding: 0 20px;
    color: #ffffff;
    font-size: 0.32rem;
}

.cd-primary-nav li img{
    display: block;
    width: 0.5rem;
    height:0.5rem;
    margin-top:0.2rem;
    margin-left:0.2rem;
}
```
