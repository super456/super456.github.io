---
title: 微信小程序之 swiper 组件上传图片删除后其余不显示
date: 2018-09-20 20:00:00
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序之 swiper 组件上传图片删除后其余不显示
这个不知道是不是微信小程序官方的问题，简单描述一下遇到的问题：在使用swiper组件来预览显示用户上传的多张图片后，右上角有一个可以删除图片的按钮，用户可以点击删除符号删除上传的图片。**重点是**顺时针点击删除图片和删除中间的指定图片，都其余图片显示没问题。**唯独**删除最后一张图片，问题就来了，排序前面的图片显示不出来（空白）；但是可以查到图片组件还有图片地址的？？？（真机环境也测试过，问题效果是一样的）
### （一）问题详情
1、问题效果图：
<CustomImage src='/growth-record/platform/applet/swiper-image-no-01.gif' />

上传了三张图片，通过swiper组件显示出来，右上角的是删除符号操作，右边中间数字是当前索引值；
首先是点击删除第一张图片，后面图片正常显示并将第二张图片归为第一张，索引值也变为0；（三张图片变为两张）
再次点击删除的是两张图片中的第二张（索引值为1的），结果剩下显示的一张图片，为空白，查了图片地址显示没问题；如图：
<CustomImage src='/growth-record/platform/applet/swiper-image-no-02.png' />

### （二）问题分析
通过网上找资料和尝试排错，原来是小程序组件的属性这个问题导致的。

因为使用的是swiper组件，会有一个属性：`current` 表示当前所在滑块的 index值，默认为0，类型为Number；
也就是说，当你删除图片的时候，`current`不会改变，就是说：本来有三张图片的图片数组，默认显示第一张的话，`current='0'`；当删除第一张图片后，图片数组会发生变化，但`current='0'`是不变的，只要图片数组有值就会默认显示图片数组第一张图片（正常显示）；

所以，（三张图片的图片数组）当前显示第二张，`current='1'`；如果你删除第二张后，图片数组还有两张，就会显示原来是第三张的图片（当前显示的索引值为1），当你再删除当前这一张图片后，`current='1'`还是不变，但图片数组只有一张（索引值为0），就是索引值不存在了。
嗯嗯，就是这样，这就是为什么从后面删除数组图片（逆时针）时会导致显示空白的，但图片地址存在的问题。

### （三）解决方法
1、动态设置swiper组件的属性current值：
`swiperCurrentIndex`默认为0

```html
      <swiper autoplay='false' current='{{swiperCurrentIndex}}' indicator-dots='true' circular='true' bindchange='goSettingCurrentIndex'>
```
2、swiper组件要设置bindchange触发事件（current 改变时会触发 change 事件），主要是防止用户是逆时针删除图片所导致的现象：

```js
const that = this
that.setData({
  swiperCurrentIndex: e.detail.current
})
```
3、点击删除图片的操作：（这里有个注意点，就是data的数组值的长度会跟被赋值的arrayImg裁剪后的长度一样，这个不是简单赋值操作哈）

```js
const that = this
const index = e.currentTarget.dataset.index
const arrayImg = that.data.defaultAddImg
arrayImg.splice(index, 1)
if (arrayImg.length == 0) {
  // 图片已经删除完了
  that.setData({
    isShowUploadImgs: false, // 显示上传图片按钮
  })
}
else {
  // 还有图片
  if (arrayImg.length == index) {
    // 判断用户删除的图片是不是图片数组内的最后一张，是则将swiper的current值为图片数组长度减一，可以保证显示上一张图片
    that.setData({
      defaultAddImg: arrayImg,
      swiperCurrentIndex: that.data.defaultAddImg.length - 1
    })
  }
  else {
    // 删除的图片不是图片数组内的最后一张，这样可以保证当前显示下一张图片
    console.error('删除的图片不是图片数组内的最后一张')
    that.setData({
      defaultAddImg: arrayImg
    })
  }
}
```
需要完整示例的可以私聊或留言，这个是工作中遇到的问题，暂时不方便放完整代码哈。
