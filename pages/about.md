---
layout: page
title: About
description: 创造属于自己的世界
keywords: Du Shiwu, 杜世武
comments: true
menu: 关于
permalink: /about/
---

于千万人之中遇见你所要遇见的人，

于千万年之中，时间的无涯的荒野里，

没有早一步，也没有晚一步，刚巧赶上了，

那也没有别的话可说，惟有轻轻地问一声：

“噢，你也在这里吗？”

—— 张爱玲 《爱》

>年轻的时候就能找到自己喜欢并且干一辈子的事情是多么幸福多么令人羡慕啊。

我，一个不负流年，不负自己的前端程序员。我一直在Coding...

## 联系Me

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }})
{% endfor %}

## Skill Keywords

{% for category in site.data.skills %}
### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
