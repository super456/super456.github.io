---
title: Vue3 学习笔记（一）
date: 2023-12-23 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue3 学习笔记（一）

## 简介
:::info
💡：Vue3 版本学习官方文档笔记
:::

- [简介 | Vue.js](https://cn.vuejs.org/guide/introduction.html)
- [互动教程文档](https://cn.vuejs.org/tutorial/#step-1)
- [所有示例文档](https://cn.vuejs.org/examples/#hello-world)
- [Vue SPC Playground——在线演练场及示例分享站点](https://play.vuejs.org/#eNp9kVFLwzAQx7/KeS9TmBuyt1EHKgP1QUUFX/JS2lvXmSYhucxC6Xf32tLqwxiEJPf/X5Lf5Rq8c25xjIRrTELmS8cbZah21jPktEujZmiUAchTTi+vhj2AJ47ejBFAFYo1zB5Jawtf1uv8YjZYbbfIJCNZTg9IwFQ5nTJJBJDsbzZN090CbZssJerV0rjIcLyubE76VqH4CsVKltNpnCOHzJpdWSwOwRqpo4dSmNnKlZr8q+PSmqBwPeIqTIXz57nX2Eeaj3q2p+z7hH4IdacpfPMUyB9J4eRx6gviwd5+vFAt+8kU8qgl+4z5TsHq2DEOaffR5IL9L6+nfaq6npSm+AzbmsmEsagOtP/kPl+hNPPhTOl/uKvFamwOtr/4aany)
- [术语表](https://cn.vuejs.org/glossary/)
- [生产环境错误代码参考](https://cn.vuejs.org/error-reference/)
- [API](https://cn.vuejs.org/api/)
- [主题案例](https://cn.vuejs.org/ecosystem/themes.html)
- [UI 组件学习](https://ui-libs.vercel.app/)

<CustomImage src='/growth-record/frame/vue/vue3study01.webp' />

- [工具链相关](https://cn.vuejs.org/guide/scaling-up/tooling.html)

### 核心功能
Vue 的两大核心功能：

- 声明式渲染：Vue 基于标准 HTML 拓展了一套模版语法，使得我们可以声明式地**描述**最终输出的 **HTML** 和 **JavaScript** **状态之间的关系；**
- 响应式：Vue 会自动跟踪 **JavaScript 状态**并在其**发生变化**时**响应式地更新 DOM；**

### 渐进式框架
它是一个可以与你共同成长、适应你不同需求的框架

特点：灵活性、逐步集成使用

- 无需构建步骤，渐进式增强静态 HTML；
- 在任何页面中作为 Web Components 嵌入；
- 单页应用（SPA）；
- 全栈 / 服务端渲染（SSR）；
- Jamstack / 静态站点生成（SSG）；
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面；

### 单文件组件
SRC（Single-File Components）：使用一种类似 HTML 格式的文件来书写 Vue 组件，会将一个组件的逻辑（JavaScript）、模版（HTML）和样式（CSS）封装在同一个文件里

### API 风格
两种：

- 选项式 API；
- 组合式 API；

选项式 API 是在组合式 API 的基础上实现的

选项式 API：“组件实例”为概念中心（this），按照选项来组织代码；
组合式 API 的核心思想：直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题

## 基本使用
### DOM 更新时机
nextTick 使用等待更新时机：
```typescript
import { nextTick } from 'vue'

async function increment () {
  count.value++
  await nextTick()
  // DOM 已经更新了
}

```
### 响应式基础

1. 注意，在模板中使用 ref 时，我们不需要附加 .value。为了方便起见，当在模板中使用时，ref 会自动解包 (有一些[注意事项](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates))
2. [为什么要使用 ref ](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#why-refs)

另一个 ref 的好处是，与普通变量不同，你可以**将 ref 传递给函数，同时保留对最新值和响应式连接的访问**。当将复杂的逻辑重构为可重用的代码时，这将非常有用

shallow ref 放弃深层响应式

3. reactive 与将内部值包装在特殊对象中的 ref 不同
- shallowReactive 退出深层响应式
- 值得注意的是，reactive() 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的

4. reactive 的局限性：
- 有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的[集合类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections))。它不能持有如 string、number 或 boolean 这样的[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失
- 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接

5. ref 解包细节：
- 一个 ref 会在作为响应式对象的属性被访问或修改时自动解包；
- 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref
- 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为[浅层响应式对象](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)的属性被访问时不会解包

数组和集合的注意事项：

- 与 reactive 对象不同的是，当 ref 作为响应式数组或原生集合类型(如 Map) 中的元素被访问时，它不会被解包
- 在模板渲染上下文中，只有顶级的 ref 属性才会被解包，但是，另一个需要注意的点是，如果 ref 是文本插值的最终计算值 (即 `{{ }}` 标签)，那么它将被解包

### 计算属性
可写计算属性
```typescript
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get () {
    return firstName.value + lastName.value
  },
  set (newValue) {
    // 解构赋值法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

**Getter 不应有副作用**
计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值

**避免直接修改计算属性值**
从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算

### Class 与 Style 绑定

1. 绑定 class：

将动态的对象或数组改为多使用计算属性绑定对象

数组和对象结合使用：
```typescript
<div :class="[{ active: isActive }, errorClass]"></div>
```

注意：如果在组件上使用，对于只有一个根元素的组件，当你使用了 class attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并。根元素为多个时，使用 $attrs.class 属性接收设置对应样式（透传 Attribute）

2. 绑定內联样式 style：
- 注意：自动前缀、样式多值
```typescript
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

```html
<!--
 使用Vue.js的:style绑定,设置display属性为flex,以实现弹性布局.
 这里使用了三种不同的前缀,以适应不同的浏览器.
 注意: 在实际开发中,应该根据需要选择合适的前缀,并且避免使用不必要的前缀,以避免代码过于冗长.
-->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

```
数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex

### 条件渲染
v-if vs v-show 的区别：

- v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建；
- v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
- 相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换；
- 总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适

v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行

### 列表渲染
v-for 的解构赋值写法：
```typescript
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

也可以使用 v-of：
```typescript
<div v-for="item of items"></div>
```

v-for 遍历对象：遍历顺序跟 Object.keys() 返回值有一样
```typescript
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>

// 解构多个值
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

v-for 里使用范围值（数值），通过使用一个整数值，渲染 1...n，注意：是从 1 开始而并非 0
```typescript
<span v-for="n in 10">{{ n }}</span>
```

template 使用 v-for

v-for 与 v-if：
当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。这意味着 v-if 的条件渲染无法访问到 v-for 作用域内定义的变量别名
```typescript
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>

// 修改为：
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

通过 key 管理状态
**就地更新原则：当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染**
注意：默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况
key 的作用：为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，需要为每个元素对应的块提供一个唯一的 key attribute：
```typescript
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

当使用 `<template v-for>` 时， key 应该被放置在这个 template 容器上：
```typescript
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。**不要用对象作为 v-for 的 key**

组件上使用 v-for 跟一般元素上使用没有区别

数组变化侦测

### 事件处理
事件处理器的值可以是：

- 內联事件处理器：
- 方法事件处理器：

內联事件处理器用于简单的场景：
```typescript
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

方法事件处理器：会自动接收原生 DOM 事件并触发执行

在內联事件处理器中访问事件参数：
```typescript
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

事件修饰符

- .stop
- .prevent
- .self
- .capture
- .once
- .passive

注意：`.capture`、`.once` 和 `.passive` 修饰符与[原生 addEventListener 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#options)相对应
```typescript
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

按键修饰符

- .enter
- .tab
- .delete（捕获 Delete 和 Backspace 两个按键）
- .esc
- .space
- .up
- .down
- .left
- .right

系统按键：

- .crtl
- .alt
- .shift
- .meta（在 Mac 键盘上，meta 是 Command 键 (⌘)。在 Windows 键盘上，meta 键是 Windows 键 (⊞)）
```typescript
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />

  <!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

鼠标按键修饰符

- .left
- .right
- .middle

### 表单输入绑定
v-model 语法糖：
```typescript
<input
  :value="text"
  @input="event => text = event.target.value">

// 修改为
<input v-model="text">
```
注意⚠️：
v-model 会忽略任何表单元素上初始的 value、checked 或 selected attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。你应该在 JavaScript 中使用 [响应式系统的 API](https://cn.vuejs.org/api/reactivity-core.html#reactivity-api-core) 来声明该初始值

复选框及单选框：
将多个复选框绑定到同一个数组或集合的值中：
```typescript
const checkedNames = ref([])

<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>

// 设置复选框选中和未选中的自定义值（默认为 true 或 false）
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```
注意⚠️：true-value 和 false-value attributes 不会影响 value attribute，因为浏览器在表单提交时，并不会包含未选择的复选框。为了保证这两个值 (例如：“yes”和“no”) 的其中之一被表单提交，请使用单选按钮作为替代

单选按钮：
```typescript
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

选择器选项：
v-model 同样也支持非字符串类型的值绑定：
```typescript
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```
选中后 selected 的值为：`{ number: 123 }`

修饰符

- .lazy
```typescript
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

- .number
```typescript
<input v-model.number="age" />
```
注意⚠️：如果该值无法被 parseFloat() 处理，将返回原始值

- .trim
```typescript
<input v-model.trim="msg" />
```
默认去除输入内容的首尾两端空格

### 生命周期
onMounted：用来组件完成初始化渲染并创建 DOM 节点后运行代码
当调用 onMounted 时，Vue 会自动将回调函数注册到当前正被初始化的组件实例上。**这意味着这些钩子应当在组件初始化时被同步注册**

注意⚠️：不哟啊异步注册钩子
```typescript
setTimeout(() => {
  onMounted(() => {
    // 异步注册时当前组件实例已丢失
    // 这将不会正常工作
  })
}, 100)
```

外部函数调用：
**`onMounted` 的调用不必须放在 `setup()` 或 `<script setup>` 内的词法上下文中。`onMounted()` 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自 `setup()` 就可以**
<CustomImage src='/growth-record/frame/vue/vue3study02.webp' />

详细解释版：
<CustomImage src='/growth-record/frame/vue/vue3study18.png' />

### 侦听器
**注意⚠️：watch 可以直接监听一个 ref**
```typescript
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

侦听数据源类型
watch 的第一个参数可以是不同形式的“数据源”：

- 一个 ref （包括计算属性）；
- 一个响应式对象（reactive()）；
- 一个 getter 函数（() => x.value）；
- 多个数据源组成的数组；
```typescript
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```
**注意⚠️：响应式对象监听某个属性写法，需要写成 getter 函数形式：**
```typescript
const obj = reactive({ count: 0 })

// 错误，因为 watch 得到的是一个 number
watch(obj.count, (count) => {
  ...
})

// 修改为
watch(() => obj.count, (count) => {
  ...
})
```

深层侦听
如果直接给 `watch()` 传入一个响应式对象，**会隐式地创建一个深层侦听器**——**该回调函数在所有嵌套的变更时都会被触发**：
```typescript
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```
相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：
```typescript
watch(
  // 响应式对象中的对象
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

// 改成深度侦听器，添加 deep
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```
注意⚠️：深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，**并且要留意性能**

即时回调的侦听器
```typescript
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

watchEffect()
注意回调会立即执行，不需要指定：immediate: true，自动追踪依赖（和计算属性类似）
```typescript
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)

// 修改为
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```
注意⚠️：

- 对于有**多个依赖项**的侦听器来说，使用 `watchEffect()`**可以消除手动维护依赖列表的负担**。此外，如果你需要**侦听一个嵌套数据结构中的几个属性**，`watchEffect()` 可能会比深度侦听器更有效，因为它将**只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性**
- watchEffect **仅会在其同步执行期间，才追踪依赖**。在使用异步回调时，只有在**第一个 await 正常工作前访问到的属性才会被追踪**

**多使用 watchEffect 替换 watch API 操作**

watch VS watchEffect：
主要区别在于追踪响应式依赖的方式

- watch **只追踪明确侦听的数据源**。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，能**更加精确地控制回调函数的触发时机**
- watchEffect，**则会在副作用发生期间追踪依赖**。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其**响应性依赖关系会不那么明确**

回调的触发时机：
更改了响应式状态，它可能会**同时触发 Vue 组件更新和侦听器回调**
**默认情况下，侦听器回调都会在 Vue 组件更新之前被调用，意味着侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态**
如果在侦听器回调中想访问在 Vue 更新之后的 DOM，指明选项：
```typescript
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

import { watchPostEffect } from 'vue'

// 别名
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

停止侦听器：
注意⚠️：在 setup() 或 `<script setup>` 中用**同步语句**创建的侦听器，会自动绑定到宿主组件实例上，并且会在**宿主组件卸载时自动停止**。因此，在大多数情况下，你无需关心怎么停止一个侦听器

异步语句创建侦听器：**如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上**，你必须手动停止它，以防内存泄漏：
```typescript
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

// 手动停止侦听器
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
</script>
```
注意⚠️：尽量不要使用异步创建侦听器，如果需要等待异步状态数据，使用条件式侦听逻辑即可：
```typescript
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

### 模版引用
访问模版引用：
```typescript
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
注意⚠️：只可以在组件挂载后才能访问模版引用。如果想在模版中的表达式上访问，在初次渲染时会是 null。这是因为在初次渲染前这个元素还不存在
侦听模版引用 ref 的变化：
```typescript
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```

v-for 使用模版引用
当在 v-for 中使用模版引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：
```typescript
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```
注意⚠️：ref 数组并不保证与源数组相同的顺序

函数模版引用：
ref 属性还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：
```typescript
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```
注意⚠️：使用动态的 :ref 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null。可以绑定一个组件方法而不是內联函数

组件上的 ref
模版引用也可以绑定被用在一个子组件上，这种情况下引用中获得的值是组件实例：
```typescript
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```
注意⚠️：如果子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该组件的 this 完全一致，意味着父组件对子组件的每一个属性和方法都有完全的访问权
大多数情况下，应该使用标准的 props 和 emit 接口来实现父子组件交互

使用 `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显示暴露：
```typescript
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```

### 组件基础
组件允许我们将 UI 划分为独立的、可重用的部分，并且可以对每个部分进行单独的思考：
<CustomImage src='/growth-record/frame/vue/vue3study03.webp' />

注意⚠️：Vue 同样也能很好地配合原生 Web Component

定义一个组件：
将 Vue 组件定义在一个单独的 .vue 文件中，这被叫做单文件组件（简称 SFC）
```typescript
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JavaScript 对象来定义：
```typescript
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
}
```
这个模版是一个內联的 JavaScript 字符串，Vue 将会在运行时编译它。使用 ID 选择器来指向一个元素（通常是原生的 `<template>` 元素），Vue 将会使用其内容作为模版来源
上面👆🏻🌰定义了一个组件，并在一个 .js 文件里默认导出它自己，但也可以通过具名导出在一个文件中导出多个组件

使用组件：
同一个组件注册使用多次，每个组件都是新的实例，都维护着自己的状态
推荐组件名写法为 PascalCase 的标签名来以原生元素做区分
```typescript
// ParcalCase 写法
<ButtonCounter />

<!-- 如果是在 DOM 中书写该模板（原生的 <template> 元素的内容）：kebab-case 写法 -->
<button-counter></button-counter>
```

传递 props：
声明组件 props：

```typescript
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

注意⚠️：defineProps 仅在 `<script setup>` 中可用的编译宏命令，不需要显示地导入。
defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props：

```typescript
const props = defineProps(['title'])
console.log(props.title)
```

如果没有使用 `<script setup>` ，props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数被传入：

```typescript
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

监听事件：
`$emit` 方法（`<templeate>` 可以直接使用内联函数）

defineEmits 宏来声明要抛出的事件：声明一个组件可能触发的所有事件，可以对事件的参数进行验证。避免将它们作为原生事件监听器隐式地应用于子组件的根元素
```typescript
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```
注意⚠️：`defineEmits` 仅可用于 `<script setup>` 之中，无需导入，返回一个等同于 $emit 方法的 emit 函数。用于在组件的 `<script setup>` 中抛出事件，因为此处无法直接访问 $emit：

```typescript
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```
使用非 `<script setup>` 可以通过 emits 选项定义组件会抛出的事件。可以从 setup 函数的第二个参数，即 setup 上下文对象访问到 emit 函数：
```typescript
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

通过插槽来分配内容：
`<slot />`

动态组件：
`<component>` 特殊的 is attribute 实现：
```typescript
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```
is 的值可以是：

- 被注册的组件名；
- 导入的组件对象；

注意⚠️：多个组件切换时，被切换到组件将会被卸载，可以通过 `<keep-alive>` 包裹组件强制被切换掉仍然保持“存活”状态

DOM 内模版解析注意事项：
使用限制

大小写区分
HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你使用 DOM 内的模板时，无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称还是 `v-on` 的事件名称，都需要转换为相应等价的 kebab-case (短横线连字符) 形式：
```typescript
// JavaScript 中的 camelCase
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}

<!-- HTML 中的 kebab-case -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

闭合标签：
Vue 的模板解析器支持任意标签使用 `/>` 作为标签关闭的标志

```typescript
<MyComponent />
```

注意⚠️：DOM 内模版中，必须显示地写出关闭标签：这是由于 HTML 只允许[一小部分特殊的元素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)省略其关闭标签，最常见的就是 `<input>` 和 `<img>`。对于其他的元素来说，如果你省略了关闭标签，原生的 HTML 解析器会认为开启的标签永远没有结束：
```typescript
<my-component></my-component>

// 比如：
<my-component /> <!-- 我们想要在这里关闭标签... -->
<span>hello</span>

// 将被解析为：
<my-component>
  <span>hello</span>
</my-component> <!-- 但浏览器会在这里关闭标签 -->
```

元素位置限制：
某些 HTML 元素对于放在其中的元素类型有限制，例如 `<ul>，<ol>，<table> 和 <select>`，相应的，某些元素仅在放置于特定元素中时才会显示，例如 `<li>，<tr> 和 <option>`，否则标签元素将会被忽略：
```typescript
<table>
  <blog-post-row></blog-post-row>
</table>

  // 自定义的组件 <blog-post-row> 将作为无效的内容被忽略，因而在最终呈现的输出中造成错误
  // 使用特殊的 is 属性解决：（注意⚠️：前缀）
  <table>
  <tr is="vue:blog-post-row"></tr>
</table>
```
注意⚠️：当使用在原生 HTML 元素上时，is 的值必须加上前缀 vue: 才可以被解析为一个 Vue 组件。这一点是必要的，为了避免和原生的[自定义内置元素](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)相混淆

## 深入组件
### 组件注册
一个 Vue 组件在使用前需要被先“注册”，这样 Vue 才能在渲染模版时找到其对应的实现
组件注册有两种方式：

- 全局注册；
- 局部注册；

全局注册：`.component`

```typescript
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)

// 单文件组件
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)

// 链式调用
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

注意⚠️：全局注册的组件可以在此应用的任意组件的模板中使用：

```typescript
<!-- 这在当前应用的任意组件中都可用 -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

所有的子组件可以使用全局注册的组件，这意味着这个三个组件也都可以在彼此内部使用

局部注册：
全局注册组件存在的问题：

- 全局注册，但并没有被使用的组件**无法在生产打包时被自动移除** (也叫“tree-shaking”)。如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中；
- **全局注册在大型项目中使项目的依赖关系变得不那么明确**。在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性；

局部注册组件的优点：

- 使用的父组件中显示导入，并且只能在父组件中使用；
- 使组件之间的依赖关系更加明确；
- 对 `tree-sharking` 更加友好；

在 `<script setup>` 单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```typescript
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册：

```typescript
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```
注意⚠️：对于每个 `components` 对象里的属性，它们的 key 名就是注册的组件名，而值就是相应组件的实现
```typescript
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

注意⚠️：局部注册的组件在后代组件中不能使用/不可用

组件名格式：
推荐使用 `PascalCase`

1. `PascalCase` 是合法的 JavaScript 标识符。这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全；
2. `<PascalCase />` 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素。同时也能够将 **Vue 组件和自定义元素 (web components) 区分开来**

注意⚠️：Vue 支持将模板中使用 `kebab-case` 的标签解析为使用 `PascalCase` 注册的组件。这意味着一个以 `MyComponent` 为名注册的组件，在模板中可以通过 `<MyComponent>` 或 `<my-component>` 引用

### Props
一个组件需要显示声明它所接受的 props，这样接收组件才知道外部传入的哪些 props，哪些是透传 attribute

在 `<script setup>` 文件中使用 `defineProps()` 宏来声明：

```typescript
<script setup>
const props = defineProps(['foo'])

// 使用对象声明
defineProps({
  title: String,
  likes: Number
})

// TypeScript 写法
// <script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()

console.log(props.foo)
</script>
```
不是 `<script setup>` 文件中使用 props 选项来声明：
```typescript
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}

// 使用对象声明
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

注意⚠️：

- `defineProps()` 的参数和提供给 props 选项的值是相同的，两种声明方式背后都是 prop 选项；
- 对于以对象形式声明中的每个属性，**key 是 prop 的名称，而值则是该 prop 预期类型的构造函数（TypeScript 用法不一样）**。比如，如果要求一个 prop 的值是 number 类型，则可使用 Number 构造函数作为其声明的值。对象形式的 props 声明不仅可以一定程度上作为组件的文档，而且如果其他开发者在使用你的组件时传递了错误的类型，也会在浏览器控制台中抛出警告

传递 prop 细节：
prop 名称使用 `camelCase` 形式

```typescript
defineProps({
  greetingMessage: String
})
```

**但是子组件传递 props 时，使用 `camelCase` 形式不太友好，推荐使用 `kebab-case` 形式写法，为了和 HTML `attribute` 对齐**

```typescript
<MyComponent greeting-message="hello" />
```
**组件名推荐 `PascalCase` 形式，提高模板可读性，为了区分 Vue 组件和原生 HTML 元素**

静态 VS 动态：

```typescript
<BlogPost title="My journey with Vue" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

传值不同的值类型：

```typescript
<!-- 虽然 `42` 是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :likes="42" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :likes="post.likes" />
-----------

<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />

-------------
  <!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :comment-ids="post.commentIds" />

------------

<!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :author="post.author" />
```

使用一个对象绑定多个 prop：

```typescript
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />

<BlogPost :id="post.id" :title="post.title" />
```

单向数据流：
注意⚠️：

- 所有的 props 都遵循着单向绑定原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递；
- 这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解；
- 每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop

如果想要更改一个 prop 的需求两场场景：

1. 作为子组件某个变量的初始值，而子组件想在之后将其作为一个局部数据属性：
```typescript
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```

2. 需要对传入的 prop 值做进一步的转换。最好的方式是使用计算属性处理：
```typescript
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

注意：更改对象/数组类型的 props

- 当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失；
- 这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，**除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该**[**抛出一个事件**](https://cn.vuejs.org/guide/components/events.html)**来通知父组件做出改变；**

prop 校验：
Vue 组件可以更细致地声明对传入的 props 的校验要求。比如我们上面已经看到过的类型声明，如果传入的值不满足类型要求，Vue 会在浏览器控制台中抛出警告来提醒使用者

```typescript
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```

注意：`defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中

- 所有 prop 默认都是可选的，除非声明了 `required: true`
- 除 `Boolean` 外的未传递的可选 prop 将会有一个默认值 `undefined；`
- **`Boolean` 类型的未传递 prop 将被转换为 false**。这可以通过为它设置 `default` 来更改——例如：**设置为 `default: undefined` 将与非布尔类型的 prop 的行为保持一致**；
- 如果声明了 `default` 值，那么在** `prop` 的值被解析为 `undefined` 时**，无论 prop 是未被传递还是显式指明的 `undefined`，**都会改为 default 值**

注意⚠️：prop 校验失败，Vue 会在控制台下给出警告（开发模式下）

**如果使用了**[**基于类型的 prop 声明**](https://cn.vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations)** ，Vue 会尽最大努力在运行时按照 prop 的类型标注进行编译。举例来说，`defineProps<{ msg: string }>` 会被编译为 `{ msg: { type: String, required: true }}`**

运行时类型检查：
校验类型选项的 type 可以是这些构造函数：

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

另外，type 也可以是自定义的类或构造函数，Vue 将会通过 `instanceof` 来检查类型是否匹配

```typescript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```
校验 prop 类型是否是某个类的实例：

```typescript
defineProps({
  author: Person
})
```

Vue 会通过 `instanceof` Person 来校验 author prop 的值是否是 Person 类的一个实例

`Boolean` 类型转换：
为了更贴近原生 `boolean` attributes 的行为，声明为 `Boolean` 类型的 props 有特别的类型转换规则

```typescript
defineProps({
  disabled: Boolean
})

<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

**当一个 prop 被声明为允许多种类型时，`Boolean` 的转换规则也将被应用。然而，当同时允许 `String` 和 `Boolean` 时，有一种边缘情况——只有当 `Boolean` 出现在 `String` 之前时，`Boolean` 转换规则才适用**：

```typescript
// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, Number]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, String]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Number, Boolean]
})

// disabled 将被解析为空字符串 (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```

### 组件事件
触发与监听事件：
直接使用 `$emit` 方法触发自定义事件：

```typescript
// <!-- 子组件：MyComponent -->
<button @click="$emit('someEvent')">click me</button>

// 父组件接收事件
<MyComponent @some-event="callback" />
```

事件修饰符：`.once`

```typescript
<MyComponent @some-event.once="callback" />
```

注意⚠️：像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 `kebab-case` 形式来监听。与 [prop 大小写格式](https://cn.vuejs.org/guide/components/props.html#prop-name-casing)一样，**在模板中我们也推荐使用 `kebab-case` 形式来编写监听器**

**和原生 DOM 事件不一样，组件触发的事件没有冒泡机制**。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个[全局状态管理方案](https://cn.vuejs.org/guide/scaling-up/state-management.html)

事件参数：

```typescript
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>

// 父组件接收：內联函数或组件方法都可以
<MyButton @increase-by="(n) => count += n" />
```

注意⚠️：所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值

声明触发的事件：
显示地通过 `defineEmits()` 宏来声明要触发的事件：

```typescript
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

在 `<template>` 中使用的 `$emit` 方法不能在组件的 `<script setup>` 部分中使用，但 `defineEmits()` 会返回一个相同作用的函数供我们使用：

```typescript
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>

// 其他写法
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) { // setup(props, { emit })
    ctx.emit('submit')
  }
}
```

注意⚠️：`defineEmit()` 不能在子函数中使用，必须直接放置在 `<script setup>` 的顶级作用域下

`emits` 选项和 `defineEmits()` 宏还支持对象语法。通过 TypeScript 为参数指定类型，它允许我们对触发事件的参数进行验证：

```typescript
<script setup>
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // 通过返回值为 `true` 还是为 `false` 来判断
    // 验证是否通过
  }
})
</script>

// 或
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

注意⚠️：尽管事件声明是可选的，我们还是**推荐你完整地声明所有要触发的事件，以此在代码中作为文档记录组件的用法**。同时，事件声明能让 Vue 更好地将事件和[透传 attribute](https://cn.vuejs.org/guide/components/attrs.html#v-on-listener-inheritance) 作出区分，从而避免一些由第三方代码触发的自定义 DOM 事件所导致的边界情况

事件校验：
和对 `props` 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。
要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法：

```typescript
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

将事件作为 `prop`：
可以通过在大写的事件名称前加上 `on` 将 `events` 作为 `props` 声明并传递。
与使用 `emit('event')` 的行为不同，`props.onEvent` 只会处理基于属性的监听器（`@event` 或 `:on-event`）
注意⚠️：如果同时传递了 `:onEvent` 和 `@event`，则 `props.onEvent` 可能是一个函数数组而不是单个函数，这种行为不稳定，可能会在未来改变。因此，建议在触发事件时使用 `emit('event')` 而不是 `props.onEvent`

### 组件  `v-model`

```typescript
<input v-model="searchText" />

// 等价于
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>

// 组件使用时
<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>
// 等价于
<CustomInput v-model="searchText" />
```

组件用法解析：

1. 将内部原生 `<input />` 元素的 value `attribute` 绑定到 `modelValue` prop；
2. 当原生的 `input` 事件触发时，触发一个携带了新值的 `update:modelValue` 自定义事件；

另一种在组件内实现 `v-model` 的方式是使用一个可写的，**同时具有 `getter` 和 `setter` 的 `computed` 属性。get 方法需返回 `modelValue prop`，而 `set` 方法需触发相应的事件**：

```typescript
// 将上面组件重写
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>
<template>
	<input v-model="value" />

</template>
```

`v-model` 的参数：
默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。可以**通过给 `v-model` 指定一个参数来更改这些名字：**

```typescript
<MyComponent v-model:title="bookTitle" />

<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

多个 `v-model` 绑定

```typescript
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

处理 `v-model` 修饰符
[内置的修饰符](https://cn.vuejs.org/guide/essentials/forms.html#modifiers)，例如 `.trim，.number 和 .lazy`。在某些场景下，可能想要一个自定义组件的 `v-model` 支持自定义的修饰符：创建一个自定义的修饰符 capitalize，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写：

```typescript
<MyComponent v-model.capitalize="myText" />
```

**组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到**。在下面的组件中，声明了 `modelModifiers` 这个 prop，它的默认值是一个空对象：

```typescript
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue'])

console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

// 修改为
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

带参数的 `v-model` 修饰符
对于又有参数又有修饰符的 `v-model` 绑定，生成的 prop 名将是 `arg + "Modifiers"`。举例来说：

```typescript
<MyComponent v-model:title.capitalize="myText">

// 组件内部实现
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }

// 多个不同参数使用修饰符
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>

<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

### 透传 Attributes
Attributes 继承
“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 [props](https://cn.vuejs.org/guide/components/props.html) 或 [emits](https://cn.vuejs.org/guide/components/events.html#defining-custom-events) 的 attribute 或者 `v-on` 事件监听器。最常见的例子就是 class、style 和 id
注意⚠️：当一个组件以单个元素为根作渲染时，透传的 attribute 会**自动被添加到根元素上**（如果一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上**继承的值合并**）

```typescript
<!-- <MyButton> 的模板 -->
<button>click me</button>

// 使用
<MyButton class="large" />
// 渲染后
<button class="large">click me</button>
```

`v-on` 监听器继承

```typescript
<MyButton @click="onClick" />
```

click 监听器会被添加到 `<MyButton>` 的根元素，即那个原生的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 onClick 方法。同样的，**如果原生 button 元素自身也通过 `v-on` 绑定了一个事件监听器，则这个监听器和从父组件继承的监听器都会被触发**

深层组件继承
有些情况下一个组件会在根节点上渲染另一个组件
如果此时组件接收透传的 `attribute` 会直接继承传给 `<BaseButton>` 组件：

```typescript
<!-- <MyButton/> 的模板，只是渲染另一个组件 -->
<BaseButton />
```
注意⚠️：

- 透传的 `attribute` 不会包含 `<MyButton>` 上声明过的 `props` 或是针对 `emits` 声明事件的 `v-on` 侦听函数，换句话说，声明过的 `props` 和侦听函数被 `<MyButton>`“消费”了；
- 透传的 `attribute` 若符合声明，也可以作为 `props` 传入 `<BaseButton>`；

禁用 Attributes 继承
如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`

```typescript
// Vue3.3 开始
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>

// 模版表达式可以直接使用
<span>Fallthrough attribute: {{ $attrs }}</span>
```

注意⚠️：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问
- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 **`$attrs.onClick`**

子组件无需透传，但某个按钮需要使用到一个监听事件处理：

```typescript
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>

// 修改为，记得设定：inheritAttrs: false
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

多根节点的 Attributes 继承
和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。**如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告**
因为子组件有多根节点情况下，Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告

```typescript
<header>...</header>
<main>...</main>
<footer>...</footer>

// 修改为
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

在 JavaScript 中访问透传 Attributes
如果需要，你可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传

```typescript
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

// 或
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

注意⚠️：
需要注意的是，虽然这里的 attrs 对象总是反映为最新的透传 attribute，**但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化**。如果你需要响应性，可以**使用 prop**。或者你也可以**使用 `onUpdated()` **使得在每次更新时结合最新的 attrs 执行副作用

### 插槽 Slots
插槽内容与出口，给子组件传递一些模版片段，让子组件在它们的组件中渲染这些片段

```typescript
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>

// 子组件插槽
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>

// 渲染最终结果
<button class="fancy-btn">Click me!</button>
```

`<slot>` 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染

<CustomImage src='/growth-record/frame/vue/vue3study04.webp' />

理解插槽的另一种方式是和下面的 JavaScript 函数作类比，其概念是类似的：

```typescript
// 父元素传入插槽内容
FancyButton('Click me!')

// FancyButton 在自己的模板中渲染插槽内容
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
      ${slotContent}
    </button>`
}
```

注意⚠️：插槽内容可以是任意合法的模板内容，不局限于文本。例如我们可以传入多个元素，甚至是组件：

```typescript
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```

通过使用插槽，`<FancyButton>` 组件**更加灵活和具有可复用性**。现在组件可以用在不同的地方渲染各异的内容，但同时还保证都具有相同的样式。**Vue 组件的插槽机制是受**[**原生 Web Component`<slot>` 元素**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)**的启发而诞生**

渲染作用域：
**插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模版中定义的**
```typescript
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

注意⚠️：插槽内容无法访问子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。**父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域**

默认内容：
```typescript
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>

// 提供了默认值
<SubmitButton>Save</SubmitButton>

// 渲染最终结果
<button type="submit">Save</button>
```

具名插槽：
有时在一个组件中包含多个插槽出口是很有用的

```typescript
<div class="container">
  <header>
    <!-- 标题内容放这里 -->
  </header>
  <main>
    <!-- 主要内容放这里 -->
  </main>
  <footer>
    <!-- 底部内容放这里 -->
  </footer>
</div>
```

对于这种场景，**`<slot>` 元素可以有一个特殊的 attribute name，用来给各个插槽分配唯一的 ID**，以确定每一处要渲染的内容：

```typescript
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// 使用，指令也可以缩写
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>

<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  // 等价于
  // <!-- 隐式的默认插槽 -->
  // <p>A paragraph for the main content.</p>
  // <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
----------------------------
// 传入不同的内容给不同名字的插槽
BaseLayout({
  header: `...`,
  default: `...`,
  footer: `...`
})

// <BaseLayout> 渲染插槽内容到对应位置
function BaseLayout(slots) {
  return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`
}
```

注意⚠️：这类带 name 的插槽被称为具名插槽 (named slots)。**没有提供 name 的 `<slot>` 出口会隐式地命名为“default”**

<CustomImage src='/growth-record/frame/vue/vue3study05.webp' />

动态插槽名：
```typescript
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```
注意⚠️：表达式和动态指令参数受相同的语法限制

作用域插槽：
在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。像对组件传递 props 那样，向一个插槽的出口上传递 attributes：
```typescript
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```
默认插槽如何接受 props，通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象：
```typescript
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

<CustomImage src='/growth-record/frame/vue/vue3study06.webp' />

将作用域插槽类比为一个传入子组件的函数。子组件会将相应的 props 作为参数传给它：

```typescript
MyComponent({
  // 类比默认插槽，将其想成一个函数
  default: (slotProps) => {
    return `${slotProps.text} ${slotProps.count}`
  }
})

function MyComponent(slots) {
  const greetingMessage = 'hello'
  return `<div>${
    // 在插槽函数调用时传入 props
    slots.default({ text: greetingMessage, count: 1 })
  }</div>`
}
```

具名作用域插槽：
插槽 props 可以作为 `v-slot` 指令的值被访问到：`v-slot:name="slotProps"`

```typescript
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>

// 子组件内部传值
<slot name="header" message="hello"></slot>
```

注意⚠️：注意插槽上的 name 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。因此最终 headerProps 的结果是 `{ message: 'hello' }`

如果同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的 `<template>` 标签。尝试直接为组件添加 `v-slot` 指令将导致编译错误。这是为了避免因默认插槽的 props 的作用域而困惑：

```typescript
<!-- 该模板无法编译 -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message 属于默认插槽，此处不可用 -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>

// 修改为：为默认插槽使用显式的 <template> 标签有助于更清晰地指出 message 属性在其他插槽中不可用
<template>
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

高级列表组件示例：

```typescript
<FancyList :api-url="url" :per-page="10">
  // 保留足够的灵活性，将对单个列表元素内容和样式的控制权留给使用它的父组件
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>by {{ username }} | {{ likes }} likes</p>
    </div>
  </template>
</FancyList>

// 或者修改为：在 <FancyList> 之中，多次渲染 <slot> 并每次都提供不同的数据 (注意我们这里使用了 v-bind 来传递插槽的 props)
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```

无渲染组件：
`<FancyList>` 案例同时封装了可重用的逻辑 (数据获取、分页等) 和视图输出，但也将部分视图输出通过作用域插槽交给了消费者组件来管理
注意⚠️：一些组件可能只包括了逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。我们将这种类型的组件称为无渲染组件

```typescript
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

**作用域插槽在需要同时封装逻辑、组合视图界面**

### 依赖注入
Prop 逐级透传问题
当需要从父组件向子组件传递数据时，会使用 [props](https://cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分数据。在这种情况下，**如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦**：

<CustomImage src='/growth-record/frame/vue/vue3study07.webp' />

注意⚠️：虽然这里的 `<Footer>` 组件可能根本不关心这些 props，但为了使 `<DeepChild>` 能访问到它们，仍然需要定义并向下传递。**如果组件链路非常长，可能会影响到更多这条路上的组件。这一问题被称为“prop 逐级透传”，显然是希望尽量避免的情况**

`provide` 和 `inject` 可以帮助我们解决这一问题。 **一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖：**
<CustomImage src='/growth-record/frame/vue/vue3study08.webp' />

`provide（提供`）：

```typescript
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>

// 注意非 setup 写法需要确保 provide() 是在 setup() 同步调用
import { provide } from 'vue'

export default {
  setup() {
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  }
}
```
`provide()` **函数接收两个参数。第一个参数被称为注入名，可以是一个字符串或是一个 `Symbol`**。后代组件会用注入名来查找期望注入的值。**一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值**

```typescript
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

注意⚠️：第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref
**提供的响应式状态使后代组件可以由此和提供者建立响应式的联系**

应用层 Provide：

```typescript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

在应用级别提供的数据在该应用内的所有组件中都可以注入。**这在你编写**[**插件**](https://cn.vuejs.org/guide/reusability/plugins.html)**时会特别有用，因为插件一般都不会使用组件形式来提供值**

`Inject（注入）`：
```typescript
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>

// 注意非 setup 写法需要确保 provide() 是在 setup() 同步调用
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

**如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接**

注入默认值：
默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告

```typescript
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

注意⚠️：**在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得**。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```typescript
const value = inject('key', () => new ExpensiveClass(), true)
```
注意⚠️：**第三个参数表示默认值应该被当作一个工厂函数**

和响应式数据配合使用：
当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护

**🔥🔥🔥有的时候，可能需要在注入方组件中更改数据。在这种情况下，我们推荐在供给方组件内声明并提供一个更改数据的方法函数：**

```typescript
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

注意⚠️：**如果你想确保提供的数据不能被注入方的组件更改，你可以使用 **[**`readonly()`**](https://cn.vuejs.org/api/reactivity-core.html#readonly)** 来包装提供的值**

```typescript
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

使用 Symbol 作注入名：
正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，**建议最好使用 Symbol 来作为注入名以避免潜在的冲突，推荐一个单独的文件中导出这些注入名 Symbol：**

```typescript
// keys.js
export const myInjectionKey = Symbol()

// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /*
  要提供的数据
*/ });

// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

### 异步组件
在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 [defineAsyncComponent](https://cn.vuejs.org/api/general.html#defineasynccomponent) 方法来实现此功能：

```typescript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

注意⚠️：`defineAsyncComponent` 方法**接收一个返回 Promise 的加载函数**。这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败

[ES 模块动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)也会返回一个 Promise，所以多数情况下我们会将它和 defineAsyncComponent 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```typescript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```
**`AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数**。它会将接收到的 props 和插槽传给内部组件，所以你可以使用这个**异步的包装组件无缝地替换原始组件，同时实现延迟加载**

异步组件可以使用 `app.component()` [全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration)：

```typescript
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))

// 父组件直接使用
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

加载与错误状态：
异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```typescript
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

如果提供了一个加载组件，它将在内部组件加载时先行显示。**在加载组件显示之前有一个默认的 200ms 延迟**——这是因为在网络状况较好时，加载完成得很快，**加载组件和最终组件之间的替换太快可能产生闪烁，反而影响用户感受**
注意⚠️：如果提供了一个报错组件，则它会在加载器函数返回的 Promise 抛错时被渲染。你还可以指定一个超时时间，在请求耗时超过指定时间时也会渲染报错组件

搭配 Suspense 使用
**异步组件可以搭配内置的 `<Suspense>` 组件一起使用**

### 示例

1. 树状视图，递归使用自身组件：[在线示例](https://cn.vuejs.org/examples/#tree)
```typescript
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  model: Object
})

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  props.model.children.push({ name: 'new stuff' })
}
</script>

<template>
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      // <!--
      //   一个可以通过其“name”选项递归渲染自己的组件，
      //   (如果使用单文件组件，则从文件名推断)
      // -->
      <TreeItem
        class="item"
        v-for="model in model.children"
        :model="model">
      </TreeItem>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>
```

2. TodoMVC 示例：[在线示例](https://cn.vuejs.org/examples/#todomvc)
```typescript
<!--
一个完全标准的 TodoMVC 实现
https://todomvc.com/
-->

<script setup>
import { ref, computed, watchEffect } from 'vue'

const STORAGE_KEY = 'vue-todomvc'

// 值得借鉴学习的获取指定数据的方式（通过对象属性函数操作，获取对应的值）
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

// 状态
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
const visibility = ref('all')
const editedTodo = ref()

// 获取的状态
const filteredTodos = computed(() => filters[visibility.value](todos.value))
const remaining = computed(() => filters.active(todos.value).length)

// 处理路由
window.addEventListener('hashchange', onHashChange)
onHashChange()

// 状态持久化
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})

function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked))
}

function addTodo(e) {
  const value = e.target.value.trim()
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false
    })
    e.target.value = ''
  }
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1)
}

let beforeEditCache = ''
function editTodo(todo) {
  beforeEditCache = todo.title
  editedTodo.value = todo
}

function cancelEdit(todo) {
  editedTodo.value = null
  todo.title = beforeEditCache
}

function doneEdit(todo) {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodo(todo)
  }
}

function removeCompleted() {
  todos.value = filters.active(todos.value)
}

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    window.location.hash = ''
    visibility.value = 'all'
  }
}
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      >
    </header>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      >
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vue:mounted="({ el }) => el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? ' item' : ' items' }} left</span>
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";
</style>
```
