---
title: Node.js Corepack 使⽤指南
date: 2023-12-26 20:04:06
tag:
 - Node
categories:
 - 前端进击
---
# Node.js Corepack 使⽤指南
Corepack 是 Node.js 推出的包管理器的管理器。类似于 nvm 可以一行命令安装、切换 Node.js 的版本，Corepack 可以一行命令安装、切换 npm / yarn / pnpm 的版本。Corepack 还有一个特性，就是能够读取项目的 packge.json 中的 pacakgeManager 字段，从而自动切换到对应版本的包管理器，防止⾃动切换包管理器导致依赖⽬版本不⼀致问题

## 背景
Node.js Corepack 项⽬管理 yarn / npm / pnpm 问题了，推荐⼤家⽤起来，⾮常适合团队杂七杂⼋的
项⽬各种版本对不⻬问题，导致安装依赖、lock ⽂件参差不⻬问题。⽽且⿎励⼤家项⽬ package.json
要设置 "packageManager": "xxx@x.x.x"，避免后续项⽬新⼈维护版本依赖安装问题

## 使⽤
### 安装
1. 检查 Node.js 版本，Corepack 默认与 Node.js 14.19.0 和 16.9.0 一起分发，所以保证 Node.js 版本大于等于 16.9.0，无需自行安装 Corepack，终端输入 `corepack` 成功结果如下：
  <CustomImage src='/growth-record/frame/node/corepack-01.png' />

### 项目使⽤
⽐如 pnpm 版本：
- 全局的 pnpm 版本：
  <CustomImage src='/growth-record/frame/node/corepack-02.png' />
- 针对某个项⽬ package.json 使⽤对应的包管理器版本：
  <CustomImage src='/growth-record/frame/node/corepack-03.png' />

  <CustomImage src='/growth-record/frame/node/corepack-04.png' />

- 没有设置的话会默认⾛全局设置的版本：
  <CustomImage src='/growth-record/frame/node/corepack-05.png' />

## 其他问题
还遇到个问题就是：
如果有使⽤ nvm 或 n 管理 node 版本的或两者混⽤的（⽐如我），可能会有 pnpm 依赖版本问题，⽐
如删除pnpm，执⾏命名： npm uninstall -g pnpm，但 pnm 还是会存在，因为 node 管理版本导致
pnpm 查询全局安装路径不⼀致问题，也就是你删除的是 n 管理下 node 的 pnpm 但是 nvm 下⼜是另
⼀个的 pnpm 版本路径，你可以删除⼿动删除 pnpm 全局依赖：

执⾏命令：which pnpm：
  <CustomImage src='/growth-record/frame/node/corepack-06.png' />

记得这个也要删除（pnpm pnpx），不然会导致 pnpm ⼀直安装不上：
  <CustomImage src='/growth-record/frame/node/corepack-07.png' />

## 参考资料
- [pnpm Error: Cannot find module ‘C:\Users\AppData\Roa..\npm\pnpm￾glob\4\node_modules\pnpm\bin\pnpm.js](https://blog.csdn.net/bigPatrickstar/article/details/123600329)
- [安装 | pnpm](https://pnpm.io/zh/installation#疑难解答)
- [Node.js Corepack - 掘⾦](https://juejin.cn/post/7111998050184200199)
- [前端包管理和 corepack - 周明杰 - 博客园](https://www.cnblogs.com/zhoumingjie/p/15862357.html)
- [pnpm 版本切换 - lessfish - 博客园](https://www.cnblogs.com/lessfish/p/16908785.html)
- [pnpm2023 年了，该尝试⽤ Corepack 安装 pnpm 了 | ⼩灰灰灰灰的博客](https://blog.lyh543.cn/posts/2023-04-28-install-pnpm-by-corepack.html)
- [使⽤ volta 与 corepack 规范团队在不同项⽬中使⽤的 node 版本与 npm 包管理器](https://segmentfault.com/a/1190000043979300#item-3-6)
- [使⽤npm命令⾏更新版本号 - 掘⾦](https://juejin.cn/post/6948343013529780237)
