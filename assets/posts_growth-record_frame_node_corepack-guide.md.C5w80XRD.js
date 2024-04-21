import{j as t,b as p,c,L as r,s as e,aa as o,f as n,G as l}from"./chunks/framework.BdPFiiJb.js";const E=JSON.parse('{"title":"Node.js Corepack 使⽤指南","description":"","frontmatter":{"title":"Node.js Corepack 使⽤指南","date":"2023-12-26T20:04:06.000Z","tag":["Node"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/node/corepack-guide.md","filePath":"posts/growth-record/frame/node/corepack-guide.md","lastUpdated":1713694052000}'),s={name:"posts/growth-record/frame/node/corepack-guide.md"},d=o('<h1 id="node-js-corepack-使用指南" tabindex="-1">Node.js Corepack 使⽤指南 <a class="header-anchor" href="#node-js-corepack-使用指南" aria-label="Permalink to &quot;Node.js Corepack 使⽤指南&quot;">​</a></h1><p>Corepack 是 Node.js 推出的包管理器的管理器。类似于 nvm 可以一行命令安装、切换 Node.js 的版本，Corepack 可以一行命令安装、切换 npm / yarn / pnpm 的版本。Corepack 还有一个特性，就是能够读取项目的 packge.json 中的 pacakgeManager 字段，从而自动切换到对应版本的包管理器，防止⾃动切换包管理器导致依赖⽬版本不⼀致问题</p><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>Node.js Corepack 项⽬管理 yarn / npm / pnpm 问题了，推荐⼤家⽤起来，⾮常适合团队杂七杂⼋的 项⽬各种版本对不⻬问题，导致安装依赖、lock ⽂件参差不⻬问题。⽽且⿎励⼤家项⽬ package.json 要设置 &quot;packageManager&quot;: &quot;xxx@x.x.x&quot;，避免后续项⽬新⼈维护版本依赖安装问题</p><h2 id="使用" tabindex="-1">使⽤ <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使⽤&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><ol><li>检查 Node.js 版本，Corepack 默认与 Node.js 14.19.0 和 16.9.0 一起分发，所以保证 Node.js 版本大于等于 16.9.0，无需自行安装 Corepack，终端输入 <code>corepack</code> 成功结果如下：</li></ol>',7),i=e("h3",{id:"项目使用",tabindex:"-1"},[n("项目使⽤ "),e("a",{class:"header-anchor",href:"#项目使用","aria-label":'Permalink to "项目使⽤"'},"​")],-1),h=e("p",null,"⽐如 pnpm 版本：",-1),m=e("p",null,"全局的 pnpm 版本：",-1),_=e("p",null,"针对某个项⽬ package.json 使⽤对应的包管理器版本：",-1),k=e("p",null,"没有设置的话会默认⾛全局设置的版本：",-1),g=e("h2",{id:"其他问题",tabindex:"-1"},[n("其他问题 "),e("a",{class:"header-anchor",href:"#其他问题","aria-label":'Permalink to "其他问题"'},"​")],-1),f=e("p",null,"还遇到个问题就是： 如果有使⽤ nvm 或 n 管理 node 版本的或两者混⽤的（⽐如我），可能会有 pnpm 依赖版本问题，⽐ 如删除pnpm，执⾏命名： npm uninstall -g pnpm，但 pnm 还是会存在，因为 node 管理版本导致 pnpm 查询全局安装路径不⼀致问题，也就是你删除的是 n 管理下 node 的 pnpm 但是 nvm 下⼜是另 ⼀个的 pnpm 版本路径，你可以删除⼿动删除 pnpm 全局依赖：",-1),u=e("p",null,"执⾏命令：which pnpm：",-1),b=e("p",null,"记得这个也要删除（pnpm pnpx），不然会导致 pnpm ⼀直安装不上：",-1),j=o('<h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><ul><li><a href="https://blog.csdn.net/bigPatrickstar/article/details/123600329" target="_blank" rel="noreferrer">pnpm Error: Cannot find module ‘C:\\Users\\AppData\\Roa..\\npm\\pnpm￾glob\\4\\node_modules\\pnpm\\bin\\pnpm.js</a></li><li><a href="https://pnpm.io/zh/installation#%E7%96%91%E9%9A%BE%E8%A7%A3%E7%AD%94" target="_blank" rel="noreferrer">安装 | pnpm</a></li><li><a href="https://juejin.cn/post/7111998050184200199" target="_blank" rel="noreferrer">Node.js Corepack - 掘⾦</a></li><li><a href="https://www.cnblogs.com/zhoumingjie/p/15862357.html" target="_blank" rel="noreferrer">前端包管理和 corepack - 周明杰 - 博客园</a></li><li><a href="https://www.cnblogs.com/lessfish/p/16908785.html" target="_blank" rel="noreferrer">pnpm 版本切换 - lessfish - 博客园</a></li><li><a href="https://blog.lyh543.cn/posts/2023-04-28-install-pnpm-by-corepack.html" target="_blank" rel="noreferrer">pnpm2023 年了，该尝试⽤ Corepack 安装 pnpm 了 | ⼩灰灰灰灰的博客</a></li><li><a href="https://segmentfault.com/a/1190000043979300#item-3-6" target="_blank" rel="noreferrer">使⽤ volta 与 corepack 规范团队在不同项⽬中使⽤的 node 版本与 npm 包管理器</a></li><li><a href="https://juejin.cn/post/6948343013529780237" target="_blank" rel="noreferrer">使⽤npm命令⾏更新版本号 - 掘⾦</a></li></ul>',2);function C(N,x,w,q,P,T){const a=l("CustomImage");return p(),c("div",null,[d,r(a,{src:"/growth-record/frame/node/corepack-01.png"}),i,h,e("ul",null,[e("li",null,[m,r(a,{src:"/growth-record/frame/node/corepack-02.png"})]),e("li",null,[_,r(a,{src:"/growth-record/frame/node/corepack-03.png"}),r(a,{src:"/growth-record/frame/node/corepack-04.png"})]),e("li",null,[k,r(a,{src:"/growth-record/frame/node/corepack-05.png"})])]),g,f,u,r(a,{src:"/growth-record/frame/node/corepack-06.png"}),b,r(a,{src:"/growth-record/frame/node/corepack-07.png"}),j])}const S=t(s,[["render",C]]);export{E as __pageData,S as default};
