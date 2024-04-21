---
title: VS Code 编程软件常用技巧
date: 2018-06-23 20:02:01
tag:
 - 工具指南
categories:
 - 前端进击
---
# VS Code 编程软件常用技巧
由于经常使用这个编程软件，之前使用一些功能老是过段时间就忘记，只记住一些基本的操作。俗话说：工欲善其事，必先利其器。所以打算整理一下，以便忘记的时候可以温习一下，不至于浪费编码时间。

Visual Studio Code 是一个运行在桌面上，多平台的轻量级且功能强大的源代码编辑器。内置有JavaScript的，TypeScript和Node.js的支持，其他语言如C ++，C＃，Python和PHP等的可扩展，是一个非常丰富的生态系统。主打 web 开发，也是本人在学习前端过程中主要的使用的编程工具。
<CustomImage src='/growth-record/other/toolGuide/vscode-01.png' />

# （一）主命令框
1. `F1 `或 `Ctrl+Shift+P`: 打开命令面板。在打开的输入框内，可以输入任何命令，例如：按一下` Backspace`会进入到 `Ctrl+P `模式
<CustomImage src='/growth-record/other/toolGuide/vscode-02.png' />

2. 在`Ctrl+P`下输入>可以进入`Ctrl+Shift+P`模式
3. 在 `Ctrl+P `窗口下还可以:
-  直接输入文件名，跳转到文件
-  `?`列出当前可执行的动作
-  `!`显示 Errors或 Warnings，也可以`Ctrl+Shift+M`
-  `:`跳转到行数，也可以 `Ctrl+G `直接进入
-  `@`跳转到symbol（搜索变量或者函数），也可以 `Ctrl+Shift+O `直接进入
-  `@`根据分类跳转`symbol`，查找属性或函数，也可以 `Ctrl+Shift+O `后输入:进入
-  `#`根据名字查找 `symbol`，也可以 `Ctrl+T`

# （二）常用快捷键

   |   说明  |   快捷键  |
   |-----------|------------|
