---
title: Vue 优化技巧
date: 2023-10-29 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue 优化技巧
## 基础优化
class 动态值为数组时，这个数组可以是字符串值域对象值的组合
```javascript
 const arr = [
   // 字符串
   'foo bar',
   // 对象
   {
     baz: true
   }
 ]
```

watch 初始化执行函数替换
```javascript
// 原代码：
created() {
  this.getLimitData()
},

 watch: {
		refresh(val) {
			if (val) {
				this.getLimitData()
			}
		}
},

// 优化代码：
watch: {
	refresh: {
	 	// handler: 'getLimitData', // 适合监听值改变就调用（包括空值情况）
		// deep: true, // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
		handler: function (val, oldVal) {
			val && this.getLimitData() // 前提 val 属于基本类型（数字特殊，已知这个 val 是布尔类型）
		},
    immediate: true, // 该回调将会在侦听开始之后被立即调用
	}
}
```

## 学习资料
- [Vue 应用性能优化指南 - 掘金](https://juejin.cn/post/6844903677262561293)
- [我在项目中用实际用到的22个Vue优化技巧 - 掘金](https://juejin.cn/post/7005880217684148231#heading-17)
- [妙用computed拦截v-model，面试管都夸我细 - 掘金](https://juejin.cn/post/7277089907974422588?utm_source=gold_browser_extension)
- [使用Vue自定义指令实现右键菜单](https://juejin.cn/post/6902420248851382285)
- [基于Vue的前端架构，我做了这15点](https://juejin.cn/post/6901466994478940168)
- [vue文档里你没捡起来的宝藏 - 掘金](https://juejin.cn/post/6844903910881116174)
- [25个 Vue 技巧,学了这么久才知道还能这么用 - 掘金](https://juejin.cn/post/7098688018663342111)
