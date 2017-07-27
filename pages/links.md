---
layout: page
title: 安利牛人博客
description: 推荐的博客链接
keywords: 友情链接
comments: true
menu: 链接
permalink: /links/
---

> 我不能决定我能遇到什么样的人，但是我能选择什么样的朋友

{% for link in site.data.links %}
* [{{ link.name }}]({{ link.url }})
{% endfor %}
