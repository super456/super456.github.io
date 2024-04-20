---
title: Vue3 学习笔记（三）
date: 2023-12-23 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue3 学习笔记（三）
## 最佳实践
### 生产部署

:::info
这个页面是关于 `Vue.js` 生产部署的最佳实践指南。它主要讨论了在将 `Vue.js` 应用部署到生产环境时应该考虑的几个关键点：

1.  **开发环境与生产环境的区别**：`Vue.js` 在开发过程中提供了许多便利功能，如错误警告、组件 props 校验等。但在生产环境中，这些功能可能会导致性能开销，**因此应该移除所有仅用于开发环境的代码**。
2.  **不使用构建工具的情况**：如果你直接从 CDN 加载 `Vue.js`，确保使用的是生产环境版本（以`.prod.js`结尾的文件）。这些文件已经过最小化处理，移除了开发环境代码。
3.  **使用构建工具**：如果你使用`create-vue`（基于Vite）或Vue CLI（基于 webpack）创建的项目，它们已经配置好了生产环境。如果你有自定义构建流程，确保`Vue.js` 被解析为`vue.runtime.esm-bundler.js`，并且`process.env.NODE_ENV`在构建时被设置为`"production"`。
4.  **追踪运行时错误**：在生产环境中，你可以使用应用级错误处理来向追踪服务报告错误。例如，可以使用 Sentry 或 Bugsnag 等服务，并在Vue应用中设置错误处理器。

页面还提供了一些额外的资源链接，如 Vite 生产环境指南和 Vue CLI 部署指南，以及如何编辑该页面的 GitHub 链接
:::

开发环境 VS 生产环境：
开发体验：

- 对常见错误和隐患的警告
- 对组件 `props` / 自定义事件的校验
- [响应性调试钩子](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging)
- 开发工具集成

当部署到生产环境中时，应该移除所有未使用的、仅用于开发环境的代码分支，来获得更小的包体积和更好的性能

不使用构建工具：
从 CDN 或其他源来加载 Vue，请确保在部署时使用的是生产环境版本（以 `.prod.js` 结尾的构建文件）。生产环境版本会被最小化，并移除了所有仅用于开发环境的代码分支

使用构建工具：
`create-vue`

1. vue 被解析为 `vue.runtime.esm-bundler.js`。
2. [编译时功能标记](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags)已被正确配置。
3. `process.env.NODE_ENV` 会在构建时被替换为 "production"

