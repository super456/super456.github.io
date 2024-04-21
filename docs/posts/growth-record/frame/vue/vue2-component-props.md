---
title: Vue2 父子组件动态传值
date: 2018-06-26 20:02:02
tag:
 - Vue
categories:
 - 前端进击
---
# Vue2 父子组件动态传值
**在学习 Vue2.x 的时候，遇到了一个问题，就是父子组件如何传递动态输入的值，文档介绍都是传递固定值的，比如我想传递一个刚输入的值呢，子组件如何显示？一下就是简单的代码：**

注：本人使用的是官方的**脚手架**学习的，可以通过父级组件向子级组件传递动态输入的值。然后本人重写了一个测试页面，直接复制代码就可以运行的（看懂以下代码，父子组件传递原理也是一样的，此处以对象为例）：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>父组件向子组件动态传值示例</title>
    <!-- 导入官方cdn的vue文件-->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

</head>

<body>
    <div id="app">
        <ul>
            <li v-for="item in items">
                {{item}}
            </li>
        </ul>
        <p>添加一个列表项：
            <input type="text" v-model="newItem" v-on:keyup.enter='addNew()' placeholder="按回车键提交">
        </p>
        <p>显示输入框传递给子组件的添加内容（对象）：</p>

        <!-- 注意这个传递的参数值必须前面有：v-bind:组件获取的变量名='需要传递的变量名' 或 :组件获取的变量名='需要传递的变量名'  ,否则传递的永远是字符串的值-->
        <!-- 这种方式传递的是字符串 -->
        <!-- <component-a msg1childtofather='msgchildtofather'></component-a> -->
        <!-- 以下两种方式都是传递对象 -->
        <component-a :msg1childtofather='msgchildtofather'></component-a>
        <!-- <component-a v-bind:msg1childtofather='msgchildtofather'></component-a> -->

    </div>
</body>

<script>
    Vue.component('component-a', {
        props: ['msg1childtofather'],
        template: '<h2 v-text=\'msg1childtofather\'></h2>',
        methods: {
            output: function () {
                alert('You click button! and submit value:' + this.msg1childtofather);
            }
        }
    })

    new Vue({
        el: "#app",
        data: {
            items: [],
            newItem: "",
            msgchildtofather: ""
        },
        methods: {
            addNew: function () {
                // 使用v-model和ul li input向数组items添加一个动态项内容，注意添加数组格式
                this.items.push(this.newItem);
                // 测试传递动态添加对象值
                var childfather = {
                    label: this.newItem,
                    label2: '默认值'
                };
                this.msgchildtofather = childfather;

                this.newItem = "";
            }
        },
    })
</script>

</html>
```

测试结果如下：
<CustomImage src='/growth-record/frame/vue/props-01.png' />

<CustomImage src='/growth-record/frame/vue/props-02.png' />
