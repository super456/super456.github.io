import{j as a,b as t,c as n,L as l,aa as s,G as h}from"./chunks/framework.BdPFiiJb.js";const u=JSON.parse('{"title":"浏览器兼容性方案调研","description":"","frontmatter":{"title":"浏览器兼容性方案调研","date":"2020-03-22T20:00:00.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/engineering/other/browser-compatibility-research.md","filePath":"posts/growth-record/engineering/other/browser-compatibility-research.md","lastUpdated":1713611543000}'),p={name:"posts/growth-record/engineering/other/browser-compatibility-research.md"},e=s('<h1 id="浏览器兼容性方案调研" tabindex="-1">浏览器兼容性方案调研 <a class="header-anchor" href="#浏览器兼容性方案调研" aria-label="Permalink to &quot;浏览器兼容性方案调研&quot;">​</a></h1><h3 id="一、背景描述" tabindex="-1">一、背景描述 <a class="header-anchor" href="#一、背景描述" aria-label="Permalink to &quot;一、背景描述&quot;">​</a></h3><p>所谓的浏览器兼容性问题，是指因为不同的浏览器对同一段代码有不同的解析，造成页面显示效果不统一的情况。在大多数情况下，我们的需求是，无论用户用什么浏览器来查看我们的网站或者登陆我们的系统，都应该是统一的显示效果。所以浏览器的兼容性问题是前端开发人员经常会碰到和必须要解决的问题。</p><p>市场上浏览器种类很多，不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。浏览器内核主要分为两种，一是渲染引擎，另一个是 JS 引擎，内核更加倾向于说渲染引擎。</p><p>常见的浏览器内核可以分四种：Trident、Gecko、Blink、Webkit：</p><table><thead><tr><th><strong>浏览器</strong></th><th style="text-align:left;"><strong>内核</strong></th></tr></thead><tbody><tr><td>IE</td><td style="text-align:left;">Trident 内核，也成为 IE 内核</td></tr><tr><td>Chrome</td><td style="text-align:left;">Webkit 内核，现在是 Blink 内核</td></tr><tr><td>Firefox</td><td style="text-align:left;">Gecko 内核，俗称 Firefox 内核</td></tr><tr><td>Safari</td><td style="text-align:left;">Webkit 内核</td></tr><tr><td>Opera</td><td style="text-align:left;">最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核</td></tr><tr><td>360</td><td style="text-align:left;">IE+Chrome 双内核</td></tr><tr><td>猎豹</td><td style="text-align:left;">IE+Chrome 双内核</td></tr><tr><td>百度</td><td style="text-align:left;">IE 内核</td></tr><tr><td>QQ</td><td style="text-align:left;">Trident（兼容模式）+Webkit（高速模式）</td></tr></tbody></table><h3 id="二、问题原因" tabindex="-1">二、问题原因 <a class="header-anchor" href="#二、问题原因" aria-label="Permalink to &quot;二、问题原因&quot;">​</a></h3><p>原因一：由于浏览器种类众多，不同的浏览器其内核亦不尽相同，故各个浏览器对网页的解析有一定出入，这也是导致浏览器兼容问题出现的主要原因，我们的网页需要在主流浏览器上正常运行，就需要做好浏览器兼容。</p><p>原因二：鉴于公司当前项目使用的框架为 Vue，而 Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有<a href="https://caniuse.com/#feat=es5" target="_blank" rel="noreferrer">兼容 ECMAScript 5 的浏览器</a>（注：支持 IE9 ，实际上并不是指的完美兼容 IE9，而是说在版本较低的浏览器，仍然最大限度保证功能完整性）。</p>',9),k=s(`<p>所以，从维护成本考虑，减少不必要的开发时间及针对做好兼容性的项目（跨境会员端 PC 和移动端、跨境 Admin 端），集中的解决 IE 上存在的问题（JS 事件处理和 CSS 样式问题，<strong>注：当前所有项目兼容到 IE 10 、IE 11及 Edge 版本，考虑到IE 9 中 JS 和 CSS 部分兼容，而且需要修改的内容太多问题</strong>）。</p><h3 id="三、解决方案" tabindex="-1">三、解决方案 <a class="header-anchor" href="#三、解决方案" aria-label="Permalink to &quot;三、解决方案&quot;">​</a></h3><h4 id="_1-常见css兼容性问题" tabindex="-1">1. 常见CSS兼容性问题 <a class="header-anchor" href="#_1-常见css兼容性问题" aria-label="Permalink to &quot;1. 常见CSS兼容性问题&quot;">​</a></h4><ul><li>不同浏览器的标签默认的外补丁( margin )和内补丁 (padding) 不同：</li></ul><p>【done】：css 里增加通配符:<code>* { margin: 0; padding: 0; } </code></p><ul><li>IE6 双边距问题；在 IE6 中设置了 float , 同时又设置 margin , 就会出现边距问题：</li></ul><p>【done】：设置 <code>display:inline;</code></p><ul><li>当标签的高度设置小于 10px，在 IE6、IE7 中会超出自己设置的高度：</li></ul><p>【done】：超出高度的标签设置 <code>overflow:hidden;</code>,或者设置 line-height 的值小于你的设置高度。</p><ul><li>图片默认有间距：</li></ul><p>【done】：使用float 为img 布局。</p><ul><li>IE9 以下浏览器不能使用 opacity：</li></ul><p>【done】： <code>opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50); </code></p><ul><li>边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值：</li></ul><p>【done】：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为 <code>overflow:hidden;</code></p><ul><li><code>cursor:hand;</code> 显示手型在 Safari 上不支持：</li></ul><p>【done】：统一使用 <code>cursor:pointer;</code></p><ul><li>两个块级元素，父元素设置了<code>overflow:auto；</code>子元素设置了<code>position:relative ;</code>且高度大于父元素，在IE6、IE7 会被隐藏而不是溢出:</li></ul><p>【done】：父级元素设置<code> position:relative;</code></p><ul><li>BFC 解决边距重叠问题：</li></ul><p>当相邻元素都设置了 <code>margin</code> 边距时，<code>margin</code> 将取最大值，舍弃小值。为了不让边距重叠，可以给子元素加一个父元素，并设置该父元素为 BFC：<code>overflow: hidden;</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;box&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;box&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Lorem ipsum dolor sit.&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;overflow: hidden;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Lorem ipsum dolor sit.&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Lorem ipsum dolor sit.&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>总结： （1）浏览器 CSS 样式初始化（推荐使用 Normalize.css）； （2）浏览器私有属性（建议使用自动化插件）：</p><ul><li>-moz 代表 Firefox 浏览器私有属性；</li><li>-ms 代表 IE 浏览器私有属性；</li><li>-webkit 代表 Chrome、Safari 私有属性；</li><li>-o 代表 Opera 私有属性；</li></ul><p>对于私有属性的顺序要注意，把标准写法放到最后，兼容性写法放到前面：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-webkit-transform: rotate(-3deg); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*为 Chrome/Safari*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-moz-transform: rotate(-3deg); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*为 Firefox*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-ms-transform: rotate(-3deg); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*为 IE*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-o-transform: rotate(-3deg); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*为 Opera*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">transform: rotate(-3deg);</span></span></code></pre></div><ul><li>CSS Hack（针对不同的浏览器或不同版本写特定的 CSS 样式，这种针对不同的浏览器/不同版本写相应的CSS code 的过程，<strong>注：IE6/7/8 才需要</strong>）：</li></ul><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!--[if &lt;keywords&gt;? IE &lt;version&gt;?]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    代码块，可以是 html，css，js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;![</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]--</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">if后面跟的条件共包含6种选择方式：是否、大于、大于或等于、小于、小于或等于、非指定版本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">是否：指定是否IE或IE某个版本。关键字：空</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">大于：选择大于指定版本的IE版本。关键字：gt（greater than）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">大于或等于：选择大于或等于指定版本的 IE 版本。关键字：gte（greater than or equal）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">小于：选择小于指定版本的 IE 版本。关键字：lt（less than）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">小于或等于：选择小于或等于指定版本的 IE 版本。关键字：lte（less than or equal）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">非指定版本：选择除指定版本外的所有 IE 版本。关键字：!</span></span></code></pre></div><p>IE10 及以上版本已将条件注释特性移除，使用时需注意：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!--[if </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你在非IE中将看不到我的身影&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;![</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]--</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!--[if </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    .test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;![</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]--</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;!--[if lt IE 9]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> src=&quot;//cdn</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.bootcss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.com/html5shiv/3</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.2/html5shiv</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.js&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> src=&quot;//cdn</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.bootcss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.com/respond.js/1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.2/respond</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.js&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;![</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">endif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]--</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>属性级 Hack：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">selector{&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">hack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">property</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:value&lt;hack&gt;?;}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">取值：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_：选择 IE6 及以下。连接线（中划线）（-）亦可使用，为了避免与某些带中划线的属性混淆，所以使用下划线（_）更为合适。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：选择 IE7 及以下。诸如：（</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">）与（</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#）之类的均可使用，不过业界对（*）的认知度更高</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">9：选择 IE6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">0：选择 IE8</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 和 Opera15 以下的浏览器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如在不同的 IE 浏览器中设置不同的颜色，注意顺序：低版本的兼容性写法放到最后：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#090\\9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* For IE8+ */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  *</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#f00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* For IE7 and earlier */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  _</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* For IE6 and earlier */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>选择符级 Hack（针对一些页面表现不一致或者需要特殊对待的浏览器，在 CSS 选择器前加上一些只有某些特定浏览器才能识别的前缀进行 Hack。）：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;hack</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> selector{ </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sRules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">常见的选择符级 Hack 有：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*html</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">前缀只对 IE6 生效</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">html</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">前缀只对 IE7 生效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{..</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">.}只对</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> IE6/7 生效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">screen {</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }}只对 IE8 有效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\,</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }}只对 IE6/7/8 有效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> screen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">green</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }} 只对 IE8/9/10 有效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> screen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">min-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\\</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gray</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }} 只对 IE9/10 有效</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@media</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> screen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-ms-high-contrast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: active), (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-ms-high-contrast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: none) {</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">orange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }} 只对 IE10 有效</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如：</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> html</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> .test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#090</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* For IE6 and earlier */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">*</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> html</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> .test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* For IE7 */</span></span></code></pre></div><ul><li>Element -ui 组件样式问题需要单独解决。</li></ul><h4 id="_2-常见js兼容性问题" tabindex="-1">2. 常见JS兼容性问题 <a class="header-anchor" href="#_2-常见js兼容性问题" aria-label="Permalink to &quot;2. 常见JS兼容性问题&quot;">​</a></h4><ul><li>团队编写的文档——<a href="https://www.yuque.com/photonpay_fe/qrq3cg/ie9yr6" target="_blank" rel="noreferrer">主流浏览器 JS 事件兼容写法</a></li></ul><h4 id="_3-引入插件配置编译器或垫片库" tabindex="-1">3. 引入插件配置编译器或垫片库 <a class="header-anchor" href="#_3-引入插件配置编译器或垫片库" aria-label="Permalink to &quot;3. 引入插件配置编译器或垫片库&quot;">​</a></h4><p>CSS 样式兼容：</p><ul><li>使用 <a href="http://necolas.github.io/normalize.css/" target="_blank" rel="noreferrer">Normalize.css </a></li><li><a href="https://github.com/postcss/autoprefixer" target="_blank" rel="noreferrer">Autoprefixer</a> 或 <a href="https://www.postcss.com.cn/" target="_blank" rel="noreferrer">PostCSS</a>（<a href="https://zh.nuxtjs.org/api/configuration-build/#postcss" target="_blank" rel="noreferrer">Nuxt 有单独配置</a>）</li></ul><p>JS 兼容：</p><ul><li>使用 babel-polyfil、es6-promisel，<a href="https://zh.nuxtjs.org/api/configuration-build/#babel" target="_blank" rel="noreferrer">注意 Nuxt 有单独的项目配置</a>，但官方建议默认预设，自己安装配置的好;</li><li><a href="https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist" target="_blank" rel="noreferrer">Vue-Cli 构建工程配置浏览器兼容性</a>；</li></ul><h3 id="四、参考链接" tabindex="-1">四、参考链接 <a class="header-anchor" href="#四、参考链接" aria-label="Permalink to &quot;四、参考链接&quot;">​</a></h3><ul><li><a href="https://yoxjs.github.io/yox/#/" target="_blank" rel="noreferrer">Yox：一个框架搞定所有浏览器（包括低版本 IE 和移动端浏览器），节省学习和人力成本</a></li><li><a href="http://www.uxys.com/html/Vue/20180717/25326.html" target="_blank" rel="noreferrer">Vue 脚手架搭建项目的兼容性配置详解</a></li><li><a href="https://juejin.im/post/5b2868b46fb9a00e6f65f87e" target="_blank" rel="noreferrer">Vue 兼容 IE9 的全面解决方案</a></li><li><a href="https://blog.csdn.net/xustart7720/article/details/73604651?depth_1-utm_source=distribute.pc_relevant.none-task&amp;utm_source=distribute.pc_relevant.none-task" target="_blank" rel="noreferrer">WEB前端开发人员须知的常见浏览器兼容问题及解决技巧</a></li><li><a href="https://www.codercto.com/a/89756.html" target="_blank" rel="noreferrer">Nuxt.js 项目搭建配置踩坑</a></li></ul><p><strong>注：以上内容需要团队成员共同维护、补充内容，与公司业务相辅相成，解决更多实际问题。</strong></p>`,45);function r(E,d,g,o,y,c){const i=h("CustomImage");return t(),n("div",null,[e,l(i,{src:"/growth-record/engineering/other/browser-compatibility.webp"}),k])}const C=a(p,[["render",r]]);export{u as __pageData,C as default};