---
title: wux-weapp 的微信小程序筛选框：FilterBar 组件分析
date: 2018-07-12 20:08:01
tag:
 - 微信小程序
categories:
 - 前端进击
---
# wux-weapp 的微信小程序筛选框：FilterBar 组件分析
本来是一个GitHub上wux-weapp组件的筛选框，但是整个项目过于系统化，想提取某个组件都是有点难度的，首先要看得懂某个组件的整个生命逻辑，所以自己也是摸索过来的，便简单的提取了wux-weapp组件的FilterBar筛选框的部分功能，满足个人需求及分享一下。

### （一）原组件信息
原组件是GitHub上的wux - 微信小程序自定义组件可以实现对话框、指示器、五星评分等22种功能。[点击这里跳转查看原组件](https://github.com/skyvow/wux)
![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-home.csdnimg.cn/images/20230724024159.png?origin_url=http%3A%2F%2Fpbr0erxxq.bkt.clouddn.com%2Fwux-filterbar%2F01.png&pos_id=img-KhgIsTyo-1713669973542)

### （二）原组件筛选框
![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-home.csdnimg.cn/images/20230724024159.png?origin_url=http%3A%2F%2Fpbr0erxxq.bkt.clouddn.com%2Fwux-filterbar%2F02.gif&pos_id=img-pRr6Lhzp-1713669973543)

### （三）提取的组件
主要提取了筛选框页面中通过点击某个字或按钮右侧弹出的方式，方便个人将该组件放在任意需要的位置。
![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://img-home.csdnimg.cn/images/20230724024159.png?origin_url=http%3A%2F%2Fpbr0erxxq.bkt.clouddn.com%2Fwux-filterbar%2F03.gif&pos_id=img-P7dyJqz6-1713669973544)

[下载代码](https://github.com/super456/simpleFilterbar)

简单的分享，各取所需吧。
