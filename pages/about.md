---
layout: page
title: 有故事的我
description: 创造属于自己的世界
keywords: Du Shiwu, 杜世武
comments: true
menu: 关于
permalink: /about/
---

## It's me
于千万人之中遇见你所要遇见的人，

于千万年之中，时间的无涯的荒野里，

没有早一步，也没有晚一步，刚巧赶上了，

那也没有别的话可说，惟有轻轻地问一声：

“噢，你也在这里吗？”

—— 张爱玲 《爱》


我，一个不负流年，不负自己的前端程序员。创立此博客网站，是我大二暑假前期。目的是记录、总结自己的学习过程，分享、帮助像我一样学习前端及其他编程技术的学习建议参考，互相学习、一起进步，欢迎指正。

我一直坚信学习的技巧是动手，学习的灵魂是坚持，学习的态度是务实，学习的快乐是分享。从学习编程技术开始，一直摸爬滚打，四处碰壁的勇敢前行着，我没有编程的天赋，没有超乎常人的智商，没有前辈指导，一路学习过来，大部分都是心酸的过程，但是我无怨无悔，我知道自己没有别人聪明，也没有别人条件好。只能靠自己拼搏，靠自己无畏的前行。我就想在自己喜欢的领域，创造属于自己的小世界。我不怕辛苦，习惯了一个人的孤独，但有时候，真的会很烦， 没办法，想找到志同道合的人一起奋斗，真的、真的很难。但是，我相信自己，每天不断的学习，一定会成为前端大神，一定会在IT行业中有所作为，别忘了，我是有梦想的人！
很喜欢的一句话：

>年轻的时候就能找到自己喜欢并且干一辈子的事情是多么幸福多么令人羡慕啊。

不管未来怎么样，我想要成为前端高级开发工程师。为了这个梦想，而努力奋斗的少年！
唯愿一路风清，且行且珍惜。我一直在Coding...

## Contact me

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }})
{% endfor %}

## 全站关键字搜索

{% for category in site.data.skills %}
#### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
