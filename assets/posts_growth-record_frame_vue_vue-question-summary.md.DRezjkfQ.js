import{j as o,b as l,c as r,L as s,aa as n,s as e,f as a,G as i}from"./chunks/framework.BdPFiiJb.js";const w=JSON.parse('{"title":"Vue 开发问题总结","description":"","frontmatter":{"title":"Vue 开发问题总结","date":"2020-03-22T20:00:00.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/vue-question-summary.md","filePath":"posts/growth-record/frame/vue/vue-question-summary.md","lastUpdated":1713675008000}'),p={name:"posts/growth-record/frame/vue/vue-question-summary.md"},u=n('<h1 id="vue-开发问题总结" tabindex="-1">Vue 开发问题总结 <a class="header-anchor" href="#vue-开发问题总结" aria-label="Permalink to &quot;Vue 开发问题总结&quot;">​</a></h1><h2 id="自定义指令-removechild-报错" tabindex="-1">自定义指令 removeChild 报错 <a class="header-anchor" href="#自定义指令-removechild-报错" aria-label="Permalink to &quot;自定义指令 removeChild 报错&quot;">​</a></h2><h3 id="一-发现" tabindex="-1">（一）发现 <a class="header-anchor" href="#一-发现" aria-label="Permalink to &quot;（一）发现&quot;">​</a></h3><p>2018-12-08 20:40，收到反馈机构平台发现部分权限失控，前端平台报错如下：</p>',4),c=n('<p>上图中，代付下发规则为运营才有的敏感操作，但它出现在了一个不该出现的位置</p><h3 id="二-定位" tabindex="-1">（二）定位 <a class="header-anchor" href="#二-定位" aria-label="Permalink to &quot;（二）定位&quot;">​</a></h3><h4 id="_1-从代码层" tabindex="-1">1. 从代码层 <a class="header-anchor" href="#_1-从代码层" aria-label="Permalink to &quot;1. 从代码层&quot;">​</a></h4><p>从控制台返回的信息中，我们得知是 <code>removeChild</code> 报错，那先从它开始寻找 从MDN <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild" target="_blank" rel="noreferrer">removeChild</a> 了解到，从 DOM1 中就存在的方法，应当不存在兼容性的问题，那么回归代码，开始寻找调用 者</p>',4),d=e("p",null,[a("从上图见得，调用它的是 "),e("code",null,"el.parentNode"),a("，通过 "),e("code",null,"alert"),a("，发现 "),e("code",null,"el.parentNode"),a(" 为 "),e("code",null,"null，parentNode"),a(" 为什么会为 "),e("code",null,"null？"),a(" MDN 给出了以下答案")],-1),h=e("p",null,[a("这个问题有点类似 **_ref的注册时间问题， _**解决这个问题需要关心的就是 "),e("strong",null,"生命周期")],-1),_=e("p",null,"回到我们本身的问题，注册指令时，官方也提供了几个生命周期",-1),m=n('<p>问题已经很明朗了，<code>bind </code>并没有明确说明是否保证父节点存在，但在 <code>inserted</code> 时能保证父节点存在 按照找不到父节点的报错，所以需要一个稳定能获取父节点的生命周期来运行逻辑</p><h4 id="_2-从环境" tabindex="-1">2. 从环境 <a class="header-anchor" href="#_2-从环境" aria-label="Permalink to &quot;2. 从环境&quot;">​</a></h4><p>首先该处代码已经历史悠久，API 接口是古老版本，且代码仓库记录已经许久未更改，那问题原因直观体现在打包构建的环境发生了变化。 依据发布脚本依据原则，存在隐患：项目每次构建会将整个代码仓库删除包括所有依赖，而项目拉取依赖未进行依赖包锁定。</p><h3 id="三-修复" tabindex="-1">（三）修复 <a class="header-anchor" href="#三-修复" aria-label="Permalink to &quot;（三）修复&quot;">​</a></h3><h4 id="_1-环境" tabindex="-1">1. 环境 <a class="header-anchor" href="#_1-环境" aria-label="Permalink to &quot;1. 环境&quot;">​</a></h4><p>立即备份一份打包机环境中项目的依赖，同时从本地备份的依赖打包压缩 scp 至打包机工程目录中，修改发布脚本发布恢复。</p><h4 id="_2-代码层" tabindex="-1">2. 代码层 <a class="header-anchor" href="#_2-代码层" aria-label="Permalink to &quot;2. 代码层&quot;">​</a></h4><p>按照文档，进行了如下修改</p><p><code>bind =&gt; inserted</code></p>',9),v=n('<p>经过测试，不再报错，22：10 发布上线，历时 1 小时 10 分</p><h3 id="四-思考" tabindex="-1">（四）思考 <a class="header-anchor" href="#四-思考" aria-label="Permalink to &quot;（四）思考&quot;">​</a></h3><ol><li>在被打包后的代码中定位问题时，有什么更好的方式可以替代 <strong>alert</strong>；</li><li>错误的发现 =&gt; 解决的时间是否过长，如何更好的面对线上问题；</li><li>权限的设计是否存在问题，目前的模式为没有权限 =&gt; 摧毁，采用有权限 =&gt; 生成是否会更加安全？</li><li>前端自身的告警系统很有必要；</li></ol><h2 id="编译报错问题-you-are-using-the-runtime-only-build-of-vue-where-the-template-compiler-is-not-available" tabindex="-1">编译报错问题：You are using the runtime-only build of Vue where the template compiler is not available <a class="header-anchor" href="#编译报错问题-you-are-using-the-runtime-only-build-of-vue-where-the-template-compiler-is-not-available" aria-label="Permalink to &quot;编译报错问题：You are using the runtime-only build of Vue where the template compiler is not available&quot;">​</a></h2><p>相信很多初学者使用vue-cli2.x初始化脚手架项目的时候或者webpack配置的时候会遇到这个问题：</p>',5),g=n(`<p>一开始初始化项目配置的时候，有两个运行环境配置的版本：Compiler版本、Runtime版本。</p><p>简单说一下这两个版本的区别：</p><ol><li><p>当对template模板内容编译是需要对字符串进行模板渲染或者可以绑定的html对象作为模板进行渲染的方式，就需要使用Compiler版本。示例如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> new Vue({</span></span>
<span class="line"><span>     el:&#39;#vue-app&#39;,</span></span>
<span class="line"><span>     template:&#39;&lt;div&gt;&lt;h1&gt;{{test}}&lt;/h1&gt;&lt;/div&gt;&#39;,</span></span>
<span class="line"><span>     data:{</span></span>
<span class="line"><span>     test:&#39;hello&#39;</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span> });</span></span></code></pre></div></li><li><p>如果使用vue-loader加载.vue文件时（组件文件），webpack在打包对模板进行了渲染，就需要Runtime版本。示例如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>new Vue({</span></span>
<span class="line"><span>  el: &#39;#app&#39;,</span></span>
<span class="line"><span>  components: { App },</span></span>
<span class="line"><span>  template: &#39;&lt;App/&gt;&#39;</span></span>
<span class="line"><span>})</span></span></code></pre></div></li></ol><p>从Compiler版本修改为Runtime版本。只需如示代码：</p>`,4),b=e("p",null,[a("添加一行代码："),e("code",null,"'vue$': 'vue/dist/vue.esm.js'"),a(" ，然后重新运行编译就可以了")],-1);function f(q,T,C,P,V,k){const t=i("CustomImage");return l(),r("div",null,[u,s(t,{src:"/growth-record/frame/vue/vue-question-01.png"}),c,s(t,{src:"/growth-record/frame/vue/vue-question-02.png"}),d,s(t,{src:"/growth-record/frame/vue/vue-question-03.png"}),h,_,s(t,{src:"/growth-record/frame/vue/vue-question-04.png"}),m,s(t,{src:"/growth-record/frame/vue/vue-question-05.png"}),v,s(t,{src:"/growth-record/frame/vue/vue-question-06.png"}),g,s(t,{src:"/growth-record/frame/vue/vue-question-07.png"}),b])}const S=o(p,[["render",f]]);export{w as __pageData,S as default};