---
layout: categories
title: 分类
description: 我的分类博文库
keywords: 分类, 博文分类, categories
comments: false
menu: 分类
permalink: /categories/
---

>主要是技术博文分类，指明标签，简单明了，容易选择

<section class="container posts-content">
{% assign sorted_categories = site.categories | sort %}
<!--循环输出博文标签  -->
{% for category in sorted_categories %}
<h3>{{ category | first }}</h3>
<ol class="posts-list" id="{{ category[0] }}">
<!--循环输出标签内的博文  -->
{% for post in category.last %}
<li class="posts-list-item">
<!-- <span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span> -->
<span class="posts-list-meta">{{ post.date | date_to_long_string }}</span>
<a class="posts-list-name" href="{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ol>
{% endfor %}
</section>
<!-- /section.content -->
