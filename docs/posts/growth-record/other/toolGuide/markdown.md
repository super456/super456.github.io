---
title: 常用的 Markdown 语法格式来编写文章
date: 2018-06-23 20:02:01
tag:
 - 工具指南
categories:
 - 前端进击
---
# 常用的 Markdown 语法格式来编写文章
**注：本教程需要一点对markdown语法格式的了解，什么都不知道的，请直接看[献给写作者的 Markdown 新手指南][02]的参考资料，再来看本文，会更好的去学习。**

## 基本排版格式

### (一) 目录编辑

1. 导航目录链接制作,一般使用二级、三级标题格式(需要解析)

   第一种方式获取标题：

   ```md
     * TOC
     {:toc}
   ```

2. 小标题无序目录(注意空格)

   ```md
   * 目录一
   * 目录二
   ```

3. 小标题有序目录(注意空格)

   ```md
   1. 目录一
   2. 目录二
   ```

4. 锚点链接(注意英文字符)

   ```md
   [目录](#目录)
   [Fork 指南](#fork-指南)
   ```

### (二) 链接表示

1. 基本插入链接表示：
   * 网址链接：`[跳转名](https://xxx.github.io)`
   * 本地图片链接(最好使用图床网站获取图片url)： `![](/images/wiki/eclipse-need-java6.png)`
   * 待定链接：`[这个链接跳转不了](#)`

2. 统一的的链接跳转方式(为了排版好看一点)：

   ```md
   参考：[mpv keybindings][0]
   参考：[OPTIONS][1]
   参考：[MPV使用小记][2]

   [0]: https://github.com/mpv-player/mpv/blob/master/etc/input.conf
   [1]: https://github.com/mpv-player/mpv/blob/master/DOCS/man/options.rst
   [2]: https://segmentfault.com/a/1190000004533079
   ```

3. 快捷插入网址链接表示形式：`<http://example.com>`

### (三) 表格排版

4. 表格排版参考(注意空行)

   ```md
    | 功能     | 快捷键 for win  | 快捷键 for mac |
   |:---------|:---------------|:---------------|
   | Project  | M-1            | Cmd-1          |
   | Terminal | M-F12          | M-F12          |
   | Editor   | Esc            | Esc            |
   ```

   **注意：**`:---------` 表示文字居左显示，`:---------:` 表示文字居中显示，`---------:` 表示文字居右显示。

### (四) 文字处理

1. 分割线
   * 第一种方式：`-----`
   * 第二种方式：`***`

   效果展示：

   ***

2. 删除线：`~~删除线~~` ，效果展示：~~删除线~~

3. 斜体：`*斜体*` ，效果展示：*斜体*

4. 表情插入(需要解析)

   ```md
   :camel:
   :blush:
   :smile:
   ```

   [表情语法专属官网](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

5. 脚注提醒(需要解析)

   This is a text with footnote[^1].

   [^1]: Here is the footnote 1 definition.

6. 键盘键显示(需要解析)： `<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>`

   效果展示：<kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>

7. 电子邮箱输入：`<1111111111@qq.com>` ，效果展示：<1111111111@qq.com>

8. 代办列表: 表示列表是否勾选状态

   ```md
   - [ ] 不勾选
   - [x] 勾选
   ```

9. 上下标(需要解析)

   `\^` 表示上标, `_` 表示下标。如果上下标的内容多于一个字符，要用{}把这些内容括起来当成一个整体。上下标是可以嵌套的，也可以同时使用。 例如：

   `x^{y^z}=(1+{\rm e}^x)^{-2xy^w}` ，效果展示：`x{yz}=(1+{\rm e}x){-2xy^w}`(解析有问题，需要装插件)

10. 添加下划线： `php\_gd2.dll` ，效果展示： php\_gd2.dll

11. 笔记本和标签(部分编辑器支持)： `@(示例笔记本)[标签1|标签2|标签3]` 。

### (五) 引用

1. 区块引用可以嵌套，只要根据层次加上不同数量的 > ：

   ```md
   > 这是第一级引用。
   >
   > > 这是第二级引用。
   >
   > 现在回到第一级引用。
   ```

2. 引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：

   ```md
   > ## 这是一个标题。
   >
   > 1. 这是第一行列表项。
   > 2. 这是第二行列表项。
   >
   > 给出一些例子代码：
   >
   > return shell_exec("echo $input | $markdown_script");
   ```

3. 如果要在列表项目内放进引用，那 `>` 就需要缩进：

   ```md
   *  Coding.net有以下主要功能:

    > 代码托管平台
    > 在线运行环境
    > 代码质量监控
    > 项目管理平台
   ```

### (六) 简单的图形

1. 代码图形

   ```md
   +-------------+                    +-------------+
   |             |        ...         |             |
   +-------------+                    +-------------+
   |             |                    |             |
   +-------------+                    +-------------+
   | format str1 | <-- esp            | format str2 | <-- esp
   +-------------+                    +-------------+
   | double low  |                    |     int     |
   +-------------+                    +-------------+
   | double high |                    | double high |
   +-------------+  main stack frame  +-------------+
   |     ...     |                    |     ...     |
   +-------------+                    +-------------+
   |             |                    |             |
   +-------------+                    +-------------+
   |   (%ebp)    | <-- ebp            |   (%ebp)    | <-- ebp
   +-------------+                    +-------------+
   ```

2. 构建文件夹图形

   ```md
   app/src/main
   ├─assets
   ├─java
   │  ├─android
   │  │  └─content
   │  │      └─pm
   │  └─org
   │      └─mazhuang
   │          └─easycleaner
   └─res
      ├─drawable
      ├─layout
      ├─menu
      ...
   ```

### (七) 代码语法

1. 单行代码语法：两个 \`，中间输入内容

2. 多行代码语法(注意前后空行)：第一行输入三个 \` 然后最后一行再输入三个

3. 简单的语法高亮

   ```sh
   git checkout -b test 5234ab
   ```

   ```python
   print 'Hello, World!'
   ```

4. 代码高亮语言标识符支持的语法

   支持的有 `javascript（js）、cpp、makefile、vbnet、xml、c、java、cl、vim、sh、yaml、markdown(显示原语法格式)、html、vb、python` 等等

##  参考文献

- (1)、[中文文案排版指北（简体中文版）][01]
- (2)、[献给写作者的 Markdown 新手指南][02]
- (3)、[Markdown语法介绍][03]
- (4)、[Markdown 语法说明 (简体中文版)][04]
- (5)、[马克飞象-在线编辑器][05]

[01]: http://mazhuang.org/wiki/chinese-copywriting-guidelines/
[02]: http://www.jianshu.com/p/q81RER
[03]: https://coding.net/help/doc/project/markdown.html#section-2
[04]: http://www.appinn.com/markdown/
[05]: https://maxiang.io/
