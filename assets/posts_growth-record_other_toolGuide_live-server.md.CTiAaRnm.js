import{j as t,b as o,c as l,L as a,aa as p,s,f as e,G as r}from"./chunks/framework.BdPFiiJb.js";const A=JSON.parse('{"title":"Web 服务器 live-server 的安装及使用","description":"","frontmatter":{"title":"Web 服务器 live-server 的安装及使用","date":"2018-07-10T20:04:09.000Z","tag":["工具指南"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/other/toolGuide/live-server.md","filePath":"posts/growth-record/other/toolGuide/live-server.md","lastUpdated":1713671501000}'),i={name:"posts/growth-record/other/toolGuide/live-server.md"},c=p('<h1 id="web-服务器-live-server-的安装及使用" tabindex="-1">Web 服务器 live-server 的安装及使用 <a class="header-anchor" href="#web-服务器-live-server-的安装及使用" aria-label="Permalink to &quot;Web 服务器 live-server 的安装及使用&quot;">​</a></h1><p><strong>在写一下简单的项目或学习一些技术的练习，没有服务器的话，每次写的代码都需要手动刷新浏览器。有点无奈，但是如果你安装了这个<code>live-server</code> 服务器就可以不用手动刷新，实时预览自己写的代码了。</strong></p><p>live-server是一个具有实时重载功能的小型开发服务器。用它来热加载HTML / JavaScript / CSS文件，但不能用于部署最终的网站系统。</p><h3 id="一-安装" tabindex="-1">（一）安装 <a class="header-anchor" href="#一-安装" aria-label="Permalink to &quot;（一）安装&quot;">​</a></h3><p>1.前提条件需要node.js和npm的依赖（可以自己先搞定，不难）； 2.使用npm全局安装：<code>npm install -g live-server </code>（本人使用淘宝镜像安装的）</p>',5),d=s("h3",{id:"二-使用",tabindex:"-1"},[e("（二）使用 "),s("a",{class:"header-anchor",href:"#二-使用","aria-label":'Permalink to "（二）使用"'},"​")],-1),u=s("p",null,[e("1.需要在你使用的项目根目录下启动："),s("code",null,"liver-server"),e("（本人使用git，在指定目录下右击->git bash here后使用启动命令即可）")],-1),h=s("p",null,"2.启动成功，网页自动弹项目目录出来；",-1),v=s("p",null,[e("3.退出该服务器，在命令行使用："),s("code",null,"ctrl+c")],-1),g=s("h3",{id:"三-简单的配置",tabindex:"-1"},[e("（三）简单的配置 "),s("a",{class:"header-anchor",href:"#三-简单的配置","aria-label":'Permalink to "（三）简单的配置"'},"​")],-1),m=s("p",null,[e("1.默认端口号为8080，如果想修改，最简单的方式是启动的时候添加启动参数："),s("code",null,"live-server --port=8081"),e(" 即可")],-1),_=p(`<p>2.<code>live-server --参数</code> 列表</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>--port=NUMBER - select port to use, default: PORT env var or 8080</span></span>
<span class="line"><span>--host=ADDRESS - select host address to bind to, default: IP env var or 0.0.0.0 (“any address”)</span></span>
<span class="line"><span>--no-browser - suppress automatic web browser launching</span></span>
<span class="line"><span>--browser=BROWSER - specify browser to use instead of system default</span></span>
<span class="line"><span>--quiet | -q - suppress logging</span></span>
<span class="line"><span>--verbose | -V - more logging (logs all requests, shows all listening IPv4 interfaces, etc.)</span></span>
<span class="line"><span>--open=PATH - launch browser to PATH instead of server root</span></span>
<span class="line"><span>--watch=PATH - comma-separated string of paths to exclusively watch for changes (default: watch everything)</span></span>
<span class="line"><span>--ignore=PATH - comma-separated string of paths to ignore (anymatch-compatible definition)</span></span>
<span class="line"><span>--ignorePattern=RGXP - Regular expression of files to ignore (ie .*\\.jade) (DEPRECATED in favor of --ignore)</span></span>
<span class="line"><span>--middleware=PATH - path to .js file exporting a middleware function to add; can be a name without path nor extension to reference bundled middlewares in middleware folder</span></span>
<span class="line"><span>--entry-file=PATH - serve this file (server root relative) in place of missing files (useful for single page apps)</span></span>
<span class="line"><span>--mount=ROUTE:PATH - serve the paths contents under the defined route (multiple definitions possible)</span></span>
<span class="line"><span>--spa - translate requests from /abc to /#/abc (handy for Single Page Apps)</span></span>
<span class="line"><span>--wait=MILLISECONDS - (default 100ms) wait for all changes, before reloading</span></span>
<span class="line"><span>--htpasswd=PATH - Enables http-auth expecting htpasswd file located at PATH</span></span>
<span class="line"><span>--cors - Enables CORS for any origin (reflects request origin, requests with credentials are supported)</span></span>
<span class="line"><span>--https=PATH - PATH to a HTTPS configuration module</span></span>
<span class="line"><span>--proxy=ROUTE:URL - proxy all requests for ROUTE to URL</span></span>
<span class="line"><span>--help | -h - display terse usage hint and exit</span></span>
<span class="line"><span>--version | -v - display version and exit</span></span></code></pre></div><p>3.也可以把配置放在package.json的scripts下的server中，这样不用每次都命令行使用参数，然后使用命令行启动：<code>npm run server</code>（如何创建一个带package.json包的项目请看下一步）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>  &quot;server&quot;: &quot;live-server ./ --port=8081&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>4.创建一个带package.json包的项目，在项目根目录下使用命令行：<code>npm init</code>，可以自己设置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package name: (0710) demo</span></span>
<span class="line"><span>version: (1.0.0)</span></span>
<span class="line"><span>description: live-server的练习</span></span>
<span class="line"><span>entry point: (index.js)</span></span>
<span class="line"><span>test command:</span></span>
<span class="line"><span>git repository:</span></span>
<span class="line"><span>keywords:</span></span>
<span class="line"><span>author: 猿来独往</span></span>
<span class="line"><span>license: (ISC)</span></span>
<span class="line"><span>About to write to D:\\GitHub_Repository\\Clone_Files\\vue-study\\0710\\package.json:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;demo&quot;,</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span>  &quot;description&quot;: &quot;live-server的练习&quot;,</span></span>
<span class="line"><span>  &quot;main&quot;: &quot;index.js&quot;,</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;test&quot;: &quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;author&quot;: &quot;猿来独往&quot;,</span></span>
<span class="line"><span>  &quot;license&quot;: &quot;ISC&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Is this OK? (yes)</span></span></code></pre></div><p>然后使用第三步的配置，运行该项目就使用：<code>npm run server</code></p>`,7),f=s("p",null,[s("strong",null,[e("注意：如果浏览器不能实时自动刷新页面，可以试试用这个命令启动（亲测有效）："),s("code",null,"live-server")])],-1);function q(b,T,w,P,y,S){const n=r("CustomImage");return o(),l("div",null,[c,a(n,{src:"/growth-record/other/toolGuide/live-server-01.png"}),d,u,a(n,{src:"/growth-record/other/toolGuide/live-server-02.png"}),h,a(n,{src:"/growth-record/other/toolGuide/live-server-03.png"}),v,g,m,a(n,{src:"/growth-record/other/toolGuide/live-server-04.png"}),_,a(n,{src:"/growth-record/other/toolGuide/live-server-04.png"}),f])}const x=t(i,[["render",q]]);export{A as __pageData,x as default};
