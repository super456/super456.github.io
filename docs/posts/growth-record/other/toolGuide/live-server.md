---
title: Web 服务器 live-server 的安装及使用
date: 2018-07-10 20:04:09
tag:
 - 工具指南
categories:
 - 前端进击
---
# Web 服务器 live-server 的安装及使用
**在写一下简单的项目或学习一些技术的练习，没有服务器的话，每次写的代码都需要手动刷新浏览器。有点无奈，但是如果你安装了这个`live-server` 服务器就可以不用手动刷新，实时预览自己写的代码了。**

live-server是一个具有实时重载功能的小型开发服务器。用它来热加载HTML / JavaScript / CSS文件，但不能用于部署最终的网站系统。

### （一）安装
1.前提条件需要node.js和npm的依赖（可以自己先搞定，不难）；
2.使用npm全局安装：`npm install -g live-server  `（本人使用淘宝镜像安装的）
<CustomImage src='/growth-record/other/toolGuide/live-server-01.png' />

### （二）使用
1.需要在你使用的项目根目录下启动：`liver-server`（本人使用git，在指定目录下右击->git bash here后使用启动命令即可）
<CustomImage src='/growth-record/other/toolGuide/live-server-02.png' />

2.启动成功，网页自动弹项目目录出来；
<CustomImage src='/growth-record/other/toolGuide/live-server-03.png' />

3.退出该服务器，在命令行使用：`ctrl+c`

### （三）简单的配置
1.默认端口号为8080，如果想修改，最简单的方式是启动的时候添加启动参数：`live-server --port=8081` 即可
<CustomImage src='/growth-record/other/toolGuide/live-server-04.png' />

2.`live-server --参数` 列表
```
--port=NUMBER - select port to use, default: PORT env var or 8080
--host=ADDRESS - select host address to bind to, default: IP env var or 0.0.0.0 (“any address”)
--no-browser - suppress automatic web browser launching
--browser=BROWSER - specify browser to use instead of system default
--quiet | -q - suppress logging
--verbose | -V - more logging (logs all requests, shows all listening IPv4 interfaces, etc.)
--open=PATH - launch browser to PATH instead of server root
--watch=PATH - comma-separated string of paths to exclusively watch for changes (default: watch everything)
--ignore=PATH - comma-separated string of paths to ignore (anymatch-compatible definition)
--ignorePattern=RGXP - Regular expression of files to ignore (ie .*\.jade) (DEPRECATED in favor of --ignore)
--middleware=PATH - path to .js file exporting a middleware function to add; can be a name without path nor extension to reference bundled middlewares in middleware folder
--entry-file=PATH - serve this file (server root relative) in place of missing files (useful for single page apps)
--mount=ROUTE:PATH - serve the paths contents under the defined route (multiple definitions possible)
--spa - translate requests from /abc to /#/abc (handy for Single Page Apps)
--wait=MILLISECONDS - (default 100ms) wait for all changes, before reloading
--htpasswd=PATH - Enables http-auth expecting htpasswd file located at PATH
--cors - Enables CORS for any origin (reflects request origin, requests with credentials are supported)
--https=PATH - PATH to a HTTPS configuration module
--proxy=ROUTE:URL - proxy all requests for ROUTE to URL
--help | -h - display terse usage hint and exit
--version | -v - display version and exit
```

3.也可以把配置放在package.json的scripts下的server中，这样不用每次都命令行使用参数，然后使用命令行启动：`npm run server`（如何创建一个带package.json包的项目请看下一步）
```
"scripts": {
  "server": "live-server ./ --port=8081"
}
```
4.创建一个带package.json包的项目，在项目根目录下使用命令行：`npm init`，可以自己设置
```
package name: (0710) demo
version: (1.0.0)
description: live-server的练习
entry point: (index.js)
test command:
git repository:
keywords:
author: 猿来独往
license: (ISC)
About to write to D:\GitHub_Repository\Clone_Files\vue-study\0710\package.json:

{
  "name": "demo",
  "version": "1.0.0",
  "description": "live-server的练习",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "猿来独往",
  "license": "ISC"
}

Is this OK? (yes)

```
然后使用第三步的配置，运行该项目就使用：`npm run server`
<CustomImage src='/growth-record/other/toolGuide/live-server-04.png' />

**注意：如果浏览器不能实时自动刷新页面，可以试试用这个命令启动（亲测有效）：`live-server`**
