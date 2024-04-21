---
title: Vue2 生命周期的理解与应用
date: 2018-07-08 20:08:08
tag:
 - Vue
categories:
 - 前端进击
---
# Vue2 生命周期的理解与应用
**在学习 Vue2.x 入门后，开始慢慢熟悉 Vue 的模式和开发脚手架项目实践过程中，需要对生命周期钩子函数一定的理解，多少会用到这些钩子函数，根据自己的理解写了一下，欢迎指正或学习交流。**

### （一）vue2.x生命周期图
<CustomImage src='/growth-record/frame/vue/vue2-life-01.png' />

### （二）生命周期钩子函数说明

| 生命周期钩子函数     | 	说明    |
|:--------------|:---------------|
|beforeCreate	|在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。|
|created	|实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)属性初始化和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。|
|beforeMount | 在挂载开始之前被调用：相关的 render 函数首次被调用。|
|mounted	| `el`被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 root实例挂载了一个文档内元素，当mounted被调用时 `vm.$el` 也在文档内。|
|beforeUpdate	| 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。|
|updated	| 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。|
|beforeDestroy	| 实例销毁之前调用。在这一步，实例仍然完全可用。|
|destroyed	|Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。|

### （三）代码演示
1. 通过嵌套组件的页面加载查看显示顺序：
   代码如下(可直接复制使用)：

   ```html
	   <!DOCTYPE html>
	<html lang="en">

	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>vue生命周期的理解应用</title>
	    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>

	<body>
	    <div id="vue-app">
	        <p>以下是调用组件信息</p>
	        <div class="test">
	            <keep-alive></keep-alive>
	            <test-component v-bind:msg="msg" v-on:msgchange="updateMsg($event)"></test-component>
	            </keep-alive>
	        </div>
	    </div>
	</body>
	<script>
	    var child = {
	        props: ['msg'],
	        template: '<button v-on:click="changeChuanzhi">点击向父组件事件传值--{{msg}}</button>',
	        methods: {
	            changeChuanzhi: function () {
	                this.$emit("msgchange", "子组件向父组件传值"); //注意两个参数：第一个参数是事件名，第二个参数是传递的内容
	            }
	        },
	        deactivated: function () {
	            console.log('component deactivated!');
	        },
	        activated: function () {
	            console.log('component activated');
	        }
	    };

	    new Vue({
	        el: '#vue-app',
	        data: {
	            msg: '父亲给儿子的信息'
	        },
	        methods: {
	            updateMsg: function (msg) {
	                this.msg = msg;
	            }
	        },
	        components: {
	            'test-component': child
	        },

	        //生明周期示例
	        beforeCreate: function () {
	            alert("组件实例化之前执行的函数：beforeCreate()");
	        },
	        created: function () {
	            alert("组件实例化完毕，但页面还未显示出来:created()");
	        },
	        beforeMount: function () {
	            alert("组件挂载前，页面仍未展示，但虚拟DOM已经配置:beforeMount()");
	        },
	        mounted: function () {
	            alert("组件挂载后，此方法执行后，页面显示:mounted()");
	        },
	        beforeUpdate: function () {
	            alert("组件更新前，页面仍未更新，但虚拟DOM已经配置:beforeUpdate()");
	        },
	        updated: function () {
	            alert("组件更新后，此方法执行后，页面显示:updated()");
	        },
	        beforeDestroy: function () {
	            alert("组件销毁前:beforeDestroy()");
	        },
	        destroyed: function () {
	            alert("组件销毁:destroyed()");
	        },

	    })
	</script>

	</html>
   ```

   运行结果：
<CustomImage src='/growth-record/frame/vue/vue2-life-02.gif' />

