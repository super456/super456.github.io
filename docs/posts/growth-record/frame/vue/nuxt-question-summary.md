---
title: Nuxt 开发问题总结
date: 2020-07-11 20:00:00
tags:
 - Vue
 - Nuxt
categories:
 - 前端进击
---
# Nuxt 开发问题总结
## 内网部署开发环境部分资源加载失败
### 一、问题描述
构建完开发环境之后，打开域名一看，首页一些图片和样式没显示：
<CustomImage src='/growth-record/frame/vue/nuxt-question-01.png' />

打开控制台报错信息：
<CustomImage src='/growth-record/frame/vue/nuxt-question-02.png' />

查看报错信息是，确定是部分资源请求失败了，所以导致没有显示出来。

### 二、问题分析
经过查看调试后发现：服务器磁盘空间满了。因为磁盘空间满了会造成服务访问不可用。

### 三、解决方法
所以释放磁盘空间就可以了正常访问了。

## build、start 启动服务之后谷歌浏览器无法调试
### 一、问题描述
为了验证一个内网部署开发环境问题，需要本地构建和启动服务
```shell
# 打包项目
yarn build

# 启动项目服务监听
yarn start
```
该本地端口的项目已经停止服务了，但是谷歌浏览器可以访问到这个端口的静态服务（都是打包生成好的）
<CustomImage src='/growth-record/frame/vue/nuxt-question-03.png' />

然后问题出现了，启动本地这个项目的服务（已经关闭了上图的 start 服务了），修改了代码谷歌浏览器无法正常调试（没有任何效果），控制台 Console 一直报这个提示：
<CustomImage src='/growth-record/frame/vue/nuxt-question-04.png' />

重启电脑也没用（因为以为关闭端口后就好了的问题，但是查了电脑进程是没有这个端口服务的），但换个浏览器就可以，才发现是谷歌浏览器的。所以是谷歌浏览器的 PWA 问题。
### 二、问题分析
这个问题是在执行了 `yarn build` 之后，谷歌浏览器对访问这个项目服务注册了一个类似谷歌应用程序的工具，导致数据一直访问都是之前打包好的。跟谷歌浏览器的 Service Workers 自动设置也有关，保存了 SW 缓存数据，每次这个端口号都是返回这个缓存数据的服务。

### 三、解决方法
1、查看这个应用程序是否存在：
<CustomImage src='/growth-record/frame/vue/nuxt-question-05.png' />

2、关闭这个已经存在的应用程序服务：
<CustomImage src='/growth-record/frame/vue/nuxt-question-06.webp' />

## component 切换组件与插槽问题
### 一、问题描述
使用 `<component></component>` 根据默认设置 `current` 变量设置默认赋值及切换不同的组件时候，因为服务端渲染的原因，会报错误，且，组件内使用插槽，会重复渲染两次，但当 `current` 生命周期内切换就不会了。

<CustomImage src='/growth-record/frame/vue/nuxt-question-07.png' />

当 `current` 有默认值时候服务端报渲染错误（图上），组件内使用插槽，会重复渲染两次（图下）：
<CustomImage src='/growth-record/frame/vue/nuxt-question-08.png' />

### 二、问题分析
由于服务端渲染框架问题，页面在服务端就有生命周期执行，页面会开始初始化及数据，所以公共组件的激活组件名参数 `current` 有默认值的话，会使用渲染，但在客户端生命周期切换这个默认值的话，会在客户端渲染，这个不会报渲染错及插槽被渲染两次问题。

### 三、解决方法
将公共组件的激活组件名参数 `current` 默认值为空，在服务端就不会先渲染了，然后在客户端生命周期函数设置默认值即可。

## 客户端渲染报错问题
### 一、服务端和客户端所渲染的dom树不同造成错误。
> [https://github.com/yinxin630/blog/issues/31](https://github.com/yinxin630/blog/issues/31)

**报错内容：**
开发环境报错
[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside `<p>`, or missing `<tbody>`. Bailing hydration and performing full client-side render.
<CustomImage src='/growth-record/frame/vue/nuxt-question-09.png' />

dev 环境报错：
TypeError:n.setAttribute is not a function
<CustomImage src='/growth-record/frame/vue/nuxt-question-10.png' />

**排查手段：**
在相关页面通过关闭一些组件来寻找是否还是报错。一般问题是出现在**v-if**身上，本次错误是有个组件用了 `v-if` 判断，而该值又是在 `process.client` 之后才确定是 `false` 还是 `true`，导致服务端没渲染出这个，而客户端又有了这个，然后报错了。
<CustomImage src='/growth-record/frame/vue/nuxt-question-11.png' />

<CustomImage src='/growth-record/frame/vue/nuxt-question-12.webp' />

**解决手段：**
`v-if` 改为 `v-show` 即可。

**总结：**
1. 使用 Nuxt 时最好不要在 `created`（包括 `created`）之前做 DOM 相关内容的判断，这样才能保证服务端和客户端初次渲染时内容一致；
2. 在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树 (virtual DOM tree)，是否与从服务器渲染的 DOM 结构 (DOM structure) 匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。在生产模式下，此检测会被跳过，以避免性能损耗。所以开发模式下只是报错，而 dev 生产模式下直接就加载不出界面了

**其他：**
1. Nuxt 在 ssr 是会执行到 **created** 周期的，然后客户端也会从正常生命周期开始执行；
2. 可以通过判断 **process.client**，来让一些事件只在客户端执行；

额外内容可以看上面 Github 博文