追踪运行时错误：
[应用级错误处理](https://cn.vuejs.org/api/application.html#app-config-errorhandler) 可以用来向追踪服务报告错误：

```typescript
import { createApp } from 'vue'
const app = createApp(...)
app.config.errorHandler = (err, instance, info) => {
  // 向追踪服务报告错误
}
```

诸如 [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) 和 [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) 等服务也为 Vue 提供了官方集成

### 性能优化
:::info
您提供的链接是 `Vue.js` 的官方文档页面，专门讨论了 `Vue.js` 应用的性能优化。这个页面涵盖了 `Vue.js` 应用在页面加载性能和更新性能方面的优化技巧。以下是一些关键点的概述：

1.  **性能优化概述**：
   - `Vue.js `在大多数场景下性能表现良好，但有时需要针对性的微调。
   - 性能优化分为页面加载性能和更新性能两个方面。
2.  **分析选项**：
   - 使用工具如 PageSpeed Insights、WebPageTest 和 Chrome 开发者工具来衡量性能。
   - Vue 开发者扩展提供了性能分析功能。
3.  **页面加载优化**：
   - 对于页面加载性能敏感的应用，考虑使用服务器端渲染 (SSR) 或静态站点生成 (SSG)。
   - 避免纯客户端的单页面应用 (SPA)，或者将营销相关页面单独部署。
   - 通过构建步骤减小打包产物体积，利用 Tree-shaking 移除未使用的模块。
   - 使用代码分割来按需加载 JavaScript，减少首次加载时的负担。
4.  **更新优化**：
   - 确保子组件的 props 保持稳定，以减少不必要的更新。
   - 使用 `v-once` 和 `v-memo` 指令来跳过某些更新。
   - 计算属性稳定性：从 Vue 3.4 开始，计算属性只在值改变时触发副作用。
5.  **通用优化技巧**：
   - 使用列表虚拟化技术（如 `vue-virtual-scroller` 或 `vue-virtual-scroll-grid`）来优化大型列表渲染。
   - 减少大型不可变数据的响应性开销，使用 `shallowRef` 或 `shallowReactive`。
   - 避免不必要的组件抽象，特别是在大型列表中。

这些优化技巧可以帮助开发者提高 `Vue.js` 应用的性能，无论是在首次加载还是后续的交互中。如果您有具体的问题或需要更详细的解释，请告诉我，我会尽力帮助您。
:::

web 应用性能：

- 页面加载性能：首次访问时，应用展示出内容与达到可交互状态的速度。这通常会用 Google 所定义的一系列 [Web 指标](https://web.dev/vitals/#core-web-vitals) (Web Vitals) 来进行衡量，如[最大内容绘制](https://web.dev/lcp/) (Largest Contentful Paint，缩写为 LCP) 和[首次输入延迟](https://web.dev/fid/) (First Input Delay，缩写为 FID)。
- 更新性能：应用响应用户输入更新的速度。比如当用户在搜索框中输入时结果列表的更新速度，或者用户在一个单页面应用 (SPA) 中点击链接跳转页面时的切换速度

优化性能第一步就是为了你的应用类型确定合适的架构：

- 查看[使用 Vue 的多种方式](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html)这一章看看如何用不同的方式围绕 Vue 组织架构。
- Jason Miller 在 [Application Holotypes](https://jasonformat.com/application-holotypes/) 一文中讨论了 Web 应用的类型以及它们各自的理想实现/交付方式

分析工具：
用于生产部署的负载性能分析：

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

用于本地开发期间的性能分析：

- [Chrome 开发者工具“性能”面板](https://developer.chrome.com/docs/devtools/evaluate-performance/)
   - [app.config.performance](https://cn.vuejs.org/api/application.html#app-config-performance) 将会开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上。
- [Vue 开发者扩展](https://cn.vuejs.org/guide/scaling-up/tooling.html#browser-devtools)也提供了性能分析的功能

页面加载优化：
**页面性能优化技巧，**[**web.dev 指南**](https://web.dev/fast/)**提供了一个全面的总结**

选用正确的架构：

- 纯客户端渲染存在首屏加载缓慢的问题，这可以通过[服务器端渲染 (SSR)](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html#fullstack-ssr) 或[静态站点生成 (SSG)](https://cn.vuejs.org/guide/extras/ways-of-using-vue.html#jamstack-ssg) 来缓解。查看 [SSR 指南](https://cn.vuejs.org/guide/scaling-up/ssr.html)以了解如何使用 Vue 实现 SSR。如果应用对交互性要求不高，你还可以使用传统的后端服务器来渲染 HTML，并在客户端使用 Vue 对其进行增强
- 如果你的主应用必须是 SPA，但还有其他的营销相关页面 (落地页、关于页、博客等)，请单独部署这些页面！理想情况下，营销页面应该是包含尽可能少 JS 的静态 HTML，并用 SSG 方式部署

包体积与 `Tree-shaking` 优化：

- 采用构建步骤；tree-shake；
- 注意引入的依赖项；

代码分割：
**代码分割**是指构建工具将构建后的 JavaScript 包拆分为多个较小的，可以按需或并行加载的文件。通过适当的代码分割，页面加载时需要的功能可以立即下载，而额外的块只在需要时才加载，从而提高性能

```typescript
// lazy.js 及其依赖会被拆分到一个单独的文件中
// 并只在 `loadLazy()` 调用时才加载
function loadLazy() {
  return import('./lazy.js')
}
```

**懒加载**对于页面初次加载时的优化帮助极大，它帮助应用暂时略过了那些不是立即需要的功能。在 Vue 应用中，这可以与 Vue 的[异步组件](https://cn.vuejs.org/guide/components/async.html)搭配使用，为组件树创建分离的代码块：

```typescript
import { defineAsyncComponent } from 'vue'

// 会为 Foo.vue 及其依赖创建单独的一个块
// 它只会按需加载
//（即该异步组件在页面中被渲染时）
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
```

更新优化：

- `Props` 稳定性：
```typescript
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />

// 优化
<ListItem
  v-for="item in list"
  :id="item.id"
  :active="item.id === activeId" />
```

注意⚠️：**这个技巧的核心思想就是让传给子组件的 `props` 尽量保持稳定**

`v-once：`
一个内置的指令，可以用来渲染依赖运行时数据但无需再更新的内容。它的整个子树都会在未来的更新中被跳过

`v-memo：`
一个内置指令，可以用来有条件地跳过某些大型子树或者 v-for 列表的更新

计算属性稳定性：
从 3.4 开始，计算属性仅在其计算值较前一个值发生更改时才会触发副作用：

```typescript
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // true

// will not trigger new logs because the computed value stays `true`
count.value = 2
count.value = 4

// 注意计算返回对象：由于每次都会创建一个新对象，因此从技术上讲，新旧值始终不同。即使 isEven 属性保持不变，Vue 也无法知道，除非它对旧值和新值进行深度比较。这种比较可能代价高昂，并不值得
const computedObj = computed(() => {
  return {
    isEven: count.value % 2 === 0
  }
})
// 优化
const computedObj = computed((oldValue) => {
  const newValue = {
    isEven: count.value % 2 === 0
  }
  if (oldValue && oldValue.isEven === newValue.isEven) {
    return oldValue
  }
  return newValue
})
```

通用优化：
大型虚拟列表：

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- [vueuc/VVirtualList](https://github.com/07akioni/vueuc)

减少大型不可变数据的响应式开销：
Vue 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，因为每个属性访问都将触发代理的依赖追踪
通过使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：

```typescript
const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
```
避免不必要的组件抽象：
有些时候我们会去创建[无渲染组件](https://cn.vuejs.org/guide/components/slots.html#renderless-components)或高阶组件 (用来渲染具有额外 `props` 的其他组件) 来实现更好的抽象或代码组织。虽然这并没有什么问题，但请记住，**组件实例比普通 DOM 节点要昂贵得多，而且为了逻辑抽象创建太多组件实例将会导致性能损失**

### 无障碍访问
:::info
您提供的链接是 `Vue.js` 官方文档中的“无障碍访问”部分。无障碍访问（Accessibility）是确保网站或应用程序对所有用户，包括那些有视觉、听觉、运动或认知障碍的人，都是可用的。`Vue.js` 提供了一些最佳实践来帮助开发者创建无障碍的应用程序。

以下是一些关键点：

1.  **跳过链接（Skip Links）**：在每个页面顶部添加一个链接，允许用户跳过重复的导航内容，直接访问主要内容。
2.  **内容结构**：使用合适的HTML元素和ARIA角色（如`role="main"`）来组织内容，以便辅助技术可以正确地导航。
3.  **标题（Headings）**：正确使用标题标签（`<h1>`到`<h6>`），并按层次结构嵌套它们，以便用户可以通过标题来理解内容结构。
4.  **表单（Forms）**：确保表单元素有适当的标签（`<label>`），并使用`aria-label`或`aria-describedby`属性来提供额外的无障碍信息。
5.  **按钮（Buttons）**：使用`<button>`元素或带有`type="button"`的`<input>`元素来创建按钮，并确保它们有明确的用途。
6.  **功能图片（Functional Images）**：为具有功能的图片提供替代文本（`alt`属性），以便屏幕阅读器可以解释图片的功能。
7.  **无障碍标准（Accessibility Standards）**：遵循W3C的Web内容无障碍指南（WCAG）和Web无障碍倡议-无障碍访问丰富的互联网应用（WAI-ARIA）。
8.  **辅助技术（Assistive Technologies）**：了解并考虑如何与屏幕阅读器（如NVDA、VoiceOver）、缩放工具和其他辅助技术配合工作。
9.  **用户多样性（User Diversity）**：认识到全球有大量残障人士，他们的需求应该被考虑在内。

这些实践有助于提高应用程序的可访问性，确保所有用户都能平等地访问和使用您的Vue.js应用程序。如果您有关于如何实现这些最佳实践的具体问题，或者需要进一步的帮助，请告诉我。
:::

Web 无障碍访问 (也称为 a11y) 是指创建可供任何人使用的网站的做法——无论是身患某种障碍、通过慢速的网络连接访问、使用老旧或损坏的硬件，还是仅处于某种不方便的环境。例如，在视频中添加字幕可以帮助失聪、有听力障碍或身处嘈杂环境而听不到手机的用户。同样地，确保文字样式没有处于太低的对比度，可以对低视力用户和在明亮的强光下使用手机的用户都有所帮助
请先阅读由[万维网联盟 (W3C)](https://www.w3.org/) 提供的 [Web 无障碍访问的规划和管理](https://www.w3.org/WAI/planning-and-managing/)

跳过链接：
你应该在每个页面的顶部添加一个直接指向主内容区域的链接，这样用户就可以跳过在多个网页上重复的内容

```typescript
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```

一旦用户改变路由，请将焦点放回到这个“跳过”链接。通过如下方式聚焦“跳过”链接的模板引用 (假设使用了 `vue-router`) 即可实现：

```typescript
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
```

[阅读关于跳过链接到主要内容的文档](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

内容结构：
确保设计可以支持易于访问的实现是无障碍访问最重要的部分之一。设计不仅要考虑颜色对比度、字体选择、文本大小和语言，还要考虑应用中的内容是如何组织的

标题：
为应用的每个部分设置描述性的标题，可以让用户更容易地预测每个部分的内容

- 按级别顺序嵌套标题：`<h1> - <h6>`；
- 不要在一个章节内跳跃标题的级别；
- 使用实际的标题标记，而不是通过对文本设置样式以提供视觉上的标题；

[阅读更多有关标题的信息](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```typescript
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">Main title</h1>
  <section aria-labelledby="section-title-1">
    <h2 id="section-title-1"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- 内容 -->
  </section>
  <section aria-labelledby="section-title-2">
    <h2 id="section-title-2"> Section Title </h2>
    <h3>Section Subtitle</h3>
    <!-- 内容 -->
    <h3>Section Subtitle</h3>
    <!-- 内容 -->
  </section>
</main>
```

Landmarks：
[Landmark](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role) 会为应用中的章节提供访问规划。依赖辅助技术的用户可以跳过内容直接导航到应用的每个部分。你可以使用 [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) 帮助你实现这个目标：

| HTML | ARIA Role | 地标的目的 |
| --- | --- | --- |
| header | `role="banner"` | 主标题：页面的标题 |
| nav | `role="navigation"` | 适合用作文档或相关文档导航的链接集合 |
| main | `role="main"` | 文档的主体或中心内容 |
| footer | `role="contentinfo"` | 关于父级文档的信息：脚注/版权/隐私声明链接 |
| aside | `role="complementary"` | 用来支持主内容，同时其自身的内容是相对独立且有意义的 |
| search | `role="search"` | 该章节包含整个应用的搜索功能 |
| form | `role="form"` | 表单相关元素的集合 |
| section | `role="region"` | 相关的且用户可能会导航至此的内容。必须为该元素提供 label |

注意⚠️：建议同时使用 landmark HTML 元素和 role 属性，以最大程度地兼容[不支持 HTML5 语义元素的传统浏览器](https://caniuse.com/#feat=html5semantic)，[阅读更多有关标题的细节](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

语义化表单：
当创建一个表单，你可能使用到以下几个元素：`<form>、<label>、<input>、<textarea> 和 <button>`：

```typescript
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <div v-for="item in formItems" :key="item.id" class="form-item">
    <label :for="item.id">{{ item.label }}: </label>
    <input
      :type="item.type"
      :id="item.id"
      :name="item.id"
      v-model="item.value"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```

注意⚠️：如何在表单元素中引入 `autocomplete='on'` 的，它将应用于表单中的所有 input 框。你也可以为每个 input 框都设置不同的 [autocomplete attribute 的值](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)

标签：
提供标签来描述所有表单控件的用途；使 for 和 id 链接起来：
```typescript
<label for="name">Name: </label>
<input type="text" name="name" id="name" v-model="name" />
```
<CustomImage src="/growth-record/frame/vue/vue3study11.webp" />

注意⚠️：可能还见过这样的包装 input 框的标签：

```
<label>
  Name：
  <input type="text" name="name" id="name" v-model="name" />
</label>
```

但我们仍建议你显式地为 input 元素设置 id 相匹配的标签，以更好地实现无障碍访问

`aria-label：`设置无障碍访问名
```typescript
<label for="name">Name: </label>
<input
  type="text"
  name="name"
  id="name"
  v-model="name"
  :aria-label="nameLabel"
/>
```
<CustomImage src="/growth-record/frame/vue/vue3study12.webp" />

`aria-labelledby：`
使用 [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) 类似于 `aria-label`，除非标签文本在屏幕上可见。它通过 id 与其他元素配对，你可以链接多个 id：

```typescript
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
    />
  </div>
  <button type="submit">Submit</button>
</form>
```
<CustomImage src="/growth-record/frame/vue/vue3study13.webp" />

`aria-describedby：`
[aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) 的用法与 `aria-labelledby` 相同，它提供了一条用户可能需要的附加描述信息。这可用于描述任何输入的标准：
```typescript
<form
  class="demo"
  action="/dataCollectionLocation"
  method="post"
  autocomplete="on"
>
  <h1 id="billing">Billing</h1>
  <div class="form-item">
    <label for="name">Full Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      aria-labelledby="billing name"
      aria-describedby="nameDescription"
    />
    <p id="nameDescription">Please provide first and last name.</p>
  </div>
  <button type="submit">Submit</button>
</form>
```
<CustomImage src="/growth-record/frame/vue/vue3study14.webp" />

占位符：
占位符的缺陷之一是默认情况下它们不符合[颜色对比度标准](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)；应当修改其颜色，让它看起来像是预先填入 input 框中的数据一样

用法说明：
提供附加用法说明并在 [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) 内绑定多个 id。这可以使设计更加灵活：
```typescript
<fieldset>
  <legend>Using aria-labelledby</legend>
  <label id="date-label" for="date">Current Date: </label>
  <input
    type="date"
    name="date"
    id="date"
    aria-labelledby="date-label date-instructions"
  />
  <p id="date-instructions">MM/DD/YYYY</p>
</fieldset>

<fieldset>
  <legend>Using aria-describedby</legend>
  <label id="dob" for="dob">Date of Birth: </label>
  <input type="date" name="dob" id="dob" aria-describedby="dob-instructions" />
  <p id="dob-instructions">MM/DD/YYYY</p>
</fieldset>
```

隐藏内容：
```typescript
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <button type="submit">Search</button>
</form>
```

`aria-hidden="true"`
添加 `aria-hidden="true"` 在无障碍访问时被隐藏，但对其他可视用户仍然是可见的。不要在可聚焦的元素上使用它，请只在装饰性的、重复的或屏幕外的内容上使用它
```typescript
<p>This is not hidden from screen readers.</p>
<p aria-hidden="true">This is hidden from screen readers.</p>
```

按钮：
```typescript
<form action="/dataCollectionLocation" method="post" autocomplete="on">
  <!-- 按钮 -->
  <button type="button">Cancel</button>
  <button type="submit">Submit</button>

  <!-- 输入按钮 -->
  <input type="button" value="Cancel" />
  <input type="submit" value="Submit" />
</form>
```

功能图片：
```typescript
<form role="search">
  <label for="search" class="hidden-visually">Search: </label>
  <input type="text" name="search" id="search" v-model="search" />
  <input
    type="image"
    class="btnImg"
    src="https://img.icons8.com/search"
    alt="Search"
  />
</form>

<form role="search">
  <label for="searchIcon" class="hidden-visually">Search: </label>
  <input type="text" name="searchIcon" id="searchIcon" v-model="searchIcon" />
  <button type="submit">
    <i class="fas fa-search" aria-hidden="true"></i>
    <span class="hidden-visually">Search</span>
  </button>
</form>
```

规范：
万维网联盟 (W3C) Web 无障碍访问倡议 (WAI) 为不同的组件制定了 Web 无障碍性标准：

- [用户代理无障碍访问指南 (UAAG)](https://www.w3.org/WAI/standards-guidelines/uaag/)
   - 浏览器和媒体查询，包括一些其他方面的辅助技术
- [创作工具无障碍访问指南 (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/)
   - 创作工具
- [Web 内容无障碍访问指南 (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
   - 网站内容 - 由开发者、创作工具和无障碍访问评估工具使用。

网络内容无障碍指南 (WCAG)
[WCAG 2.1](https://www.w3.org/TR/WCAG21/) 继承自 [WCAG 2.0](https://www.w3.org/TR/WCAG20/)，接纳 Web 演进过程中的新技术。W3C 鼓励在开发或更新 Web 无障碍访问策略时使用 WCAG 的最新版本。

WCAG 2.1 四大指导原则 (缩写 POUR)：

- [可感知性](https://www.w3.org/TR/WCAG21/#perceivable)
   - 用户必须能够感知所渲染的信息
- [可操作性](https://www.w3.org/TR/WCAG21/#operable)
   - 表单界面，控件和导航是可操作的
- [可理解性](https://www.w3.org/TR/WCAG21/#understandable)
   - 信息和用户界面的操作必须为所有用户所理解
- [健壮性](https://www.w3.org/TR/WCAG21/#robust)
   - 随着技术的进步，用户必须能够访问内容

Web 无障碍倡议 – 无障碍访问丰富的互联网应用 (WAI-ARIA)
W3C 的 WAI-ARIA 为如何构建动态内容和高阶用户界面控件提供了指导。

- [可便捷访问的丰富互联网应用 (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA 实践 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

资源：
文档

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/TR/wai-aria-practices-1.2/)

辅助技术

- 屏幕助读器
   - [NVDA](https://www.nvaccess.org/download/)
   - [VoiceOver](https://www.apple.com/accessibility/mac/vision/)
   - [JAWS](https://www.freedomscientific.com/products/software/jaws/?utm_term=jaws%20screen%20reader&utm_source=adwords&utm_campaign=All+Products&utm_medium=ppc&hsa_tgt=kwd-394361346638&hsa_cam=200218713&hsa_ad=296201131673&hsa_kw=jaws%20screen%20reader&hsa_grp=52663682111&hsa_net=adwords&hsa_mt=e&hsa_src=g&hsa_acc=1684996396&hsa_ver=3&gclid=Cj0KCQjwnv71BRCOARIsAIkxW9HXKQ6kKNQD0q8a_1TXSJXnIuUyb65KJeTWmtS6BH96-5he9dsNq6oaAh6UEALw_wcB)
   - [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)
- 缩放工具
   - [MAGic](https://www.freedomscientific.com/products/software/magic/)
   - [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/)
   - [Magnifier](https://support.microsoft.com/en-us/help/11542/windows-use-magnifier-to-make-things-easier-to-see)

测试

- 自动化相关的工具
   - [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
   - [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
   - [ARC Toolkit](https://chrome.google.com/webstore/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en-US)
- 颜色相关的工具
   - [WebAim Color Contrast](https://webaim.org/resources/contrastchecker/)
   - [WebAim Link Color Contrast](https://webaim.org/resources/linkcontrastchecker)
- 其他有用的工具
   - [HeadingMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi?hl=en%E2%80%A6)
   - [Color Oracle](https://colororacle.org/)
   - [NerdeFocus](https://chrome.google.com/webstore/detail/nerdefocus/lpfiljldhgjecfepfljnbjnbjfhennpd?hl=en-US%E2%80%A6)
   - [Visual Aria](https://chrome.google.com/webstore/detail/visual-aria/lhbmajchkkmakajkjenkchhnhbadmhmk?hl=en-US)
   - [Silktide Website Accessibility Simulator](https://chrome.google.com/webstore/detail/silktide-website-accessib/okcpiimdfkpkjcbihbmhppldhiebhhaf?hl=en-US)

用户
世界卫生组织估计，全世界 15% 的人口患有某种形式的残疾，其中约 2 - 4% 的人严重残疾。估计全世界有 10 亿残障人士，他们是世界上最大的少数群体。
残疾的种类繁多，大致可分为以下四类：

- [视觉](https://webaim.org/articles/visual/) - 可以为这些用户提供屏幕助读器、屏幕缩放、控制屏幕对比度或盲文显示等帮助。
- [听觉](https://webaim.org/articles/auditory/) - 可以为这些用户提供视频字幕、文字记录或手语视频。
- [运动能力](https://webaim.org/articles/motor/) - 可以为这些用户提供一系列[运动障碍辅助技术](https://webaim.org/articles/motor/assistive)中：比如语音识别软件、眼球跟踪、单刀式开关、超大轨迹球鼠标、自适应键盘等等。
- [认知能力](https://webaim.org/articles/cognitive/) - 可以为这些用户提供补充媒体、更清晰和简单、更结构化的内容。

你可以查看以下来自 WebAim 的链接，更深入地了解这些用户的需求：

- [Web 无障碍愿景：探索改变 & 人人受益](https://www.w3.org/WAI/perspective-videos/)
- [Web 用户的故事](https://www.w3.org/WAI/people-use-web/user-stories/)

### 安全
:::info
您提供的链接是 Vue.js 的官方文档中关于安全的最佳实践页面。这个页面提供了一系列的安全建议和最佳实践，以帮助开发者在构建 Vue.js 应用时避免常见的安全问题。以下是一些关键点：

1.  **报告漏洞**：如果发现 Vue.js 的漏洞，应立即通过发送电子邮件至 [security@vuejs.org](mailto:security@vuejs.org) 报告。
2.  **首要规则**：不要使用无法信赖的模板。这意味着不应该将用户输入直接作为 Vue 组件的模板，因为这可能导致任意 JavaScript 代码执行。
3.  **Vue 的安全机制**：
   - **HTML 内容**：Vue 会自动转义模板中的 HTML 内容，防止脚本注入。
   - **Attribute 绑定**：动态属性绑定也会自动转义，防止在属性解析时注入 HTML。
   - **潜在的危险**：尽管 Vue 提供了自动转义，但在某些情况下，如允许用户控制样式或 JavaScript，仍然存在安全风险。
4.  **最佳实践**：
   - **注入 HTML**：如果需要渲染用户提供的 HTML，应确保在沙盒环境中进行，或者仅允许用户看到。
   - **URL 注入**：用户提供的 URL 应该在后端进行无害化处理。
   - **样式注入**：避免在模板中渲染 `<style>` 标签，以防止点击劫持。
   - **JavaScript 注入**：避免在 Vue 中渲染 `<script>` 标签，或者将用户提供的 JavaScript 绑定到事件属性。
5.  **后端协调**：与后端团队沟通，确保在处理 CSRF/XSRF 和 XSSI 等 HTTP 安全漏洞时采取适当的措施。
6.  **服务端渲染 (SSR)**：在使用 SSR 时，应遵循 Vue.js 文档中的最佳实践来避免安全漏洞。

这个页面还提供了一些资源链接，如 HTML5 安全手册和 OWASP 的 XSS 防护手册，帮助开发者更深入地了解和防范安全问题。如果您有关于 Vue.js 安全性的具体问题或需要进一步的帮助，请告诉我。
:::

不要使用无法信赖的模版：
使用 Vue 时最基本的安全规则就是不要将无法信赖的内容作为你的组件模板。使用无法信赖的模板相当于允许任意的 JavaScript 在你的应用中执行。更糟糕的是，如果在服务端渲染时执行了这些代码，可能会导致服务器被攻击：

```typescript
Vue.createApp({
  template: `<div>` + userProvidedString + `</div>` // 永远不要这样做！
}).mount('#app')
```
注意⚠️：Vue 模板会被编译成 JavaScript，而模板内的表达式将作为渲染过程的一部分被执行。尽管这些表达式在特定的渲染环境中执行，但由于全局执行环境的复杂性，Vue 作为一个开发框架，要在性能开销合理的前提下完全避免潜在的恶意代码执行是不现实的。避免这类问题最直接的方法是确保你的 Vue 模板始终是可信的，并且完全由你控制

Vue 自身的安全机制：
HTML 内容：无论是使用模板还是渲染函数，内容都是自动转义的
```typescript
<h1>{{ userProvidedString }}</h1>
// 如果该字符串包含以下内容：
'<script>alert("hi")</script>'
  // 会被转转义
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
// 从而防止脚本注入。这种转义是使用 textContent 这样的浏览器原生 API 完成的，所以只有当浏览器本身存在漏洞时，才会存在漏洞
```

Attribute 绑定：
```typescript
<h1 :title="userProvidedString">
  hello
</h1>

'" onclick="alert(\'hi\')'
&quot; onclick=&quot;alert('hi')
```

潜在的危险：
**在任何 Web 应用中，允许以 HTML、CSS 或 JavaScript 形式执行未经无害化处理的、用户提供的内容都有潜在的安全隐患，因此这应尽可能避免。不过，有时候一些风险或许是可以接受的**。
例如，像 CodePen 和 JSFiddle 这样的服务允许执行用户提供的内容，但这是在 iframe 这样一个可预期的沙盒环境中。当一个重要的功能本身会伴随某种程度的漏洞时，就需要你自行权衡该功能的重要性和该漏洞所带来的最坏情况

注入 HTML:
Vue 会自动转义 HTML 内容，防止你意外地将可执行的 HTML 注入到你的应用中。然而，在你知道 HTML 安全的情况下，你还是可以显式地渲染 HTML 内容（三种形式使用）：

```typescript
<div v-html="userProvidedHtml"></div>

  // 渲染函数
h('div', {
  innerHTML: this.userProvidedHtml
})

  // JSX 形式
<div innerHTML={this.userProvidedHtml}></div>
```

注意⚠️：用户提供的 HTML 永远不能被认为是 100% 安全的，除非它在 iframe 这样的沙盒环境中，或者该 HTML 只会被该用户看到。此外，允许用户编写自己的 Vue 模板也会带来类似的危险

URL 注入：
```typescript
<a :href="userProvidedUrl">
  click me
</a>
```

如果这个 URL 允许通过 javascript: 执行 JavaScript，即没有进行无害化处理，那么就会有一些潜在的安全问题。可以使用一些库来解决此类问题，比如 [sanitize-url](https://www.npmjs.com/package/@braintree/sanitize-url)，但请注意：如果你发现你需要在前端做 URL 无害化处理，那你的应用已经存在一个更严重的安全问题了。任何用户提供的 URL 在被保存到数据库之前都应该先在后端做**无害化处理**。这样，连接到你 API 的每一个客户端都可以避免这个问题，包括原生移动应用。另外，即使是经过无害化处理的 URL，Vue 也不能保证它们指向安全的目的地

样式注入：
```typescript
<a
  :href="sanitizedUrl"
  :style="userProvidedStyles"
>
  click me
</a>
```

假设 sanitizedUrl 已进行无害化处理，它是一个正常 URL 而非 JavaScript。然而，由于 userProvidedStyles 的存在，恶意用户仍然能利用 CSS 进行“点击劫持”，例如，可以在“登录”按钮上方覆盖一个透明的链接。如果用户控制的页面 https://user-controlled-website.com/ 专门仿造了你应用的登录页，那么他们就有可能捕获用户的真实登录信息
如果允许在 `<style>` 元素中插入用户提供的内容，会造成更大的漏洞，因为这使得用户能控制整个页面的样式。因此 Vue 阻止了在模板中像这样渲染 style 标签：

```typescript
<style>{{ userProvidedStyles }}</style>
```

为了避免用户的点击被劫持，我们建议仅在沙盒环境的 iframe 中允许用户控制 CSS。或者，当用户控制样式绑定时，我们建议使用其[对象值形式](https://cn.vuejs.org/guide/essentials/class-and-style.html#object-syntax-2)并仅允许用户提供能够安全控制的、特定的属性，就像这样：

```typescript
<a
  :href="sanitizedUrl"
  :style="{
    color: userProvidedColor,
    background: userProvidedBackground
  }"
>
  click me
</a>
```

JavaScript 注入：
强烈建议任何时候都**不要在 Vue 中渲染 `<script>`**，因为模板和渲染函数不应有其他副作用。但是，渲染 `<script>` 并不是插入在运行时执行的 JavaScript 字符串的唯一方法。
每个 HTML 元素都有能接受字符串形式 JavaScript 的 attribute，例如 onclick、onfocus 和 onmouseenter。绑定任何用户提供的 JavaScript 给这些事件 attribute 都具有潜在风险，因此需要避免这么做
注意⚠️：用户提供的 JavaScript 永远不能被认为是 100% 安全的，除非它在 iframe 这样的沙盒环境中，或者该段代码只会在该用户登录的页面上被执行

不受 XSS 的影响：

1. 开发者显式地将用户提供的、未经无害化处理的内容作为 Vue 模板渲染。这本身就是不安全的，Vue 也无从溯源。
2. 开发者将 Vue 挂载到可能包含服务端渲染或用户提供内容的 HTML 页面上，这与 #1 的问题基本相同，但有时开发者可能会不知不觉地这样做。攻击者提供的 HTML 可能在普通 HTML 中是安全的，但在 Vue 模板中是不安全的，这就会导致漏洞。最佳实践是：**不要将 Vue 挂载到可能包含服务端渲染或用户提供内容的 DOM 节点上**

最佳实践：
最基本的规则就是只要你允许执行未经无害化处理的、用户提供的内容 (无论是 HTML、JavaScript 还是 CSS)，你就可能面临攻击。无论是使用 Vue、其他框架，或是不使用框架，道理都是一样的。
除了上面为处理[潜在危险](https://cn.vuejs.org/guide/best-practices/security.html#potential-dangers)提供的建议，我们也建议你熟读下面这些资源：

- [HTML5 安全手册](https://html5sec.org/)
- [OWASP 的跨站脚本攻击 (XSS) 防护手册](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

后端协调：
类似跨站请求伪造 **(CSRF/XSRF) 和跨站脚本引入 (XSSI) 这样的 HTTP 安全漏洞**，主要由**后端负责处理**，因此它们不是 Vue 职责范围内的问题。但是，你应该与后端团队保持沟通，了解如何更好地与后端 API 进行交互，例如，**在提交表单时附带 CSRF 令牌**

服务端渲染（SSR）:
在使用 SSR 时还有一些其他的安全注意事项，因此请确保遵循我们的 [SSR 文档](https://cn.vuejs.org/guide/scaling-up/ssr.html)给出的最佳实践来避免产生漏洞

## TypeScript
### 总览
搭配 TypeScript 使用 Vue

:::info
您提供的链接是 Vue.js 官方文档中关于如何搭配 TypeScript 使用 Vue 的概述页面。这个页面详细介绍了 TypeScript 如何帮助开发者在编译时通过静态分析检测错误，提高开发效率和重构大型项目时的信心。Vue.js 本身是用 TypeScript 编写的，并且对 TypeScript 提供了全面的支持，所有官方库都自带类型声明文件。

页面内容涵盖了以下几个主要部分：

1.  **项目配置**：介绍了如何使用 Vue CLI 创建基于 Vite 的 TypeScript 项目，以及在开发阶段如何依赖 IDE 配置来获取即时类型错误反馈。
2.  **IDE 支持**：强烈推荐使用 Visual Studio Code (VSCode) 配合 Volar 扩展来支持 Vue 单文件组件中的 TypeScript。Volar 是官方的 VSCode 扩展，取代了之前的 Vetur。WebStorm 和其他 JetBrains IDE 也提供了对 TypeScript 和 Vue 的支持。
3.  **配置 tsconfig.json**：提供了关于如何配置 TypeScript 编译器选项的建议，例如设置 `isolatedModules` 和 `verbatimModuleSyntax`，以及如何配置路径解析别名。
4.  **Volar Takeover 模式**：这是针对 VSCode + Volar 的优化，通过禁用 VSCode 的内置 TypeScript 语言服务，让 Volar 使用一个语言服务实例同时为 Vue 和 TypeScript 文件提供支持。
5.  **关于 Vue CLI 和 ts-loader**：解释了为什么在基于 webpack 的项目中，使用 ts-loader 进行类型检查不是理想的解决方案，并建议迁移到 Vite 或者使用 Vue CLI 的新选项来执行类型检查。
6.  **常见使用说明**：包括如何使用 `defineComponent` API 来定义组件，以及如何在单文件组件中使用 TypeScript 和 TSX。
7.  **泛型组件**：介绍了如何在单文件组件和渲染函数/JSX 组件中使用泛型。

这个页面为开发者提供了关于如何在 Vue.js 项目中集成 TypeScript 的全面指南，包括工具链、配置、IDE 支持和最佳实践。如果您有任何具体问题或需要进一步的帮助，请告诉我。
:::

注意⚠️：在使用了 `<script lang="ts">` 或 `<script setup lang="ts">` 后，`<template>` 在绑定表达式中也支持 TypeScript。这对需要在模板表达式中执行类型转换的情况下非常有用：
```typescript
<script lang="ts">

<script setup lang="ts">
let x: string | number = 1
</script>

<template>
// <!-- 出错，因为 x 可能是字符串 -->
  {{ x.toFixed(2) }}
// 修改
{{ (x as number).toFixed(2) }}
</template>
```
与 Volar Takeover 模式差异：前者 Vue 文件需要手动添加 ts 校验标识声明，后者自动集成校验

### TypeScript 与组合式 API
:::info
您提供的链接是 Vue.js 官方文档中关于 TypeScript 与组合式 API 的部分。在 Vue 3 中，TypeScript 提供了强大的类型支持，使得开发者可以在使用组合式 API（Composition API）时享受到类型检查的好处。这个页面详细介绍了如何在 Vue 3 中使用 TypeScript 来为组件的 `props、emits、ref、reactive、computed`、事件处理函数、`provide/inject` 以及模板引用等进行类型标注。

以下是一些关键点的概述：

1.  **为组件的 props 标注类型**：可以通过 `defineProps` 函数或者基于类型的声明来为 props 设置类型。基于类型的声明允许编译器根据类型参数推导出等价的运行时选项。
2.  **Props 解构默认值**：在基于类型的声明中，可以使用 `withDefaults` 编译器宏来为 props 提供默认值。
3.  **复杂的 prop 类型**：可以通过基于类型的声明来指定复杂的 prop 类型，例如使用对象类型。
4.  **为组件的 emits 标注类型**：可以通过运行时声明或基于类型的声明来为 emits 函数设置类型。
5.  **为 ref() 标注类型**：ref 会根据初始化时的值推导类型，也可以通过泛型参数来指定更复杂的类型。
6.  **为 reactive() 标注类型**：reactive 也会从其参数中推导类型，可以通过接口或泛型参数来显式标注类型。
7.  **为 computed() 标注类型**：computed 会从计算函数的返回值上推导出类型。
8.  **为事件处理函数标注类型**：在处理原生 DOM 事件时，应该为事件处理函数的参数正确地标注类型。
9.  **为 provide/inject 标注类型**：使用 `InjectionKey` 接口来同步注入值的类型，并通过泛型参数显式声明注入值的类型。
10.  **为模板引用标注类型**：可以通过显式指定泛型参数和初始值来为模板引用创建类型，或者使用 `ComponentPublicInstance` 类型来获取组件实例的公共属性。

这个页面还提到了一些 TypeScript 的语法限制，例如在 Vue 3.2 及以下版本中，泛型类型参数的限制，以及在 3.3 版本中对这些限制的改进。

如果您有关于这个页面的具体问题或者需要更详细的解释，请告诉我，我会尽力帮助您。
:::

简单的 props 使用：
```typescript
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```
注意⚠️：**这被称之为“运行时声明”，因为传递给 `defineProps()` 的参数会作为运行时的 `props` 选项使用**
 优化：通过泛型声明
```typescript
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>

// 或者
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>

// 从另一个源文件支持导入，但需要 V3.3 版本才支持
<script setup lang="ts">
import type { Props } from './foo'

const props = defineProps<Props>()
</script>
```
注意⚠️：**这被称之为“基于类型的声明”。编译器会尽可能地尝试根据类型参数推导出等价的运行时选项**。在这种场景下，这里第二个例子中编译出的运行时选项和第一个是完全一致的
**基于类型的声明或者运行时声明可以择一使用，但是不能同时使用**

`Props` 解构默认值：`withDefaults`
```typescript
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```
注意⚠️：这将被编译为等效的运行时 `props default` 选项。此外，`withDefaults` 帮助程序为默认值提供类型检查，并确保返回的 props 类型删除了已声明默认值的属性的可选标志

为组件的 emits 标注类型：**在 `<script setup>` 中，emit 函数的类型标注也可以通过运行时声明或是类型声明进行：**
```typescript
<script setup lang="ts">
// 运行时
const emit = defineEmits(['change', 'update'])

// 基于选项
const emit = defineEmits({
  change: (id: number) => {
    // 返回 `true` 或 `false`
    // 表明验证通过或失败
  },
  update: (value: string) => {
    // 返回 `true` 或 `false`
    // 表明验证通过或失败
  }
})

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>

// 另一种写法
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- 类型检查 / 自动补全
  }
})
```
类型参数：

1. 一个可调用的函数类型，但是写作一个包含[调用签名](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)的类型字面量。它将被用作返回的 emit 函数的类型。
2. 一个类型字面量，其中键是事件名称，值是数组或元组类型，表示事件的附加接受参数。上面的示例使用了具名元组，因此每个参数都可以有一个显式的名称

为 `ref()` 标注类型：

1. 默认基本类型可以自动推导；
2. 复杂类型使用 `Ref` 写法或泛型方式：
```typescript
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')
// 或
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！

// 注意⚠️：没有初始化默认值将推导为 undefined
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
```

为 `reactive()` 标注类型：

1. 隐式推导类型；
```typescript
import { reactive } from 'vue'

// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue 3 指引' })

// 显示标注
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```
注意⚠️：**不推荐使用 `reactive()` 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同**

为 `computed()` 标注类型：默认从计算函数返回值推导类型
```typescript
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')

// 显示标注
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```

为事件处理函数标注类型：
原生 DOM 事件处理：
```typescript
<script setup lang="ts">
function handleChange(event) {
  // `event` 隐式地标注为 `any` 类型
  console.log(event.target.value)
}

// 修改为
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

为 `provide/inject` 标注类型：
**Vue 提供了一个 InjectionKey 接口，它是一个继承自 Symbol 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：**
```typescript
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined
// 泛型声明使用
const foo = inject<string>('foo') // 类型：string | undefined
// 提供默认值
const foo = inject<string>('foo', 'bar') // 类型：string
// 强制转换类型值
const foo = inject('foo') as string
```

为模版引用标注类型：**模板引用需要通过一个显式指定的泛型参数和一个初始值 `null` 来创建：**
```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```
注意⚠️：在访问 `el.value` 时使用可选链或类型守卫。这是因为直到组件被挂载前，这个 `ref` 的值都是初始的 `null`，并且在由于 `v-if` 的行为将引用的元素卸载时也可以被设置为 `null`

为组件模版引用标注类型：
```typescript
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```
为了获取 `MyModal` 的类型，我们首先需要通过 `typeof` 得到其类型，再使用 TypeScript 内置的 `InstanceType` 工具类型来获取其实例类型：
```typescript
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```
注意⚠️：**如果组件的具体类型无法获得，或者你并不关心组件的具体类型，那么可以使用 `ComponentPublicInstance`。这只会包含所有组件都共享的属性，比如 $el**：
```typescript
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const child = ref<ComponentPublicInstance | null>(null)
```
### TypeScript 与选项式 API
:::info
您提供的链接是 Vue.js 官方文档中关于 TypeScript 与选项式 API 的部分。在这部分内容中，Vue.js 提供了如何在 TypeScript 环境中使用选项式 API 的指导，包括如何为组件的 `props、emits`、计算属性和事件处理函数标注类型，以及如何扩展全局属性和自定义选项。

以下是一些关键点：

1.  **为组件的 props 标注类型**：
   - 使用 `defineComponent()` 来包装组件，以便 Vue 可以推导出 props 的类型。
   - 对于更复杂的 props 类型，可以使用 `PropType` 工具类型来指定。
2.  **为组件的 emits 标注类型**：
   - 提供一个对象来声明组件触发的事件及其参数类型，以确保类型安全。
3.  **为计算属性标记类型**：
   - 计算属性的类型通常会自动推导，但在某些情况下，可能需要显式标注类型。
4.  **为事件处理函数标注类型**：
   - 在处理 DOM 事件时，应为事件处理函数的参数正确标注类型，以避免类型错误。
5.  **扩展全局属性**：
   - Vue 提供了 `ComponentCustomProperties` 接口，可以通过 TypeScript 模块扩展来支持全局属性。
6.  **扩展自定义选项**：
   - 对于某些插件提供的自定义组件选项，可以通过扩展 `ComponentCustomOptions` 接口来提供类型支持。

这些指导有助于开发者在 TypeScript 环境中更安全、更高效地使用 Vue.js 的选项式 API。如果您有关于这部分内容的具体问题或需要进一步的解释，请告诉我，我会尽力帮助您。
:::

注意⚠️：虽然 Vue 的确支持在选项式 API 中使用 TypeScript，但在使用 TypeScript 的前提下**更推荐使用组合式 API，因为它提供了更简单、高效和可靠的类型推导**

为组件 props 标注类型：
选项式 API 中对 props 的类型推导需要用 `defineComponent()` 来包装组件。有了它，Vue 才可以通过 props 以及一些额外的选项，比如 `required: true` 和 default 来推导出 props 的类型：
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  // 启用了类型推导
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // 类型：string | undefined
    this.id // 类型：number | string | undefined
    this.msg // 类型：string
    this.metadata // 类型：any
  }
})

// 或者 使用 PropType 这个工具类型来标记更复杂的 props 类型
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // 提供相对 `Object` 更确定的类型
      type: Object as PropType<Book>,
      required: true
    },
    // 也可以标记函数
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    this.callback?.('123')
  }
})
```
注意⚠️：如果你的 TypeScript 版本低于 4.7，在使用函数作为 prop 的 validator 和 default 选项值时需要格外小心——确保使用箭头函数：
```typescript
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // 如果你的 TypeScript 版本低于 4.7，确保使用箭头函数
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    }
  }
})
```

为组件的 `emits` 标注类型：
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // 执行运行时校验
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // 类型错误
      })

      this.$emit('non-declared-event') // 类型错误
    }
  }
})
```

为计算属性标记类型：
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  // 根据返回值默认推导类型
  computed: {
    greeting() {
      return this.message + '!'
    }
  },
  mounted() {
    this.greeting // 类型：string
  }
})

// 显示标注类型
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // 显式标注返回类型
    greeting(): string {
      return this.message + '!'
    },

    // 标注一个可写的计算属性
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```
注意⚠️：**在某些 TypeScript 因循环引用而无法推导类型的情况下，可能必须进行显式的类型标注**

为事件处理函数标注类型：
```typescript
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleChange(event) {
      // `event` 隐式地标注为 `any` 类型
      console.log(event.target.value)
    }

    // 修改为
    // handleChange(event: Event) {
    //   console.log((event.target as HTMLInputElement).value)
    // }
  }
})
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

扩展全局属性：
某些插件会通过 [`app.config.globalProperties`](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 为所有组件都安装全局可用的属性。举例来说，我们可能为了请求数据而安装了 this.$http，或者为了国际化而安装了 this.$translate。为了使 TypeScript 更好地支持这个行为，Vue 暴露了一个被设计为可以通过 [TypeScript 模块扩展](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)来扩展的 ComponentCustomProperties 接口：
```typescript
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

类型扩展的位置：
将这些类型扩展放在一个 `.ts` 文件，或是一个影响整个项目的 `*.d.ts` 文件中。无论哪一种，都应确保在 `tsconfig.json` 中包括了此文件。对于库或插件作者，这个文件应该在 `package.json` 的 types 属性中被列出
为了利用模块扩展的优势，你需要确保将扩展的模块放在 [TypeScript 模块](https://www.typescriptlang.org/docs/handbook/modules.html) 中。 也就是说，该文件需要包含至少**一个顶级的 import 或 export，即使它只是 export {}。如果扩展被放在模块之外，它将覆盖原始类型，而不是扩展!**
```typescript
// 不工作，将覆盖原始类型。
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}

// 正常工作。
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (key: string) => string
  }
}
```

扩展自定义选项：
某些插件，比如 `vue-router`，提供了一些自定义的组件选项，比如 `beforeRouteEnter：`
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // ...
  }
})

// 声明
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: Route, from: Route, next: () => void): void
  }
}
```

## 进阶主题

### 使用 Vue 的多种方式
:::info
您提供的链接是 Vue.js 的官方文档页面，标题为“使用 Vue 的多种方式”。这个页面详细介绍了 Vue.js 如何根据不同的使用场景和需求，以多种方式被集成和使用。以下是一些关键点的概述：

1.  **独立脚本**：Vue.js 可以作为一个单独的 JavaScript 文件使用，无需构建步骤。这适用于后端已经渲染了大部分 HTML 或前端逻辑不复杂的场景。Vue.js 提供了一个精简版本 `petite-vue`，专为渐进式增强现有 HTML 设计。
2.  **作为 Web Component 嵌入**：Vue.js 可以用来构建标准的 Web Components，这些组件可以嵌入到任何 HTML 页面中，无论页面是如何渲染的。这种方式允许在不关心最终使用场景的情况下使用 Vue.js。
3.  **单页面应用 (SPA)**：对于需要丰富交互性、深度会话和复杂状态逻辑的应用，Vue.js 提供了核心功能库和全面的工具链支持，以构建现代的单页应用。这包括客户端路由、快速构建工具、IDE 支持、浏览器开发工具、TypeScript 支持和测试工具。
4.  **全栈 / SSR**：为了解决纯客户端 SPA 在首屏加载和 SEO 方面的问题，Vue.js 提供了服务端渲染 (SSR) 的 API。这允许服务器直接返回渲染好的 HTML，改善了应用的性能表现。
5.  **JAMStack / SSG**：对于静态数据，Vue.js 支持静态站点生成 (SSG)，可以将整个应用预渲染为 HTML 并作为静态文件部署。这提高了站点性能并简化了部署。Vue.js 支持单页和多页 SSG，前者在初始页面加载后激活为 SPA，后者每次导航加载新页面。
6.  **Web 之外的应用**：Vue.js 不仅限于 Web 应用，还可以与 Electron 或 Tauri 结合构建桌面应用，与 Ionic Vue 结合构建移动端应用，使用 Quasar 开发跨平台应用，或者使用 Vue 的自定义渲染 API 构建特定环境（如终端命令行）的应用。

这个页面还提到了 Vue.js 生态中的一些工具和框架，如 Nuxt.js、Astro 和 VitePress，它们提供了额外的功能和便利，以支持不同的开发需求。如果您有关于 Vue.js 的具体问题或需要更详细的信息，请告诉我，我会尽力帮助您。
:::

1. 独立脚本：
- Vue 可以以一个单独 JS 文件的形式使用，无需构建步骤！如果你的后端框架已经渲染了大部分的 HTML，或者你的前端逻辑并不复杂，不需要构建步骤，这是最简单的使用 Vue 的方式。在这些场景中你可以将 Vue 看作一个更加声明式的 jQuery 替代品
- petite-vue

2. 作为 Web Component 嵌入：

用 Vue 来[构建标准的 Web Component](https://cn.vuejs.org/guide/extras/web-components.html)，这些 Web Component 可以嵌入到任何 HTML 页面中，无论它们是如何被渲染的。这个方式让你能够在不需要顾虑最终使用场景的情况下使用 Vue：因为生成的 Web Component 可以嵌入到旧应用、静态 HTML，甚至用其他框架构建的应用中

3. 单页面应用（SPA）：

一些应用在前端需要具有丰富的交互性、较深的会话和复杂的状态逻辑。构建这类应用的最佳方法是使用这样一种架构：Vue 不仅控制整个页面，还负责处理抓取新数据，并在无需重新加载的前提下处理页面切换。这种类型的应用通常称为单页应用 (Single-Page application，缩写为 SPA)
建议💡：SPA 一般要求后端提供 API 数据接口，但你也可以将 Vue 和如 [Inertia.js](https://inertiajs.com/) 之类的解决方案搭配使用，在保留侧重服务端的开发模型的同时获得 SPA 的益处

4. 全栈/SSR：

Vue 提供了一系列 API，支持将一个 Vue 应用在服务端渲染成 HTML 字符串。这能让服务器直接返回渲染好的 HTML，让用户在 JavaScript 下载完毕前就看到页面内容。Vue 之后会在客户端对应用进行“激活 (hydrate)”使其重获可交互性。这被称为[服务端渲染 (SSR)](https://cn.vuejs.org/guide/scaling-up/ssr.html)，它能够极大地改善应用在 Web 核心指标上的性能表现，如[最大内容绘制 (LCP)](https://web.dev/lcp/)
Vue 生态中有一些针对此类场景的、基于 Vue 的上层框架，比**如 **[**NuxtJS**](https://nuxt.com/)**，能让你用 Vue 和 JavaScript 开发一个全栈应用**

5. JAMStack/SSG：

如果所需的数据是静态的，那么服务端渲染可以提前完成。这意味着我们可以将整个应用预渲染为 HTML，并将其作为静态文件部署。这增强了站点的性能表现，也使部署变得更容易，因为我们无需根据请求动态地渲染页面。Vue 仍可通过激活在客户端提供交互。这一技术通常被称为静态站点生成 (SSG)，也被称为 [JAMStack](https://jamstack.org/what-is-jamstack/)

6. Web 之外：

尽管 Vue 主要是为构建 Web 应用而设计的，但它绝不仅仅局限于浏览器。你还可以：

- 配合 [Electron](https://www.electronjs.org/) 或 [Tauri](https://tauri.app/) 构建桌面应用
- 配合 [Ionic Vue](https://ionicframework.com/docs/vue/overview) 构建移动端应用
- 使用 [Quasar](https://quasar.dev/) 用同一套代码同时开发桌面端和移动端应用
- 使用 [TresJS](https://tresjs.org/) 构建 3D WebGL 体验
- 使用 Vue 的[自定义渲染 API](https://cn.vuejs.org/api/custom-renderer.html) 来构建自定义渲染器，比如针对[终端命令行](https://github.com/vue-terminal/vue-termui)的！

### 组合式 API 常见问答
:::info
 组合式 API（Composition API）是 Vue.js 3 中引入的一种新的编程范式，它允许开发者以函数的方式组织组件逻辑，而不是传统的选项式 API（Options API）。以下是组合式 API 的一些关键点：

1.  **定义**：组合式 API 是一组 API，包括响应式 API（如 `ref` 和 `reactive`）、生命周期钩子（如 `onMounted` 和 `onUnmounted`）以及依赖注入（如 `provide` 和 `inject`）。它在 Vue 3 中是内置的，而在 Vue 2.7 及之前的版本中，可以通过安装 `@vue/composition-api` 插件来使用。
2.  **优势**：
   - **更好的逻辑复用**：通过组合函数，可以更简洁高效地复用逻辑，解决了 mixins 的缺陷。
   - **更灵活的代码组织**：组合式 API 使得相关逻辑可以集中在一起，便于理解和维护。
   - **更好的类型推导**：对于使用 TypeScript 的开发者，组合式 API 提供了更好的类型支持，减少了类型标注的需求。
   - **更小的生产包体积**：由于组合式 API 的组件模板被编译为内联函数，减少了对 `this` 上下文的依赖，从而减小了打包体积。
3.  **与选项式 API 的关系**：组合式 API 并不是要取代选项式 API，而是提供了另一种选择。两者可以在同一组件中混合使用，但通常推荐在一个项目中保持一致性。
4.  **与 Class API 的关系**：Vue.js 3 不再推荐使用 Class API，因为组合式 API 提供了更好的 TypeScript 集成和逻辑复用能力。
5.  **与 React Hooks 的对比**：组合式 API 提供了与 React Hooks 类似的逻辑组织能力，但解决了 Hooks 在性能和使用上的一些问题。例如，组合式 API 的函数只在组件创建时调用一次，而 Hooks 在每次组件更新时都会重新调用。
6.  **使用场景**：组合式 API 可以覆盖所有状态逻辑方面的需求，并且可以与少量的选项式 API（如 `props`、`emits`、`name`、`inheritAttrs`）一起使用。从 Vue 3.3 开始，可以通过配置编译时标记来移除对选项式 API 的支持，进一步减小生产包体积。
7.  **实践建议**：虽然组合式 API 提供了更多的灵活性，但它并不会自动组织代码。开发者需要运用良好的 JavaScript 编码实践来保持代码的清晰和可维护性。

这个页面还提供了一个示例，展示了如何使用组合式 API 来创建一个简单的计数器组件。如果您对如何使用组合式 API 或者有其他具体问题，欢迎继续提问。
:::
**什么是组合式 API：**
**组合式 API (Composition API) 是一系列 API 的集合**，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：

- [**响应式 API**](https://cn.vuejs.org/api/reactivity-core.html)**：例如 `ref() 和 reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。**
- [**生命周期钩子**](https://cn.vuejs.org/api/composition-api-lifecycle.html)**：例如 `onMounted() 和 onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。**
- [**依赖注入**](https://cn.vuejs.org/api/composition-api-dependency-injection.html)**：例如 `provide() 和 inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统**
```typescript
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 更改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`计数器初始值为 ${count.value}。`)
})
</script>

<template>
  <button @click="increment">点击了：{{ count }} 次</button>
</template>
```
注意⚠️：组合式 API 是 Vue 3 及 [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html) 的内置功能。对于更老的 Vue 2 版本，可以使用官方维护的插件 [`@vue/composition-api`](https://github.com/vuejs/composition-api)。在 Vue 3 中，组合式 API 基本上都会配合 [`<script setup>`](https://cn.vuejs.org/api/sfc-script-setup.html) 语法在单文件组件中使用

**为什么要有组合式 API：**

1.  更好的逻辑复用：通过组合函数逻辑复用，更加高效简洁，替代 `mixins`

三方工具组合式函数，比如 VueUse，集成一套简洁清晰的机制，例如[不可变数据](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data)、[状态机](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#state-machines)与 [RxJS](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#rxjs)

2. 更灵活的代码组织：

选项式 API 的这个组件承担了以下几个逻辑关注点：

- 追踪当前文件夹的状态，展示其内容
- 处理文件夹的相关操作 (打开、关闭和刷新)
- 支持创建新文件夹
- 可以切换到只展示收藏的文件夹
- 可以开启对隐藏文件夹的展示
- 处理当前工作目录中的变更

<CustomImage src='/growth-record/frame/vue/vue3study15.webp' />

组合式 API 重构后：
<CustomImage src='/growth-record/frame/vue/vue3study16.webp' />

将同一逻辑关注点放在同一组处理

1. 更好的类型推导：

**组合式 API 主要利用基本的变量和函数**，它们本身就是类型友好的。**用组合式 API 重写的代码可以享受到完整的类型推导，不需要书写太多类型标注**。大多数时候，用 TypeScript 书写的组合式 API 代码和用 JavaScript 写都差不太多！这也让许多纯 JavaScript 用户也能从 IDE 中享受到部分类型推导功能

4. 更小的生产包体积：
- **`<script setup>` 形式书写的组件模板被编译为了一个内联函数，和 `<script setup>` 中的代码位于同一作用域**。不像选项式 API 需要依赖 this 上下文对象访问属性，被编译的模板可以直接访问 `<script setup>` 中定义的变量，无需从实例中代理
- **对代码压缩更友好，因为本地变量的名字可以被压缩，但对象的属性名则不能**

与选项式 API 的关系：
组合式 API 不像选项式 API 那样会手把手教你该把代码放在哪里。但反过来，它却**让你可以像编写普通的 JavaScript 那样来编写组件代码**。这意味着你能够，并且应该在**写组合式 API 的代码时也运用上所有普通 JavaScript 代码组织的最佳实践。如果你可以编写组织良好的 JavaScript，你也应该有能力编写组织良好的组合式 API 代码**

组合式 API 是否覆盖了所有场景：
组合式 API 能够覆盖所有状态逻辑方面的需求。**除此之外，只需要用到一小部分选项：props，emits，name 和 inheritAttrs**
注意⚠️：从 3.3 开始你可以直接通过 `<script setup>` 中的 defineOptions 来设置组件名或 inheritAttrs 属性

可以在同一个组件中使用两种 API：一个选项式 API 的组件中通过 [setup()](https://cn.vuejs.org/api/composition-api-setup.html) 选项来使用组合式 API。
然而，我们只推荐你在一个已经基于选项式 API 开发了很久、但又需要和基于组合式 API 的新代码或是第三方库整合的项目中这样做

和 React Hooks 相比：

### 深入响应式系统
:::info
 您提供的链接是 Vue.js 官方文档中关于响应式系统深入解析的部分。在这部分内容中，Vue.js 详细介绍了其响应式系统的工作原理，包括响应性的定义、如何在 JavaScript 中实现响应性、Vue 中响应性的实现细节、运行时与编译时响应性的区别、响应性调试方法，以及如何与外部状态系统集成等。

响应性是 Vue.js 的核心特性之一，它允许开发者声明式地处理数据变化，而不需要手动操作 DOM。Vue.js 使用 Proxy 对象来实现响应式系统，这样当数据发生变化时，Vue.js 能够自动追踪依赖并更新视图。

在 Vue 3 中，响应式系统是基于 Proxy 的，而在 Vue 2 中则是基于 `Object.defineProperty`。Vue.js 的响应式系统允许开发者通过简单的 API（如 ref 和 computed）来创建响应式数据，并通过 watchEffect 或 watch 来监听数据变化。

文档还提到了响应性调试的钩子，如 renderTracked 和 renderTriggered，这些钩子可以帮助开发者在开发过程中更好地理解组件的响应性行为。此外，文档还探讨了如何将 Vue 的响应性系统与外部状态管理库（如 Immer、XState、RxJS）集成，以及与信号（signal）的联系，这些都是现代前端开发中常见的概念。

如果您有关于 Vue.js 响应式系统的具体问题或需要更详细的解释，请告诉我，我会尽力帮助您。
:::

- **Vue 最标志性的功能就是其低侵入性的响应式系统**。组件状态都是由响应式的 JavaScript 对象组成的。当更改它们时，视图会随即自动更新
- 状态管理更加简单直观

注意⚠️：响应性是一种可以使我们声明式地处理变化的编程范式

Vue 中的响应性是如何工作的：
无法追踪局部变量的读写，但是可以追踪对象属性的读写
在 JavaScript 中有两种劫持 property 访问的方式：[getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) 和 [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。Vue 2 使用 getter / setters 完全是出于支持旧版本浏览器的限制。而在 Vue 3 中则使用了 Proxy 来创建响应式对象，仅将 getter / setter 用于 ref，伪代码说明：
```typescript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}

// track 内部
// 这会在一个副作用就要运行之前被设置
// 我们会在后面处理它
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```
`reactive() `的局限性：

- 当你将一个响应式对象的属性**赋值或解构到一个本地变量时**，访问或赋值该变量是**非响应式的**，因为它将不再触发源对象上的 get / set 代理。注意这种“断开”只影响变量绑定——如果变量指向一个对象之类的非原始值，那么对该对象的修改仍然是响应式的
- 从 `reactive()` 返回的代理尽管行为上表现得像原始对象，但我们通过使用 === 运算符还是能够比较出它们的不同

运行时 VS 编译时响应性：
**Vue 的响应式系统基本是基于运行时的。追踪和触发都是在浏览器中运行时进行的**。**运行时响应性的优点是，它可以在没有构建步骤的情况下工作，而且边界情况较少**。另一方面，这使得它受到了 JavaScript 语法的制约，导致需要使用一些例如 Vue ref 这样的值的容器

响应性调试：仅会在开发模式下工作
生命周期钩子使用 dugger 调试：
```typescript
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

计算属性调试：
向 `computed()` 传入第二个参数，是一个包含了 onTrack 和 onTrigger 两个回调函数的对象：

- onTrack 将在响应属性或引用作为依赖项被跟踪时被调用。
- onTrigger 将在侦听器回调被依赖项的变更触发时被调用。
```typescript
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 被追踪为依赖时触发
    debugger
  },
  onTrigger(e) {
    // 当 count.value 被更改时触发
    debugger
  }
})

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)

// 更改 count.value，应该会触发 onTrigger
count.value++
```

侦听器调试：
```typescript
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

与外部状态系统集成：
注意⚠️：Vue 的响应性系统是通过深度转换普通 JavaScript 对象为响应式代理来实现的。这种深度转换在一些情况下是不必要的，在和一些外部状态管理系统集成时，甚至是需要避免的 (例如，当一个外部的解决方案也用了 Proxy 时)
将 Vue 的响应性系统与外部状态管理方案集成的大致思路是：将外部状态放在一个 [shallowRef](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 中。一个浅层的 ref 中只有它的 .value 属性本身被访问时才是有响应性的，而不关心它内部的值。当外部状态改变时，替换此 ref 的 .value 才会触发更新

不可变数据结构：
[不可变数据结构](https://en.wikipedia.org/wiki/Persistent_data_structure)通过永不更改状态对象来解决这个问题。与 Vue 不同的是，它会创建一个新对象，保留旧的对象未发生改变的一部分。在 JavaScript 中有多种不同的方式来使用不可变数据，但我们推荐使用 [Immer](https://immerjs.github.io/immer/) 搭配 Vue，因为它使你可以在保持原有直观、可变的语法的同时，使用不可变数据
```typescript
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```
状态机：
[**状态机**](https://en.wikipedia.org/wiki/Finite-state_machine)**是一种数据模型，用于描述应用可能处于的所有可能状态，以及从一种状态转换到另一种状态的所有可能方式**。虽然对于简单的组件来说，这可能有些小题大做了，但它的确可以使得复杂的状态流更加健壮和易于管理
```typescript
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

RxJS：
[RxJS](https://rxjs.dev/) 是**一个用于处理异步事件流的库**。[VueUse](https://vueuse.org/) 库提供了 [@vueuse/rxjs](https://vueuse.org/rxjs/readme.html) 扩展来支持连接 RxJS 流与 Vue 的响应性系统

与信号（signal）的联系：
很多其他框架已经引入了与 Vue 组合式 API 中的 ref 类似的响应性基础类型，并称之为“信号”：

- [Solid 信号](https://www.solidjs.com/docs/latest/api#createsignal)
- [Angular 信号](https://github.com/angular/angular/discussions/49090)
- [Preact 信号](https://preactjs.com/guide/v10/signals/)
- [Qwik 信号](https://qwik.builder.io/docs/components/state/#usesignal)

API 设计权衡：
与 Vue 的 ref 相比，Solid 和 Angular 基于 getter 的 API 风格在 Vue 组件中使用时提供了一些有趣的权衡：

- `() 比 .value` 略微省事，但更新值却更冗长；
- 没有 ref 解包：总是需要通过 () 来访问值。这使得值的访问在任何地方都是一致的。这也意味着你可以将原始信号作为组件的参数传递下去。

### 渲染机制
:::info
您提供的链接是 Vue.js 的官方文档页面，详细介绍了 Vue.js 的渲染机制。这个页面涵盖了 Vue.js 如何将模板转换为真实的 DOM 节点，以及如何高效地更新这些节点。以下是一些关键点的概述：

1.  **虚拟 DOM (Virtual DOM)**: Vue.js 使用虚拟 DOM 来表示 UI，它是一个在内存中的轻量级表示，用于与实际的 DOM 保持同步。虚拟 DOM 的主要优势是允许开发者以声明式的方式构建 UI，同时将 DOM 操作的复杂性留给框架处理。
2.  **渲染管线**: Vue.js 在组件挂载时会经历编译、运行时渲染和响应式更新的过程。编译阶段将模板转换为渲染函数，运行时渲染器根据渲染函数创建 DOM 节点，并在依赖变化时更新 DOM。
3.  **模板 vs. 渲染函数**: Vue.js 默认推荐使用模板，因为它更接近 HTML，易于理解和维护。然而，对于高度动态的逻辑，渲染函数提供了更大的灵活性。Vue.js 允许开发者在需要时直接编写渲染函数。
4.  **带编译时信息的虚拟 DOM**: Vue.js 的编译器在编译模板时会应用静态分析，留下编译时信息，这些信息帮助运行时渲染器更高效地处理更新。例如，静态提升、更新类型标记和树结构打平都是 Vue.js 编译器用来提高性能的优化手段。
5.  **静态提升**: Vue.js 会识别模板中的静态内容，并在渲染函数外部创建这些节点，这样在后续的渲染过程中就可以跳过这些静态节点，减少不必要的 DOM 操作。
6.  **更新类型标记**: Vue.js 在编译时会为每个动态绑定的元素推断出更新类型，这些类型在运行时用于确定如何更新 DOM。这种标记减少了在更新过程中需要执行的操作。
7.  **树结构打平**: Vue.js 会将模板中的区块（block）打平为一个数组，这样在重渲染时只需要遍历这个数组，而不是整个树，从而提高性能。
8.  **对 SSR 激活的影响**: Vue.js 的这些优化也提升了服务器端渲染（SSR）的性能，因为它们允许更高效的部分激活和更新。

这个页面提供了对 Vue.js 渲染机制的深入理解，对于想要了解 Vue.js 如何工作以及如何优化性能的开发者来说非常有用。如果您有关于这个主题的具体问题，欢迎继续提问。
:::
（一）虚拟 DOM：
**虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步**。这个概念是由 [React](https://reactjs.org/) 率先开拓，随后被许多不同的框架采用，当然也包括 Vue

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为更新 (patch)，又被称为“比对”(diffing) 或“协调”(reconciliation)

虚拟 DOM 好处：

- 让开发者能够灵活、声明式地创建、检查和组合所需 UI 的结构
- 把具体的 DOM 操作留给渲染器去处理

（二）渲染管线：
Vue 组件挂载会发生的事情：

1. 编译：Vue 模板被编译为渲染函数：即用来返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
2. 挂载：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。这一步会作为[响应式副作用](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)执行，因此它会追踪其中所用到的所有响应式依赖。
3. 更新：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

<CustomImage src='/growth-record/frame/vue/vue3study17.webp' />

（三）模版 vs 渲染函数：
**Vue 模板会被预编译成虚拟 DOM 渲染函数**。Vue 也提供了 API 使我们可以不使用模板编译，直接手写渲染函数。在处理高度动态的逻辑时，渲染函数相比于模板更加灵活，因为你可以完全地使用 JavaScript 来构造你想要的 vnode

推荐使用模版原因：

1. 模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
2. 由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现 (下面我们将展开讨论)

（四）带编译时信息的虚拟 DOM：
虚拟 DOM 最受诟病的地方之一：这种有点暴力的更新过程通过牺牲效率来换取声明式的写法和最终的正确性（前期版本）

编译器可以静态分析模板并在生成的代码中留下标记，使得运行时尽可能地走捷径。与此同时，我们仍旧保留了边界情况时用户想要使用底层渲染函数的能力。我们称这种混合解决方案为带编译时信息的虚拟 DOM

1.  静态提升；
2. 更新类型标记；
3. 树结构打平；
4. 对 SSR 激活的影响；

### 渲染函数 & JSX
:::info
您提供的链接是 Vue.js 官方文档中关于渲染函数和 JSX 的部分。在 Vue.js 中，渲染函数（render function）是一种允许你使用 JavaScript 来编写组件的渲染逻辑的方式，这在需要更精细控制 DOM 结构或者使用 TypeScript 时非常有用。JSX 是一种 JavaScript 的语法扩展，它允许你以类似 XML 的方式编写组件，使得组件的结构更加清晰。

以下是一些关键点：

1.  **创建 Vnodes**：Vue 提供了 `h()` 函数（或 `createVNode()`）来创建虚拟 DOM 节点（Vnodes）。这些节点可以是 HTML 标签、组件或者文本节点。
2.  **声明渲染函数**：在组合式 API 中，你可以在 `setup()` 钩子中返回渲染函数。在选项式 API 中，你可以使用 `render` 选项来声明渲染函数。
3.  **Vnodes 必须唯一**：在组件树中，每个 Vnode 必须具有唯一的 `key` 属性，以确保它们在更新时能够正确地被识别。
4.  **JSX / TSX**：Vue 支持 JSX，这是一种允许你在 JavaScript 中编写类似 HTML 的语法。从 Vue 3.4 开始，Vue 不再隐式注册全局命名空间，你需要在 TypeScript 配置中指定 `"jsx": "preserve"` 来启用 JSX。
5.  **渲染函数案例**：文档提供了一些例子，展示了如何使用渲染函数和 JSX 来实现与模板相同的功能，例如条件渲染、列表渲染、事件处理等。
6.  **组件**：在渲染函数中，你可以直接使用导入的组件，而不需要在组件中注册。动态组件也可以直接使用。
7.  **插槽**：在渲染函数中，插槽可以通过 `slots` 对象来访问。你可以传递插槽函数或者包含插槽函数的对象给组件。
8.  **函数式组件**：函数式组件是一种没有状态的组件定义方式，它们接收 props 并返回 Vnodes。函数式组件在渲染过程中不会创建组件实例，也不会触发生命周期钩子。
9.  **类型标注**：对于函数式组件，你可以使用 TypeScript 来标注类型，确保类型安全。

如果你有关于渲染函数或 JSX 的具体问题，或者需要更多细节，请告诉我，我会根据你的需求提供帮助。
:::
使用 h() 函数：
```typescript
import { h } from 'vue'

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
)

// 除了类型必填以外，其他的参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h('div', { class: 'bar', innerHTML: 'hello' })

// 像 `.prop` 和 `.attr` 这样的的属性修饰符
// 可以分别通过 `.` 和 `^` 前缀来添加
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])

// 获取到的 vnode 信息
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key //
// 注意：完整的 VNode 接口包含其他内部属性，但是强烈建议避免使用这些没有在这里列举出的属性。这样能够避免因内部属性变更而导致的不兼容性问题
```
**h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”**。这个名字来源于许多虚拟 DOM 实现默认形成的约定。一个更准确的名称应该是 createVnode()，但当你需要多次使用渲染函数时，一个简短的名字会更省力

声明渲染函数：
**当组合式 API 与模板一起使用时，setup() 钩子的返回值是用于暴露数据给模板**。然而当我们使用渲染函数时，可以直接把渲染函数返回：
```typescript
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // 返回渲染函数
    return () => h('div', props.msg + count.value)
    // 返回字符串
     // return () => 'hello world!'
    // 使用数组返回多个根节点
    // return () => [
    //   h('div'),
    //   h('div'),
    //   h('div')
    // ]
  }
}
```
注意⚠️：请确保返回的是一个函数而不是一个值！setup() 函数在每个组件中只会被调用一次，而返回的渲染函数将会被调用多次

Vnodes 必须唯一：
```typescript
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // 啊哦，重复的 vnodes 是无效的
    p,
    p
  ])
}

// 优化
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

JSX/TSX：
[JSX](https://facebook.github.io/jsx/) 是 JavaScript 的一个类似 XML 的扩展：
```typescript
const vnode = <div>hello</div>
```
注意⚠️：在 JSX 表达式中，使用大括号来嵌入动态值：
```typescript
const vnode = <div id={dynamicId}>hello, {userName}</div>
```
如果你之前使用过 JSX 语法，那么请注意 Vue 的 JSX 转换方式与 React 中 JSX 的转换方式不同，因此你不能在 Vue 应用中使用 React 的 JSX 转换。与 React JSX 语法的一些明显区别包括：

- 可以使用 HTML attributes 比如 class 和 for 作为 props - 不需要使用 className 或 htmlFor。
- 传递子元素给组件 (比如 slots) 的[方式不同](https://cn.vuejs.org/guide/extras/render-function.html#passing-slots)。

渲染函数案例：
```typescript
<div>
  <div v-if="ok">yes</div>
  <span v-else>no</span>
</div>

// 模版转成渲染函数的结果：
h('div', [ok.value ? h('div', 'yes') : h('span', 'no')])
// jsx
<div>{ok.value ? <div>yes</div> : <span>no</span>}</div>
```

函数式组件：
**函数式组件是一种定义自身没有任何状态的组件的方式。它们很像纯函数：接收 props，返回 vnodes。函数式组件在渲染过程中不会创建组件实例 (也就是说，没有 this)，也不会触发常规的组件生命周期钩子**
用一个普通的函数而不是一个选项对象来创建函数式组件。该函数实际上就是该组件的渲染函数。
函数式组件的签名与 `setup()` 钩子相同：
```typescript
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```
函数式组件可以像普通组件一样被注册和使用。如果你将一个函数作为第一个参数传入 `h`，它将会被当作一个函数式组件来对待

标注类型：
```typescript
// 具名函数式组件
import type { SetupContext } from 'vue'
type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

function FComponent(
  props: FComponentProps,
  context: SetupContext<Events>
) {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value: unknown) => typeof value === 'string'
}

// 匿名函数式组件
import type { FunctionalComponent } from 'vue'

type FComponentProps = {
  message: string
}

type Events = {
  sendMessage(message: string): void
}

const FComponent: FunctionalComponent<FComponentProps, Events> = (
  props,
  context
) => {
  return (
    <button onClick={() => context.emit('sendMessage', props.message)}>
        {props.message} {' '}
    </button>
  )
}

FComponent.props = {
  message: {
    type: String,
    required: true
  }
}

FComponent.emits = {
  sendMessage: (value) => typeof value === 'string'
}
```

### Vue 与 Web Components
:::info
您提供的链接是 Vue.js 官方文档中关于 Vue 与 Web Components 的部分。Web Components 是一组 Web 原生 API，允许开发者创建可复用的自定义元素。Vue.js 提供了对 Web Components 的良好支持，无论是将自定义元素集成到 Vue 应用中，还是使用 Vue 来构建和分发自定义元素。

在 Vue 中使用自定义元素时，需要注意以下几点：

1.  **跳过组件解析**：Vue 默认会将非原生 HTML 标签当作 Vue 组件处理。要让 Vue 识别某个元素为自定义元素，需要在编译时配置 `compilerOptions.isCustomElement`。
2.  **传递 DOM 属性**：由于 DOM attribute 只能为字符串值，Vue 3 会自动检查属性是否存在于 DOM 对象上，并倾向于将其设置为 DOM 对象的属性。如果自定义元素无法正确定义或反射某个属性，可以使用 `v-bind` 绑定和 `.prop` 修饰符来设置。
3.  **使用 Vue 构建自定义元素**：Vue 提供了 `defineCustomElement` 方法，它与 `defineComponent` 类似，但返回的是继承自 `HTMLElement` 的自定义元素构造器。自定义元素在注册后，会在其 `shadow root` 上挂载 Vue 组件实例。
4.  **属性和事件**：自定义元素的 props 会被定义为属性，并自动处理 attribute 和属性的反射。事件通过 `CustomEvents` 发送，额外的事件参数会被暴露在 `detail` 属性中。
5.  **插槽**：在自定义元素中，插槽的使用与 Vue 组件中的插槽类似，但不支持作用域插槽。传递具名插槽时应使用 `slot` attribute。
6.  **Provide / Inject API**：在 Vue 定义的自定义元素中，Provide / Inject API 可以正常工作，但依赖关系只在自定义元素之间起作用。
7.  **将 SFC 编译为自定义元素**：Vue 单文件组件（SFC）可以编译为自定义元素，但需要在生产环境构建时处理样式。
8.  **基于 Vue 构建自定义元素库**：使用 Vue 构建的自定义元素依赖于 Vue 的运行时，这可能会增加打包大小。如果自定义元素将在 Vue 应用中使用，可以考虑将 Vue 外部化。
9.  **Web Components 和 TypeScript**：为了给注册为自定义元素的 Vue 组件提供类型支持，可以通过 Vue 模板或 JSX 中的 `GlobalComponents` 接口来注册全局组件的类型。
10.  **Web Components vs. Vue Components**：虽然 Web Components 提供了基础的组件化能力，但 Vue 提供了更高级的功能，如声明式的模板系统、响应式状态管理、服务器端渲染（SSR）等。Vue 的组件模型设计为更内聚的系统，而完全使用 Web Components 可能需要构建自己的框架，这会带来维护负担。

如果您有关于 Vue.js 或 Web Components 的具体问题，欢迎提问，我会尽力帮助您。
:::
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 是一组 web 原生 API 的统称，允许开发者创建可复用的自定义元素 (custom elements)

**Vue 和 Web Components 是互补的技术**，Vue 为使用和创建自定义元素提供了出色的支持。无论你是将自定义元素集成到现有的 Vue 应用中，还是使用 Vue 来构建和分发自定义元素都很方便

在 Vue 中使用自定义元素
在 Vue 应用中使用自定义元素基本上与使用原生 HTML 元素的效果相同，但需要留意以下几点：

1. 跳过组件解析：默认情况下，Vue 会将任何非原生的 HTML 标签优先当作 Vue 组件处理，而将“渲染一个自定义元素”作为后备选项，需要进行自定义配置
2. 传递 DOM 属性：

使用 Vue 构建自定义元素：
使用自定义元素的好处：可以使用任何框架，甚至是不使用框架的场景下使用。当你面向的最终用户可能使用了不同的前端技术栈，或是当你希望将最终的应用与它使用的组件实现细节解耦时，它们会是理想的选择

1. defineCustomElement：
```typescript
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 这里是同平常一样的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement 特有的：注入进 shadow root 的 CSS
  styles: [`/* inlined css */`]
})

// 注册自定义元素
// 注册之后，所有此页面中的 `<my-vue-element>` 标签
// 都会被升级
customElements.define('my-vue-element', MyVueElement)

// 你也可以编程式地实例化元素：
// （必须在注册之后）
document.body.appendChild(
  new MyVueElement({
    // 初始化 props（可选）
  })
)
```

2. 生命周期：
- 当该元素的 [connectedCallback](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) 初次调用时，一个 Vue 自定义元素会在内部挂载一个 Vue 组件实例到它的 shadow root 上。
- 当此元素的 disconnectedCallback 被调用时，Vue 会在一个微任务后检查元素是否还留在文档中。
   - 如果元素仍然在文档中，那么说明它是一次移动操作，组件实例将被保留；
   - 如果该元素不再存在于文档中，那么说明这是一次移除操作，组件实例将被销毁
3. xxx

基于 Vue 构建自定义元素：
Web Components 和 TypeScript
通过 Vue 模板和/或 [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) 中的 [GlobalComponents接口](https://github.com/vuejs/language-tools/blob/master/packages/vscode-vue/README.md#usage) 来注册全局组件的类型：
```typescript
import { defineCustomElement } from 'vue'

// vue 单文件组件
import CounterSFC from './src/components/counter.ce.vue'

// 将组件转换为 web components
export const Counter = defineCustomElement(CounterSFC)

// 注册全局类型
declare module 'vue' {
  export interface GlobalComponents {
    'Counter': typeof Counter,
  }
}
```

Web Components VS Vue Components：
自定义元素和 Vue 组件之间确实存在一定程度的功能重叠：它们都允许我们定义具有数据传递、事件发射和生命周期管理的可重用组件。然而，Web Components 的 API 相对来说是更底层的和更基础的。要构建一个实际的应用，我们需要相当多平台没有涵盖的附加功能：

- 一个声明式的、高效的模板系统；
- 一个响应式的，利于跨组件逻辑提取和重用的状态管理系统；
- 一种在服务器上呈现组件并在客户端“激活”(hydrate) 组件的高性能方法 (SSR)，这对 SEO 和 [LCP 这样的 Web 关键指标](https://web.dev/vitals/)非常重要。原生自定义元素 SSR 通常需要在 Node.js 中模拟 DOM，然后序列化更改后的 DOM，而 Vue SSR 则尽可能地将其编译为拼接起来的字符串，这会高效得多

### 动画技巧
:::info
您提供的链接是 Vue.js 官方文档中的“动画技巧”页面。在 Vue.js 中，动画可以通过多种方式实现，包括基于 CSS class 的动画、状态驱动的动画以及基于侦听器的动画。以下是这些动画技巧的简要概述：

1.  **基于 CSS class 的动画**：
   - 对于不涉及 DOM 进入或离开的元素，可以通过动态添加 CSS class 来触发动画。例如，可以使用 Vue 的 `ref` 和 `setTimeout` 来实现一个简单的抖动动画。
2.  **状态驱动的动画**：
   - 可以通过动态插值来实现过渡效果，例如在用户交互时动态地给元素绑定样式。这可以通过绑定 `style` 属性并使用计算属性来实现，如鼠标移动时改变元素的背景颜色。
3.  **基于侦听器的动画**：
   - 利用 Vue 的 `watch` API，可以基于某些状态的变化来触发动画。例如，可以使用 `gsap` 库（GreenSock Animation Platform）来平滑地改变数字值，从而创建动画效果。

页面还提到了 Vue 提供的 `<Transition>` 和 `<TransitionGroup>` 组件，这些组件用于处理元素的进入、离开和列表顺序变化的过渡效果。此外，还有 `<KeepAlive>` 和 `<Teleport>` 组件，分别用于优化组件的缓存和实现组件的远程挂载。

如果您有关于 Vue.js 动画的具体问题或需要进一步的帮助，请告诉我，我会尽力为您提供帮助。
:::
基于 CSS class 的动画：
[状态驱动的动画：](https://play.vuejs.org/#eNqlVn2P2zQY/ypWN2k90abtvYwp9A4YDA3E4ID9AaJI58ZOml1iW7bTa+/U787Pdl67bkJCqtL4ef09r87T6Fulom3FR/FoaRKdK0sMt5W6WYm8VFJb8kQ0p4nNt3xCElmqynJGDiTVsiQvoPmilWR7Qcs8MTWvOUYfDGRWIpHCWLLhlHH9lufZxpJrsjifO17BLcnN95pmWS4y0FNaGN7oGEth/hpQdjGZT8geT3JouAk4DcSxF+n78NIDp4ezYzS31G5gpIluPD4j1zfkaSUIDNtKC3L3bj6Zk58vzt2fez5/6ts8/Pb8KYl2B5CTaH8AxiP+3Ur03eJpubC30uQ2l+ITvoMs2zt2tCfTQRg9AVoq7mxA8gaJ+Zqck5hc9tB7a4RYTYVJpS5jcuffC2r52GGF5qy2c1C7M6AlLr8BcloJ5BYofRlcjcb8LNjk8MqjZENFxtl7WSUbbuD/mPT3/B8gQjnJsMhWV57oDUc7b0zRjP/ZEV3wgfgX8AzgSPF/saRk3OGpzSCrHsmgZb4g4xoZqlCjRW68dFekGmcrsh9IfFSlRXTV1Mk5dRaOnPbK0lTkqCBS+RzU2D8R0KnBcvR2QCkm2LVCIAPMpHn7L+PUE7Z7xePOrlEaTieEVZo6wDH5co7xTXXu8cfk/JWfY6fs0xkiXM7CJsIOwsHyUrlGxYmQJcu3dcIKasz1asRcaHRd8NUoML4pZWU4kw8C3LZlW651beDJJ9leuZRbDm5osKHmaZbXqpS3GEoy1OKCneJ5tYJTb3LI9dEiXrPN2lDX4JGHnNkNDlhCOG18DXC8eoljrQQ15TZa7Jx2Gw7iaV4UoD27+OFq8foKCsuZk2yczeCteUeiW8fBBsQdPvKOL2fgnhKs9xo8xcbuCxfW0aqDkbe8KGRnonlbznqVxtEbICaRijNQorbQoa3XNLnPtKwEmyaykDomz9I0/cqz5G5qNhQt4O6JS7Uji5d46GxNse3cBeJ+0eLqzIv7jMZuq6udJ4SkojsvGwqKrtPC2dvkjHHhiSXVmCkoQorQykpPVXWgMZYvgsGd5MmW7+yUFnkGRoJ8cO3JKbIzNfkjpmYBoB3tocZwMZ97IhpFT12zJCAKKYLVtdQozFRTllcmJq+8BUxQtM5Cljo0dG1kgRsmoJEKqfGvBU9hMbw/TnPBuLtjazOh8BjwqC7jsdVBjK36ImSCMobxDwnqCpM/emINHaSBr+bmG1a0qQi+FvpJCok75+XHeVvLggXD6GrXSWih0WQUvlSmJVX4KpECXz3e36pmmNUobrYmVkv3AePomANrlYlns4SJyNzvFVowYnw7Gwg2ewzeLLpXpHl25Mvd9XnB9a/KJXHok2I2Hn7yNHc71rsVOhue3J+gfzC7gO1Wc7TIFmuw5WG5ZRzD6Nhv/vgFHdhjlpJVbml+hvk79y3jp9aJvcawAXZPzqP90acORX1v3uzQJKYJqrneww2xGuFj8bvPhN7BvYgu2iwe/gXi/YZq)
[基于侦听器的动画：](https://play.vuejs.org/#eNp9U01v2zAM/SuELk0Bxw5W7OI5GbahA7ZDN2w96uLYjKPWlgSLTtKl/u+j5I90Q9FLTD2Sj0+Pyll8sjY+dChSkbmiVZbAIXV2I7VqrGkJztDiLuKfvCB1wAiOORV76GHXmgauuPdqrq1cbkfch5yQujDaEeiu2WILa0+2WF1PMB0RNZYBH/gXZ6lhLE9hJXXPxVKHoYtLKvLhQl/DegOhA8LwmMxi5IxYedm1OSmjmSh+H82sd+Hru5+fYQV+AkAvNX+zZHCB788HwsbWOSGfALJSHaCoc+fWUpTYGCkCDnD/ZBHymT5T2nYEh2VjSqzjAeaeIZACkrEvszPfVlXLKb85nydjxma+1ld1wpKdg77PEr8ebk9YEUdZ8kInHx091T6ML6SDRzujaXlEVe0pha2pyw8z6tQfTOEdNgyxE2zDSCIiMSx32bC9D85ofiqBTY4JJ0U67UAKvwUPSLEnsi5Nkk7bxyouTJP43Ec2patRitHzngeQ49ewU9V/9NxiVY3tD+t3+O+YvK7N8XvAqO0wPIfQs8fi8RX8wZ0GVT9bdNgeWMCco7ytkIb07e87PHE8Jye5byR/oTN15zUOZZ87XbLsF3VB7bfgltLVvbs9EWo3XcoLDW6Eein4L/Xljatf5N7EN7OL/V9oL0Vh)
动画库：[gsap](https://gsap.com/)/[dynamics.js](http://dynamicsjs.com/)
