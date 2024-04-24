import{j as l,b as e,c as t,L as s,aa as p,s as n,f as c,G as i}from"./chunks/framework.D8w0pJIA.js";const y=JSON.parse('{"title":"微信小程序之自定义 table 表格布局","description":"","frontmatter":{"title":"微信小程序之自定义 table 表格布局","date":"2018-09-02T20:00:00.000Z","tag":["微信小程序"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/platform/applet/custom-table-layout.md","filePath":"posts/growth-record/platform/applet/custom-table-layout.md","lastUpdated":1713665060000}'),o={name:"posts/growth-record/platform/applet/custom-table-layout.md"},r=p('<h1 id="微信小程序之自定义-table-表格布局" tabindex="-1">微信小程序之自定义 table 表格布局 <a class="header-anchor" href="#微信小程序之自定义-table-表格布局" aria-label="Permalink to &quot;微信小程序之自定义 table 表格布局&quot;">​</a></h1><p>本文没有采用flex布局和grid布局来设置表格的，而是通过 <code>display: table;</code>来设置。一方面工作中经常用到这种自适应表格排版布局方式（包括方框列表及九宫格式），但是flex布局和grid布局来设置的话就很容易了，这次想通过另一种方法来实现，而且这种方法比较少用，所以想尝试一下，分享给大家。</p><p>如果对这个属性不熟的可以参考这篇文章，介绍的很详细：<a href="http://www.css88.com/archives/6308" target="_blank" rel="noreferrer">css Table布局-display:table</a></p><h3 id="一-实现效果" tabindex="-1">（一）实现效果 <a class="header-anchor" href="#一-实现效果" aria-label="Permalink to &quot;（一）实现效果&quot;">​</a></h3><p>1、第一种实现效果：</p>',5),d=n("p",null,[n("strong",null,"注意：这是截图才看得到左边或右边的边框的，真机环境是看不到的哈"),c(" 2、第二种实现效果：")],-1),b=p(`<h3 id="二-实现过程" tabindex="-1">（二）实现过程 <a class="header-anchor" href="#二-实现过程" aria-label="Permalink to &quot;（二）实现过程&quot;">​</a></h3><p>以第一种实现效果代码为准说明： CSS属性的情况：</p><blockquote><p>table：指定对象作为块元素级的表格。类同于html标签<code>&lt;table&gt;</code>（CSS2）<br> inline-table：指定对象作为内联元素级的表格。类同于html标签<code>&lt;table&gt;</code>（CSS2）<br> table-caption：指定对象作为表格标题。类同于html标签<code>&lt;caption&gt;</code>（CSS2）<br> table-cell：指定对象作为表格单元格。类同于html标签<code>&lt;td&gt;</code>（CSS2）<br> table-row：指定对象作为表格行。类同于html标签<code>&lt;tr&gt;</code>（CSS2）<br> table-row-group：指定对象作为表格行组。类同于html标签<code>&lt;tbody&gt;</code>（CSS2）<br> table-column：指定对象作为表格列。类同于html标签<code>&lt;col&gt;</code>（CSS2）<br> table-column-group：指定对象作为表格列组显示。类同于html标签<br><code>&lt;colgroup&gt;</code>（CSS2）<br> table-header-group：指定对象作为表格标题组。类同于html标签<br><code>&lt;thead&gt;</code>（CSS2）<br> table-footer-group：指定对象作为表格脚注组。类同于html标签<code>&lt;tfoot&gt;</code>（CSS2）<br></p></blockquote><p>1、通过设置js里面的数组对象格式模拟动态后台获取的数据，然后将数组对象内容以三个元素为一组组成数组对象格式再合并成一个新的数组对象格式，之所以这样做就是为了，一行有三个单元格设计的:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Page({</span></span>
<span class="line"><span>  data: {</span></span>
<span class="line"><span>    tableData: [{ //模拟动态获取到的后台数据：数组对象格式</span></span>
<span class="line"><span>        id: 0,</span></span>
<span class="line"><span>        name: &#39;table-th-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 1,</span></span>
<span class="line"><span>        name: &#39;table-th-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 2,</span></span>
<span class="line"><span>        name: &#39;table-th-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 3,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 4,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 5,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 6,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 7,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        id: 8,</span></span>
<span class="line"><span>        name: &#39;table-tr-cell&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    threeArray: &#39;&#39;, //模拟将后台获取到的数组对象数据按照一行3个的单元数据的格式切割成新的数组对象（简单的说：比如获取到数组是9个元素，切分成，3个元素一组的子数组）</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  onLoad: function() {</span></span>
<span class="line"><span>    let that = this;</span></span>
<span class="line"><span>    let threeArray = [];</span></span>
<span class="line"><span>    // 使用for循环将原数据切分成新的数组</span></span>
<span class="line"><span>    for (let i = 0, len = that.data.tableData.length; i &lt; len; i += 3) {</span></span>
<span class="line"><span>      threeArray.push(that.data.tableData.slice(i, i + 3));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    console.log(threeArray);</span></span>
<span class="line"><span>    that.setData({</span></span>
<span class="line"><span>      threeArray: threeArray</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>2、设置wxml:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;view class=&quot;table&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;block wx:for=&#39;{{threeArray}}&#39; wx:key=&#39;*this&#39; wx:for-item=&#39;oneArray&#39;&gt;</span></span>
<span class="line"><span>&lt;!-- 注意嵌套的数组对象 --&gt;</span></span>
<span class="line"><span>    &lt;view class=&quot;table-tr&quot; wx:if=&#39;{{index&lt;1}}&#39;&gt;</span></span>
<span class="line"><span>      &lt;block wx:for=&#39;{{oneArray}}&#39; wx:key=&#39;id&#39;&gt;</span></span>
<span class="line"><span>        &lt;view class=&quot;table-th&quot;&gt;{{item.name}}&lt;/view&gt;</span></span>
<span class="line"><span>      &lt;/block&gt;</span></span>
<span class="line"><span>    &lt;/view&gt;</span></span>
<span class="line"><span>    &lt;view class=&quot;table-tr&quot; wx:else&gt;</span></span>
<span class="line"><span>      &lt;block wx:for=&#39;{{oneArray}}&#39; wx:key=&#39;id&#39;&gt;</span></span>
<span class="line"><span>        &lt;view class=&quot;table-td&quot;&gt;{{item.name}}&lt;/view&gt;</span></span>
<span class="line"><span>      &lt;/block&gt;</span></span>
<span class="line"><span>    &lt;/view&gt;</span></span>
<span class="line"><span>  &lt;/block&gt;</span></span>
<span class="line"><span>&lt;/view&gt;</span></span></code></pre></div><p>3、设置wxss:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.table {</span></span>
<span class="line"><span>  display: table;</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  /* border-collapse 属性设置表格的边框是否被合并为一个单一的边框，解决相邻单元格边框未合并导致有些边框变粗的视觉效果 */</span></span>
<span class="line"><span>  border-collapse: collapse;</span></span>
<span class="line"><span>  overflow-x: hidden;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.table-tr {</span></span>
<span class="line"><span>  display: table-row;</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  height: 200rpx;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.table-th {</span></span>
<span class="line"><span>  display: table-cell;</span></span>
<span class="line"><span>  font-weight: bold;</span></span>
<span class="line"><span>  border: 1px solid black;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>  background-color: #ccc;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.table-td {</span></span>
<span class="line"><span>  display: table-cell;</span></span>
<span class="line"><span>  border: 1px solid black;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  vertical-align: middle;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>总的来说，实现过程并不复杂，学会了可以使用很熟练的使用，这个方法实现表格布局还是挺有用的，在一些页面无缝接触的时候很常用。</p>`,10);function h(g,m,u,_,w,f){const a=i("CustomImage");return e(),t("div",null,[r,s(a,{src:"/growth-record/platform/applet/custom-table-layout-01.png"}),d,s(a,{src:"/growth-record/platform/applet/custom-table-layout-02.png"}),b])}const S=l(o,[["render",h]]);export{y as __pageData,S as default};
