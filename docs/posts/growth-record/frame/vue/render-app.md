---
title: 'Vue-CLI2 中的 render: h => h(App) 解析'
date: 2018-07-08 20:08:08
tag:
 - Vue
categories:
 - 前端进击
---
# Vue-CLI2 中的 render: h => h(App) 解析
**对于这个，可能es6语法不熟的人很容易产生懵懂，因为我也不熟，所以记录一下，毕竟这也是个重要的知识点。**

### （一）遇到的问题代码：
```
new Vue({
  el: '#app',
  router,//实例化，表示会使用
  render: h => h(App)//vue2.0写法

  //以下是vue1.0的写法
  //components: { App },//注册组件信息
 // template: '<App/>'//简写的模板调用组件的标签
})

```
官方的解释很全面但是不是很容易理解：[createElement 参数](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5-data-%E5%AF%B9%E8%B1%A1)

### （二）代码分解
将`render: h => h(App)` 根据es6语法分解为：

 `render: h => h(App);`
===
等价于

`render: h => {return h(App);}`
===
等价于

` render: function(h) { return h(App);}`
===
等价于
` render: function(createElement) { return createElement(App);  }`
===

### （三）解析一下这个vue2.0渲染过程：
render函数用来渲染视图，也提供给`el`挂载，所以使用render函数就是为了页面显示出来。

1.render 方法是一个函数，在接受传入的参数 h 函数后，返回 `h(App)` 的函数调用结果。

2.在创建 vue 实例时，通过调用 render 方法来渲染实例页面的 DOM 结构。

3.当vue 在调用 render 方法时，会传入一个 createElement 函数作为参数，h 的实参是 createElement 函数，然后 createElement 会以 `App`为参数进行调用。

### （四）写一个createElement函数的demo
创建一个组件，使用createElement函数调用
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>createElement方法应用</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
    <p>下面会使用createElement方法创建DOM结点</p>
    <div id="vue-app"></div>
    <script type="text/javascript">
        var app=Vue.component('app',{
            template:'<h1>test</h1>'
        })
        new Vue({
            el: '#vue-app',
            render: function (createElement) {
                // return createElement('h1', '一则头条');//这个方式也可以
                return createElement(app);//使用调用组件
            },

        });
    </script>
</body>

</html>
```
运行结果是：
<CustomImage src='/growth-record/frame/vue/render-app.png' />
