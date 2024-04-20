---
title: 浏览器兼容性方案调研
date: 2020-03-22 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# 浏览器兼容性方案调研
### 一、背景描述
所谓的浏览器兼容性问题，是指因为不同的浏览器对同一段代码有不同的解析，造成页面显示效果不统一的情况。在大多数情况下，我们的需求是，无论用户用什么浏览器来查看我们的网站或者登陆我们的系统，都应该是统一的显示效果。所以浏览器的兼容性问题是前端开发人员经常会碰到和必须要解决的问题。

市场上浏览器种类很多，不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。浏览器内核主要分为两种，一是渲染引擎，另一个是 JS 引擎，内核更加倾向于说渲染引擎。

常见的浏览器内核可以分四种：Trident、Gecko、Blink、Webkit：

| **浏览器** | **内核** |
| --- | :--- |
| IE | Trident 内核，也成为 IE 内核 |
| Chrome | Webkit 内核，现在是 Blink 内核 |
| Firefox | Gecko 内核，俗称 Firefox 内核 |
| Safari | Webkit 内核 |
| Opera | 最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核 |
| 360 | IE+Chrome 双内核 |
| 猎豹 | IE+Chrome 双内核 |
| 百度 | IE 内核 |
| QQ | Trident（兼容模式）+Webkit（高速模式） |

### 二、问题原因
原因一：由于浏览器种类众多，不同的浏览器其内核亦不尽相同，故各个浏览器对网页的解析有一定出入，这也是导致浏览器兼容问题出现的主要原因，我们的网页需要在主流浏览器上正常运行，就需要做好浏览器兼容。

