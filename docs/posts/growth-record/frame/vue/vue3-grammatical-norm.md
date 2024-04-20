---
title: Vue3 语法规范尝鲜
date: 2022-10-08 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Vue3 语法规范尝鲜
## Vue3 语法规范
页面 / 组件开发
#### 使用 Vue3 语法 + TS 语法声明 `<script>` 标签
```typescript
<script setup lang="ts">...</script>
```
#### props 类型声明
```typescript
// 写法一，运行时声明，defineProps() 的参数会作为运行时的 props 选项使用，类型声明但没有初始化默认值，支持参数中推导类型
const props = defineProps<{
  foo: string
  bar: boolean
}>

props.foo // string | undefiend
props.bar // boolean | undefiend

// 写法二，类型声明，通过泛型参数定义类型
type Props = {
  foo: string[]
  bar: { age: number }
}

const props = defineProps<Props>()

// 支持类型声明并进行初始化默认值，等价于设置了 props 参数值的 default 选项，跟运行时声明定义 default 的格式一样
const props = widthDefaults(defintProps<Props>(), {
  foo: () => ['Hello World'],
  bar: () => ({ age: 1 })
})

// 非 <script setup lang="ts"> 模式，使用 defineComponent() 传入 setup() 的 props 对象类型是从 props 选项中推导而来
export default defineComponent ({
  props: {
    foo: boolean
  },
  setup(props) {
    props.foo // boolean | undefiend
  }
})

// 写法三，使用 PropType 类型注解，需要额外引入
interface Book {
  title: string
  author: string
  year: number
}

export default {
  props: {
    book: {
      // provide more specific type to `Object`
      type: Object as PropType<Book>,
      required: true
    }
  }
}
```
#### emits 类型声明
```typescript
// 写法一，运行时声明，无需写回调参数类型
const emits = defineEmits(['input', 'change'])

// 写法二，基于类型声明，支持回调参数类型声明，第二个参数的 key 可以随便定义
const emits = defineEmist({
  (e: 'input', value: string[]): void,
  (e: 'change', value: string[]): void,
  // 声明复杂的回调参数类型
  (e: 'change', { name, age }: { name: string, age: number }): void,
  (e: 'change', name: string, age: number): void,
})

// 非 <script setup lang="ts"> 模式，defineComponent() 可以自行推导上下文 emits 选项进行类型检查，但是不能针对回调参数进行类型声明
export default defineComponent({
  emits: ['change'],
  setup(props, { emits }) {
    emits('change')
  }
})
```
#### ref 类型声明
```typescript
// 变量声明
// 写法一，默认推导类型（隐式推导），ref 根据初始化默认自动推导类型
const age = ref(20) // number
const name = ref('hello') // string
// 写法二，Ref 接口声明复杂类型
const ageOrName = Ref<number | string>ref(20)
ageOrName.value = 'hello'
// 📢 注意：如果声明一个变量的泛型参数类型声明没有初始化默认值，那么该变量将包含 该泛型参数类型和 undefinend 的联合类型
const num = ref<number>() // const num: Ref<number | undefined>
const num: Ref<number> = ref() // 提示类型错误：不能将类型“Ref<number | undefined>”分配给类型“Ref<number>”

// DOM 元素模版引用声明
// 声明 UI 组件库表单 ref 节点（优先使用组件库自带的类型声明）
const formRef = ref<FormModelInstance | null>(null)
// 或这种方式，不推荐，需要重复声明 form 组件实例的 model 属性类型
const formRef = ref<FormModel<ModelTypes> | null>(null)

// 声明自定义组件的 template 元素 ref 节点及使用该组件内部公开的（defineExpose）属性及方法
const customerRef = ref<InstanceType<typeof CustomerList> | null>(null)

// 声明 template 原生标签 <div> 元素 ref 节点
const divRef = ref<HTMLElement | null>(null)
// 声明 template 原生标签 <input> 元素 ref 节点
const inputRef = ref<HTMLInputElement | null>(null)
```
#### reactive 类型声明
```typescript
// 写法一，默认推导类型（隐式推导），不推荐
// 以下类型推导为：const formState: {
//    foo: string;
//    bar: number;
//    info: {
//        name: string;
//        status: boolean;
//    };
// }
const const formState = reactive({
  foo: 'hello',
  bar: 2,
})

// 写法二，泛型指定类型
type FormState = {
  foo: string
  bar: number
}

// 以下类型推导为：type FormState = {
//  foo: string
//  bar: number
// }
const formState = reactive<FormState>({
  foo: 'hello',
  bar: 2,
})
```
#### computed 类型声明
```typescript
// 写法一，默认推导类型（隐式推导），不推荐，以下类型推导为：ComputedRef<{
//    name: string;
//    age: number;
// }>
const userInfo = computed(() => ({ name: 'hello', age: 20 }))

// 写法二，泛型指定类型
type UserInfo = {
  name: string
  age: number
}
// 以下类型推导为：const userInfo: ComputedRef<UserInfo>
const userInfo = computed<UserInfo>(() => ({ name: 'hello', age: 20 }))
```
#### DOM 原生事件类型声明
```typescript
<script setup lang="ts">
// 默认 event 没有类型声明则为 any 类型，需要标注具体类型
const onChange = (event) => {
  console.log(event.target.value)
}

// 修改为
const onChange = (event: Event) => {
  console.log((event.target as HTMLInputElement).value)
}
</script>

<template>
  <input type="text" @change="onChange" />
</template>
```
#### provide / inject 类型声明
建议使用时候将需要注入的 key 类型单独放在一个文件中，多个组件共同导入使用
```typescript
// 使用 Vue 提供的工具类型 InjectionKey，它继承 Symbol，可以用来同步 provide() 和 inject() 之间值的类型，使用时需要引入
const ageKey: InjectionKey<number> = Symbol()

// 值必须为跟上门👆🏻类型声明一致是数字，否则会提示类型错误
provide(ageKey, 20)

const age = inject(ageKey) // age 的类型：number | undefined
// 📢 注意：注入值 ageKey 为 unknown 时，可以使用泛型参数显示声明
const age = inject<number>(ageKey) // age 的类型：number | undefined
// 注入时使用默认值，防止类型推导默认类型有 undefined
const age = inject<number>(ageKey, 0) // age 的类型：number
```

## TypeScript
### 工具类型
`node_modules/typescript/lib/lib.es5.d.ts` 文件有详细的类型说明，可以当做手册查阅

## 学习资料
- [Vue3 + setup + ts 使用总结 - 掘金](https://juejin.cn/post/7127668333565968421)
- [TypeScript高级特性 - 掘金](https://juejin.cn/post/6923523666340741128)
- [Vue3 Composition API 使用教程 - 掘金](https://juejin.cn/post/6844904066103902215)
- [Vue3 + TypeScript 复盘总结 - 掘金](https://juejin.cn/post/6950487211368251399)
- [最详细的 Vue3 + TypeScript 使用教程【值得收藏】 - 掘金](https://juejin.cn/post/7121253172013694990#heading-26)
- [Vue3.0 前的 TypeScript 最佳入门实践 - 掘金](https://juejin.cn/post/6844903865255477261#heading-14)
- [vue3 + ts 初体验 - 掘金](https://juejin.cn/post/6937193963405180936#heading-7)
- [vue3 + setup sugar + TS 经验分享 - 掘金](https://juejin.cn/post/6990682369992704007)
