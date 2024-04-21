import{j as e,b as l,c as t,L as n,s,f as p,aa as i,G as c}from"./chunks/framework.BdPFiiJb.js";const C=JSON.parse('{"title":"微信小程序之简单双向调节的 Slider 滑动选择器","description":"","frontmatter":{"title":"微信小程序之简单双向调节的 Slider 滑动选择器","date":"2018-08-22T20:08:08.000Z","tag":["微信小程序"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/platform/applet/slider.md","filePath":"posts/growth-record/platform/applet/slider.md","lastUpdated":1713671501000}'),r={name:"posts/growth-record/platform/applet/slider.md"},o=s("h1",{id:"微信小程序之简单双向调节的-slider-滑动选择器",tabindex:"-1"},[p("微信小程序之简单双向调节的 Slider 滑动选择器 "),s("a",{class:"header-anchor",href:"#微信小程序之简单双向调节的-slider-滑动选择器","aria-label":'Permalink to "微信小程序之简单双向调节的 Slider 滑动选择器"'},"​")],-1),d=s("p",null,"简单说明一下，这是用微信官方的slider组件拼接的，没有用到其他框架哈。",-1),h=s("h3",{id:"一-实现效果",tabindex:"-1"},[p("（一）实现效果 "),s("a",{class:"header-anchor",href:"#一-实现效果","aria-label":'Permalink to "（一）实现效果"'},"​")],-1),g=i(`<h3 id="二-实现过程" tabindex="-1">（二）实现过程 <a class="header-anchor" href="#二-实现过程" aria-label="Permalink to &quot;（二）实现过程&quot;">​</a></h3><p>主要是将两个滑动选择器拼接在一起、各自设置所占长度比，就可以实现双向滚动调节了，但是有一个问题，我没有解决到，就是一个固定的滑动区域内，左右滑块可以相互交接互相滑动，尝试了一下没弄出来。 1、wxml代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;view class=&#39;sliderHCon&#39;&gt;</span></span>
<span class="line"><span>  &lt;view class=&#39;showMoney&#39;&gt;</span></span>
<span class="line"><span>    &lt;text class=&#39;MoneyValue&#39;&gt;￥{{leftValue}}&lt;/text&gt;</span></span>
<span class="line"><span>    &lt;text class=&#39;MoneyValue&#39;&gt;￥{{rightValue}}&lt;/text&gt;</span></span>
<span class="line"><span>  &lt;/view&gt;</span></span>
<span class="line"><span>  &lt;view class=&#39;twoSlider&#39;&gt;</span></span>
<span class="line"><span>    &lt;slider min=&#39;{{leftMin}}&#39; max=&#39;{{leftMax}}&#39; value=&#39;{{leftValue}}&#39; activeColor=&#39;#cecacb&#39; backgroundColor=&#39;#f26a36&#39; block-size=&#39;20&#39; step=&#39;100&#39; style=&#39;width:{{leftWidth}}%;margin-right:0rpx;&#39; bindchange=&quot;leftChange&quot; /&gt;</span></span>
<span class="line"><span>    &lt;slider min=&#39;{{rightMin}}&#39; max=&#39;{{rightMax}}&#39; value=&#39;{{rightValue}}&#39; activeColor=&#39;#f26a36&#39; backgroundColor=&#39;#cecacb&#39; block-size=&#39;20&#39; step=&#39;100&#39; style=&#39;width:{{rightWidth}}%;margin-left:0rpx;&#39; bindchange=&quot;rightChange&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/view&gt;</span></span>
<span class="line"><span>&lt;/view&gt;</span></span></code></pre></div><p>2、wxss代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.sliderHCon {</span></span>
<span class="line"><span>  margin: 0 40rpx 0 40rpx;</span></span>
<span class="line"><span>  height: 250rpx;</span></span>
<span class="line"><span>  border: 1rpx solid red;</span></span>
<span class="line"><span>  width: 70%;</span></span>
<span class="line"><span>  margin: auto;</span></span>
<span class="line"><span>  display: flex;</span></span>
<span class="line"><span>  justify-content: center;</span></span>
<span class="line"><span>  align-items: center;</span></span>
<span class="line"><span>  flex-direction: column;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.MoneyValue {</span></span>
<span class="line"><span>  font-size: 30rpx;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  color: #999;</span></span>
<span class="line"><span>  margin-top: 15rpx;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.showMoney text {</span></span>
<span class="line"><span>  margin-right: 30rpx;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.twoSlider {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  display: flex;</span></span>
<span class="line"><span>  flex-direction: row;</span></span>
<span class="line"><span>  justify-content: center;</span></span>
<span class="line"><span>  align-items: center;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、js代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  /**</span></span>
<span class="line"><span>   * 页面的初始数据</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  data: {</span></span>
<span class="line"><span>    leftMin: 0, //左边滑块最小值</span></span>
<span class="line"><span>    leftMax: 10000, //左边滑块最大值</span></span>
<span class="line"><span>    rightMin: 0, //右边滑块的最小值</span></span>
<span class="line"><span>    rightMax: 10000, //右边滑块最大值</span></span>
<span class="line"><span>    leftValue: 1000, //左边滑块默认值</span></span>
<span class="line"><span>    rightValue: 6000, //右边滑块默认值</span></span>
<span class="line"><span>    leftWidth: &#39;50&#39;, //左边滑块可滑动长度：百分比</span></span>
<span class="line"><span>    rightWidth: &#39;50&#39;, //右边滑块可滑动长度：百分比</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 左边滑块滑动的值</span></span>
<span class="line"><span>  leftChange: function(e) {</span></span>
<span class="line"><span>    console.log(&#39;左边改变的值为：&#39; + e.detail.value);</span></span>
<span class="line"><span>    var that = this;</span></span>
<span class="line"><span>    that.setData({</span></span>
<span class="line"><span>      leftValue: e.detail.value //设置左边当前值</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  // 右边滑块滑动的值</span></span>
<span class="line"><span>  rightChange: function(e) {</span></span>
<span class="line"><span>    console.log(&#39;右边改变的值为：&#39; + e.detail.value);</span></span>
<span class="line"><span>    var that = this;</span></span>
<span class="line"><span>    that.setData({</span></span>
<span class="line"><span>      rightValue: e.detail.value,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  },</span></span></code></pre></div><p>如果想参考其他小程序框架做的，实现效果如下，<a href="https://www.imooc.com/article/34271" target="_blank" rel="noreferrer">可以参考这篇wepy写的介绍文章</a></p>`,8);function u(m,f,v,x,_,b){const a=c("CustomImage");return l(),t("div",null,[o,d,h,n(a,{src:"/growth-record/platform/applet/slider-01.gif"}),g,n(a,{src:"/growth-record/platform/applet/slider-02.jpeg"})])}const k=e(r,[["render",u]]);export{C as __pageData,k as default};
