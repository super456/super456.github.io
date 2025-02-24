import{_ as i,D as s,c as n,o as l,a6 as o,I as t,j as e}from"./chunks/framework.BOyJDVBP.js";const C=JSON.parse('{"title":"uni-app 项⽬开发问题及解决⽅案记录","description":"","frontmatter":{"title":"uni-app 项⽬开发问题及解决⽅案记录","date":"2023-07-08T20:07:08.000Z","tag":["uni-app"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/platform/uni/uni-app-question.md","filePath":"posts/growth-record/platform/uni/uni-app-question.md","lastUpdated":1715218422000}'),p={name:"posts/growth-record/platform/uni/uni-app-question.md"},r=o('<h1 id="uni-app-项目开发问题及解决方案记录" tabindex="-1">uni-app 项⽬开发问题及解决⽅案记录 <a class="header-anchor" href="#uni-app-项目开发问题及解决方案记录" aria-label="Permalink to &quot;uni-app 项⽬开发问题及解决⽅案记录&quot;">​</a></h1><h2 id="基础问题" tabindex="-1">基础问题 <a class="header-anchor" href="#基础问题" aria-label="Permalink to &quot;基础问题&quot;">​</a></h2><ol><li><code>&lt;template&gt;</code> 模板：</li></ol><ul><li>使⽤ <code>v-for</code> 或其他语法，命名 <code>key</code> 赋值时候不能使⽤字符串模板，⽐如</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  :key=`customer-${item.id}`</span></span></code></pre></div><p>否则会导致编译报错；</p><ul><li>Mustache 语法（双⼤括号）不⽀持使⽤对象扩展符，⽐如：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{{ ...objectContent }}</span></span></code></pre></div></li></ul><p>否则会导致编译报错；</p><ul><li>Mustache 语法（双⼤括号）不⽀持使⽤可选连操作符，⽐如：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{{ objectContent?.id }}</span></span></code></pre></div></li></ul><p>否则会导致编译报错；</p><ol><li>系统应⽤问题</li></ol><ul><li>⻚⾯滚动条卡住问题：</li></ul>',12),c=e("p",null,"打包构建",-1),d=e("ol",null,[e("li",null,"微信⼩程序运⾏报错：")],-1),u=o('<p>⼩程序本地开发命令运⾏报错，删除 dist ⽂件夹重新运⾏即可</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol><li>因为 App 版本发版存在时差，且需要⼿动升级版本，所以旧功能迭代需要考虑向下兼容，防⽌只 能最新版本才能正常使⽤情况。⽐如新版使⽤新接⼝，旧版使⽤旧接⼝，⽽不是直接修改旧接⼝ ⼊参或返回值或停⽤旧接⼝</li></ol><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7321410861997686794?utm_source=gold_browser_extension" target="_blank" rel="noreferrer">uniapp 项⽬开发经验总结 - 掘⾦</a></li><li><a href="https://juejin.cn/post/7311604023152640054" target="_blank" rel="noreferrer">uni-app开发微信⼩程序和H5⼿机端记录 - 掘⾦</a></li></ul>',5);function h(_,g,m,b,f,k){const a=s("CustomImage");return l(),n("div",{"data-pagefind-body":!0},[r,t(a,{src:"/growth-record/platform/uni/uni-question-01.png"}),c,d,t(a,{src:"/growth-record/platform/uni/uni-question-02.png"}),u])}const q=i(p,[["render",h]]);export{C as __pageData,q as default};
