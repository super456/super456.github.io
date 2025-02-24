import{_ as p,D as e,c as l,o as t,a6 as a,I as n}from"./chunks/framework.BOyJDVBP.js";const b=JSON.parse('{"title":"Vue-CLI2 中的 Vue-Router 和 Vue-resource 实战","description":"","frontmatter":{"title":"Vue-CLI2 中的 Vue-Router 和 Vue-resource 实战","date":"2018-07-09T20:04:01.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/router-resource.md","filePath":"posts/growth-record/frame/vue/router-resource.md","lastUpdated":1713675008000}'),o={name:"posts/growth-record/frame/vue/router-resource.md"},r=a('<h1 id="vue-cli2-中的-vue-router-和-vue-resource-实战" tabindex="-1">Vue-CLI2 中的 Vue-Router 和 Vue-Resource 实战 <a class="header-anchor" href="#vue-cli2-中的-vue-router-和-vue-resource-实战" aria-label="Permalink to &quot;Vue-CLI2 中的 Vue-Router 和 Vue-Resource 实战&quot;">​</a></h1><p><strong>简单记录一下这两个插件的使用方法，写了一个demo，方便理解及应用。</strong></p><h3 id="一-安装vue-cli2-x脚手架" tabindex="-1">（一）安装vue-cli2.x脚手架 <a class="header-anchor" href="#一-安装vue-cli2-x脚手架" aria-label="Permalink to &quot;（一）安装vue-cli2.x脚手架&quot;">​</a></h3><p>如果还没安装的，或安装过程不熟的，可以参考这篇文章教程，写的很详细——<a href="https://www.jianshu.com/p/1626b8643676/" target="_blank" rel="noreferrer">Vue2.0史上最全入坑教程（上）—— 搭建Vue脚手架（vue-cli）</a>，这个文章作者真的很用心，向他学习。</p><h3 id="二-安装vue-router和vue-resource插件" tabindex="-1">（二）安装vue-router和vue-resource插件 <a class="header-anchor" href="#二-安装vue-router和vue-resource插件" aria-label="Permalink to &quot;（二）安装vue-router和vue-resource插件&quot;">​</a></h3><p>如果在安装脚手架的时候安装了vue-router，可以直接跳转到安装vue-resource。 如果不是的，可以使用命令：<code>cd &lt;项目文件夹&gt;</code> 切换到项目文件夹路径下，然后使用命令行安装：<code>npm install vue-router --save</code> 和<code>npm install vue-resource --save</code></p><p>这里说明一下安装<code>npm install 插件 +[参数]</code>，表示的意思： 1.使用：<code>npm install 插件</code> ：会把这个插件安装到node_modules目录中，但不会修改package.json内容；</p><p>2.<code>npm install 插件 --save</code> ：在项目发布上线之后还会依赖用到的插件，没有这个插件，项目不能正常的运行，自动更改package.json内容 ；</p><p>3.<code>npm install 插件 --save-dev </code>：把插件安装到开发依赖中，项目上线之后不会用到的插件，针对个别插件，比如说这个“babel-loader”，是在项目编译解析完成后发布就没用到了的，自动更改package.json内容；</p><h3 id="三-使用vue-router-vue-resource写一个跳转请求页面数据的demo" tabindex="-1">（三）使用vue-router+vue-resource写一个跳转请求页面数据的demo <a class="header-anchor" href="#三-使用vue-router-vue-resource写一个跳转请求页面数据的demo" aria-label="Permalink to &quot;（三）使用vue-router+vue-resource写一个跳转请求页面数据的demo&quot;">​</a></h3><p>1.先看一下安装脚手架的时候安装的路由界面及配置：</p>',11),i=a(`<p>2.如果一开始没有的安装vue-router后自己手动安装的，可以参考这个main.js 和router文件夹的index.js配置的配置代码如下： main.js代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;</span></span>
<span class="line"><span>import App from &#39;./App&#39;</span></span>
<span class="line"><span>import router from &#39;./router&#39;//引入路由指定文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.config.productionTip = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* eslint-disable no-new */</span></span>
<span class="line"><span>new Vue({</span></span>
<span class="line"><span>  el: &#39;#app&#39;,</span></span>
<span class="line"><span>  router,//实例化，表示会使用</span></span>
<span class="line"><span>  render: h =&gt; h(App)//vue2.0写法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //以下是vue1.0的写法</span></span>
<span class="line"><span>  //components: { App },//注册组件信息</span></span>
<span class="line"><span> // template: &#39;&lt;App/&gt;&#39;//简写的模板调用组件的标签</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>如果对代码中的<code>render: h =&gt; h(App)//vue2.0写法</code> 不理解的可以查看我之前写的文章——<a href="https://blog.csdn.net/qq_35324453/article/details/80961128" target="_blank" rel="noreferrer">vue-cli2.x中的render: h =&gt; h(App)解析</a></p><p>router文件夹的index.js代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;</span></span>
<span class="line"><span>import Router from &#39;vue-router&#39;//引入路由配置的模块</span></span>
<span class="line"><span>import HelloWorld from &#39;@/components/HelloWorld&#39;//引入需要路由转址的路径</span></span>
<span class="line"><span>import Home from &#39;@/components/Home&#39;//引入需要路由转址的路径</span></span>
<span class="line"><span>import VueResource from &#39;vue-resource&#39;//引入vue-resource插件http请求</span></span>
<span class="line"><span>//下面这种方法引用也可以</span></span>
<span class="line"><span>// import HelloWorld from &#39;../components/HelloWorld&#39;//引入需要路由转址的路径</span></span>
<span class="line"><span>// import Home from &#39;../components/Home&#39;//引入需要路由转址的路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(Router)//声明引用，全局使用</span></span>
<span class="line"><span>Vue.use(VueResource)//声明引用，全局使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default new Router({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 注意当有多个路由的时候默认使用第一个路由地址</span></span>
<span class="line"><span>  routes: [//注意routers是一个对象数组</span></span>
<span class="line"><span>    {//需要跳转的组件需要import引进</span></span>
<span class="line"><span>      path: &#39;/&#39;,//路由的地址，此时表示根路径</span></span>
<span class="line"><span>      name: &#39;HelloWorld&#39;,</span></span>
<span class="line"><span>      component: HelloWorld</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {//需要跳转的组件需要import引进</span></span>
<span class="line"><span>      //路由的地址，此时表示根路径。注意第二个路由地址这里需要添加上组件名</span></span>
<span class="line"><span>      path: &#39;/Home&#39;,</span></span>
<span class="line"><span>      name: &#39;Home&#39;,</span></span>
<span class="line"><span>      component: Home</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  mode:&quot;history&quot;//去掉url链接中的#符号</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>3.添加一个组件Home.vue，添加位置如下：</p>`,6),c=a(`<p>组件代码为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;hello&quot;&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;{{ msg }}&lt;/h1&gt;</span></span>
<span class="line"><span>    test</span></span>
<span class="line"><span>    &lt;p&gt;以下是获取http请求的数据内容&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>        &lt;li v-for=&quot;user in users&quot;&gt;{{user.id}}. {{user.name}}&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;home&#39;,</span></span>
<span class="line"><span>  data () {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      users:[],</span></span>
<span class="line"><span>      msg: &#39;hello Home&#39;</span></span>
<span class="line"><span>    //   使用网络接口</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  created(){</span></span>
<span class="line"><span>    //   http请求,请求成功调用.then()函数，并将数据传给data</span></span>
<span class="line"><span>      this.$http.get(&quot;http://jsonplaceholder.typicode.com/users&quot;).then((data)=&gt;{</span></span>
<span class="line"><span>        //   console.log(data);//请求成功的数据</span></span>
<span class="line"><span>        this.users=data.body;//将data数据的的body内容复制给定义的users数据</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- Add &quot;scoped&quot; attribute to limit CSS to this component only --&gt;</span></span>
<span class="line"><span>&lt;style scoped&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><p>4.需要在根组件App.vue下添加一下引入组件的内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;img src=&quot;./assets/logo.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;!--注意a标签会重新加载页面，相当于刷新页面--&gt;</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>      &lt;p&gt;--注意a标签会重新加载页面，相当于刷新页面--&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;li&gt;&lt;a href=&quot;/&quot;&gt;HelloWorld&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;li&gt;&lt;a href=&quot;/Home&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;p&gt;此处使用router-link，不会刷新页面，相当于局部刷新&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;li&gt;&lt;router-link to=&quot;/&quot;&gt;HelloWorld&lt;/router-link&gt;&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;li&gt;&lt;router-link to=&quot;/Home&quot;&gt;Home页面&lt;/router-link&gt;&lt;/li&gt;</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>    &lt;router-view/&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;App&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>#app {</span></span>
<span class="line"><span>  font-family: &#39;Avenir&#39;, Helvetica, Arial, sans-serif;</span></span>
<span class="line"><span>  -webkit-font-smoothing: antialiased;</span></span>
<span class="line"><span>  -moz-osx-font-smoothing: grayscale;</span></span>
<span class="line"><span>  text-align: center;</span></span>
<span class="line"><span>  color: #2c3e50;</span></span>
<span class="line"><span>  margin-top: 60px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><h3 id="四-运行结果" tabindex="-1">（四）运行结果 <a class="header-anchor" href="#四-运行结果" aria-label="Permalink to &quot;（四）运行结果&quot;">​</a></h3>`,5);function u(d,g,m,h,v,_){const s=e("CustomImage");return t(),l("div",{"data-pagefind-body":!0},[r,n(s,{src:"/growth-record/frame/vue/router-01.png"}),i,n(s,{src:"/growth-record/frame/vue/router-02.png"}),c,n(s,{src:"/growth-record/frame/vue/router-03.gif"})])}const q=p(o,[["render",u]]);export{b as __pageData,q as default};
