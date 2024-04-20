---
title: Vue3 学习参考
date: 2023-07-15 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue3 学习参考
大圣老师的 Vue3 学习知识点及路线：
<CustomImage src='/growth-record/frame/vue/vue3learning.webp' />

[中文官方文档](https://v3.cn.vuejs.org/)

浏览器在线运行框架环境练习：
- [Vitejs - Vite (forked) - StackBlitz](https://stackblitz.com/edit/vitejs-vite-hgrwco?file=index.html,src%2FApp.vue&terminal=dev)

### （一）新增特性
- [Vue.js 作者谈 Vue 3.0 beta 现状_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1eK4y1k7BP)
- [焕然一新的 Vue 3 中文文档要来了🎉 - 掘金](https://juejin.cn/post/7077701166397653028#heading-18)

其他新特性学习资料：
- [《Vue3.0抢先学》系列](https://www.jianshu.com/p/51dc95aa6eea)
- [全面总结Vue3.0的新特性](https://juejin.cn/post/6968094627375087653?utm_source=gold_browser_extension)
- [2022年必会Vue3.0学习 （强烈建议） - 掘金](https://juejin.cn/post/7057325585705467918)
- [`Vue3 + <script setup> + Typescript` 使用手册 - 掘金](https://juejin.cn/post/6966502107230765070)
- [Vue3 + TS 最佳实践 - 掘金](https://juejin.cn/post/7001897686567747598)
- [Vue3 + TSX 最佳实践？不存在的 - 掘金](https://juejin.cn/post/7007731144418394149/)
- [https://juejin.cn/post/6950487211368251399](https://juejin.cn/post/6950487211368251399)
- [Vue3 的学习教程汇总、源码解释项目、支持的 UI 组件库、优质实战项目 - 掘金](https://juejin.cn/post/6920070789614501896)
- [为什么我推荐使用JSX开发Vue3 - 掘金](https://juejin.cn/post/6911175470255964174)
- [还不会Vue3？一篇笔记带你快速入门 - 掘金](https://juejin.cn/post/7006518993385160711)
- [Vue3.2 setup语法糖、Composition API、状态库Pinia归纳总结 - 掘金](https://juejin.cn/post/7006108454028836895)
- [让你30分钟快速掌握vue 3 - 掘金](https://juejin.cn/post/6887359442354962445)
- [Vue3 `<script setup lang=“ts”>` 使用指南 - 掘金](https://juejin.cn/post/7052531217333223437)

### （二）源码学习
- [Vue 源码中的工具函数](https://segmentfault.com/a/1190000042073070)
- [VueUse Collection of Vue Composition Utilities](https://vueuse.org/)

### （三）知识点学习
[大爱Vue3.3！从此父子组件双向绑定不再是烦恼！](https://mp.weixin.qq.com/s/dsirWaQHH2EGGG94d58JOg)

```typescript
import { computed } from 'vue'

export const useModel = <P extends object, K extends keyof P, Name extends string>({ props, key, emit }: { props: P, key: K, emit: (name: Name, ...args: any[]): void }) => {
  return computed({
    get () {
      return props[key]
    },
    set (value) {
      emit[`update:${key.toString()}` as Name, value]
    }
  })
}

```

其他学习资料：
- [花了一天的时间，地板式扫盲了vue3所有API盲点 - 掘金](https://juejin.cn/post/7164159759619194893)
- [分享 15 个 Vue3 全家桶开发的避坑经验 - 掘金](https://juejin.cn/post/7084536432731095048)
- [Vue3又出新语法 到底何时才能折腾完？ - 掘金](https://juejin.cn/post/7044077808259170312)
- [Vue3拒绝写return，用setup语法糖,让写Vue3更畅快 - 掘金](https://juejin.cn/post/7078865301856583717)
- [5个知识点，让 Vue3 开发更加丝滑 - 掘金](https://juejin.cn/post/7054317318343491615)
- [https://github.com/su37josephxia/vue3-study](https://github.com/su37josephxia/vue3-study)

### （四）第三方依赖库学习
- [VueRequest 一个 Vue 请求库](https://www.attojs.com/)

### （五）第三方组件库学习
- [Naive UI](https://www.naiveui.com/zh-CN/os-theme)
- [website](https://e3.shengxinjing.cn/#/)
- [Tyh Ui | Vue3 组件库](https://tianyuhao.cn/v3/#/)
- [GitHub - Maronato/vue-toastification: Vue notifications made easy!](https://github.com/Maronato/vue-toastification#readme)
- [被尤雨溪推荐，这款开箱即用的Vue3组件库做对了什么 - 掘金](https://juejin.cn/post/7075162881498562590)
- [Histoire](https://histoire.dev/)

### （六）项目工程搭建学习
- [vite + vue3 + setup + pinia + ts 项目实战 - 掘金](https://juejin.cn/post/7041188884864040991)
- [Vite+Vue3+NaiveUI+Pinia搭建一套优雅的后台管理模板，真香 - 掘金](https://juejin.cn/post/7063024498152308750)
- [[项目篇]vue3 + vite + vant + typescript - 第一天 - 掘金](https://juejin.cn/post/6978324260372611080)
- [🎉🎉🎉 一个基于vue3+vite+ts的完整项目 - 掘金](https://juejin.cn/post/6881795051492474893)
- [万字长文详解从零搭建企业级 vue3 + vite2+ ts4 框架全过程 - 掘金](https://juejin.cn/post/7069315908597973023)
- [Vue3 全家桶 + Element Plus + Vite + TypeScript + Eslint 项目配置最佳实践 - 掘金](https://juejin.cn/post/6924687052005081095)
- [Vite2+Vue3+TypeScript：搭建企业级轻量框架实践 - 掘金](https://juejin.cn/post/7052593172613955614)
- [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境 - 掘金](https://juejin.cn/post/6951649464637636622)
- [Vite2 + Vue3 + TypeScript + Pinia 搭建一套企业级的开发脚手架【值得收藏】 - 掘金](https://juejin.cn/post/7036745610954801166)

### （七）面试题学习
- [N个Vue知识点，必会!!! 供复习 - 掘金](https://juejin.cn/post/7073300624707682317)
- [最全的 Vue 面试题+详解答案 - 掘金](https://juejin.cn/post/6961222829979697165)
- [用vue想要拿20k，面试题要这样回答（源码版） - 掘金](https://juejin.cn/post/7017693252820303903)
- [深入剖析：Vue核心之虚拟DOM - 掘金](https://juejin.cn/post/6844903895467032589)
