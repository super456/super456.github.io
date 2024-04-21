import{j as a,b as d,c,L as t,s as e,f as o,aa as i,G as r}from"./chunks/framework.BdPFiiJb.js";const w=JSON.parse('{"title":"VS Code 编程软件常用技巧","description":"","frontmatter":{"title":"VS Code 编程软件常用技巧","date":"2018-06-23T20:02:01.000Z","tag":["工具指南"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/other/toolGuide/vscode-common.md","filePath":"posts/growth-record/other/toolGuide/vscode-common.md","lastUpdated":1713677507000}'),s={name:"posts/growth-record/other/toolGuide/vscode-common.md"},n=e("h1",{id:"vs-code-编程软件常用技巧",tabindex:"-1"},[o("VS Code 编程软件常用技巧 "),e("a",{class:"header-anchor",href:"#vs-code-编程软件常用技巧","aria-label":'Permalink to "VS Code 编程软件常用技巧"'},"​")],-1),h=e("p",null,"由于经常使用这个编程软件，之前使用一些功能老是过段时间就忘记，只记住一些基本的操作。俗话说：工欲善其事，必先利其器。所以打算整理一下，以便忘记的时候可以温习一下，不至于浪费编码时间。",-1),p=e("p",null,"Visual Studio Code 是一个运行在桌面上，多平台的轻量级且功能强大的源代码编辑器。内置有JavaScript的，TypeScript和Node.js的支持，其他语言如C ++，C＃，Python和PHP等的可扩展，是一个非常丰富的生态系统。主打 web 开发，也是本人在学习前端过程中主要的使用的编程工具。",-1),u=e("h1",{id:"一-主命令框",tabindex:"-1"},[o("（一）主命令框 "),e("a",{class:"header-anchor",href:"#一-主命令框","aria-label":'Permalink to "（一）主命令框"'},"​")],-1),m=e("ol",null,[e("li",null,[e("code",null,"F1 "),o("或 "),e("code",null,"Ctrl+Shift+P"),o(": 打开命令面板。在打开的输入框内，可以输入任何命令，例如：按一下"),e("code",null," Backspace"),o("会进入到 "),e("code",null,"Ctrl+P "),o("模式")])],-1),f=i(`<ol start="2"><li>在<code>Ctrl+P</code>下输入&gt;可以进入<code>Ctrl+Shift+P</code>模式</li><li>在 <code>Ctrl+P </code>窗口下还可以:</li></ol><ul><li>直接输入文件名，跳转到文件</li><li><code>?</code>列出当前可执行的动作</li><li><code>!</code>显示 Errors或 Warnings，也可以<code>Ctrl+Shift+M</code></li><li><code>:</code>跳转到行数，也可以 <code>Ctrl+G </code>直接进入</li><li><code>@</code>跳转到symbol（搜索变量或者函数），也可以 <code>Ctrl+Shift+O </code>直接进入</li><li><code>@</code>根据分类跳转<code>symbol</code>，查找属性或函数，也可以 <code>Ctrl+Shift+O </code>后输入:进入</li><li><code>#</code>根据名字查找 <code>symbol</code>，也可以 <code>Ctrl+T</code></li></ul><h1 id="二-常用快捷键" tabindex="-1">（二）常用快捷键 <a class="header-anchor" href="#二-常用快捷键" aria-label="Permalink to &quot;（二）常用快捷键&quot;">​</a></h1><table><thead><tr><th>说明</th><th>快捷键</th></tr></thead><tbody><tr><td>打开一个新窗口：</td><td><code>Ctrl+Shift+N</code></td></tr><tr><td>关闭窗口：</td><td><code>Ctrl+Shift+W</code></td></tr><tr><td>同时打开多个编辑器（查看多个文件）</td><td></td></tr><tr><td>切出一个新的编辑器（最多 3 个）</td><td><code>Ctrl+\\</code>，也可以按住 <code>Ctrl</code> 鼠标点击 Explorer 里的文件名</td></tr><tr><td>左中右 3 个编辑器的快捷键</td><td><code>Ctrl+1</code> <code>Ctrl+2</code> <code>Ctrl+3</code></td></tr><tr><td>编辑器换位置</td><td><code>Ctrl+k</code>然后按 <code>Left</code>或 <code>Right</code></td></tr><tr><td>文件之间切换</td><td><code>Ctrl+Tab</code></td></tr><tr><td>打开集成终端</td><td><code>Ctrl+</code>\`</td></tr></tbody></table><h1 id="三-代码编辑" tabindex="-1">（三）代码编辑 <a class="header-anchor" href="#三-代码编辑" aria-label="Permalink to &quot;（三）代码编辑&quot;">​</a></h1><h2 id="_1-格式调整" tabindex="-1">1.格式调整 <a class="header-anchor" href="#_1-格式调整" aria-label="Permalink to &quot;1.格式调整&quot;">​</a></h2><p><strong>注意：</strong> 对python文件进行代码格式化操作时，会提示安装<code>autopep8</code></p><ul><li>代码格式化： <code>Shift+Alt+F</code>，或 <code>Ctrl+Shift+P</code> 后输入 <code>format code</code></li><li>代码行缩进: <code>Ctrl+[</code> 、 <code>Ctrl+]</code></li><li>在当前行下边插入一行 <code>Ctrl+Enter</code></li><li>在当前行上方插入一行 <code>Ctrl+Shift+Enter</code></li><li>上下移动一行： <code>Alt+Up</code> 或 <code>Alt+Down</code></li><li>向上向下复制一行： <code>Shift+Alt+Up</code> 或 <code>Shift+Alt+Down</code></li></ul><h2 id="_2-光标相关" tabindex="-1">2.光标相关 <a class="header-anchor" href="#_2-光标相关" aria-label="Permalink to &quot;2.光标相关&quot;">​</a></h2><ul><li>移动到定义处： <code>F12</code></li><li>定义处缩略图：只看一眼而不跳转过去:<code>Alt+F12</code></li><li>移动到文件结尾： <code>Ctrl+End</code></li><li>移动到文件开头： <code>Ctrl+Home</code></li><li>跳转到光标上一次(下一次)位置（误操作的回退方案，非常有用）<code> ctrl + Left / Ctrl + Right</code></li></ul><p><strong>注意：</strong> 下面两个功能和alt+↑/↓配合，很方便的移动代码块：</p><ul><li>选择从光标到行尾：<code>Shift+End</code></li><li>选择从行首到光标处：<code>Shift+Home</code></li></ul><p><strong>注意：</strong> 这两个功能很爽，可以同时编辑一些变量名：</p><ul><li>多行编辑(列编辑)：<code>Ctrl+Alt+Down/Up</code>或者<code>Alt+Shift</code>+鼠标左键，可以批量选中文本并编辑</li><li>同时选中所有匹配： <code>Ctrl+Shift+L</code></li><li><code>Ctrl+D</code> 下一个匹配的也被选中 (在 sublime 中是删除当前行，后面自定义快键键中，设置与 <code>Ctrl+Shift+K</code> 互换了)</li><li>回退上一个光标操作： <code>Ctrl+U</code></li><li>删除光标右侧的所有字： <code>Ctrl+Delete</code></li><li>扩展/缩小选取范围： <code>Shift+Alt+Left</code> 和 <code>Shift+Alt+Right</code></li><li>多光标选取<code> Alt + 鼠标单击</code></li><li>逐步选中其它相同的symbol <code>Ctrl + D</code>(已更改快捷方式为：<code>Ctrl+Shift+K</code>)</li><li>全选相同symbol<code> Ctrl + F12</code></li><li>重构（重命名）Symbol <code>F2</code></li><li>查找所有引用了选中symbol的代码 <code>Shift + F12</code></li><li>跳转到symbol的定义处 <code>F12</code></li><li>瞥见下symbol的定义出（在该symbol下方展开面板，显示定义处代码，非常有用）<code>Alt + F12</code></li></ul><h2 id="_3-重构代码" tabindex="-1">3.重构代码 <a class="header-anchor" href="#_3-重构代码" aria-label="Permalink to &quot;3.重构代码&quot;">​</a></h2><p><strong>注意：</strong> 查看函数引用和批量休修改函数名，好用：</p><ul><li>重命名：比如要修改一个方法名，可以选中后按 <code>F2</code>，输入新的名字，回车，会发现所有的文件都修改了</li><li>找到所有的引用： <code>Shift+F12</code></li><li>同时修改本文件中所有匹配的： <code>Ctrl+F12</code></li><li>跳转到下一个 Error 或 Warning：当有多个错误时可以按 <code>F8 </code>逐个跳转</li><li>查看 diff： 在 explorer 里选择文件右键 <code>Set file to compare</code>，然后需要对比的文件上右键选择 <code>Compare with file_name_you_chose</code></li></ul><h2 id="_4-查找替换" tabindex="-1">4.查找替换 <a class="header-anchor" href="#_4-查找替换" aria-label="Permalink to &quot;4.查找替换&quot;">​</a></h2><ul><li>查找:<code>Ctrl+F</code></li><li>查找替换:<code>Ctrl+H</code></li><li>整个文件夹中查找:<code>Ctrl+Shift+F</code></li></ul><h2 id="_5-显示相关" tabindex="-1">5.显示相关 <a class="header-anchor" href="#_5-显示相关" aria-label="Permalink to &quot;5.显示相关&quot;">​</a></h2><ul><li>全屏：<code>F11</code></li><li>区域整块放大/缩小：<code>Ctrl +/-</code></li><li>侧边栏显/隐：<code>Ctrl+B</code></li><li>显示资源管理器:<code>Ctrl+Shift+E</code></li><li>显示搜索:<code>Ctrl+Shift+F</code></li><li>显示 Git:<code>Ctrl+Shift+G</code></li><li>显示 Debug:<code>Ctrl+Shift+D</code></li><li>显示 Output:<code>Ctrl+Shift+U</code></li></ul><h2 id="_6-其他" tabindex="-1">6.其他 <a class="header-anchor" href="#_6-其他" aria-label="Permalink to &quot;6.其他&quot;">​</a></h2><p>文件自动保存设置：<code>File</code> -&gt; <code>AutoSave</code> ，或者 <code>Ctrl+Shift+P</code>，输入 <code>auto</code></p><h1 id="四-修改默认快捷键" tabindex="-1">（四）修改默认快捷键 <a class="header-anchor" href="#四-修改默认快捷键" aria-label="Permalink to &quot;（四）修改默认快捷键&quot;">​</a></h1><p>打开默认键盘快捷方式设置： <code>File</code>（文件） -&gt; <code>Preferences</code>（首选项） -&gt; <code>Keyboard Shortcuts</code>（键盘快捷方式），或者：<code>Alt+F</code> -&gt;<code>p</code>-&gt; <code>k</code>-&gt; 回车。</p><p>修改<code> keybindings.json</code>：(这个是当时自己添加的)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// ctrl+d 删除一行</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>     &quot;key&quot;: &quot;ctrl+d&quot;,</span></span>
<span class="line"><span>     &quot;command&quot;: &quot;editor.action.deleteLines&quot;,</span></span>
<span class="line"><span>     &quot;when&quot;: &quot;editorTextFocus&quot;</span></span>
<span class="line"><span> },</span></span>
<span class="line"><span> // 与删除一行的快捷键互换</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>     &quot;key&quot;: &quot;ctrl+shift+k&quot;,</span></span>
<span class="line"><span>     &quot;command&quot;: &quot;editor.action.addSelectionToNextFindMatch&quot;,</span></span>
<span class="line"><span>     &quot;when&quot;: &quot;editorFocus&quot;</span></span>
<span class="line"><span> },</span></span>
<span class="line"><span> // ctrl+shift+/多行注释</span></span>
<span class="line"><span> {</span></span>
<span class="line"><span>     &quot;key&quot;:&quot;ctrl+shift+/&quot;,</span></span>
<span class="line"><span>     &quot;command&quot;: &quot;editor.action.blockComment&quot;,</span></span>
<span class="line"><span>     &quot;when&quot;: &quot;editorTextFocus&quot;</span></span>
<span class="line"><span> },</span></span></code></pre></div><h1 id="五-推荐插件" tabindex="-1">（五）推荐插件 <a class="header-anchor" href="#五-推荐插件" aria-label="Permalink to &quot;（五）推荐插件&quot;">​</a></h1><h2 id="_1-前端插件" tabindex="-1">1.前端插件 <a class="header-anchor" href="#_1-前端插件" aria-label="Permalink to &quot;1.前端插件&quot;">​</a></h2><ul><li>auto close tag 自动关闭HTML标签</li><li>Auto Rename Tag：自动修改标签</li><li>AutoFileNmae:auto complete file name，自动补全文件的名字</li><li>Beautify:显示js/json/css美化，按<code>F1</code></li><li>Bracket Pair Colorizer 标记显示不同颜色的关联括号</li><li>Color Info 显示颜色信息</li><li>CSS Formatter css格式化工具</li><li>Debugger for Chrome 谷歌调试工具（需要配置launch.json）</li><li>Document This 添加备注信息（only supports JavaScript and TypeScript）<code>Ctrl+Alt+D</code> and again <code>Ctrl+Alt+D</code></li><li>filesize 文件大小提示</li><li>GitLens 提示文件修改信息，具体到代码行</li><li>Guides:显示代码对其辅助线</li><li>HTML CSS Support css文件支持HTML标签提示</li><li>HTML Preview 预览编译HTML文件</li><li>HTML SCSS Support scss文件支持HTML标签提示</li><li>HTML Snippets 支持HTML标签提示</li><li>HTMLHint</li><li>intellisense for css class names in html 支持HTML文件中类名提示</li><li>JavaScript (ES6) snippets</li><li>jQuery Code Snippets</li><li>JS, CSS, HTML Formatting</li><li>Live HTML Previewer</li><li>markdownlint</li><li>Npm Intellisense</li><li>Path Intellisense: 路径匹配</li><li>Path Autocomplete</li><li>Vetur：VUE扩展</li><li>PostCSS Sorting</li><li>stylelint</li><li>stylefmt</li><li>ESLint</li><li>javascript standard format</li><li>Babel ES6/ES7</li><li>Add jsdoc comments</li><li>vue</li><li>weex</li><li>Reactjs code snippets</li><li>React Native Tools</li><li>Instant Markdown</li><li>Markdown Shortcuts</li><li>TextTransform</li><li>Color Highlight:写csss时，颜色值会增加对应的颜色背景显示</li><li>open in browser: <code>alt+b</code>选择浏览器预览文件</li><li>Rainbow Brackets：有颜色的显示括号匹配</li><li>Settings Sync: 同步配置（需要配置GitHub的本地token key）</li></ul><h2 id="_2-官网推荐插件" tabindex="-1">2.官网推荐插件 <a class="header-anchor" href="#_2-官网推荐插件" aria-label="Permalink to &quot;2.官网推荐插件&quot;">​</a></h2>`,31),C=e("p",null,[e("a",{href:"https://marketplace.visualstudio.com/vscode",target:"_blank",rel:"noreferrer"},"点击跳转")],-1),S=e("h2",{id:"_3-推荐主题",tabindex:"-1"},[o("3.推荐主题 "),e("a",{class:"header-anchor",href:"#_3-推荐主题","aria-label":'Permalink to "3.推荐主题"'},"​")],-1),_=i('<p><a href="https://marketplace.visualstudio.com/search?target=VSCode&amp;category=Themes&amp;sortBy=Downloads" target="_blank" rel="noreferrer">点击跳转</a></p><p><strong>注：</strong> 切换主题的快捷键：<code>f1</code> 或<code>ctrl+shift+p </code>输入theme 回车,上下切换：<code>ctrl+k</code>,<code>ctrl+t</code>。</p><ul><li>One Dark Pro</li><li>Atom One Dark</li><li>FlatUI</li><li>Material Icon Theme: 图标主题</li><li>vscode-icons</li><li>VSCode Great Icons</li><li>Dracula Official：主题，推荐</li></ul><h1 id="六-参考文献" tabindex="-1">（六）参考文献 <a class="header-anchor" href="#六-参考文献" aria-label="Permalink to &quot;（六）参考文献&quot;">​</a></h1><ul><li><a href="https://segmentfault.com/a/1190000010750790" target="_blank" rel="noreferrer">打造性感好用的VS Code编辑器</a></li><li><a href="https://www.w3cschool.cn/visualstudiocode/visualstudiocode-iy3422zb.html" target="_blank" rel="noreferrer">Visual Studio Code 简明使用教程</a></li><li><a href="https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/md/Overview.html" target="_blank" rel="noreferrer">VScode中文文档</a></li><li><a href="http://mrpeak.github.io/2015/07/02/vscode-guide/#%E4%BB%8D%E6%9C%89%E4%B8%8D%E8%B6%B3" target="_blank" rel="noreferrer">Visual Studio Code 不完全使用指南</a></li></ul>',5);function b(g,q,k,T,P,v){const l=r("CustomImage");return d(),c("div",null,[n,h,p,t(l,{src:"/growth-record/other/toolGuide/vscode-01.png"}),u,m,t(l,{src:"/growth-record/other/toolGuide/vscode-02.png"}),f,t(l,{src:"/growth-record/other/toolGuide/vscode-03.png"}),C,S,t(l,{src:"/growth-record/other/toolGuide/vscode-04.png"}),_])}const F=a(s,[["render",b]]);export{w as __pageData,F as default};
