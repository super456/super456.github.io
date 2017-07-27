---
layout: page
title: essays
description: 记录自己的随心所意——杂烩
keywords: 随笔, essays
comments: false
menu: 随笔
permalink: /essays/
---

<!--随笔页面代码设置  -->
> 随心、随性、随意、随缘，有感而发，闲谈乱扯，莫怪莫怪...

<ul class="listing">
{% for essays in site.essays %}
{% if essays.title != "essays Template" %}
<li class="listing-item"><a href="{{ essays.url }}">{{ essays.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
