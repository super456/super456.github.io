---
title: Vue3 学习笔记（二）
date: 2023-12-23 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue3 学习笔记（二）
## 逻辑复用
### 组合式函数
在 Vue 应用的概念中，“**组合式函数**”(Composables) 是一个利用 Vue 的组合式 API 来**封装和复用有状态逻辑的函数**

- 无状态函数：复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了无状态的逻辑：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如你可能已经用过的 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)
- 有状态函数：**有状态逻辑负责管理会随时间而变化的状态**。一个简单的例子是跟踪当前鼠标在页面中的位置

嵌套多个组合式函数：**一个组合式函数可以调用一个或多个其他的组合式函数**。这使得我们可以像使用多个组件组合成整个应用一样，用**多个较小且逻辑独立的单元**来组合形成**复杂的逻辑**

核心：抽离、封装、状态、复用

传入异步响应式参数并自动监听响应触发执行：
```typescript
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

Vue3.3 `toValue()` 新增 API 目的：将 ref 或 getter 规范化为值。跟 unref 类似，但可以对函数特殊处理

约定和最佳实践

1. 命名：组合式函数约定用驼峰名法命名，并以“use”开头
2. 输入参数：需要考虑 ref 或 getter 的响应式参数情况，使用 `toValue()` 函数实现
```typescript
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter)
}
```
注意⚠️：要么使用 `watch()` 显式地监视 ref 或 getter，要么在 `watchEffect()` 中调用 `toValue()`

3. 返回值：在组合式函数中使用 `ref()` 而不是 `reactive()`。因为组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性（通过 ref 来维持这一响应性连接）：
```typescript
// x 和 y 是两个 ref
const { x, y } = useMouse()
```
当然，可以将返回的对象用 `reactive()` 包装一次，这样其中的 ref 会被自动解包：
```typescript
const mouse = reactive(useMouse())
// mouse.x 链接到了原来的 x ref
console.log(mouse.x)
```

4. 副作用：
- 如果你的应用用到了[服务端渲染](https://cn.vuejs.org/guide/scaling-up/ssr.html) (SSR)，请确保在组件挂载后才调用的生命周期钩子中执行 DOM 相关的副作用，例如：`onMounted()`。这些钩子仅会在浏览器中被调用，因此可以确保能访问到 DOM
- 确保在 `onUnmounted()` 时清理副作用。举例来说，如果一个组合式函数设置了一个事件监听器，它就应该在 `onUnmounted()` 中被移除 (就像我们在 `useMouse()` 示例中看到的一样)。当然也可以像之前的 `useEventListener()` 示例那样，使用一个组合式函数来自动帮你做这些事
5. 使用限制：
- 组合式函数只能在 `<script setup>` 或 `setup()` 钩子中被调用。在这些上下文中，它们也只能被同步调用。在某些情况下，也可以在像 `onMounted()` 这样的生命周期钩子中调用它们
   1. 将生命周期钩子注册到该组件实例上
   2. 将计算属性和监听器注册到该组件实例上，以便在该组件被卸载时停止监听，避免内存泄漏

注意⚠️：**`<script setup>` 是唯一在调用 await 之后仍可调用组合式函数的地方**。编译器会在异步操作之后自动为你恢复当前的组件实例

5. 通过抽取组合式函数改善代码结构：

抽取组合式函数不仅是为了复用，也是为了代码组织，保持足够的灵活性，基于逻辑问题将组件代码拆分成更小的函数：
```typescript
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```
**注意⚠️：在某种程度上，可以将这些提取出的组合式函数看作是可以相互通信的组件范围内的服务**

6. 在选项式 API 中使用组合式函数

如果使用的是选项式 API，组合式函数必须在 `setup()` 中调用。且其返回的绑定必须在 `setup()` 中返回，以便暴露给 `this` 及其模板：
```typescript
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() 暴露的属性可以在通过 `this` 访问到
    console.log(this.x)
  }
  // ...其他选项
}
```

7. 与其他模式比较：
   1. 和 Mixin 的对比：

mixins 有三个主要的短板：

- **不清晰的数据来源**：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然；
- **命名空间冲突**：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。若使用组合式函数，可以通过在解构变量时对变量进行重命名来避免相同的键名；
- **隐式的跨 mixin 交流**：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

   2. 和无渲染组件的对比：

**组合式函数相对于无渲染组件的主要优势是**：组合式函数不会产生额外的**组件实例开销**。当在整个应用中使用时，由无渲染组件产生的额外组件实例会带来无法忽视的**性能开销**
注意⚠️：**推荐在纯逻辑复用时使用组合式函数，在需要同时复用逻辑和视图布局时使用无渲染组件**

   3. 和 React Hooks 的对比：

如果有 React 的开发经验，可能注意到组合式函数和自定义 React hooks 非常相似。**组合式 API 的一部分灵感正来自于 React hooks**，**Vue 的组合式函数也的确在逻辑组合能力上与 React hooks 相近**。然而，Vue 的组合式函数是**基于 Vue 细粒度的响应性系统**，这和 React hooks 的执行模型有本质上的不同

### 自定义指令
除了 Vue 内置的一系列指令 (比如 `v-model` 或 `v-show`) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)

重用代码的方式：

- 组件；
- 组合式函数；
- 自定义指令；

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数：
```typescript
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>

// 另一种写法
  export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}

// 全局注册
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```
注意⚠️：

- **在 `<script setup>` 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令**。在上面的例子中，vFocus 即可以在模板中以 `v-focus` 的形式使用
- **只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令**。其他情况下应该尽可能地使用 v-bind 这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好

指令钩子：
一个指令的定义对象可以提供几种钩子函数 (都是可选的)：
```typescript
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```
钩子参数：
指令的钩子会传递以下几种参数：

- el：指令绑定到的元素。这可以用于直接操作 DOM。
- binding：一个对象，包含以下属性。
   - value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
   - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
   - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
   - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
   - instance：使用该指令的组件实例。
   - dir：指令的定义对象。
- vnode：代表绑定元素的底层 VNode。
- prevNode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
```typescript
<div v-example:foo.bar="baz">
// 动态参数
// <div v-example:[arg]="value"></div>
// 注意⚠️：这里指令的参数会基于组件的 arg 数据属性响应式地更新

// 获取到的参数
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```
注意⚠️：**除了 el 外，其他参数都是只读的，不要更改它们**。若你需要在不同的钩子间共享信息，推荐通过元素的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute 实现

简化形式：
对于自定义指令来说，一个很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令：
```typescript
<div v-color="color"></div>

// 实现
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

对象字面量：
如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式：
```typescript
<div v-demo="{ color: 'white', text: 'hello!' }"></div>

app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

组件上使用：
当在组件上使用自定义指令时，它会始终应用于组件的根节点，和[透传 attributes](https://cn.vuejs.org/guide/components/attrs.html) 类似：
```typescript
<MyComponent v-demo="test" />