2. 通过控制台查看页面加载显示顺序日志：
   代码如下（可直接复制使用）：

   ```html
	   <!DOCTYPE html>
	<html lang="en">

	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>vue生命周期的理解应用</title>
	    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>

	<body>
	    <div id="vue-app">
	        <p>以下是调用组件信息</p>
	        <div class="test">
	            <p>默认显示的数据：{{msg}}</p>
	            <test-component v-bind:msg="msg" v-on:msgchange="updateMsg($event)"></test-component>
	        </div>
	    </div>
	</body>
	<script>
	    var child = {
	        props: ['msg'],
	        data: function () {
	            return {
	                childtofather: '子组件向父组件传值'
	            }

	        },
	        template: '<button v-on:click="changeChuanzhi">点击向父组件事件传值--{{msg}}</button>',
	        methods: {
	            changeChuanzhi: function () {
	                this.$emit("msgchange", this.childtofather); //注意两个参数：第一个参数是事件名，第二个参数是传递的内容
	            }
	        },
	    };

	    var app =new Vue({
	        el: '#vue-app',
	        data: {
	            msg: '父亲给儿子的信息'
	        },
	        methods: {
	            updateMsg: function (msg) {
	                this.msg = msg;
	            }
	        },
	        components: {
	            'test-component': child
	        },

	        //生明周期示例
	        beforeCreate: function () {
	            // alert("组件实例化之前执行的函数：beforeCreate()");
	            console.group('beforeCreate 创建前状态===============》');
	            var state1 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(state1);
	        },
	        created: function () {
	            // alert("组件实例化完毕，但页面还未显示出来:created()");
	            console.group('created 创建完毕状态===============》');
	            var state2 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(state2);
	        },
	        beforeMount: function () {
	            // alert("组件挂载前，页面仍未展示，但虚拟DOM已经配置:beforeMount()");
	            console.group('beforeMount 挂载前状态===============》');
	            var state3 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(this.$el);
	            console.log(state3);
	        },
	        mounted: function () {
	            // alert("组件挂载后，此方法执行后，页面显示:mounted()");
	            console.group('mounted 挂载结束状态===============》');
	            var state4 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg

	            }
	            console.log(this.$el);
	            console.log(state4);
	        },
	        beforeUpdate: function () {
	            // alert("组件更新前，页面仍未更新，但虚拟DOM已经配置:beforeUpdate()");
	            console.group('beforeUpdate 更新前状态===============》');
	            var state5 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(this.$el);
	            console.log(state5);
	            debugger
	        },
	        updated: function () {
	            // alert("组件更新后，此方法执行后，页面显示:updated()");
	            console.group('updated 更新完成状态===============》');
	            var state6 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg

	            }
	            console.log(this.$el);
	            console.log(state6);
	        },
	        beforeDestroy: function () {
	            // alert("组件销毁前:beforeDestroy()");
	            console.group('beforeDestroy 销毁前状态===============》');
	            var state7 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(this.$el);
	            console.log(state7);
	        },
	        destroyed: function () {
	            // alert("组件销毁:destroyed()");
	            console.group('destroyed 销毁完成状态===============》');
	            var state8 = {
	                'el': this.$el,
	                'data': this.$data,
	                'msg': this.msg
	            }
	            console.log(this.$el);
	            console.log(state8);
	        },

	    })
	</script>

	</html>
   ```

	简单说明一下结构：
	（1）创建了一个 Vue 根实例命名为 vue-app，将其挂载到页面 id 为 vue-app 的 dom 元素上。
	（2）局部注册的一个组件 child 并在根实例中将其注册使其可以在根实例的作用域中使用。
	（3）将子组件用 `<keep-alive>` 包裹，为接下来的测试作准备。
	（4）打开开发者工具的控制台查看结果：
<CustomImage src='/growth-record/frame/vue/vue2-life-03.png' />

#### 结果分析
1.beforeCreate 执行时：data和el均未初始化，值为：undefined；
<CustomImage src='/growth-record/frame/vue/vue2-life-04.png' />

2.created 执行时：Vue 实例观察的数据对象 data 已经配置好，已经可以得到 `vue-app.msg` 的值，但 Vue 实例使用的根 DOM 元素 el 还未初始化；
<CustomImage src='/growth-record/frame/vue/vue2-life-05.png' />

3.beforeMount 执行时：data 和 el 均已经初始化，但从 `{{msg}}` 等页面展示数据可以看出此时 el 并没有渲染进数据，el 的值为“虚拟” DOM 的元素节点；
<CustomImage src='/growth-record/frame/vue/vue2-life-06.png' />

4.mounted 执行时：此时 el 已经渲染完成并挂载到实例上，页面基本显示完成；
<CustomImage src='/growth-record/frame/vue/vue2-life-07.png' />

5.beforeUpdate 执行时：会更新当前组件数据，但未在页面渲染出来；
<CustomImage src='/growth-record/frame/vue/vue2-life-08.png' />

6.updated 执行时：会更新当前组件数据，并在页面渲染出来；
<CustomImage src='/growth-record/frame/vue/vue2-life-09.png' />

7.beforeDestroy 和 destroyed 执行时：Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。注意：这里的销毁并不指代'抹去'，而是表示'解绑'。
<CustomImage src='/growth-record/frame/vue/vue2-life-10.png' />

验证一下，控制台输入：`app.msg='super456'` 页面 `{{msg}}` 并没有显示出来，结果显示：
<CustomImage src='/growth-record/frame/vue/vue2-life-11.png' />

### （四）一些钩子函数应用
1. beforeCreate 钩子中可以进行 loading 之类的动画加载；
2. 在 created 钩子中可以对 data 数据进行操作，这个时候可以进行 ajax 请求将返回的数据赋给 data，还可以进行网络接口的请求操作；
3. 在 mounted 钩子对挂载的 dom 进行操作，也可以进行后台获取数据操作；

### （五）文献参考
*特别感谢：作者：hxgzj 的[关于Vue.js2.0生命周期的研究与理解](https://segmentfault.com/a/1190000010336178) 这篇文章分析的很详细，看完后参考写了一个案例出来的。内容中也引用了很多。*
