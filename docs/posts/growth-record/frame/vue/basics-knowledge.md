---
title: Vue2 基础知识易错点
date: 2018-07-14 20:01:01
tag:
 - Vue
categories:
 - 前端进击
---
# Vue2 基础知识易错点
**学完vue2.0，在写代码啦官网的[方方老师的《Vue 自测题》](https://xiedaimala.com/courses/0d531a6f-40a7-4120-a8f6-9e816ff9d51c#/common)测试了一下，惨不忍睹，记录一下测试中的容易错误知识点及坑。**
<CustomImage src='/growth-record/frame/vue/basic-01.png' />

### （一）安装与介绍
1. v-bind绑定之问题
   html部分：

   ```
	   <div id="app">
	  <span ____________???____________>
	    鼠标悬停几秒钟查看此处动态绑定的提示信息！
	  </span>
	</div>
   ```
   js部分：
   ```
   var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
   ```
   问号处应该填入什么，才能使得 span 的 title 为 message 的值？

   答案是：
   (1).`:title="message"`；
   (2).`v-bind:title="message"`；
   (3).` :title=message`；
   (4).`v-bind:title=message`；
   后两种方法很迷，没找到解释，知道的小伙伴欢迎留言，建议答案都自己亲测试一下。

2. 关于不同版本的都是正确的说法：
   （1）如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版；
   （2）当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可；
   （3）运行时版本相比完整版体积要小约 30%；

### （二）实例与模板
1. `var vm = new Vue(options)`其中 options 是一个对象，请问文档中说 options 可以包含哪些 key ？

   答案是：
   （1） data props propsData computed methods watch
 （2）el template render renderError
 （3）beforeCreate created beforeMount mounted beforeUpdate updated activated deactivated beforeDestroy destroyed errorCaptured
 （4）directives filters components parent mixins extends provide inject
 （5）name delimiters functional model inheritAttrs comments

2. data数据问题
	   html
	```

	<div id="app">
	    <span class=span-a>
	      {{obj.a}}
	    </span>
	    <span class=span-b>
	      {{obj.b}}
	    </span>
	  </div>
	```
	   js
	```
	var app = new Vue({
	  el: '#app',
	  data: {
	    obj: {
	      a: 'a',
	    }
	  },
	})
	app.obj.a = 'a2'
	app.obj.b = 'b'
	```
       请问最终 span-a 和 span-b 中分别展示什么字符串？

       答案是：` span-a 中显示a2，span-b 中显示b`，注意不是显示undefined。

3. 文档中建议 Vue 实例的生命周期钩子不要写成箭头函数，给出的理由是什么

	   答：
	   （1）箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例；
	 （2）经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。

### （三）计算属性和侦听器
1. 如果 data属性是对象 obj.count，那么要如何写代码才能监听 obj.count 的变化？

   ```
   var app = new Vue({
  el: '#app',
  data: {
    obj:{count: 1},
    modified: 0
  },
  watch:{
    _______???________
      this.modified += 1
    }
  }
})

   ```
答案是：` 'obj.count':function(){`可以监听指定的对象属性

2. 如果data中的对象 obj 有 N 个属性，要怎么才能监听所有属性呢？
   ```
   var app = new Vue({
  el: '#app',
  data: {
    modified: 0,
    obj: {a:1,b:2,c:3}
  },
  created(){
      this.$watch('obj', ()=>{
        this.modified += 1
      }, ___________????_________)
  }
})

   ```
   答案是：
   ```
   watch(){
    obj:{
      handler(oldval,newval){
      console.log()
},
deep:true
}
}
   ```
   如果想监听obj对象中的b属性变化时才执行handler函数，可以使用计算属性computed做中间层，如：
   ```
	   var app = new Vue({
	  el: '#app',
	  data: {
	    modified: 0,
	    obj: {a:1,b:2,c:3}
	  },
	  created(){
	      this.$watch('obj', ()=>{
	        this.modified += 1
	      },
	      computed: {
	　　b() {
	　　　　return this.obj.b
	　　}
	},
		watch(){
	      b(oldval,newval){
	      console.log()
			}
		}

	})
   ```