// <!-- MyComponent 的模板 -->
<div> <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```
注意⚠️**：当应用到一个多根组件时，指令将会被忽略且抛出一个警告。和 attribute 不同，指令不能通过 v-bind="$attrs" 来传递给一个不同的元素**。**总的来说，不推荐在组件上使用自定义指令**

### 插件
插件 (Plugins) 是一种能**为 Vue 添加全局功能的工具代码**
```typescript
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* 可选的选项 */
})
```
一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的[应用实例](https://cn.vuejs.org/api/application.html)和传递给 `app.use()` 的额外选项作为参数：
```typescript
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
```
插件使用场景：

1. 通过 `app.component()` 和 `app.directive()` 注册一个到多个全局组件或自定义指令；
2. 通过 `app.provide()` 和使一个资源可被注入进整个应用；
3. 向 `app.config.globalProperties` 中添加一些全局实例属性和方法；
4. 一个可能上述三种都包含了的功能库，比如 `vue-router`；

编写一个插件：

1. 创建入口文件：
```typescript
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 在这里编写插件代码
  }
}
```

2. 使用方式：
```typescript
<h1>{{ $translate('greetings.hello') }}</h1>
```

3. 全局使用，在插件中将它添加到 `app.config.globalProperties` 上实现：
```typescript
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

4. 注册传入翻译文件信息：
```typescript
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```
注意⚠️：请谨慎使用全局属性，如果在整个应用中使用不同插件注入的太多全局属性，很容易让应用变得难以理解和维护

插件中的 `Provide/Inject`：
通过 provide 来为插件用户供给一些内容
```typescript
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.provide('i18n', options)
  }
}
```
使用方：
```typescript
<script setup>
import { inject } from 'vue'

const i18n = inject('i18n')

console.log(i18n.greetings.hello)
</script>
```

## 内置组件
### Transition
Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：

- `<Transition>` 会在一个元素或组件进入和离开 DOM 时应用动画；
- `<TransitionGroup>` 会在一个 `v-for` 列表中的元素或组件被插入，移动，或移除时应用动画；

除了这两个组件，我们也可以通过其他技术手段来应用动画，比如切换 CSS class 或用状态绑定样式来驱动动画
可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换；
- 由 `v-show` 所触发的切换；
- 有特殊元素 `<component>` 切换的动作组件；
- 改变特殊的 key 属性；

```typescript
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

注意⚠️：`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素

当一个 `<Transition>` 组件中的元素被插入或移除时，会发生下面这些事情：

1. Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些 [CSS 过渡 class](https://cn.vuejs.org/guide/built-ins/transition.html#transition-classes) 会在适当的时机被添加和移除；
2. 如果有作为监听器的 [JavaScript 钩子](https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks)，这些钩子函数会在适当时机被调用；
3. 如果没有探测到 CSS 过渡或动画、也没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧后执行；

基于 CSS 的过渡效果：
一共有 6 个应用于进入与离开过渡效果的 CSS `class`：

<CustomImage src='/growth-record/frame/vue/vue3study09.webp' />

1. `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
2. `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 `class` 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
3. `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
4. `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
5. `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 `class` 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
6. `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。

`v-enter-active` 和 `v-leave-active` 给我们提供了为进入和离开动画指定不同速度曲线的能力

为过渡效果命名：给 `<Transition>` 组件传一个 name prop 来声明一个过渡效果名

```typescript
<Transition name="fade">
  ...
</Transition>
```

注意⚠️：对于一个有名字的过渡效果，对它起作用的过渡 `class` 会以其名字而不是 v 作为前缀。比如，上方例子中被应用的 `class` 将会是 `fade-enter-active` 而不是 `v-enter-active`。这个“fade”过渡的 `class` 应该是这样：

```typescript
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

CSS 的 transition：
`<Transition>` 一般都会搭配[原生 CSS 过渡](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)一起使用，正如你在上面的例子中所看到的那样。这个 transition CSS 属性是一个简写形式，使我们可以一次定义一个过渡的各个方面，包括需要执行动画的属性、持续时间和[速度曲线](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)：

```typescript
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

CSS 的 animation：
[原生 CSS 动画](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)和 CSS transition 的应用方式基本上是相同的，只有一点不同，那就是 *-enter-from 不是在元素插入后立即移除，而是在一个 animationend 事件触发时被移除：

```typescript
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

自定义过渡 `class：`
`<Transition>` 传递以下的 props 来指定自定义的过渡 `class：`

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

传入的这些 `class` 会覆盖相应阶段的默认 `class` 名。这个功能在你想要在 Vue 的动画机制下集成其他的第三方 CSS 动画库时非常有用，比如 [`Animate.css`](https://daneden.github.io/animate.css/)：

```typescript
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

同时使用 transition 和 animation：
**Vue 需要附加事件监听器，以便知道过渡何时结束**。可以是 transitionend 或 animationend，这取决于你所应用的 CSS 规则。如果你仅仅使用二者的其中之一，Vue 可以自动探测到正确的类型。
然而在某些场景中，你或许想要在同一个元素上同时使用它们两个。举例来说，**Vue 触发了一个 CSS 动画，同时鼠标悬停触发另一个 CSS 过渡。此时你需要显式地传入 `type prop` 来声明，告诉 Vue 需要关心哪种类型，传入的值是 animation 或 transition**：

```typescript
<Transition type="animation">...</Transition>
```

深层级过渡与显示过渡时长：
尽管过渡 `class` 仅能应用在 `<Transition>` 的直接子元素上，我们还是可以使用深层级的 CSS 选择器，在深层级的元素上触发过渡效果：

```typescript
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>

/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}

/* ... 省略了其他必要的 CSS */
```

甚至可以在深层元素上添加一个过渡延迟，从而创建一个带渐进延迟的动画序列：

```typescript
/* 延迟嵌套元素的进入以获得交错效果 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

默认情况下，`<Transition>` 组件会通过监听过渡根元素上的第一个 transitionend 或者 animationend 事件来尝试自动判断过渡何时结束。而在嵌套的过渡中，期望的行为应该是等待所有内部元素的过渡完成。在这种情况下，你可以通过向 `<Transition>` 组件传入 duration prop 来显式指定过渡的持续时间 (以毫秒为单位)。总持续时间应该匹配延迟加上内部元素的过渡持续时间：

```typescript
<Transition :duration="550">...</Transition>

<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

性能考量：
动画所用到的 CSS 属性大多是 transform 和 opacity 之类的。用这些属性制作动画非常高效，因为：

1. 他们在动画过程中不会影响到 DOM 结构，因此不会每一帧都触发昂贵的 CSS 布局重新计算。
2. 大多数的现代浏览器都可以在执行 transform 动画时利用 GPU 进行硬件加速。

相比之下，**像 `height` 或者 `margin` 这样的属性会触发 CSS 布局变动**，因此执行它们的动画效果更昂贵，需要谨慎使用。我们可以在** **[**`CSS-Triggers`**](https://csstriggers.com/)** 这类的网站查询哪些属性会在执行动画时触发 CSS 布局变动**

JavaScript 钩子：

```typescript
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>

// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}
```

注意⚠️：在使用仅由 JavaScript 执行的动画时，最好是添加一个 `:css="false"` prop。这显式地向 Vue 表明可以跳过对 CSS 过渡的自动探测。除了性能稍好一些之外，还可以防止 CSS 规则意外地干扰过渡效果：

```typescript
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

在有了 `:css="false"` 后，我们就自己全权负责控制什么时候过渡结束了。这种情况下对于 `@enter` 和 `@leave` 钩子来说，回调函数 done 就是必须的。否则，钩子将被同步调用，过渡将立即完成
注意⚠️：使用 [GreenSock 库](https://greensock.com/)执行动画的一个示例，你也可以使用任何你想要的库，比如 [`Anime.js`](https://animejs.com/) 或者 [Motion One](https://motion.dev/)

可复用过渡效果：
要创建一个可被复用的过渡，我们需要为 `<Transition>` 组件创建一个包装组件，并向内传入插槽内容：

```typescript
<!-- MyTransition.vue -->
<script>
// JavaScript 钩子逻辑...
</script>

<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- 向内传递插槽内容 -->
  </Transition>
</template>

<style>
/*
  必要的 CSS...
  注意：避免在这里使用 <style scoped>
  因为那不会应用到插槽内容上
*/
</style>

// 使用
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```

出现时过渡：

```typescript
<Transition appear>
  ...
</Transition>
```

元素间过渡：
**除了通过 `v-if / v-show` 切换一个元素，也可以通过 `v-if / v-else / v-else-if` 在几个组件间进行切换，只要确保任一时刻只会有一个元素被渲染即可：**

```typescript
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

过渡模式：
注意⚠️：**进入和离开的元素都是在同时开始动画的，因此不得不将它们设为 `position: absolute` 以避免二者同时存在时出现的布局问题**

很多情况下这可能并不符合需求。我们可能想要先执行离开动画，然后在其完成之后再执行元素的进入动画。手动编排这样的动画是非常复杂的，好在我们可以通过向 `<Transition>` 传入一个 `mode prop` 来实现这个行为：

```typescript
<Transition mode="out-in">
  ...
</Transition>
```

组件间过渡：

```typescript
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

动态过渡：
`<Transition>` 的 props (比如 name) 也可以是动态的！这让我们可以根据状态变化动态地应用不同类型的过渡：

```typescript
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

这个特性的用处是可以提前定义好多组 CSS 过渡或动画的 `class`，然后在它们之间动态切换。
你也可以根据你的组件的当前状态在 JavaScript 过渡钩子中应用不同的行为。最后，**创建动态过渡的终极方式还是创建**[**可复用的过渡组件**](https://cn.vuejs.org/guide/built-ins/transition.html#reusable-transitions)，并让这些组件根据动态的 `props` 来改变过渡的效果

### TransitionGroup
`<TransitionGroup>` 是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果

和 `<Transition>` 的区别：
`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 `props`、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，**它不会渲染一个容器元素。但你可以通过传入 `tag prop` 来指定一个元素作为容器元素来渲染**。
- [**过渡模式**](https://cn.vuejs.org/guide/built-ins/transition.html#transition-modes)**在这里不可用，因为我们不再是在互斥的元素之间进行切换**。
- 列表中的每个元素都必须有一个**独一无二的 `key attribute`**。
- CSS 过渡 `class` 会被应用在列表内的元素上，而不是容器元素上。

注意⚠️：当在 [DOM 内模板](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)中使用时，组件名需要写为 `<transition-group>`

进入/离开动画：

```typescript
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

移除动画：
上面的示例有一些明显的缺陷：当某一项被插入或移除时，它周围的元素会立即发生“跳跃”而不是平稳地移动。可以通过添加一些额外的 CSS 规则来解决这个问题：

```typescript
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```

渐进延迟列表动画：
通过在 JavaScript 钩子中读取元素的 `data attribute`，我们可以实现带渐进延迟的列表动画。首先，我们把每一个元素的索引渲染为该元素上的一个 `data attribute`：

```typescript
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```

接着，在 JavaScript 钩子中，我们基于当前元素的 `data attribute` 对该元素的进场动画添加一个延迟。以下是一个基于** **[**GreenSock library**](https://greensock.com/)** （官网动画效果驱动贼好看，值得学习）**的动画示例：

```typescript
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

### KeepAlive
功能是在多个组件间动态切换时缓存被移除的组件实例

动态组件中：

```typescript
<component :is="activeComponent" />
```

默认情况下，**一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例**

```typescript
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

注意⚠️：在 [DOM 内模板](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)中使用时，它应该被写为 `<keep-alive>`

包含/排除：
`<KeepAlive>` 默认会缓存内部的所有组件实例，但可以通过 **`include`** 和 **`exclude` prop **来定制该行为。这两个 prop 的值都可以是一个以**英文逗号分隔的字符串**、**一个正则表达式**，或是**包含这两种类型的一个数组**：

```typescript
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

注意⚠️：

- **它会根据组件的 **[**name**](https://cn.vuejs.org/api/options-misc.html#name)** 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 name 选项**
- **在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明**

最大缓存实例数：
可以通过传入 **`max prop`** 来限制可被缓存的最大组件实例数。`<KeepAlive>` 的行为在指定了 max 后类似一个 [LRU 缓存](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间：

```typescript
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

缓存实例的生命周期：
当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活

一个持续存在的组件可以通过 [`onActivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 注册相应的两个状态的生命周期钩子：

```typescript
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

注意⚠️：

- `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用；
- **这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件；**

### Teleport
可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去
`<Teleport>` 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”

也可以将 `<Teleport>` 和 [`<Transition>`](https://cn.vuejs.org/guide/built-ins/transition.html) 结合使用来创建一个带动画的模态框。你可以看看[这个示例](https://cn.vuejs.org/examples/#modal)
注意⚠️：**`<Teleport>` 挂载时，传送的 to 目标必须已经存在于 DOM 中**。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。**如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素**

搭配组件使用：
`<Teleport>` 只改变了渲染的 DOM 结构，它不会影响组件间的逻辑关系。也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<teleport>` 的组件保持逻辑上的父子关系。传入的 props 和触发的事件也会照常工作。
这也意味着来自父组件的注入也会按预期工作，子组件将在 Vue Devtools 中嵌套在父级组件下面，而不是放在实际内容移动到的地方

禁用 Teleport：

```typescript
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

多个 Teleport 共享目标：
一个可重用的模态框组件可能同时存在多个实例。对于此类场景，多个 `<Teleport>` 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上：

```typescript
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>

// 渲染后：
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

### Suspense
**用来在组件树中协调对异步依赖的处理**。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态

异步依赖：
比如组件层级结构：
```typescript
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus>（组件有异步的 setup()）
   └─ <Content>
      ├─ <ActivityFeed> （异步组件）
      └─ <Stats>（异步组件）
```

在这个组件树中有多个嵌套组件，要渲染出它们，首先得解析一些异步资源。如果没有 `<Suspense>`，则它们每个都需要处理自己的加载、报错和完成状态。在最坏的情况下，我们可能会在页面上看到三个旋转的加载态，在不同的时间显示出内容
有了 `<Suspense>` 组件后，就可以在**等待整个多层级组件树中的各个异步依赖获取结果时，在顶层展示出加载中或加载失败的状态**

`<Suspense>` 可以等待的异步依赖有两种：

1. **带有异步 `setup()` 钩子的组件**。**这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件**。
2. [异步组件](https://cn.vuejs.org/guide/components/async.html)。

`async setup()`：组合式 API 使用顶层的异步

```typescript

// 第一种写法：
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}

// 第二种写法：
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

注意⚠️：**如果使用 `<script setup>`，那么顶层 await 表达式会自动让该组件成为一个异步依赖**

异步组件：
异步组件默认就是“suspensible”的。这意味着如果组件**关系链**上有一个 `<Suspense>`，那么这个**异步组件就会被当作这个 `<Suspense>` 的一个异步依赖**。在这种情况下，加载状态是由 `<Suspense>` 控制，而该组件自己的加载、报错、延时和超时等选项都将被忽略
注意⚠️：异步组件也可以通过在选项中指定 `suspensible: false` 表明不用 Suspense 控制，并让组件始终自己控制其加载状态

加载中状态：
`<Suspense>` 组件有两个插槽：**`#default` 和` #fallback`**。两个插槽都只允许一个直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点

```typescript
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入挂起状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入完成状态，并将展示出默认插槽的内容

注意⚠️：

- 如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态
- 进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖不会造成 `<Suspense>` 回退到挂起状态
- 发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 #default 插槽的内容。这个行为可以通过一个 timeout prop 进行配置：在等待渲染新内容耗时超过 timeout 之后，`<Suspense>` 将会切换为展示后备内容。若 timeout 值为 0 将导致在替换默认内容时立即显示后备内容

事件：
`<Suspense>` 组件会触发三个事件：**pending、resolve 和 fallback**。pending 事件是在进入挂起状态时触发。resolve 事件是在 default 插槽完成获取新内容时触发。fallback 事件则是在 fallback 插槽的内容显示时触发
例如，可以使用这些事件在加载新组件时在之前的 DOM 最上层显示一个加载指示器

错误处理：
`<Suspense>` **组件自身目前还不提供错误处理**，**不过你可以使用 **[**`errorCaptured`**](https://cn.vuejs.org/api/options-lifecycle.html#errorcaptured)** 选项或者 **[**`onErrorCaptured()`**](https://cn.vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)** 钩子，在使用到 `<Suspense>` 的父组件中捕获和处理异步错误**

和其他组件结合：
常常会**将 `<Suspense>` 和 **[**`<Transition>`**](https://cn.vuejs.org/guide/built-ins/transition.html)**、**[**`<KeepAlive>`**](https://cn.vuejs.org/guide/built-ins/keep-alive.html)** 等组件结合**。要保证这些组件都能正常工作，嵌套的顺序非常重要
另外，这些组件都通常与 [Vue Router](https://router.vuejs.org/zh/) 中的 `<RouterView>` 组件结合使用

```typescript
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback>
            正在加载...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

Vue Router 使用动态导入对[懒加载组件](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)进行了内置支持。这些与异步组件不同，目前他们不会触发 `<Suspense>`。但是，它们仍然可以有异步组件作为后代，这些组件可以照常触发 `<Suspense>`

## 应用规模化
### 单文件组件
Vue 的单文件组件 (即 *.vue 文件，英文 Single-File Component，简称 SFC) 是一种特殊的文件格式，使我们能够将一个 Vue 组件的模板、逻辑与样式封装在单个文件中
`<template>`、`<script>` 和 `<style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式。完整的语法定义可以查阅 [SFC 语法说明](https://cn.vuejs.org/api/sfc-spec.html)

为什么要使用 SFC：
使用 SFC 必须使用构建工具，但作为回报带来了以下优点：

- 使用熟悉的 HTML、CSS 和 JavaScript 语法编写模块化的组件
- [让本来就强相关的关注点自然内聚](https://cn.vuejs.org/guide/scaling-up/sfc.html#what-about-separation-of-concerns)
- 预编译模板，避免运行时的编译开销
- [组件作用域的 CSS](https://cn.vuejs.org/api/sfc-css-features.html)
- [在使用组合式 API 时语法更简单](https://cn.vuejs.org/api/sfc-script-setup.html)
- 通过交叉分析模板和逻辑代码能进行更多编译时优化
- [更好的 IDE 支持](https://cn.vuejs.org/guide/scaling-up/tooling.html#ide-support)，提供自动补全和对模板中表达式的类型检查
- 开箱即用的模块热更新 (HMR) 支持

SFC 是 Vue 框架提供的一个功能，并且在下列场景中都是官方推荐的项目组织方式：

- 单页面应用 (SPA)
- 静态站点生成 (SSG)
- 任何值得引入构建步骤以获得更好的开发体验 (DX) 的项目

当然，在一些轻量级场景下使用 SFC 会显得有些杀鸡用牛刀。因此 Vue 同样也可以在无构建步骤的情况下以纯 JavaScript 方式使用。如果你的用例只需要给静态 HTML 添加一些简单的交互，你可以看看 [petite-vue](https://github.com/vuejs/petite-vue)，它是一个 6 kB 左右、预优化过的 Vue 子集，更适合渐进式增强的需求

SFC 是如何工作的：
Vue SFC 是一个框架指定的文件格式，因此必须交由 [`@vue/compiler-sfc`](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) 编译为标准的 JavaScript 和 CSS，**一个编译后的 SFC 是一个标准的 JavaScript(ES) 模块**，这也意味着在构建配置正确的前提下，你可以像导入其他 ES 模块一样导入 SFC：
```typescript
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
```
SFC 中的 `<style>` 标签一般会在开发时注入成原生的 `<style>` 标签以支持热更新，而**生产环境下它们会被抽取、合并成单独的 CSS 文件**

在实际项目中，一般会使用集成了 SFC 编译器的构建工具，比如 [Vite](https://cn.vitejs.dev/) 或者 [Vue CLI](https://cli.vuejs.org/zh/) (基于 [webpack](https://webpack.js.org/))，Vue 官方也提供了脚手架工具来帮助你尽可能快速地上手开发 SFC。更多细节请查看 [SFC 工具链](https://cn.vuejs.org/guide/scaling-up/tooling.html)章节

如何看待关注点分离：

- 一些有着传统 Web 开发背景的用户可能会因为 SFC 将不同的关注点集合在一处而有所顾虑，觉得 HTML/CSS/JS 应当是分离开的！
- 要回答这个问题，我们必须对这一点达成共识：**前端开发的关注点不是完全基于文件类型分离的。前端工程化的最终目的都是为了能够更好地维护代码**。**关注点分离不应该是教条式地将其视为文件类型的区别和分离，仅仅这样并不够帮我们在日益复杂的前端应用的背景下提高开发效率**。
- 在现代的 UI 开发中，我们发现与其将代码库划分为三个巨大的层，相互交织在一起，不如将它们划分为松散耦合的组件，再按需组合起来。**在一个组件中，其模板、逻辑和样式本就是有内在联系的、是耦合的，将它们放在一起，实际上使组件更有内聚性和可维护性**。
- 即使你不喜欢单文件组件这样的形式而仍然选择拆分单独的 JavaScript 和 CSS 文件，也没关系，你还是可以通过[资源导入](https://cn.vuejs.org/api/sfc-spec.html#src-imports)功能获得热更新和预编译等功能的支持

### 工具链
在线尝试：

- [Vue SFC 演练场](https://play.vuejs.org/)
   - 自动随着 Vue 仓库最新的提交更新
   - 支持检查编译输出的结果
- [StackBlitz 中的 Vue + Vite](https://vite.new/vue)
   - 类似 IDE 的环境，但实际是在浏览器中运行 Vite 开发服务器
   - 和本地开发效果更接近

注意⚠️：在报告 Bug 时，我们也建议使用这些在线演练场来提供最小化重现

项目脚手架：

1. Vite：是一个轻量级的、速度极快的构建工具，对 Vue SFC 提供第一优先级支持；
2. Vue CLI：官方提供的基于 Webpack 的 Vue 工具链，它现在处于维护模式。我们建议使用 Vite 开始新的项目，除非你依赖特定的 Webpack 的特性。在大多数情况下，Vite 将提供更优秀的开发体验

浏览器内模版编译注意事项：
当以无构建步骤方式使用 Vue 时，组件模板要么是写在页面的 HTML 中，要么是内联的 JavaScript 字符串。在这些场景中，为了执行动态模板编译，Vue 需要将模板编译器运行在浏览器中。相对的，如果我们使用了构建步骤，由于提前编译了模板，那么就无须再在浏览器中运行了。为了减小打包出的客户端代码体积，Vue 提供了[多种格式的“构建文件”](https://unpkg.com/browse/vue@3/dist/)以适配不同场景下的优化需求：

- 前缀为 vue.runtime.* 的文件是只**包含运行时的版本**：不包含编译器，当使用这个版本时，**所有的模板都必须由构建步骤预先编译**
- 名称中不包含 .runtime 的文件则是**完全版**：即包含了编译器，并支持在浏览器中直接编译模板。然而，体积也会因此**增长大约 14kb**

默认的工具链中都会使用仅含运行时的版本，因为所有 SFC 中的模板都已经被预编译了。如果因为某些原因，在有构建步骤时，你仍需要浏览器内的模板编译，你可以更改构建工具配置，将 vue 改为相应的版本 vue/dist/vue.esm-bundler.js。
如果你需要一种更轻量级，不依赖构建步骤的替代方案，也可以看看 [petite-vue](https://github.com/vuejs/petite-vue)

IDE 支持：

- 推荐使用的 IDE 是 [VSCode](https://code.visualstudio.com/)，**配合 **[**Vue 语言特性 (Volar)**](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** 插件**。该插件提供了语法高亮、TypeScript 支持，以及模板内表达式与组件 props 的智能提示

注意⚠️：Volar 取代了我们之前为 Vue 2 提供的官方 VSCode 扩展 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)。如果你之前已经安装了 Vetur，请确保在 Vue 3 的项目中禁用它

- [WebStorm](https://www.jetbrains.com/webstorm/) 同样也为 Vue 的单文件组件提供了很好的内置支持；
- 其他支持[语言服务协议](https://microsoft.github.io/language-server-protocol/) (LSP) 的 IDE 也可以通过 LSP 享受到 Volar 所提供的核心功能：
   - Sublime Text 通过 [LSP-Volar](https://github.com/sublimelsp/LSP-volar) 支持；
   - vim / Neovim 通过 [coc-volar](https://github.com/yaegassy/coc-volar) 支持；
   - emacs 通过 [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/) 支持；

浏览器开发者插件：
Vue 的浏览器开发者插件使我们可以浏览一个 Vue 应用的组件树，查看各个组件的状态，追踪状态管理的事件，还可以进行组件性能分析

- [文档](https://devtools.vuejs.org/)
- [Chrome 扩展商店页](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

TypeScript：
具体细节请参考章节：[配合 TypeScript 使用 Vue](https://cn.vuejs.org/guide/typescript/overview.html)。

- [Volar](https://github.com/johnsoncodehk/volar) 插件能够为 `<script lang="ts">` 块提供类型检查，也能对模板内表达式和组件之间 props 提供自动补全和类型验证。
- 使用 [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) 可以在命令行中执行相同的类型检查，通常用来生成单文件组件的 d.ts 文件

测试：
具体细节请参考章节：[测试指南](https://cn.vuejs.org/guide/scaling-up/testing.html)。

- [Cypress](https://www.cypress.io/) 推荐用于 E2E 测试。也可以通过 [Cypress 组件测试运行器](https://docs.cypress.io/guides/component-testing/introduction)来给 Vue SFC 作单文件组件测试。
- [Vitest](https://vitest.dev/) 是一个追求更快运行速度的测试运行器，由 Vue / Vite 团队成员开发。主要针对基于 Vite 的应用设计，可以为组件提供即时响应的测试反馈。
- [Jest](https://jestjs.io/) 可以通过 [vite-jest](https://github.com/sodatea/vite-jest) 配合 Vite 使用。不过只推荐在你已经有一套基于 Jest 的测试集、且想要迁移到基于 Vite 的开发配置时使用，因为 Vitest 也能够提供类似的功能，且后者与 Vite 的集成更方便高效

代码规范：

- [Volar](https://github.com/johnsoncodehk/volar) VSCode 插件为 Vue SFC 提供了开箱即用的格式化功能。
- 除此之外，[Prettier](https://prettier.io/) 也提供了内置的 Vue SFC 格式化支持。

SFC 自定义块集成：
自定义块被编译成导入到同一 Vue 文件的不同请求查询。这取决于底层构建工具如何处理这类导入请求。

- 如果使用 Vite，需使用一个自定义 Vite 插件将自定义块转换为可执行的 JavaScript 代码。[示例](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)。
- 如果使用 Vue CLI 或只是 webpack，需要使用一个 loader 来配置如何转换匹配到的自定义块。[示例](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html)

底层库：
@vue/compiler-sfc：提供了处理 Vue SFC 的底层的功能，并只适用于需要支持 Vue SFC 相关工具链的开发者；
@vitejs/plugin-vue：为 Vite 提供 Vue SFC 支持的官方插件
vue-loader：为 webpack 提供 Vue SFC 支持的官方 loader。如果你正在使用 Vue CLI，也可以看看[如何在 Vue CLI 中更改vue-loader选项的文档](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9-loader-%E9%80%89%E9%A1%B9)

其他在线演练场：

- [VueUse Playground](https://play.vueuse.org/)
- [Vue + Vite on Repl.it](https://replit.com/@templates/VueJS-with-Vite)
- [Vue on CodeSandbox](https://codesandbox.io/s/vue-3)
- [Vue on Codepen](https://codepen.io/pen/editor/vue)
- [Vue on Components.studio](https://components.studio/create/vue3)
- [Vue on WebComponents.dev](https://webcomponents.dev/create/cevue)

### 路由
客户端 vs 服务端路由：
服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面

然而，在[单页面应用](https://developer.mozilla.org/en-US/docs/Glossary/SPA)中，客户端的 JavaScript 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。这样通常可以带来更顺滑的用户体验，尤其是在更偏向“应用”的场景下，因为这类场景下用户通常会在很长的一段时间中做出多次交互

在这类单页应用中，“路由”是在客户端执行的。**一个客户端路由器的职责就是利用诸如 **[**History API**](https://developer.mozilla.org/en-US/docs/Web/API/History)** 或是 **[**hashchange事件**](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)**这样的浏览器 API 来管理应用当前应该渲染的视图**

官方路由：
官方支持的[路由库](https://github.com/vuejs/router)。要了解更多细节，请查看 [Vue Router 的文档](https://router.vuejs.org/zh/)

从头开始实现一个简单的路由：
通过[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)的方式，监听浏览器 [hashchange事件](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)或使用 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 来更新当前组件：
```typescript
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

### 状态管理
什么是状态管理：
理论上来说，每一个 Vue 组件实例都已经在“管理”它自己的响应式状态了：
```typescript
<script setup>
import { ref } from 'vue'

// 状态
const count = ref(0)

// 动作
function increment() {
  count.value++
}
</script>

<!-- 视图 -->
<template>{{ count }}</template>
```
独立的单元：

- 状态：驱动整个应用的数据源；
- 视图：对状态的一种声明式映射；
- 交互：状态根据用户在视图中的输入而作出相应变更的可能方式

单项数据流：
<CustomImage src='/growth-record/frame/vue/vue3study10.webp' />

多个组件共享一个状态：

1. 多个视图可能都依赖于同一份状态。
2. 来自不同视图的交互也可能需要更改同一份状态。

解决方案：

- 一是一个可行的办法是将共享状态“提升”到共同的祖先组件上去，再通过 props 传递下来。然而在深层次的组件树结构中这么做的话，很快就会使得代码变得繁琐冗长。这会导致另一个问题：[Prop 逐级透传问题](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)
- 二是直接通过模板引用获取父/子实例，或者通过触发的事件尝试改变和同步多个状态的副本。但这些模式的健壮性都不甚理想，很容易就会导致代码难以维护；

**最好的解决方案是：**
**一个更简单直接的解决方案是抽取出组件间的共享状态，放在一个全局单例中来管理。这样我们的组件树就变成了一个大的“视图”，而任何位置上的组件都可以访问其中的状态或触发动作**

用响应式 API 做简单状态管理：
**reactive：**
```typescript
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})

<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>

<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>

<template>
  <button @click="store.count++">
    From B: {{ store.count }}
  </button>
</template>

// -------------------------
// 可以被任何组件任意改变的全局状态是不太容易维护的。为了确保改变状态的逻辑像状态本身一样集中，建议在 store 上定义方法，方法的名称应该要能表达出行动的意图
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  // 请注意这里点击的处理函数使用了 store.increment()，带上了圆括号作为内联表达式调用，因为它并不是组件的方法，并且必须要以正确的 this 上下文来调用
  increment() {
    this.count++
  }
})

// 使用其他响应式 API
import { ref } from 'vue'

// 全局状态，创建在模块作用域下
const globalCount = ref(1)

export function useCount() {
  // 局部状态，每个组件都会创建
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

SSR 服务端渲染：

Pinia：

- 更强的团队协作约定；
- 与 Vue DevTools 集成，包括时间轴、组件内部审查和时间旅行调试；
- 模块热更新 (HMR)；
- 服务端渲染支持；
1. Vuex 现在处于维护模式。它仍然可以工作，但不再接受新的功能；
2. Pinia 最初正是为了探索 Vuex 的下一个版本而开发的，因此整合了核心团队关于 Vuex 5 的许多想法。最终，我们意识到 Pinia 已经实现了我们想要在 Vuex 5 中提供的大部分内容，因此决定将其作为新的官方推荐；

优点：

- 更简洁直接的 API；
- 组合式风格的 API；
- 支持 TypeScript 类型推导；

### 测试
测试的类型：

- 单元测试：检查给定函数、类或组合式函数的输入是否产生预期的输出或副作用。
- 组件测试：检查你的组件是否正常挂载和渲染、是否可以与之互动，以及表现是否符合预期。这些测试比单元测试导入了更多的代码，更复杂，需要更多时间来执行。
- 端到端测试：检查跨越多个页面的功能，并对生产构建的 Vue 应用进行实际的网络请求。这些测试通常涉及到建立一个数据库或其他后端

单元测试：
编写单元测试是为了验证小的、独立的代码单元是否按预期工作。一个单元测试通常覆盖一个单个函数、类、组合式函数或模块。单元测试侧重于逻辑上的正确性，只关注应用整体功能的一小部分。他们可能会模拟你的应用环境的很大一部分（如初始状态、复杂的类、第三方模块和网络请求）
单元测试将捕获函数的业务逻辑和逻辑正确性的问题

单元测试通常适用于独立的业务逻辑、组件、类、模块或函数，不涉及 UI 渲染、网络请求或其他环境问题

组合式函数：

组件的单元测试：

1. 白盒：**单元测试白盒测试知晓一个组件的实现细节和依赖关系**。它们更专注于将组件进行更 独立 的测试。这些测试通常会涉及到模拟一些组件的部分子组件，以及设置插件的状态和依赖性（例如 Pinia）。
2. 黑盒：**组件测试黑盒测试不知晓一个组件的实现细节**。这些测试尽可能少地模拟，以测试组件在整个系统中的集成情况。它们通常会渲染所有子组件，因而会被认为更像一种“集成测试”。请查看下方的[组件测试建议](https://cn.vuejs.org/guide/scaling-up/testing.html#component-testing)作进一步了解

推荐方案：
[Vitest](https://vitest.dev/)
因为由 create-vue 创建的官方项目配置是基于 [Vite](https://cn.vitejs.dev/) 的，所以我们推荐你使用一个可以利用同一套 Vite 配置和转换管道的**单元测试框架**。[Vitest](https://cn.vitest.dev/) 正是一个针对此目标设计的单元测试框架，它由 Vue / Vite 团队成员开发和维护。**在 Vite 的项目集成它会非常简单，而且速度非常快**

[Jest](https://jestjs.io/) 是一个广受欢迎的单元测试框架。不过，只推荐你在已有一套 Jest 测试配置、且需要迁移到基于 Vite 的项目时使用它，因为 Vitest 提供了更无缝的集成和更好的性能

组件测试：
组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题

组件测试主要需要关心组件的公开接口而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的事件、prop 和插槽。当进行测试时，请记住，测试这个组件做了什么，而不是测试它是怎么做到的

推荐做法：

- 对于 视图 的测试：根据输入 prop 和插槽断言渲染输出是否正确。
- 对于 交互 的测试：断言渲染的更新是否正确或触发的事件是否正确地响应了用户输入事件

应避免的做法：

- 不要去断言一个组件实例的私有状态或测试一个组件的私有方法。测试实现细节会使测试代码太脆弱，因为当实现发生变化时，它们更有可能失败并需要更新重写。
- 组件的最终工作是渲染正确的 DOM 输出，所以专注于 DOM 输出的测试提供了足够的正确性保证（如果你不需要更多其他方面测试的话），同时更加健壮、需要的改动更少。
- 不要完全依赖快照测试。断言 HTML 字符串并不能完全说明正确性。应当编写有意图的测试。
- 如果一个方法需要测试，把它提取到一个独立的实用函数中，并为它写一个专门的单元测试。如果它不能被直截了当地抽离出来，那么对它的调用应该作为交互测试的一部分

推荐方案：

- [Vitest](https://vitest.dev/) 对于组件和组合式函数都采用无头渲染的方式 (例如 VueUse 中的 [useFavicon](https://vueuse.org/core/useFavicon/#usefavicon) 函数)。组件和 DOM 都可以通过 [@vue/test-utils](https://github.com/vuejs/test-utils) 来测试。
- [Cypress 组件测试](https://on.cypress.io/component) 会预期其准确地渲染样式或者触发原生 DOM 事件。它可以搭配 [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro) 这个库一同进行测试

Vitest 和基于浏览器的运行器之间的主要区别是速度和执行上下文。简而言之，基于浏览器的运行器，如 Cypress，可以捕捉到基于 Node 的运行器（如 Vitest）所不能捕捉的问题（比如样式问题、原生 DOM 事件、Cookies、本地存储和网络故障），但基于浏览器的运行器比 Vitest 慢几个数量级，因为它们要执行打开浏览器，编译样式表以及其他步骤。Cypress 是一个基于浏览器的运行器，支持组件测试。请阅读 [Vitest 文档的“比较”这一章](https://vitest.dev/guide/comparisons.html#cypress) 了解 Vitest 和 Cypress 最新的比较信息

组件挂载库：
组件测试通常涉及到单独挂载被测试的组件，触发模拟的用户输入事件，并对渲染的 DOM 输出进行断言。有一些专门的工具库可以使这些任务变得更简单。

- [@vue/test-utils](https://github.com/vuejs/test-utils) 是**官方的底层组件测试库，用来提供给用户访问 Vue 特有的 API**。@testing-library/vue 也是基于此库构建的。
- [@testing-library/vue](https://github.com/testing-library/vue-testing-library) 是一个**专注于测试组件而不依赖于实现细节的 Vue 测试库**。它的指导原则是：测试越是类似于软件的使用方式，它们就能提供越多的信心

注意⚠️：推荐在应用中使用 @vue/test-utils 测试组件。@testing-library/vue 在测试带有 Suspense 的异步组件时存在问题，在使用时需要谨慎

其他选择：

- [Nightwatch](https://v2.nightwatchjs.org/) 是一个端到端测试运行器，支持 Vue 的组件测试。(Nightwatch v2 版本的 [示例项目](https://github.com/nightwatchjs-community/todo-vue))；
- [WebdriverIO](https://webdriver.io/docs/component-testing/vue) 用于跨浏览器组件测试，该测试依赖于基于标准自动化的原生用户交互。它也可以与测试库一起使用；

端到端（E2E）测试：

- 端到端测试针对的可以说是应用最重要的方面：当用户实际使用你的应用时发生了什么。
- 端到端测试的重点是多页面的应用表现，针对你的应用在生产环境下进行网络请求。他们通常需要建立一个数据库或其他形式的后端，甚至可能针对一个预备上线的环境运行。
- 端到端测试通常会捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题。如上所述，它们可以捕捉到单元测试或组件测试无法捕捉的关键问题。
- 端到端测试不导入任何 Vue 应用的代码，而是完全依靠在真实浏览器中浏览整个页面来测试你的应用。
- 端到端测试验证了你的应用中的许多层。可以在你的本地构建的应用中，甚至是一个预上线的环境中运行。针对预上线环境的测试不仅包括你的前端代码和静态服务器，还包括所有相关的后端服务和基础设施

解决方案：

- 跨浏览器测试：
- 更快的反馈：
- 第一优先级的调试体验：
- 无头模式下的可见性：

[Cypress](https://www.cypress.io/)总的来说，我们认为 Cypress 提供了最完整的端到端解决方案，其具有信息丰富的图形界面、出色的调试性、内置断言和存根、抗剥落性、并行化和快照等诸多特性。而且如上所述，它还提供对 [组件测试](https://docs.cypress.io/guides/component-testing/introduction) 的支持。不过，它只支持测试基于 Chromium 的浏览器和 Firefox。
其他选项：

- [Playwright](https://playwright.dev/) 也是一个非常好的端到端测试解决方案，支持测试范围更广的浏览器品类（主要是 WebKit 型的）。查看这篇文章 [《为什么选择 Playwright》](https://playwright.dev/docs/why-playwright) 了解更多细节。
- [Nightwatch](https://nightwatchjs.org/) 是一个基于 [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver) 的端到端测试解决方案。它的浏览器品类支持范围是最广的。
- [WebdriverIO](https://webdriver.io/) 是一个基于 WebDriver 协议的网络和移动测试的自动化测试框架

AI 总结：

1. **为什么需要测试**：
   - 自动化测试可以预防 bug，鼓励开发者构建可测试、可维护的代码。
   - 测试有助于快速、自信地构建复杂的 Vue 应用。
   - 在发布前发现并解决问题至关重要。
2. **何时测试**：
   - 建议尽早开始编写测试，随着应用复杂度增加，添加测试的难度也会增加。
3. **测试的类型**：
   - **单元测试**：验证小的、独立的代码单元（如函数、类、组合式函数或模块）是否按预期工作。
   - **组件测试**：验证组件是否正常挂载、渲染和响应用户交互。
   - **端到端（E2E）测试**：跨越多个页面，对生产构建的 Vue 应用进行实际网络请求的测试。
4. **单元测试**：
   - 单元测试关注逻辑正确性，通常模拟应用环境的大部分。
   - 单元测试适用于独立的业务逻辑、组件、类、模块或函数。
   - 推荐使用 Vitest（基于 Vite 的测试框架）或 Jest（如果已有 Jest 配置）。
5. **组件测试**：
   - 组件测试关注组件的公开接口，如 prop、事件、插槽、样式等。
   - 应该模拟用户交互，而不是直接与组件编程式交互。
   - 推荐使用 Vue Test Utils 和 @testing-library/vue。
6. **端到端（E2E）测试**：
   - E2E 测试关注用户实际使用应用时的行为。
   - 需要建立数据库或其他后端服务。
   - 现代 E2E 测试工具如 Cypress 提供了丰富的调试功能和并行化支持。
7. **测试组合式函数**：
   - 组合式函数的测试分为依赖宿主组件实例和不依赖的两类。
   - 不依赖的组合式函数可以直接调用并断言其结果。
   - 依赖的组合式函数需要在宿主组件中进行测试。
8. **用例指南**：
   - 提供了如何在基于 Vite 的 Vue 项目中添加 Vitest 和进行测试的步骤。

页面还提到了一些测试工具和库，如 Vitest、Jest、Vue Test Utils、@testing-library/vue、Cypress 和 Playwright，以及它们在 Vue.js 应用测试中的应用。此外，还强调了测试应该尽可能模拟真实的用户行为，以及如何通过测试来提高应用的可靠性和维护性。

### 服务端渲染（SSR）
AI 总结：

1. 为什么要用 SSR？ SSR 提供了更快的首屏加载时间，这对于用户体验和 SEO 都非常重要。它允许搜索引擎爬虫直接看到完全渲染的页面，这对于内容驱动的网站尤其有用。
2. SSR vs. SSG：静态站点生成（SSG）是另一种技术，它在构建时生成静态 HTML 文件，适用于数据在构建时已知且不会改变的场景。SSG 更适合于内容网站，而 SSR 适合于需要动态数据的应用。
3. 基础教程：文档提供了一个简单的 SSR 示例，展示了如何在 Node.js 服务器上创建一个 Vue SSR 应用，并在客户端激活它。
4. 客户端激活：在 SSR 应用中，客户端需要执行一个激活步骤，以便将预渲染的 HTML 与 DOM 节点匹配并添加事件监听器。
5. 代码结构：为了在客户端复用服务端的应用实现，需要考虑如何在服务器和客户端之间共享相同的应用代码。
6. 更通用的解决方案：文档推荐使用如 Nuxt、Quasar 或 Vite SSR 这样的解决方案，它们提供了更集成化的 SSR 开发体验。
7. 书写 SSR 友好的代码：在 SSR 应用中，需要注意服务端的响应性、组件生命周期钩子、平台特有 API 的访问、跨请求状态污染、激活不匹配等问题。
8. Teleports：在 SSR 中，Teleport 组件需要特殊处理，因为它们的内容不会包含在主应用渲染的 HTML 字符串中

什么是 SSR：
Vue.js 是一个用于构建客户端应用的框架。默认情况下，**Vue 组件的职责是在浏览器中生成和操作 DOM**。然而，Vue 也支持将组件在服务端直接**渲染成 HTML 字符串**，作为服务端响应返回给浏览器，最后在浏览器端将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。
一个由服务端渲染的 Vue.js 应用也可以被认为是“同构的”(Isomorphic) 或“通用的”(Universal)，因为应用的大部分代码同时运行在服务端和客户端

为什么要用 SSR：
与客户端的单页应用 (SPA) 相比，SSR 的优势主要在于：

- **更快的首屏加载**：这一点在慢网速或者运行缓慢的设备上尤为重要。服务端渲染的 HTML 无需等到所有的 JavaScript 都下载并执行完成之后才显示，所以你的用户将会更快地看到完整渲染的页面。除此之外，数据获取过程在首次访问时在服务端完成，相比于从客户端获取，可能有更快的数据库连接。这通常可以带来更高的[核心 Web 指标](https://web.dev/vitals/)评分、更好的用户体验，而对于那些“首屏加载速度与转化率直接相关”的应用来说，这点可能至关重要。
- **统一的心智模型**：你可以使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用，而不需要在后端模板系统和前端框架之间来回切换。
- **更好的 SEO**：搜索引擎爬虫可以直接看到完全渲染的页面。

注意⚠️：截至目前，Google 和 Bing 可以很好地对同步 JavaScript 应用进行索引。这里的“同步”是关键词。如果你的应用以一个 loading 动画开始，然后通过 Ajax 获取内容，爬虫并不会等到内容加载完成再抓取。也就是说，如果 SEO 对你的页面至关重要，而你的内容又是异步获取的，那么 SSR 可能是必需的

使用 SSR 时还有一些权衡之处需要考量：

- **开发中的限制。浏览器端特定的代码只能在某些生命周期钩子中使用**；一些外部库可能需要特殊处理才能在服务端渲染的应用中运行。
- **更多的与构建配置和部署相关的要求**。**服务端渲染的应用需要一个能让 Node.js 服务器运行的环境，不像完全静态的 SPA 那样可以部署在任意的静态文件服务器上**。
- **更高的服务端负载**。在 Node.js 中渲染一个完整的应用要比仅仅托管静态文件更加占用 CPU 资源，因此如果你预期有高流量，请为相应的服务器负载做好准备，并采用合理的缓存策略。

注意⚠️：在为你的应用使用 SSR 之前，你首先应该问自己是否真的需要它。这主要取决于首屏加载速度对应用的重要程度。例如，如果你正在开发一个内部的管理面板，初始加载时的那额外几百毫秒对你来说并不重要，这种情况下使用 SSR 就没有太多必要了。然而，在内容展示速度极其重要的场景下，**SSR 可以尽可能地帮你实现最优的初始加载性能**

SSR vs SSG：
**静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，是另一种流行的构建快速网站的技术**。如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。
SSG 保留了和 SSR 应用相同的性能表现：它带来了优秀的首屏加载性能。同时，它比 SSR 应用的花销更小，也更容易部署，因为它输出的是静态 HTML 和资源文件。这里的关键词是静态：SSG 仅可以用于消费静态数据的页面，即数据在构建期间就是已知的，并且在多次部署期间不会改变。**每当数据变化时，都需要重新部署**

如果你调研 SSR 只是为了优化为数不多的营销页面的 SEO (例如 /、/about 和 /contact 等)，那么你可能需要 SSG 而不是 SSR。SSG 也非常适合构建基于内容的网站，比如文档站点或者博客。**Vue 官方文档这个网站就是使用 **[**VitePress**](https://vitepress.dev/)** 静态生成的，它是一个由 Vue 驱动的静态站点生成器**

框架推荐：

- Nuxt

[Nuxt](https://nuxt.com/) 是一个构建于 Vue 生态系统之上的全栈框架，它为编写 Vue SSR 应用提供了丝滑的开发体验。更棒的是，你还可以把它当作一个静态站点生成器来用！

- Quasar

[Quasar](https://quasar.dev/) 是一个基于 Vue 的完整解决方案，它可以让你用同一套代码库构建不同目标的应用，如 SPA、SSR、PWA、移动端应用、桌面端应用以及浏览器插件。除此之外，它还提供了一整套 Material Design 风格的组件库

- Vite SSR

Vite 提供了内置的 [Vue 服务端渲染支持](https://cn.vitejs.dev/guide/ssr.html)，但它在设计上是偏底层的。如果你想要直接使用 Vite，可以看看 [vite-plugin-ssr](https://vite-plugin-ssr.com/)，一个帮你抽象掉许多复杂细节的社区插件。
你也可以在[这里](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue)查看一个使用手动配置的 Vue + Vite SSR 的示例项目，以它作为基础来构建。请注意，这种方式只有在你有丰富的 SSR 和构建工具经验，并希望对应用的架构做深入的定制时才推荐使用

书写 SSR 友好的代码：

- 服务端响应性；
- 组件生命周期钩子；
- 访问平台特有的 API（node-fetch）；
- 跨请求状态污染；
- 激活不匹配；
- 自定义指令；
- Teleports；
