import{_ as a,D as n,c as s,o as p,a6 as t,I as r}from"./chunks/framework.BOyJDVBP.js";const f=JSON.parse('{"title":"Vue-CLI2 中的 render: h => h(App) 解析","description":"","frontmatter":{"title":"Vue-CLI2 中的 render: h => h(App) 解析","date":"2018-07-08T20:08:08.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/render-app.md","filePath":"posts/growth-record/frame/vue/render-app.md","lastUpdated":1713675008000}'),l={name:"posts/growth-record/frame/vue/render-app.md"},c=t(`<h1 id="vue-cli2-中的-render-h-h-app-解析" tabindex="-1">Vue-CLI2 中的 render: h =&gt; h(App) 解析 <a class="header-anchor" href="#vue-cli2-中的-render-h-h-app-解析" aria-label="Permalink to &quot;Vue-CLI2 中的 render: h =&gt; h(App) 解析&quot;">​</a></h1><p><strong>对于这个，可能es6语法不熟的人很容易产生懵懂，因为我也不熟，所以记录一下，毕竟这也是个重要的知识点。</strong></p><h3 id="一-遇到的问题代码" tabindex="-1">（一）遇到的问题代码： <a class="header-anchor" href="#一-遇到的问题代码" aria-label="Permalink to &quot;（一）遇到的问题代码：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>new Vue({</span></span>
<span class="line"><span>  el: &#39;#app&#39;,</span></span>
<span class="line"><span>  router,//实例化，表示会使用</span></span>
<span class="line"><span>  render: h =&gt; h(App)//vue2.0写法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //以下是vue1.0的写法</span></span>
<span class="line"><span>  //components: { App },//注册组件信息</span></span>
<span class="line"><span> // template: &#39;&lt;App/&gt;&#39;//简写的模板调用组件的标签</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>官方的解释很全面但是不是很容易理解：<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5-data-%E5%AF%B9%E8%B1%A1" target="_blank" rel="noreferrer">createElement 参数</a></p><h3 id="二-代码分解" tabindex="-1">（二）代码分解 <a class="header-anchor" href="#二-代码分解" aria-label="Permalink to &quot;（二）代码分解&quot;">​</a></h3><p>将<code>render: h =&gt; h(App)</code> 根据es6语法分解为：</p><h1 id="render-h-h-app" tabindex="-1"><code>render: h =&gt; h(App);</code> <a class="header-anchor" href="#render-h-h-app" aria-label="Permalink to &quot;\`render: h =&gt; h(App);\`&quot;">​</a></h1><p>等价于</p><h1 id="render-h-return-h-app" tabindex="-1"><code>render: h =&gt; {return h(App);}</code> <a class="header-anchor" href="#render-h-return-h-app" aria-label="Permalink to &quot;\`render: h =&gt; {return h(App);}\`&quot;">​</a></h1><p>等价于</p><h1 id="render-function-h-return-h-app" tabindex="-1"><code> render: function(h) { return h(App);}</code> <a class="header-anchor" href="#render-function-h-return-h-app" aria-label="Permalink to &quot;\` render: function(h) { return h(App);}\`&quot;">​</a></h1><h1 id="等价于-render-function-createelement-return-createelement-app" tabindex="-1">等价于 <code> render: function(createElement) { return createElement(App); }</code> <a class="header-anchor" href="#等价于-render-function-createelement-return-createelement-app" aria-label="Permalink to &quot;等价于
\` render: function(createElement) { return createElement(App);  }\`&quot;">​</a></h1><h3 id="三-解析一下这个vue2-0渲染过程" tabindex="-1">（三）解析一下这个vue2.0渲染过程： <a class="header-anchor" href="#三-解析一下这个vue2-0渲染过程" aria-label="Permalink to &quot;（三）解析一下这个vue2.0渲染过程：&quot;">​</a></h3><p>render函数用来渲染视图，也提供给<code>el</code>挂载，所以使用render函数就是为了页面显示出来。</p><p>1.render 方法是一个函数，在接受传入的参数 h 函数后，返回 <code>h(App)</code> 的函数调用结果。</p><p>2.在创建 vue 实例时，通过调用 render 方法来渲染实例页面的 DOM 结构。</p><p>3.当vue 在调用 render 方法时，会传入一个 createElement 函数作为参数，h 的实参是 createElement 函数，然后 createElement 会以 <code>App</code>为参数进行调用。</p><h3 id="四-写一个createelement函数的demo" tabindex="-1">（四）写一个createElement函数的demo <a class="header-anchor" href="#四-写一个createelement函数的demo" aria-label="Permalink to &quot;（四）写一个createElement函数的demo&quot;">​</a></h3><p>创建一个组件，使用createElement函数调用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;createElement方法应用&lt;/title&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/vue/dist/vue.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;p&gt;下面会使用createElement方法创建DOM结点&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;vue-app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>        var app=Vue.component(&#39;app&#39;,{</span></span>
<span class="line"><span>            template:&#39;&lt;h1&gt;test&lt;/h1&gt;&#39;</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>        new Vue({</span></span>
<span class="line"><span>            el: &#39;#vue-app&#39;,</span></span>
<span class="line"><span>            render: function (createElement) {</span></span>
<span class="line"><span>                // return createElement(&#39;h1&#39;, &#39;一则头条&#39;);//这个方式也可以</span></span>
<span class="line"><span>                return createElement(app);//使用调用组件</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>运行结果是：</p>`,22);function o(i,d,h,u,m,g){const e=n("CustomImage");return p(),s("div",{"data-pagefind-body":!0},[c,r(e,{src:"/growth-record/frame/vue/render-app.png"})])}const b=a(l,[["render",o]]);export{f as __pageData,b as default};
