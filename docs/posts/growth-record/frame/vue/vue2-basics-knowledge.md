---
title: Vue2 基础知识点（一）
date: 2018-07-07 20:04:01
tag:
 - Vue
categories:
 - 前端进击
---
# Vue2 基础知识点（一）
**本文针对自己学习官方文档时，总结一些易容易混淆的知识点做一下记录。欢迎指正或学习交流。**

### （一）常用基础知识点

1. `v-on:click=''`、`@click=''`、`:click=''` 三种写法；
 注意函数调用：直接使用双花括号调用函数是要使用函数名+括号，其他直接使用函数名即可，或使用函数名+括号（click 事件中）注意传参的函数必须带括号，可以不带参数，不然会报错对象空值；

2.  `v-if=''` 条件渲染与`v-show=''` 的区别：`v-if` 条件：不存在不会占位空间不会被渲染挂载；`v-show` 为真时，去掉 `display：none`，为假时显示`display：none`。默认会占用空间，会被渲染挂载。

3.  `v-for=''` 可以通过两组方式遍历数组（也可以遍历对象）：一种是通过数组下标；另一种是循环遍历；
  `v-for='user in users' 或 v-for='(user,index) in users'` 第二个参数是数组索引值；

```html
<p>v-for还可以渲染div</p>
<div v-for='(user,index) in users'>
  <h3>{{index+1}}</h3>
  <span>{{user.name}}---{{user.age}}</span>
</div>

<p>v-for使用template标签，这个标签不像div一样会被渲染出来，只渲染template里面的标签</p>
<template v-for='(user,index) in users'>
  <h3>{{index+1}}</h3>
  <span>{{user.name}}---{{user.age}}</span>
</template>

<p>遍历数组里面的对象，遍历两次</p>
<template v-for='(user,index) in users'>
    <div v-for="(item,key) in user" >
        <h5>{{item}}---{{key}}</h5>
    </div>
</template>
```

4. 数据双向绑定的两种方法：

```html
<p>双向数据绑定ref/$refs示例：input/select/textarea</p>
<label for="">姓名</label>
<!-- ref属性标记值，可获取 -->
<input type="text" v-on:keyup="logName" ref='refName'>
<span>您输入的名字为：{{name}}</span><br>
<label for="age">年龄</label>
<input type="text" v-on:keyup='logAge' id="age" ref="refAge">
<span>您输入的年龄为：{{age}}</span>

<p>双向数据绑定v-model示例：input/select/textarea</p>
<label for="">姓名</label>
<!-- ref属性标记值，可获取 -->
<input type="text" v-model='name'>
<span>您输入的名字为：{{name}}</span><br>
<label for="age">年龄</label>
<input type="text" v-model="age">
<span>您输入的年龄为：{{age}}</span>
   ```

	js部分：
```javascript
new Vue({
  el:'#vue-app',
  data:{
      name:'',
      age:''
  },
  methods:{
      logName:function(){
          // console.log("您正在输入名字~");
          // $refs获取标记的值，后面接命名值+value
          // console.log(this.$refs.refName.value);
          this.name=this.$refs.refName.value;
      },
      logAge:function(){
          // console.log("您正在输入年龄~");
          this.age=this.$refs.refAge.value;
      }
  }
})
```

5. `computed` 和 `methods` 方法：只要methods方法之一被调用，其他所有方法都会被渲染执行，很耗费性能；计算属性，只会调用相应的方法体，是应用于搜索，调用比较多的方法体。