原因二：鉴于公司当前项目使用的框架为 Vue，而 Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有[兼容 ECMAScript 5 的浏览器](https://caniuse.com/#feat=es5)（注：支持 IE9 ，实际上并不是指的完美兼容 IE9，而是说在版本较低的浏览器，仍然最大限度保证功能完整性）。

<CustomImage src='/growth-record/engineering/other/browser-compatibility.webp' />

所以，从维护成本考虑，减少不必要的开发时间及针对做好兼容性的项目（跨境会员端 PC 和移动端、跨境 Admin 端），集中的解决 IE 上存在的问题（JS 事件处理和 CSS 样式问题，**注：当前所有项目兼容到 IE 10 、IE 11及 Edge 版本，考虑到IE 9 中 JS 和 CSS 部分兼容，而且需要修改的内容太多问题**）。

### 三、解决方案
#### 1. 常见CSS兼容性问题

- 不同浏览器的标签默认的外补丁( margin )和内补丁 (padding) 不同：

【done】：css 里增加通配符:`* { margin: 0; padding: 0; } `

- IE6 双边距问题；在 IE6 中设置了 float , 同时又设置 margin , 就会出现边距问题：

【done】：设置 `display:inline;`

- 当标签的高度设置小于 10px，在 IE6、IE7 中会超出自己设置的高度：

【done】：超出高度的标签设置 `overflow:hidden;`,或者设置 line-height 的值小于你的设置高度。

- 图片默认有间距：

【done】：使用float 为img 布局。

- IE9 以下浏览器不能使用 opacity：

【done】： `opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50); `

- 边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值：

【done】：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为 `overflow:hidden;`

- `cursor:hand;`  显示手型在 Safari 上不支持：

【done】：统一使用 `cursor:pointer;`

- 两个块级元素，父元素设置了`overflow:auto；`子元素设置了`position:relative ;`且高度大于父元素，在IE6、IE7 会被隐藏而不是溢出:

【done】：父级元素设置` position:relative;`

- BFC 解决边距重叠问题：

当相邻元素都设置了 `margin` 边距时，`margin` 将取最大值，舍弃小值。为了不让边距重叠，可以给子元素加一个父元素，并设置该父元素为 BFC：`overflow: hidden;`
```html
<div class="box" id="box">
  <p>Lorem ipsum dolor sit.</p>

  <div style="overflow: hidden;">
    <p>Lorem ipsum dolor sit.</p>
  </div>

  <p>Lorem ipsum dolor sit.</p>
</div>
```

总结：
（1）浏览器 CSS 样式初始化（推荐使用 Normalize.css）；
（2）浏览器私有属性（建议使用自动化插件）：

- -moz 代表 Firefox 浏览器私有属性；
- -ms 代表 IE 浏览器私有属性；
- -webkit 代表 Chrome、Safari 私有属性；
- -o 代表 Opera 私有属性；

对于私有属性的顺序要注意，把标准写法放到最后，兼容性写法放到前面：
```css
-webkit-transform: rotate(-3deg); /*为 Chrome/Safari*/
-moz-transform: rotate(-3deg); /*为 Firefox*/
-ms-transform: rotate(-3deg); /*为 IE*/
-o-transform: rotate(-3deg); /*为 Opera*/
transform: rotate(-3deg);
```

- CSS Hack（针对不同的浏览器或不同版本写特定的 CSS 样式，这种针对不同的浏览器/不同版本写相应的CSS code 的过程，**注：IE6/7/8 才需要**）：
```css
<!--[if <keywords>? IE <version>?]>
    代码块，可以是 html，css，js
<![endif]-->

if后面跟的条件共包含6种选择方式：是否、大于、大于或等于、小于、小于或等于、非指定版本

是否：指定是否IE或IE某个版本。关键字：空

大于：选择大于指定版本的IE版本。关键字：gt（greater than）

大于或等于：选择大于或等于指定版本的 IE 版本。关键字：gte（greater than or equal）

小于：选择小于指定版本的 IE 版本。关键字：lt（less than）

小于或等于：选择小于或等于指定版本的 IE 版本。关键字：lte（less than or equal）

非指定版本：选择除指定版本外的所有 IE 版本。关键字：!
```

IE10 及以上版本已将条件注释特性移除，使用时需注意：
```css
<!--[if IE]>
    <p>你在非IE中将看不到我的身影</p>
<![endif]-->

<!--[if IE]>
<style>
    .test{color:red;}
</style>
<![endif]-->

<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

属性级 Hack：
```css
selector{<hack>?property:value<hack>?;}

取值：
_：选择 IE6 及以下。连接线（中划线）（-）亦可使用，为了避免与某些带中划线的属性混淆，所以使用下划线（_）更为合适。

*：选择 IE7 及以下。诸如：（+）与（#）之类的均可使用，不过业界对（*）的认知度更高

9：选择 IE6+

0：选择 IE8+ 和 Opera15 以下的浏览器

如在不同的 IE 浏览器中设置不同的颜色，注意顺序：低版本的兼容性写法放到最后：
.test {
  color: #090\9; /* For IE8+ */
  *color: #f00;  /* For IE7 and earlier */
  _color: #ff0;  /* For IE6 and earlier */
}
```

选择符级 Hack（针对一些页面表现不一致或者需要特殊对待的浏览器，在 CSS 选择器前加上一些只有某些特定浏览器才能识别的前缀进行 Hack。）：
```css
<hack> selector{ sRules }

常见的选择符级 Hack 有：

*html *前缀只对 IE6 生效
*+html *+前缀只对 IE7 生效
@media screen\9{...}只对 IE6/7 生效
@media \0screen {body { background: red; }}只对 IE8 有效
@media \0screen\,screen\9{body { background: blue; }}只对 IE6/7/8 有效
@media screen\0 {body { background: green; }} 只对 IE8/9/10 有效
@media screen and (min-width:0\0) {body { background: gray; }} 只对 IE9/10 有效
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对 IE10 有效

如：
* html .test { color: #090; }       /* For IE6 and earlier */
* + html .test { color: #ff0; }     /* For IE7 */
```

- Element -ui 组件样式问题需要单独解决。

#### 2. 常见JS兼容性问题

- 团队编写的文档——[主流浏览器 JS 事件兼容写法](https://www.yuque.com/photonpay_fe/qrq3cg/ie9yr6)

#### 3. 引入插件配置编译器或垫片库
CSS 样式兼容：

- 使用 [Normalize.css ](http://necolas.github.io/normalize.css/)
- [Autoprefixer](https://github.com/postcss/autoprefixer) 或 [PostCSS](https://www.postcss.com.cn/)（[Nuxt 有单独配置](https://zh.nuxtjs.org/api/configuration-build/#postcss)）

JS 兼容：

- 使用 babel-polyfil、es6-promisel，[注意 Nuxt 有单独的项目配置](https://zh.nuxtjs.org/api/configuration-build/#babel)，但官方建议默认预设，自己安装配置的好;
- [Vue-Cli 构建工程配置浏览器兼容性](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)；

### 四、参考链接

- [Yox：一个框架搞定所有浏览器（包括低版本 IE 和移动端浏览器），节省学习和人力成本](https://yoxjs.github.io/yox/#/)
- [Vue 脚手架搭建项目的兼容性配置详解](http://www.uxys.com/html/Vue/20180717/25326.html)
- [Vue 兼容 IE9 的全面解决方案](https://juejin.im/post/5b2868b46fb9a00e6f65f87e)
- [WEB前端开发人员须知的常见浏览器兼容问题及解决技巧](https://blog.csdn.net/xustart7720/article/details/73604651?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)
- [Nuxt.js 项目搭建配置踩坑](https://www.codercto.com/a/89756.html)

**注：以上内容需要团队成员共同维护、补充内容，与公司业务相辅相成，解决更多实际问题。**
