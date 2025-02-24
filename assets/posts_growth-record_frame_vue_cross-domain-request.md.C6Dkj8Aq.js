import{_ as p,D as e,c as l,o as t,a6 as n,I as a}from"./chunks/framework.BOyJDVBP.js";const b=JSON.parse('{"title":"Vue-CLI2 跨域请求 Demo（fetch、axios、proxyTable）","description":"","frontmatter":{"title":"Vue-CLI2 跨域请求 Demo（fetch、axios、proxyTable）","date":"2018-07-09T20:02:01.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/cross-domain-request.md","filePath":"posts/growth-record/frame/vue/cross-domain-request.md","lastUpdated":1713671501000}'),i={name:"posts/growth-record/frame/vue/cross-domain-request.md"},o=n('<h1 id="vue-cli2-跨域请求-demo-fetch、axios、proxytable" tabindex="-1">Vue-CLI2 跨域请求 Demo（fetch、axios、proxyTable） <a class="header-anchor" href="#vue-cli2-跨域请求-demo-fetch、axios、proxytable" aria-label="Permalink to &quot;Vue-CLI2 跨域请求 Demo（fetch、axios、proxyTable）&quot;">​</a></h1><p><strong>学习中需要应用到跨域请求的问题，找了资料，也自己写了一个简单的demo，应用到fetch方法或axios方法，前提都需要配置proxyTable，特别感谢：Web前端网站教程-米斯特吴老师提供的案例和请求接口。</strong></p><h3 id="一-安装vue-cli2-x脚手架" tabindex="-1">（一）安装vue-cli2.x脚手架 <a class="header-anchor" href="#一-安装vue-cli2-x脚手架" aria-label="Permalink to &quot;（一）安装vue-cli2.x脚手架&quot;">​</a></h3><p>如果还没安装的，或安装过程不熟的，可以参考这篇文章教程，写的很详细——<a href="https://www.jianshu.com/p/1626b8643676/" target="_blank" rel="noreferrer">Vue2.0史上最全入坑教程（上）—— 搭建Vue脚手架（vue-cli）</a></p><h3 id="二-配置proxytable跨域请求" tabindex="-1">（二）配置proxyTable跨域请求 <a class="header-anchor" href="#二-配置proxytable跨域请求" aria-label="Permalink to &quot;（二）配置proxyTable跨域请求&quot;">​</a></h3><p>1.找到config文件夹下的index.js文件打开，找到proxyTable配置项：</p>',6),c=n(`<p>2.配置代码参考如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    //配置跨域请求,注意配置完之后需要重启编译该项目</span></span>
<span class="line"><span>    proxyTable: {</span></span>
<span class="line"><span>      //请求名字变量可以自己定义</span></span>
<span class="line"><span>      &#39;/apis&#39;: {</span></span>
<span class="line"><span>        target: &#39;http://www.thenewstep.cn&#39;, // 请求的接口域名或IP地址，开头是http或https</span></span>
<span class="line"><span>        // secure: false,</span><span>  // 如果是https接口，需要配置这个参数</span></span>
<span class="line"><span>        changeOrigin: true, // 是否跨域，如果接口跨域，需要进行这个参数配置</span></span>
<span class="line"><span>        pathRewrite: {</span></span>
<span class="line"><span>          &#39;^/apis&#39;: &#39;&#39;//表示需要rewrite重写路径</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span></code></pre></div><p>**注意：**可能你的接口地址原本是 <code>http://www.thenewstep.cn/test/test.html</code>，但是为了匹配代理地址，需要在前面加一个 <code>/apis</code>（自己定义的请求接口变量名）, 因此接口地址需要写成这样的即可生效 <code>/apis/test/test.html</code>。</p><h3 id="三-使用fetch实现跨域请求" tabindex="-1">（三）使用fetch实现跨域请求 <a class="header-anchor" href="#三-使用fetch实现跨域请求" aria-label="Permalink to &quot;（三）使用fetch实现跨域请求&quot;">​</a></h3><p>1.在App.vue中添加以下代码即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;img src=&quot;./assets/logo.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;HelloWorld/&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import HelloWorld from &#39;./components/HelloWorld&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;App&#39;,</span></span>
<span class="line"><span>  components: {</span></span>
<span class="line"><span>    HelloWorld</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  created(){</span></span>
<span class="line"><span>    // fetch方法，注意apis对应config/index.js中的proxyTable设置的请求名字变量</span></span>
<span class="line"><span>    fetch(&quot;/apis/test/testToken.php&quot;,{</span></span>
<span class="line"><span>      method:&quot;post&quot;,//设置请求类型</span></span>
<span class="line"><span>      headers:{</span></span>
<span class="line"><span>        &quot;Content-type&quot;:&quot;application/json&quot;,</span></span>
<span class="line"><span>        token:&quot;f4c902c9ae5a2a9d8f84868ad064e706&quot;//请求验证，根据请求方接口需要的</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      body:JSON.stringify({username:&quot;test&quot;,password:&quot;test&quot;}),//设置发送请求的内容</span></span>
<span class="line"><span>    }).then(result=&gt;{</span></span>
<span class="line"><span>      // console.log(result);</span></span>
<span class="line"><span>      //使用json解析请求成功的body内容</span></span>
<span class="line"><span>      return result.json();</span></span>
<span class="line"><span>    }).then(data=&gt;{</span></span>
<span class="line"><span>      console.log(data);//查看打印出请求成功的内容</span></span>
<span class="line"><span>      if(data.success==1){</span></span>
<span class="line"><span>        console.log(data.msg);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
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
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><p>2.运行结果</p>`,7),r=n(`<h3 id="四-使用axios方法跨域请求" tabindex="-1">（四）使用axios方法跨域请求 <a class="header-anchor" href="#四-使用axios方法跨域请求" aria-label="Permalink to &quot;（四）使用axios方法跨域请求&quot;">​</a></h3><p>1.安装axios：<code>npm install axios</code>； 2.在main.js文件引入axios模块并全局使用；</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;</span></span>
<span class="line"><span>import App from &#39;./App&#39;</span></span>
<span class="line"><span>import axios from &#39;axios&#39;//引入axios模块文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.config.productionTip = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.prototype.$axios=axios;//设置全局引用</span></span>
<span class="line"><span>//配置请求的设置</span></span>
<span class="line"><span>axios.defaults.headers.post[&#39;Content-type&#39;]=&quot;application/json&quot;;</span></span>
<span class="line"><span>axios.defaults.headers.common[&#39;token&#39;]=&quot;f4c902c9ae5a2a9d8f84868ad064e706&quot;;//配置参数，请求验证，根据请求方接口需要的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* eslint-disable no-new */</span></span>
<span class="line"><span>new Vue({</span></span>
<span class="line"><span>  el: &#39;#app&#39;,</span></span>
<span class="line"><span>  render: h =&gt; h(App)</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>3.修改App.vue组件代码为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;img src=&quot;./assets/logo.png&quot;&gt;</span></span>
<span class="line"><span>    &lt;HelloWorld/&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import HelloWorld from &#39;./components/HelloWorld&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>    name: &#39;App&#39;,</span></span>
<span class="line"><span>    components: {</span></span>
<span class="line"><span>        HelloWorld</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    created() {</span></span>
<span class="line"><span>        //axios方法</span></span>
<span class="line"><span>        this.$axios.post(&quot;/apis/test/testToken.php&quot;, {</span></span>
<span class="line"><span>            username: &quot;test&quot;,</span></span>
<span class="line"><span>            password: &quot;test&quot;</span></span>
<span class="line"><span>        }).then(result =&gt; {</span></span>
<span class="line"><span>            // return JSON.parse(JSON.stringify(result));</span></span>
<span class="line"><span>            return JSON.stringify(result.data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // console.log(data);</span></span>
<span class="line"><span>        }).then(data =&gt; {</span></span>
<span class="line"><span>            console.log(data);</span></span>
<span class="line"><span>            console.log(&quot;注意此刻的data是一个：&quot; + typeof data);</span></span>
<span class="line"><span>            data = JSON.parse(data);</span></span>
<span class="line"><span>            if (data.success == 1) {</span></span>
<span class="line"><span>                console.log(data.msg);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>#app {</span></span>
<span class="line"><span>    font-family: &#39;Avenir&#39;, Helvetica, Arial, sans-serif;</span></span>
<span class="line"><span>    -webkit-font-smoothing: antialiased;</span></span>
<span class="line"><span>    -moz-osx-font-smoothing: grayscale;</span></span>
<span class="line"><span>    text-align: center;</span></span>
<span class="line"><span>    color: #2c3e50;</span></span>
<span class="line"><span>    margin-top: 60px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><p>4.运行结果：</p>`,6);function d(u,h,g,m,f,x){const s=e("CustomImage");return t(),l("div",{"data-pagefind-body":!0},[o,a(s,{src:"/growth-record/frame/vue/cross-01.png"}),c,a(s,{src:"/growth-record/frame/vue/cross-02.png"}),r,a(s,{src:"/growth-record/frame/vue/cross-03.png"})])}const q=p(i,[["render",d]]);export{b as __pageData,q as default};
