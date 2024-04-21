import{j as s,b as i,c as a,aa as n}from"./chunks/framework.BdPFiiJb.js";const g=JSON.parse('{"title":"常用的 Markdown 语法格式来编写文章","description":"","frontmatter":{"title":"常用的 Markdown 语法格式来编写文章","date":"2018-06-23T20:02:01.000Z","tag":["工具指南"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/other/toolGuide/markdown.md","filePath":"posts/growth-record/other/toolGuide/markdown.md","lastUpdated":1713675008000}'),e={name:"posts/growth-record/other/toolGuide/markdown.md"},l=n(`<h1 id="常用的-markdown-语法格式来编写文章" tabindex="-1">常用的 Markdown 语法格式来编写文章 <a class="header-anchor" href="#常用的-markdown-语法格式来编写文章" aria-label="Permalink to &quot;常用的 Markdown 语法格式来编写文章&quot;">​</a></h1><p><strong>注：本教程需要一点对markdown语法格式的了解，什么都不知道的，请直接看<a href="http://www.jianshu.com/p/q81RER" target="_blank" rel="noreferrer">献给写作者的 Markdown 新手指南</a>的参考资料，再来看本文，会更好的去学习。</strong></p><h2 id="基本排版格式" tabindex="-1">基本排版格式 <a class="header-anchor" href="#基本排版格式" aria-label="Permalink to &quot;基本排版格式&quot;">​</a></h2><h3 id="一-目录编辑" tabindex="-1">(一) 目录编辑 <a class="header-anchor" href="#一-目录编辑" aria-label="Permalink to &quot;(一) 目录编辑&quot;">​</a></h3><ol><li><p>导航目录链接制作,一般使用二级、三级标题格式(需要解析)</p><p>第一种方式获取标题：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TOC</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {:toc}</span></span></code></pre></div></li><li><p>小标题无序目录(注意空格)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 目录一</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 目录二</span></span></code></pre></div></li><li><p>小标题有序目录(注意空格)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 目录一</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 目录二</span></span></code></pre></div></li><li><p>锚点链接(注意英文字符)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">目录</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">](</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">#目录</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">Fork 指南</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">](</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">#fork-指南</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></li></ol><h3 id="二-链接表示" tabindex="-1">(二) 链接表示 <a class="header-anchor" href="#二-链接表示" aria-label="Permalink to &quot;(二) 链接表示&quot;">​</a></h3><ol><li><p>基本插入链接表示：</p><ul><li>网址链接：<code>[跳转名](https://xxx.github.io)</code></li><li>本地图片链接(最好使用图床网站获取图片url)： <code>![](/images/wiki/eclipse-need-java6.png)</code></li><li>待定链接：<code>[这个链接跳转不了](#)</code></li></ul></li><li><p>统一的的链接跳转方式(为了排版好看一点)：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参考：[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">mpv keybindings</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">][</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参考：[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">OPTIONS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">][</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参考：[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">MPV使用小记</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">][</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]: </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">https://github.com/mpv-player/mpv/blob/master/etc/input.conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]: </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">https://github.com/mpv-player/mpv/blob/master/DOCS/man/options.rst</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]: </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">https://segmentfault.com/a/1190000004533079</span></span></code></pre></div></li><li><p>快捷插入网址链接表示形式：<code>&lt;http://example.com&gt;</code></p></li></ol><h3 id="三-表格排版" tabindex="-1">(三) 表格排版 <a class="header-anchor" href="#三-表格排版" aria-label="Permalink to &quot;(三) 表格排版&quot;">​</a></h3><ol start="4"><li><p>表格排版参考(注意空行)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> | 功能     | 快捷键 for win  | 快捷键 for mac |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|:---------|:---------------|:---------------|</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| Project  | M-1            | Cmd-1          |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| Terminal | M-F12          | M-F12          |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| Editor   | Esc            | Esc            |</span></span></code></pre></div><p><strong>注意：</strong><code>:---------</code> 表示文字居左显示，<code>:---------:</code> 表示文字居中显示，<code>---------:</code> 表示文字居右显示。</p></li></ol><h3 id="四-文字处理" tabindex="-1">(四) 文字处理 <a class="header-anchor" href="#四-文字处理" aria-label="Permalink to &quot;(四) 文字处理&quot;">​</a></h3><ol><li><p>分割线</p><ul><li>第一种方式：<code>-----</code></li><li>第二种方式：<code>***</code></li></ul><p>效果展示：</p><hr></li><li><p>删除线：<code>~~删除线~~</code> ，效果展示：<s>删除线</s></p></li><li><p>斜体：<code>*斜体*</code> ，效果展示：<em>斜体</em></p></li><li><p>表情插入(需要解析)</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:camel:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:blush:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:smile:</span></span></code></pre></div><p><a href="https://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank" rel="noreferrer">表情语法专属官网</a></p></li><li><p>脚注提醒(需要解析)</p><p>This is a text with footnote[^1].</p><p>[^1]: Here is the footnote 1 definition.</p></li><li><p>键盘键显示(需要解析)： <code>&lt;kbd&gt;Alt&lt;/kbd&gt; + &lt;kbd&gt;Shift&lt;/kbd&gt; + &lt;kbd&gt;S&lt;/kbd&gt;</code></p><p>效果展示：<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd></p></li><li><p>电子邮箱输入：<code>&lt;1111111111@qq.com&gt;</code> ，效果展示：<a href="mailto:1111111111@qq.com" target="_blank" rel="noreferrer">1111111111@qq.com</a></p></li><li><p>代办列表: 表示列表是否勾选状态</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] 不勾选</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 勾选</span></span></code></pre></div></li><li><p>上下标(需要解析)</p><p><code>\\^</code> 表示上标, <code>_</code> 表示下标。如果上下标的内容多于一个字符，要用{}把这些内容括起来当成一个整体。上下标是可以嵌套的，也可以同时使用。 例如：</p><p><code>x^{y^z}=(1+{\\rm e}^x)^{-2xy^w}</code> ，效果展示：<code>x{yz}=(1+{\\rm e}x){-2xy^w}</code>(解析有问题，需要装插件)</p></li><li><p>添加下划线： <code>php\\_gd2.dll</code> ，效果展示： php_gd2.dll</p></li><li><p>笔记本和标签(部分编辑器支持)： <code>@(示例笔记本)[标签1|标签2|标签3]</code> 。</p></li></ol><h3 id="五-引用" tabindex="-1">(五) 引用 <a class="header-anchor" href="#五-引用" aria-label="Permalink to &quot;(五) 引用&quot;">​</a></h3><ol><li><p>区块引用可以嵌套，只要根据层次加上不同数量的 &gt; ：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 这是第一级引用。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; &gt; 这是第二级引用。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 现在回到第一级引用。</span></span></code></pre></div></li><li><p>引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## 这是一个标题。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> 这是第一行列表项。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> 这是第二行列表项。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 给出一些例子代码：</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; return shell_exec(&quot;echo $input | $markdown_script&quot;);</span></span></code></pre></div></li><li><p>如果要在列表项目内放进引用，那 <code>&gt;</code> 就需要缩进：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Coding.net有以下主要功能:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> &gt; 代码托管平台</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> &gt; 在线运行环境</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> &gt; 代码质量监控</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> &gt; 项目管理平台</span></span></code></pre></div></li></ol><h3 id="六-简单的图形" tabindex="-1">(六) 简单的图形 <a class="header-anchor" href="#六-简单的图形" aria-label="Permalink to &quot;(六) 简单的图形&quot;">​</a></h3><ol><li><p>代码图形</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|             |        ...         |             |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|             |                    |             |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| format str1 | &lt;-- esp            | format str2 | &lt;-- esp</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| double low  |                    |     int     |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| double high |                    | double high |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+  main stack frame  +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|     ...     |                    |     ...     |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|             |                    |             |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|   (%ebp)    | &lt;-- ebp            |   (%ebp)    | &lt;-- ebp</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+-------------+                    +-------------+</span></span></code></pre></div></li><li><p>构建文件夹图形</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app/src/main</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─assets</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─java</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ├─android</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │  └─content</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      └─pm</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─org</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      └─mazhuang</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          └─easycleaner</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─res</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ├─drawable</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ├─layout</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ├─menu</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div></li></ol><h3 id="七-代码语法" tabindex="-1">(七) 代码语法 <a class="header-anchor" href="#七-代码语法" aria-label="Permalink to &quot;(七) 代码语法&quot;">​</a></h3><ol><li><p>单行代码语法：两个 \`，中间输入内容</p></li><li><p>多行代码语法(注意前后空行)：第一行输入三个 \` 然后最后一行再输入三个</p></li><li><p>简单的语法高亮</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5234ab</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello, World!&#39;</span></span></code></pre></div></li><li><p>代码高亮语言标识符支持的语法</p><p>支持的有 <code>javascript（js）、cpp、makefile、vbnet、xml、c、java、cl、vim、sh、yaml、markdown(显示原语法格式)、html、vb、python</code> 等等</p></li></ol><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><ul><li>(1)、<a href="http://mazhuang.org/wiki/chinese-copywriting-guidelines/" target="_blank" rel="noreferrer">中文文案排版指北（简体中文版）</a></li><li>(2)、<a href="http://www.jianshu.com/p/q81RER" target="_blank" rel="noreferrer">献给写作者的 Markdown 新手指南</a></li><li>(3)、<a href="https://coding.net/help/doc/project/markdown.html#section-2" target="_blank" rel="noreferrer">Markdown语法介绍</a></li><li>(4)、<a href="http://www.appinn.com/markdown/" target="_blank" rel="noreferrer">Markdown 语法说明 (简体中文版)</a></li><li>(5)、<a href="https://maxiang.io/" target="_blank" rel="noreferrer">马克飞象-在线编辑器</a></li></ul>`,19),t=[l];function p(h,k,d,r,o,c){return i(),a("div",null,t)}const y=s(e,[["render",p]]);export{g as __pageData,y as default};