|打开一个新窗口：| `Ctrl+Shift+N`|
|关闭窗口：| `Ctrl+Shift+W`|
|同时打开多个编辑器（查看多个文件）
|切出一个新的编辑器（最多 3 个）| `Ctrl+\`，也可以按住 `Ctrl` 鼠标点击 Explorer 里的文件名|
|左中右 3 个编辑器的快捷键 |`Ctrl+1` `Ctrl+2` `Ctrl+3`|
|编辑器换位置| `Ctrl+k`然后按 `Left`或 `Right`|
|文件之间切换 |`Ctrl+Tab`|
|打开集成终端 |`Ctrl+`\`|

# （三）代码编辑

## 1.格式调整

**注意：** 对python文件进行代码格式化操作时，会提示安装`autopep8`

- 代码格式化： `Shift+Alt+F`，或 `Ctrl+Shift+P` 后输入 `format code`
- 代码行缩进: `Ctrl+[` 、 `Ctrl+]`
- 在当前行下边插入一行 `Ctrl+Enter`
- 在当前行上方插入一行 `Ctrl+Shift+Enter`
- 上下移动一行： `Alt+Up` 或 `Alt+Down`
- 向上向下复制一行： `Shift+Alt+Up` 或 `Shift+Alt+Down`

## 2.光标相关

- 移动到定义处： `F12`
- 定义处缩略图：只看一眼而不跳转过去:`Alt+F12`
- 移动到文件结尾： `Ctrl+End`
- 移动到文件开头： `Ctrl+Home`
- 跳转到光标上一次(下一次)位置（误操作的回退方案，非常有用）` ctrl + Left / Ctrl + Right`

**注意：** 下面两个功能和alt+↑/↓配合，很方便的移动代码块：

- 选择从光标到行尾：`Shift+End`
- 选择从行首到光标处：`Shift+Home`

**注意：** 这两个功能很爽，可以同时编辑一些变量名：

- 多行编辑(列编辑)：`Ctrl+Alt+Down/Up`或者`Alt+Shift`+鼠标左键，可以批量选中文本并编辑
- 同时选中所有匹配： `Ctrl+Shift+L`
- `Ctrl+D` 下一个匹配的也被选中 (在 sublime 中是删除当前行，后面自定义快键键中，设置与 `Ctrl+Shift+K` 互换了)
- 回退上一个光标操作： `Ctrl+U`
- 删除光标右侧的所有字： `Ctrl+Delete`
- 扩展/缩小选取范围： `Shift+Alt+Left` 和 `Shift+Alt+Right`
- 多光标选取` Alt + 鼠标单击`
- 逐步选中其它相同的symbol `Ctrl + D`(已更改快捷方式为：`Ctrl+Shift+K`)
- 全选相同symbol` Ctrl + F12`
- 重构（重命名）Symbol `F2`
- 查找所有引用了选中symbol的代码 `Shift + F12`
- 跳转到symbol的定义处 `F12`
- 瞥见下symbol的定义出（在该symbol下方展开面板，显示定义处代码，非常有用）`Alt + F12`

## 3.重构代码

**注意：** 查看函数引用和批量休修改函数名，好用：

- 重命名：比如要修改一个方法名，可以选中后按 `F2`，输入新的名字，回车，会发现所有的文件都修改了
- 找到所有的引用： `Shift+F12`
- 同时修改本文件中所有匹配的： `Ctrl+F12`
- 跳转到下一个 Error 或 Warning：当有多个错误时可以按 `F8 `逐个跳转
- 查看 diff： 在 explorer 里选择文件右键 `Set file to compare`，然后需要对比的文件上右键选择 `Compare with file_name_you_chose`

## 4.查找替换

- 查找:`Ctrl+F`
- 查找替换:`Ctrl+H`
- 整个文件夹中查找:`Ctrl+Shift+F`

## 5.显示相关

- 全屏：`F11`
- 区域整块放大/缩小：`Ctrl +/-`
- 侧边栏显/隐：`Ctrl+B`
- 显示资源管理器:`Ctrl+Shift+E`
- 显示搜索:`Ctrl+Shift+F`
- 显示 Git:`Ctrl+Shift+G`
- 显示 Debug:`Ctrl+Shift+D`
- 显示 Output:`Ctrl+Shift+U`

## 6.其他

文件自动保存设置：`File` -> `AutoSave` ，或者 `Ctrl+Shift+P`，输入 `auto`

# （四）修改默认快捷键

打开默认键盘快捷方式设置：
`File`（文件） -> `Preferences`（首选项） -> `Keyboard Shortcuts`（键盘快捷方式），或者：`Alt+F` ->` p `-> `k`-> 回车。

修改` keybindings.json`：(这个是当时自己添加的)

   ```
   // ctrl+d 删除一行
    {
        "key": "ctrl+d",
        "command": "editor.action.deleteLines",
        "when": "editorTextFocus"
    },
    // 与删除一行的快捷键互换
    {
        "key": "ctrl+shift+k",
        "command": "editor.action.addSelectionToNextFindMatch",
        "when": "editorFocus"
    },
    // ctrl+shift+/多行注释
    {
        "key":"ctrl+shift+/",
        "command": "editor.action.blockComment",
        "when": "editorTextFocus"
    },
   ```
# （五）推荐插件
## 1.前端插件

- auto close tag 自动关闭HTML标签
- Auto Rename Tag：自动修改标签
- AutoFileNmae:auto complete file name，自动补全文件的名字
- Beautify:显示js/json/css美化，按`F1`
- Bracket Pair Colorizer 标记显示不同颜色的关联括号
- Color Info 显示颜色信息
- CSS Formatter css格式化工具
- Debugger for Chrome 谷歌调试工具（需要配置launch.json）
- Document This  添加备注信息（only supports JavaScript and TypeScript）`Ctrl+Alt+D` and again `Ctrl+Alt+D`
- filesize 文件大小提示
- GitLens 提示文件修改信息，具体到代码行
- Guides:显示代码对其辅助线
- HTML CSS Support css文件支持HTML标签提示
- HTML Preview 预览编译HTML文件
- HTML SCSS Support scss文件支持HTML标签提示
- HTML Snippets 支持HTML标签提示
- HTMLHint
- intellisense for css class names in html 支持HTML文件中类名提示
- JavaScript (ES6) snippets
- jQuery Code Snippets
- JS, CSS, HTML Formatting
- Live HTML Previewer
- markdownlint
- Npm Intellisense
- Path Intellisense: 路径匹配
- Path Autocomplete
- Vetur：VUE扩展
- PostCSS Sorting
- stylelint
- stylefmt
- ESLint
- javascript standard format
- Babel ES6/ES7
- Add jsdoc comments
- vue
- weex
- Reactjs code snippets
- React Native Tools
- Instant Markdown
- Markdown Shortcuts
- TextTransform
- Color Highlight:写csss时，颜色值会增加对应的颜色背景显示
- open in browser:  `alt+b`选择浏览器预览文件
- Rainbow Brackets：有颜色的显示括号匹配
- Settings Sync: 同步配置（需要配置GitHub的本地token key）

## 2.官网推荐插件
<CustomImage src='/growth-record/other/toolGuide/vscode-03.png' />

[点击跳转](https://marketplace.visualstudio.com/vscode)

## 3.推荐主题

<CustomImage src='/growth-record/other/toolGuide/vscode-04.png' />

[点击跳转](https://marketplace.visualstudio.com/search?target=VSCode&category=Themes&sortBy=Downloads)

**注：** 切换主题的快捷键：`f1` 或`ctrl+shift+p `输入theme 回车,上下切换：`ctrl+k`,`ctrl+t`。
- One Dark Pro
- Atom One Dark
- FlatUI
- Material Icon Theme: 图标主题
- vscode-icons
- VSCode Great Icons
- Dracula Official：主题，推荐

# （六）参考文献

- [打造性感好用的VS Code编辑器](https://segmentfault.com/a/1190000010750790)
- [Visual Studio Code 简明使用教程](https://www.w3cschool.cn/visualstudiocode/visualstudiocode-iy3422zb.html)
- [VScode中文文档](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/md/Overview.html)
- [Visual Studio Code 不完全使用指南](http://mrpeak.github.io/2015/07/02/vscode-guide/#%E4%BB%8D%E6%9C%89%E4%B8%8D%E8%B6%B3)
