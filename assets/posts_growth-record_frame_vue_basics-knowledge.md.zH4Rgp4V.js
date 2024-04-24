import{j as p,b as e,c as t,L as l,s,f as a,aa as i,G as o}from"./chunks/framework.D8w0pJIA.js";const w=JSON.parse('{"title":"Vue2 基础知识易错点","description":"","frontmatter":{"title":"Vue2 基础知识易错点","date":"2018-07-14T20:01:01.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/basics-knowledge.md","filePath":"posts/growth-record/frame/vue/basics-knowledge.md","lastUpdated":1713671501000}'),c={name:"posts/growth-record/frame/vue/basics-knowledge.md"},d=s("h1",{id:"vue2-基础知识易错点",tabindex:"-1"},[a("Vue2 基础知识易错点 "),s("a",{class:"header-anchor",href:"#vue2-基础知识易错点","aria-label":'Permalink to "Vue2 基础知识易错点"'},"​")],-1),r=s("p",null,[s("strong",null,[a("学完vue2.0，在写代码啦官网的"),s("a",{href:"https://xiedaimala.com/courses/0d531a6f-40a7-4120-a8f6-9e816ff9d51c#/common",target:"_blank",rel:"noreferrer"},"方方老师的《Vue 自测题》"),a("测试了一下，惨不忍睹，记录一下测试中的容易错误知识点及坑。")])],-1),u=i(`<h3 id="一-安装与介绍" tabindex="-1">（一）安装与介绍 <a class="header-anchor" href="#一-安装与介绍" aria-label="Permalink to &quot;（一）安装与介绍&quot;">​</a></h3><ol><li><p>v-bind绑定之问题 html部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>   &lt;span ____________???____________&gt;</span></span>
<span class="line"><span>     鼠标悬停几秒钟查看此处动态绑定的提示信息！</span></span>
<span class="line"><span>   &lt;/span&gt;</span></span>
<span class="line"><span> &lt;/div&gt;</span></span></code></pre></div><p>js部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var app = new Vue({</span></span></code></pre></div></li></ol><p>el: &#39;#app&#39;, data: { message: &#39;Hello Vue!&#39; } })</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>问号处应该填入什么，才能使得 span 的 title 为 message 的值？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>答案是：</span></span>
<span class="line"><span>(1).\`:title=&quot;message&quot;\`；</span></span>
<span class="line"><span>(2).\`v-bind:title=&quot;message&quot;\`；</span></span>
<span class="line"><span>(3).\` :title=message\`；</span></span>
<span class="line"><span>(4).\`v-bind:title=message\`；</span></span>
<span class="line"><span>后两种方法很迷，没找到解释，知道的小伙伴欢迎留言，建议答案都自己亲测试一下。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 关于不同版本的都是正确的说法：</span></span>
<span class="line"><span>（1）如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版；</span></span>
<span class="line"><span>（2）当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可；</span></span>
<span class="line"><span>（3）运行时版本相比完整版体积要小约 30%；</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### （二）实例与模板</span></span>
<span class="line"><span>1. \`var vm = new Vue(options)\`其中 options 是一个对象，请问文档中说 options 可以包含哪些 key ？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>答案是：</span></span>
<span class="line"><span>（1） data props propsData computed methods watch</span></span>
<span class="line"><span>（2）el template render renderError</span></span>
<span class="line"><span>（3）beforeCreate created beforeMount mounted beforeUpdate updated activated deactivated beforeDestroy destroyed errorCaptured</span></span>
<span class="line"><span>（4）directives filters components parent mixins extends provide inject</span></span>
<span class="line"><span>（5）name delimiters functional model inheritAttrs comments</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. data数据问题</span></span>
<span class="line"><span>    html</span></span>
<span class="line"><span> \`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span> &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>     &lt;span class=span-a&gt;</span></span>
<span class="line"><span>       {{obj.a}}</span></span>
<span class="line"><span>     &lt;/span&gt;</span></span>
<span class="line"><span>     &lt;span class=span-b&gt;</span></span>
<span class="line"><span>       {{obj.b}}</span></span>
<span class="line"><span>     &lt;/span&gt;</span></span>
<span class="line"><span>   &lt;/div&gt;</span></span>
<span class="line"><span> \`\`\`</span></span>
<span class="line"><span>    js</span></span>
<span class="line"><span> \`\`\`</span></span>
<span class="line"><span> var app = new Vue({</span></span>
<span class="line"><span>   el: &#39;#app&#39;,</span></span>
<span class="line"><span>   data: {</span></span>
<span class="line"><span>     obj: {</span></span>
<span class="line"><span>       a: &#39;a&#39;,</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span> })</span></span>
<span class="line"><span> app.obj.a = &#39;a2&#39;</span></span>
<span class="line"><span> app.obj.b = &#39;b&#39;</span></span>
<span class="line"><span> \`\`\`</span></span>
<span class="line"><span>    请问最终 span-a 和 span-b 中分别展示什么字符串？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    答案是：\` span-a 中显示a2，span-b 中显示b\`，注意不是显示undefined。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 文档中建议 Vue 实例的生命周期钩子不要写成箭头函数，给出的理由是什么</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    答：</span></span>
<span class="line"><span>    （1）箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例；</span></span>
<span class="line"><span>  （2）经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### （三）计算属性和侦听器</span></span>
<span class="line"><span>1. 如果 data属性是对象 obj.count，那么要如何写代码才能监听 obj.count 的变化？</span></span></code></pre></div><p>var app = new Vue({ el: &#39;#app&#39;, data: { obj:{count: 1}, modified: 0 }, watch:{ <em><strong><strong><strong>???</strong></strong></strong></em>_ this.modified += 1 } } })</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>答案是：\` &#39;obj.count&#39;:function(){\`可以监听指定的对象属性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 如果data中的对象 obj 有 N 个属性，要怎么才能监听所有属性呢？</span></span></code></pre></div><p>var app = new Vue({ el: &#39;#app&#39;, data: { modified: 0, obj: {a:1,b:2,c:3} }, created(){ this.$watch(&#39;obj&#39;, ()=&gt;{ this.modified += 1 }, __<em><strong><strong><strong><strong>????</strong></strong></strong></strong></em>) } })</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>答案是：</span></span></code></pre></div><p>watch(){ obj:{ handler(oldval,newval){ console.log() }, deep:true } }</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>如果想监听obj对象中的b属性变化时才执行handler函数，可以使用计算属性computed做中间层，如：</span></span></code></pre></div><pre><code>   var app = new Vue({
  el: &#39;#app&#39;,
  data: {
    modified: 0,
    obj: {a:1,b:2,c:3}
  },
  created(){
      this.$watch(&#39;obj&#39;, ()=&gt;{
        this.modified += 1
      },
      computed: {
　　b() {
　　　　return this.obj.b
　　}
},
	watch(){
      b(oldval,newval){
      console.log()
		}
	}

})
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span></code></pre></div>`,12);function g(h,b,m,v,_,f){const n=o("CustomImage");return e(),t("div",null,[d,r,l(n,{src:"/growth-record/frame/vue/basic-01.png"}),u])}const y=p(c,[["render",g]]);export{w as __pageData,y as default};
