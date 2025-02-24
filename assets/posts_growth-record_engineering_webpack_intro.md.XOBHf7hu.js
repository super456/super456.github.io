import{_ as t,D as p,c as h,o as l,a6 as n,I as i,j as s,a as e}from"./chunks/framework.BOyJDVBP.js";const F=JSON.parse('{"title":"Webpack 基础语法","description":"","frontmatter":{"title":"Webpack 基础语法","date":"2020-05-04T20:00:00.000Z","tags":["前端工程化","Webpack"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/engineering/webpack/intro.md","filePath":"posts/growth-record/engineering/webpack/intro.md","lastUpdated":1713582962000}'),r={name:"posts/growth-record/engineering/webpack/intro.md"},k=n('<h1 id="webpack-基础语法" tabindex="-1">Webpack 基础语法 <a class="header-anchor" href="#webpack-基础语法" aria-label="Permalink to &quot;Webpack 基础语法&quot;">​</a></h1><h2 id="一、基本命令" tabindex="-1">一、基本命令 <a class="header-anchor" href="#一、基本命令" aria-label="Permalink to &quot;一、基本命令&quot;">​</a></h2><h4 id="_1-1-安装" tabindex="-1">1.1 安装 <a class="header-anchor" href="#_1-1-安装" aria-label="Permalink to &quot;1.1 安装&quot;">​</a></h4><p>（1）快速初始化一个项目：<code>npm init -y</code> 其实就是省略了在执行 <code>npm init</code> 下一堆默认 yes 的操作项。</p><p>（2）安装 webpack 及 webpack-cli 命令行脚手架工具（在 webpack 4.0 后分两个项目）：<code>yarn add webpack webpack-cli -D</code></p><p>（3）安装成功后，在根目录建一个 <code>webpack.config.js</code> 文件，这个是默认读取的配置文件：</p>',6),c=s("p",null,[e("（3）初始化项目文件，根目录新建一个 "),s("code",null,"src"),e(" 文件夹，在这个文件夹下新建一个 "),s("code",null,"index.js"),e(" 文件：")],-1),d=n(`<p>（4）配置 <code>webpack.config.js</code> 文件打包输出文件：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;path&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dist&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包后输出的位置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;my-first-webpack.bundle.js&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 可以自定义，如服务端代码打包后命名：server.bundle.js , 客户端代码：app.bunlde.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>（5）打包，执行 <code>npx webpack</code> 默认根目录生成 <code>dist</code> 文件夹：</p>`,3),o=s("p",null,"待更新🚀...",-1);function g(E,_,b,y,u,m){const a=p("CustomImage");return l(),h("div",{"data-pagefind-body":!0},[k,i(a,{src:"/growth-record/engineering/webpack/jichuyufa01.webp"}),c,i(a,{src:"/growth-record/engineering/webpack/jichuyufa02.webp"}),d,i(a,{src:"/growth-record/engineering/webpack/jichuyufa03.webp"}),o])}const C=t(r,[["render",g]]);export{F as __pageData,C as default};
