---
title: 前端导航
description: 关于前端开发的导航及工具推荐
recommend: false
sidebar: false
readingTime: false
layoutClass: m-nav-layout
---

<script setup>
import { NAV_DATA, getNavDataCount } from './categories'
const navCountInfo = getNavDataCount()
</script>
<style src="./index.scss"></style>

# 前端导航

:::tip
共收录资源：分类 {{ navCountInfo.categoryNum }} 个、内容 {{ navCountInfo.total }} 个

持续更新中🎉🚀...
:::

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
---
**感谢[茂茂物语](https://notes.fe-mm.com/nav)提供支持🌹**
