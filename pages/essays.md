---
layout: page
title: 随笔
description: 记录自己的随心所意——杂烩
keywords: 随笔, essays
comments: false
menu: 随笔
permalink: /essays/
---

> 记多少命令和快捷键会让脑袋爆炸呢？

<ul class="listing">
{% for essays in site.essays %}
{% if essays.title != "essays Template" %}
<li class="listing-item"><a href="{{ essays.url }}">{{ essays.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
