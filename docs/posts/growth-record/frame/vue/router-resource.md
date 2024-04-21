---
title: Vue-CLI2 中的 Vue-Router 和 Vue-resource 实战
date: 2018-07-09 20:04:01
tag:
 - Vue
categories:
 - 前端进击
---
# Vue-CLI2 中的 Vue-Router 和 Vue-Resource 实战
**简单记录一下这两个插件的使用方法，写了一个demo，方便理解及应用。**
### （一）安装vue-cli2.x脚手架
如果还没安装的，或安装过程不熟的，可以参考这篇文章教程，写的很详细——[Vue2.0史上最全入坑教程（上）—— 搭建Vue脚手架（vue-cli）](https://www.jianshu.com/p/1626b8643676/)，这个文章作者真的很用心，向他学习。

### （二）安装vue-router和vue-resource插件
如果在安装脚手架的时候安装了vue-router，可以直接跳转到安装vue-resource。
如果不是的，可以使用命令：`cd <项目文件夹>` 切换到项目文件夹路径下，然后使用命令行安装：`npm install vue-router --save` 和`npm install vue-resource --save`

这里说明一下安装`npm install 插件 +[参数]`，表示的意思：
1.使用：`npm install 插件`   ：会把这个插件安装到node_modules目录中，但不会修改package.json内容；

2.`npm install 插件 --save`  ：在项目发布上线之后还会依赖用到的插件，没有这个插件，项目不能正常的运行，自动更改package.json内容  ；

3.`npm install 插件 --save-dev `：把插件安装到开发依赖中，项目上线之后不会用到的插件，针对个别插件，比如说这个“babel-loader”，是在项目编译解析完成后发布就没用到了的，自动更改package.json内容；

### （三）使用vue-router+vue-resource写一个跳转请求页面数据的demo
1.先看一下安装脚手架的时候安装的路由界面及配置：
<CustomImage src='/growth-record/frame/vue/router-01.png' />

2.如果一开始没有的安装vue-router后自己手动安装的，可以参考这个main.js 和router文件夹的index.js配置的配置代码如下：
main.js代码：
```
import Vue from 'vue'
import App from './App'
import router from './router'//引入路由指定文件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//实例化，表示会使用
  render: h => h(App)//vue2.0写法

  //以下是vue1.0的写法
  //components: { App },//注册组件信息
 // template: '<App/>'//简写的模板调用组件的标签
})

```
如果对代码中的`render: h => h(App)//vue2.0写法` 不理解的可以查看我之前写的文章——[vue-cli2.x中的render: h => h(App)解析](https://blog.csdn.net/qq_35324453/article/details/80961128)

router文件夹的index.js代码：
```
import Vue from 'vue'
import Router from 'vue-router'//引入路由配置的模块
import HelloWorld from '@/components/HelloWorld'//引入需要路由转址的路径
import Home from '@/components/Home'//引入需要路由转址的路径
import VueResource from 'vue-resource'//引入vue-resource插件http请求
//下面这种方法引用也可以
// import HelloWorld from '../components/HelloWorld'//引入需要路由转址的路径
// import Home from '../components/Home'//引入需要路由转址的路径

Vue.use(Router)//声明引用，全局使用
Vue.use(VueResource)//声明引用，全局使用

export default new Router({

  // 注意当有多个路由的时候默认使用第一个路由地址
  routes: [//注意routers是一个对象数组
    {//需要跳转的组件需要import引进
      path: '/',//路由的地址，此时表示根路径
      name: 'HelloWorld',
      component: HelloWorld
    },
    {//需要跳转的组件需要import引进
      //路由的地址，此时表示根路径。注意第二个路由地址这里需要添加上组件名
      path: '/Home',
      name: 'Home',
      component: Home
    }
  ],
  mode:"history"//去掉url链接中的#符号
})

```
3.添加一个组件Home.vue，添加位置如下：
<CustomImage src='/growth-record/frame/vue/router-02.png' />

组件代码为：
```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    test
    <p>以下是获取http请求的数据内容</p>
    <ul>
        <li v-for="user in users">{{user.id}}. {{user.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      users:[],
      msg: 'hello Home'
    //   使用网络接口
    }
  },
  created(){
    //   http请求,请求成功调用.then()函数，并将数据传给data
      this.$http.get("http://jsonplaceholder.typicode.com/users").then((data)=>{
        //   console.log(data);//请求成功的数据
        this.users=data.body;//将data数据的的body内容复制给定义的users数据
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```

4.需要在根组件App.vue下添加一下引入组件的内容：
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--注意a标签会重新加载页面，相当于刷新页面-->
    <ul>
      <p>--注意a标签会重新加载页面，相当于刷新页面--</p>
      <li><a href="/">HelloWorld</a></li>
      <li><a href="/Home">Home</a></li>
      <p>此处使用router-link，不会刷新页面，相当于局部刷新</p>
      <li><router-link to="/">HelloWorld</router-link></li>
      <li><router-link to="/Home">Home页面</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

### （四）运行结果
<CustomImage src='/growth-record/frame/vue/router-03.gif' />
