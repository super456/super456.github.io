import{j as p,b as e,c as t,L as l,s,f as a,aa as i,G as c}from"./chunks/framework.D8w0pJIA.js";const q=JSON.parse('{"title":"微信小程序之图片遮罩层 Demo","description":"","frontmatter":{"title":"微信小程序之图片遮罩层 Demo","date":"2018-07-29T20:07:01.000Z","tag":["微信小程序"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/platform/applet/image-masking-demo.md","filePath":"posts/growth-record/platform/applet/image-masking-demo.md","lastUpdated":1713671501000}'),o={name:"posts/growth-record/platform/applet/image-masking-demo.md"},r=s("h1",{id:"微信小程序之图片遮罩层-demo",tabindex:"-1"},[a("微信小程序之图片遮罩层 Demo "),s("a",{class:"header-anchor",href:"#微信小程序之图片遮罩层-demo","aria-label":'Permalink to "微信小程序之图片遮罩层 Demo"'},"​")],-1),d=s("p",null,"在工作中经常会用到遮罩层弹窗，所以简单分享一下，之前写过的一个弹出广告图片遮罩层功能demo。",-1),g=s("h3",{id:"一-实现效果",tabindex:"-1"},[a("（一）实现效果 "),s("a",{class:"header-anchor",href:"#一-实现效果","aria-label":'Permalink to "（一）实现效果"'},"​")],-1),h=i(`<h3 id="二-实现过程" tabindex="-1">（二）实现过程 <a class="header-anchor" href="#二-实现过程" aria-label="Permalink to &quot;（二）实现过程&quot;">​</a></h3><p>实现过程主要是设置css样式，比较容易理解。 1、设置wxml代码布局：设置一个背景布局：用来显示灰色背景；嵌套一个显示展示图片容器，嵌套一个显示闭关按钮的容器。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>   &lt;view class=&quot;b1&quot; hidden=&quot;{{flag}}&quot;&gt;</span></span>
<span class="line"><span>		&lt;view class=&quot;b2&quot;&gt;</span></span>
<span class="line"><span>			&lt;image src=&#39;../../images/test.jpg&#39;/&gt;</span></span>
<span class="line"><span>		&lt;/view&gt;</span></span>
<span class="line"><span>		  &lt;view class=&quot;t_w&quot;&gt;</span></span>
<span class="line"><span>		   &lt;cover-view class=&quot;t_image&quot; bindtap=&quot;closeMask&quot;&gt;</span></span>
<span class="line"><span>		     &lt;cover-image  src=&quot;../../images/qcm.png&quot;&gt;&lt;/cover-image&gt;</span></span>
<span class="line"><span>		    &lt;/cover-view&gt;</span></span>
<span class="line"><span>		  &lt;/view&gt;</span></span>
<span class="line"><span>	&lt;/view&gt;</span></span></code></pre></div><p>2、wxss样式设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>/* 设置背景遮罩层样式 */</span></span>
<span class="line"><span>.b1 {</span></span>
<span class="line"><span>  position: fixed;</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  height: 100%;</span></span>
<span class="line"><span>  top: 0;</span></span>
<span class="line"><span>  background: rgba(0, 0, 0, 0.4);</span></span>
<span class="line"><span>  display: flex;</span></span>
<span class="line"><span>  justify-content: center;</span></span>
<span class="line"><span>  align-items: center;</span></span>
<span class="line"><span>  flex-direction: column;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* 设置展示图片大小 */</span></span>
<span class="line"><span>.b2 {</span></span>
<span class="line"><span>  width: 50%;</span></span>
<span class="line"><span>  height: 50%;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* 设置展示图片与关闭按钮图片的距离 */</span></span>
<span class="line"><span>.t_w {</span></span>
<span class="line"><span>  margin-top: 20rpx;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* 设置关闭按钮图片显示的大小 */</span></span>
<span class="line"><span>.b2 image {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  height: 100%;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* 设置关闭按钮宽高 */</span></span>
<span class="line"><span>.t_image {</span></span>
<span class="line"><span>  width: 60rpx;</span></span>
<span class="line"><span>  height: 60rpx;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、 js两个方法控制显示与关闭操作：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> data: {</span></span>
<span class="line"><span>    motto: &#39;微信遮罩层显示&#39;,</span></span>
<span class="line"><span>   flag: true,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  showMask:function(){</span></span>
<span class="line"><span>    this.setData({ flag: false })</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  closeMask: function () {</span></span>
<span class="line"><span>    this.setData({ flag: true })</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="三-完整代码" tabindex="-1">（三）完整代码 <a class="header-anchor" href="#三-完整代码" aria-label="Permalink to &quot;（三）完整代码&quot;">​</a></h3><p><a href="https://github.com/super456/wechatMask" target="_blank" rel="noreferrer">代码下载</a></p>`,9);function m(u,_,b,f,v,k){const n=c("CustomImage");return e(),t("div",null,[r,d,g,l(n,{src:"/growth-record/platform/applet/image-masking-demo.gif"}),h])}const x=p(o,[["render",m]]);export{q as __pageData,x as default};
