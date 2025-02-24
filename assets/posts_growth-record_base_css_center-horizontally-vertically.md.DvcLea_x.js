import{_ as e,D as l,c as t,o as i,a6 as n,I as a,j as p}from"./chunks/framework.BOyJDVBP.js";const y=JSON.parse('{"title":"DIV + CSS 设置水平垂直居中方法","description":"","frontmatter":{"title":"DIV + CSS 设置水平垂直居中方法","date":"2018-07-15T20:09:09.000Z","tag":["CSS"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/base/css/center-horizontally-vertically.md","filePath":"posts/growth-record/base/css/center-horizontally-vertically.md","lastUpdated":1713671501000}'),o={name:"posts/growth-record/base/css/center-horizontally-vertically.md"},c=n(`<h1 id="div-css-设置水平垂直居中方法" tabindex="-1">DIV + CSS 设置水平垂直居中方法 <a class="header-anchor" href="#div-css-设置水平垂直居中方法" aria-label="Permalink to &quot;DIV + CSS 设置水平垂直居中方法&quot;">​</a></h1><p><strong>之前写前端页面经常会遇到这个问题，所以抽了个时间总结了一下这些常用的方法，通常分为两种情况来设置：已知宽高和未知。简单的分享一下经验。</strong></p><h3 id="一-已知宽高情况的设置" tabindex="-1">（一）已知宽高情况的设置 <a class="header-anchor" href="#一-已知宽高情况的设置" aria-label="Permalink to &quot;（一）已知宽高情况的设置&quot;">​</a></h3><ol><li><p><code>position：absolute;</code>，<code>margin：auto;</code>使用position的绝对定位和margin的居中定位 ，四个方向位置距离设置成一样就行了（通过填充父元素的可用空间 ，子元素设定了宽高，那么多余的空间，被margin：auto平均分配的原理）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//html代码</span></span>
<span class="line"><span>  &lt;div class=&quot;box1&quot;&gt;</span></span>
<span class="line"><span>         &lt;div class=&quot;box2&quot;&gt;div+css设置水平垂直居中显示&lt;/div&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> //css样式代码</span></span>
<span class="line"><span>     .box1 {</span></span>
<span class="line"><span>     width: 400px;</span></span>
<span class="line"><span>     height: 400px;</span></span>
<span class="line"><span>     margin: auto;</span></span>
<span class="line"><span>     border: 1px solid red;</span></span>
<span class="line"><span>             /* 位置值设置相等即可*/</span></span>
<span class="line"><span>     top: 0;</span></span>
<span class="line"><span>     left: 0;</span></span>
<span class="line"><span>     right: 0;</span></span>
<span class="line"><span>     bottom: 0;</span></span>
<span class="line"><span>     position: absolute;</span></span>
<span class="line"><span> }</span></span></code></pre></div><p>运行结果：</p></li></ol>`,4),r=n(`<ol start="2"><li>设置 使用position的绝对定位和margin的居中定位，top和left设置与屏幕相距成50%，然后用transform向左（上）平移它自己宽度（高度）的50%即可：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    .box1 {</span></span>
<span class="line"><span>     width: 400px;</span></span>
<span class="line"><span>     height: 400px;</span></span>
<span class="line"><span>     margin: auto;</span></span>
<span class="line"><span>     border: 1px solid red;</span></span>
<span class="line"><span>     top: 50%;</span></span>
<span class="line"><span>     left: 50%;</span></span>
<span class="line"><span>     position: absolute;</span></span>
<span class="line"><span>     transform: translate(-50%,-50%);</span></span>
<span class="line"><span> }</span></span></code></pre></div></li></ol><p>运行结果一样。 3. 设置 使用position的绝对定位和margin的居中定位，top和left设置与屏幕相距成50%，使用<code>margin:高的一半px 0 0 宽的一半px;</code> 即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    .box1 {</span></span>
<span class="line"><span>     width: 400px;</span></span>
<span class="line"><span>     height: 400px;</span></span>
<span class="line"><span>     margin: auto;</span></span>
<span class="line"><span>     border: 1px solid red;</span></span>
<span class="line"><span>     top: 50%;</span></span>
<span class="line"><span>     left: 50%;</span></span>
<span class="line"><span>     position: absolute;</span></span>
<span class="line"><span>     margin: -200px 0 0 -200px;</span></span>
<span class="line"><span> }</span></span></code></pre></div><h3 id="二-未知元素宽高" tabindex="-1">（二）未知元素宽高 <a class="header-anchor" href="#二-未知元素宽高" aria-label="Permalink to &quot;（二）未知元素宽高&quot;">​</a></h3><p>这里是使用了两个div的class为box1和box2，方便区别显示，主要设置box2来显示；</p><ol><li>通过position的绝对定位和固定定位left和top都设置相对屏幕的50%距离，然后使用transform的translate负偏移来显示：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//html</span></span>
<span class="line"><span>    &lt;div class=&quot;box1&quot;&gt;</span></span>
<span class="line"><span>     &lt;div class=&quot;box2&quot;&gt;div+css设置水平垂直居中显示&lt;/div&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span>
<span class="line"><span> //css</span></span>
<span class="line"><span>     .box2 {</span></span>
<span class="line"><span>     border: 5px solid green;</span></span>
<span class="line"><span>     position: absolute;</span></span>
<span class="line"><span>     top: 50%;</span></span>
<span class="line"><span>     left: 50%;</span></span>
<span class="line"><span>     transform: translate(-50%,-50%);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span></code></pre></div>运行结果：</li></ol>`,6),d=p("ol",{start:"2"},[p("li",null,"通过css设置父元素为display: table，子元素为 display: table-cell，这种方法是让元素包含的内容居中，但是会占据整个父元素，因为子元素没有设置宽高的，如下所示（红线方框是设置宽高的父元素）：")],-1),h=n(`<ol start="3"><li>最实用的方法：css3新的布局方法——弹性布局 display: flex。在这个方法中，不管是在已知或未知元素宽高的情况下，都能使元素居中显示（推荐使用）。</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//css</span></span>
<span class="line"><span>.box1 {</span></span>
<span class="line"><span>        width: 400px;</span></span>
<span class="line"><span>        height: 400px;</span></span>
<span class="line"><span>        margin: auto;</span></span>
<span class="line"><span>        border: 5px solid red;</span></span>
<span class="line"><span>        display: flex;</span></span>
<span class="line"><span>        align-items: center;/*垂直居中*/</span></span>
<span class="line"><span>        justify-content: center;/*水平居中*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    .box2 {</span></span>
<span class="line"><span>        border: 5px solid green;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>运行结果：</p>`,3);function g(b,u,_,m,v,x){const s=l("CustomImage");return i(),t("div",{"data-pagefind-body":!0},[c,a(s,{src:"/growth-record/base/css/center-01.png"}),r,a(s,{src:"/growth-record/base/css/center-02.png"}),d,a(s,{src:"/growth-record/base/css/center-03.png"}),h,a(s,{src:"/growth-record/base/css/center-04.png"})])}const C=e(o,[["render",g]]);export{y as __pageData,C as default};
