---
title: Webpack 基础语法
date: 2020-05-04 20:00:00
tags:
 - 前端工程化
 - Webpack
categories:
 - 前端进击web
---
#  Webpack 基础语法
## 一、基本命令
#### 1.1 安装
（1）快速初始化一个项目：`npm init -y` 其实就是省略了在执行 `npm init` 下一堆默认 yes 的操作项。

（2）安装 webpack 及 webpack-cli 命令行脚手架工具（在 webpack 4.0 后分两个项目）：`yarn add webpack webpack-cli -D`

（3）安装成功后，在根目录建一个 `webpack.config.js` 文件，这个是默认读取的配置文件：

<CustomImage src='/growth-record/engineering/webpack/jichuyufa01.webp' />

（3）初始化项目文件，根目录新建一个 `src` 文件夹，在这个文件夹下新建一个 `index.js` 文件：
<CustomImage src='/growth-record/engineering/webpack/jichuyufa02.webp' />

（4）配置 `webpack.config.js` 文件打包输出文件：
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后输出的位置
    filename: 'my-first-webpack.bundle.js' // 可以自定义，如服务端代码打包后命名：server.bundle.js , 客户端代码：app.bunlde.js
  }
};
```
（5）打包，执行 `npx webpack` 默认根目录生成 `dist` 文件夹：
<CustomImage src='/growth-record/engineering/webpack/jichuyufa03.webp' />

待更新🚀...
