---
title: Naive UI 组件库源码分析
date: 2023-11-16 20:00:00
tag:
 - Vue
categories:
 - 前端进击
---
# Naive UI 组件库源码分析
## 介绍
2023 年 11 月 14 号开始研究这个组件库源码，目的是学习一些公共组件的写法（组件设计与实现）、TypeScript写法（基本写法与类型体操）、代码优化技巧等，期待学有所成吧

GitHub 仓库：
[GitHub - tusen-ai/naive-ui: A Vue 3 Component Library. Fairly Complete. Theme Customizable. Uses TypeScript. Fast.](https://github.com/tusen-ai/naive-ui)

## 特点

1. 超过 80+ 组件，组件丰富；
2. 教程文档很全，啥配置都有说明；
3. Naive UI 支持 tree shaking，组件、语言、主题均可 tree-shaking；
4. 推荐周边使用的框架：一些推荐的宝藏 Admin  管理后台库（安排看起来）：

| **资源** | **描述** |
| --- | --- |
| [Naive UI Admin](https://github.com/jekip/naive-ui-admin) | 免费开源的中后台模板 |
| [Admin Work](https://github.com/qingqingxuan/admin-work) | 一款免费开源、功能强大、方便易用、漂亮的中后台管理系统模板 |
| [zce/fearless](https://github.com/zce/fearless) | 一个基于 Vue.js 3.x & TypeScript & Vite 的管理平台脚手架，包含基本的身份认证和鉴权 |
| [tsx-naive-admin](https://github.com/WalkAlone0325/tsx-naive-admin) | 基于 Vue 3 + Naive UI + TSX + Vite 的后台管理基本模板 |
| [Soybean Admin](https://github.com/honghuangdc/soybean-admin) | 一个基于 Vue3 + Vite + Naive UI + TypeScript 的漂亮清爽的中后台模版 |
| [GoView](https://gitee.com/dromara/go-view) | 开源、精美、便捷的「数据可视化」低代码开发平台 |
| [Vue Naive Admin](https://github.com/zclzone/vue-naive-admin) | 基于 Vue3 + Vite4 + Pinia + Unocss + Naive UI 的轻量级后台管理模板 |
| [Celeris Web](https://github.com/kirklin/celeris-web) | 一个基于 Vue 3 和 Vite 的免费开源前端框架，具有 Naive UI 组件和 TypeScript 支持，采用 Monorepo 结构。它还集成了 OpenAI，为现代 Web 开发提供自然语言处理能力。 |

5. 推荐免费的图标库：[https://www.xicons.org/#/](https://www.xicons.org/#/)

## 感受
不好的地方：

1. 部分函数钩子没有写注释；
2. 组件 ref 实例没有写 TS 声明；
3. computed 计算属性变量没有写 TS 声明；
4. 模版标签行内样式比较多；

好处：

1. 组件文件写法都是统一这种格式：
```typescript
export default defineComponent({
  name: 'SiteHeader',
  ...

  return {
    ...
  }
})
```

2. css 样式写法很工整，没有嵌套写法，命令很规范；

## 组件设计与实现
1. 一个组件的实现目录：

<CustomImage src='/growth-record/frame/vue/naive-source-01.webp' />

index.ts 导出文件为：组件的 props 属性对象、props 的类型、默认组件实例内容
```typescript
// 比如
export { default as NAlert, alertProps } from './src/Alert'
export type { AlertProps } from './src/Alert'

// 具体值：
export const alertProps =

export type AlertProps =

export default defineComponent({})
```

1. 组件传入属性引用类型声明（PropType，变量赋值属性，用于类型推导）：
```typescript
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: Boolean,
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
```

1. 直接解构使用对应的响应式 ref 变量：
```typescript
const { value: container } = mergedContainerRef
```

1. watchEffect 直接监听一个方法：
```typescript
  const mountStyle = (): void => {
    let finalThemeHash = hashClassPrefix
    const hashValue = hashRef ? hashRef.value : undefined
    const themeHash = mergedThemeHashRef?.value
    if (themeHash) finalThemeHash += '-' + themeHash
    if (hashValue) finalThemeHash += '-' + hashValue
    const { themeOverrides, builtinThemeOverrides } = props
    if (themeOverrides) {
      finalThemeHash += '-' + hash(JSON.stringify(themeOverrides))
    }
    if (builtinThemeOverrides) {
      finalThemeHash += '-' + hash(JSON.stringify(builtinThemeOverrides))
    }
    themeClassRef.value = finalThemeHash
    renderCallback = () => {
      const cssVars = cssVarsRef.value
      let style = ''
      for (const key in cssVars) {
        style += `${key}: ${cssVars[key]};`
      }
      c(`.${finalThemeHash}`, style).mount({
        id: finalThemeHash,
        ssr: ssrAdapter
      })
      renderCallback = undefined
    }
  }

  watchEffect(() => {
    mountStyle()
  })
```

## TSX 写法
注意：使用单括号解析动态参数值

### 基本用法

1. 动态解析 class 写法：
```typescript
<div class={`${clsPrefix}-base-clear`}>

// 多类写法
class={[
  `${clsPrefix}-base-close`,
  absolute && `${clsPrefix}-base-close--absolute`,
  disabled && `${clsPrefix}-base-close--disabled`,
  round && `${clsPrefix}-base-close--round`
]}
```

2. 使用 default 函数表达式：
```tsx
default: () => {
  return this.show ? (
    <div>...</div>
  ) : (
    <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
      ...
    </div>
  )
}
```

3. setup 内，第一形参用不上的时候，声明使用下划线处理：
```typescript
setup(_, { slot }) {
  const isMountedRef = useIsMounted()

  return () => (
    <Transition name="icon-switch-transition" appear={isMountedRef.value}>
    	{ slot }
    </Transition>
  )
}
```

### 参考实现
```tsx
render () {
  const { clsPrefix } = this
  return (
    <div class={`${clsPrefix}-base-clear`}>
      <NIconSwitchTransition>
        {{
      default: () => {
        return this.show ? (
          <div
            key="dismiss"
            class={`${clsPrefix}-base-clear__clear`}
            onClick={this.onClear}
            onMousedown={this.handleMouseDown}
            data-clear
            >
            {resolveSlot(this.$slots.icon, () => [
              <NBaseIcon clsPrefix={clsPrefix}>
                {{
                default: () => <ClearIcon />
              }}
              </NBaseIcon>
            ])}
          </div>
        ) : (
          <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
            {this.$slots.placeholder?.()}
          </div>
        )
      }
    }}
      </NIconSwitchTransition>
    </div>
  )
}
```

1. 图标组件：
```typescript
import { h, defineComponent, type PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: undefined
    },
    ariaHidden: {
      type: Boolean,
      default: undefined
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onMousedown: Function as PropType<(e: MouseEvent) => void>,
    onMouseup: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('-base-icon', style, toRef(props, 'clsPrefix'))
  },
  render () {
    return (
      <i
        class={`${this.clsPrefix}-base-icon`}
        onClick={this.onClick}
        onMousedown={this.onMousedown}
        onMouseup={this.onMouseup}
        role={this.role}
        aria-label={this.ariaLabel}
        aria-hidden={this.ariaHidden}
        aria-disabled={this.ariaDisabled}
      >
        {this.$slots}
      </i>
    )
  }
})

```

2. 最简单的一个标签渲染写法：
```typescript
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'ArrowBack',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
      </svg>
    )
  }
})

```

## TypeScript 写法
1. 导入所有 API 中，针对某个 API 类型声明导入处理：
```typescript
import { h, defineComponent, type PropType, toRef } from 'vue'
```

2. Vue 相关常用 TS 类型声明（注意前缀 type 关键词）：
```typescript
import type { PropType, CSSProperties, VNode, HTMLAttributes } from 'vue'

// 或者合并跟 Vue 所有属性写法，注意 type 关键词
import {
  h,
  ref,
  onMounted,
  computed,
  defineComponent,
  type PropType,
  toRef,
  provide,
  nextTick,
  type WatchStopHandle,
  type CSSProperties,
  watch,
  onBeforeUnmount,
  type ComponentPublicInstance,
  type ComputedRef,
} from 'vue'
```
PropType 使用场景：用于直接赋值的变量内部声明 TS 方便类型推导：
```typescript
const scrollbarProps = {
  trigger: {
    type: String as PropType<'none' | 'hover'>, // 方便类型推导
    default: 'hover'
  },
} as const

const Scrollbar = defineComponent({
  name: 'Scrollbar',
  props: scrollbarProps, // 直接赋值给变量
```

3. 通过入参类型推断具体类型：
```typescript
export function formatLength<
  T extends number | string | null | undefined | any
> (
  length: T,
  { c = 1, offset = 0, attachPx = true }: FormatLengthOptions = {}
): T extends null
    ? null
    : T extends undefined
      ? undefined
      : T extends string | number
        ? string
        : T {
          ...
        }
```

4. 返回值类型设置运用 is：
```typescript
export function isDocument (node: Node): node is Document {
  return node.nodeName === '#document'
}
```

5. 从对象映射获取指定类型的数据写法：
```typescript
interface SmallerSizeMap {
  tiny: 'mini'
  small: 'tiny'
  medium: 'small'
  large: 'medium'
  huge: 'large'
}

type SmallerSize<T extends keyof SmallerSizeMap> = SmallerSizeMap[T]

export function smallerSize<T extends keyof SmallerSizeMap>(
  size: T
): SmallerSize<T> {
  switch(size){
    case 'tiny':
      return 'mini' as any
    case 'small':
      return 'tiny' as any
    case 'medium':
      return 'small' as any
    case 'large':
      return 'medium' as any
    case 'huge':
      return 'large' as any
  }

  throw Error(`${size} has no smaller size.`)
}

```

6. 获取对象对应 key 值的类型写法：
```typescript
export function keysOf<T extends Record<string, unknown>>(obj: T): Array<keyof obj> {
  return Object.keys(obj) as any
}
```

7. 结合模板字符串使用动态的 TS 类型 key 值：
```typescript
Extract<keyof T, `internal${string}`>
```

8. 常量只读属性的设置：
```typescript
export const anchorLinkProps = {
  title: String,
  href: String
} as const
```

## 代码优化技巧

1. 函数点击事件命名：handleXXX
2. findIndex 命中索引判断：
```typescript
    const index = collectionArray.findIndex(
      (collectionElement) => collectionElement === element
    )
    if (~index) collectionArray.splice(index, 1)
```

find 遍历代码优化技巧：巧用解构对象形式判断值
```typescript
const showDir = vNode.dirs?.find(({ dir }) => dir === vShow)
```

3. ts/js 文件中，导出的变量或函数放在文件最底部

<CustomImage src='/growth-record/frame/vue/naive-source-02.webp' />

4. 返回对象使用原来的对象变量整合 Object.assign 即可，不会产生新的变量占用空间

<CustomImage src='/growth-record/frame/vue/naive-source-03.webp' />

5. 没太看懂这两行代码的作用：

<CustomImage src='/growth-record/frame/vue/naive-source-04.webp' />

## 公共服务
### 工具或钩子
1. 封装 **Composables 组合式函数**写法：
```typescript
/** 注释说明 */
export funciton useIsMobile () {
  const breakpointRef = useBreakpoint()

  return useMemo(() => {
    return breakpointRef.value === 'xs'
  })
}
```

相关学习资料：
- [组合式函数 | Vue.js](https://cn.vuejs.org/guide/reusability/composables.html)

使用方法讲解：
- [Vue3中的Composables组合式函数 - 掘金](https://juejin.cn/post/7108065151013617678)

2. 工具钩子函数 index.ts 直接将导入的函数钩子再导出写法（注意 export）：
```typescript
export {
  useInjectionCollection,
  useInjectionElementCollection,
  useInjectionInstanceCollection
} from './use-collection'
export { useDeferredTrue } from './use-deferred-true'
export { useAdjustedTo } from './use-adjusted-to'
export { useHoudini } from './use-houdini'
export { useOnResize } from './use-resize'
export {
  useLockHtmlScroll,
  lockHtmlScrollRightCompensationRef
} from './use-lock-html-scroll'
export { useIsComposing } from './use-is-composing'
export { useReactivated } from './use-reactivated'

```

## 有趣的 npm 插件
1. 帮助 Vue3 写组合式函数的包：

[vooks](https://www.npmjs.com/package/vooks)
官方教程文档：[https://vooks-07akioni.vercel.app/](https://vooks-07akioni.vercel.app/)

2. 自动引入 API：

[unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)

3. 自动加载组件：插件会自动解析模版中用到组件，并导入组件

[unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components)

4. vueuc：[https://github.com/07akioni/vueuc](https://github.com/07akioni/vueuc)

## 其他
1. 使用默认导出 naive 值和其他导出 NThemeEditor 值写法
```typescript
import naive, { NThemeEditor } from '../src/index'
```

1. 当一个 ts 文件只有一个变量值时，导出也只需要一个默认变量值即可，写法：
```typescript
const zhCN: NLocale = {
	...
}

export default zhCN
```
导入的时候，想重新定义一个变量接收写法：
```typescript
export { default as zhCN } from '...'

```
1. 导入 CSS 资源文件写法，默认导入整个文件所有内容：
```typescript
import './styles/demo.css'
```

1. 函数依赖注入写法（自给自足）：
```typescript
export const i18n = function (data) {
  const localeReactive = inject('i18n', null)
  return {
    locale: toRef(localeReactive, 'locale'),
    t (key) {
      const { locale } = localeReactive
      return data[locale][key]
    }
  }
}

i18n.provide = function (localeRef) {
  const localeReactive = reactive({})
  watchEffect(() => {
    localeReactive.locale = localeRef.value
  })
  provide('i18n', localeReactive)
}
```
官方文档：
[组合式 API：依赖注入 | Vue.js](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject)

5. 路由文件设置，国际化设置
```typescript
  {
    name: 'enComponents',
    path: '/en-US/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: enComponentRoutes
  },
  {
    name: 'zhComponents',
    path: '/zh-CN/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: zhComponentRoutes
  },
	{
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US',
        theme: 'os-theme'
      }
    }
  }
```

6. computed get/set 重写监听对象发生变化修改另一个值的写法：
```typescript
// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug')
const displayModeRef = computed({
  get () {
    return _displayModeRef.value
  },
  set (value) {
    _displayModeRef.value = value
    // 同时修改某个值
    window.localStorage.setItem('mode', value)
  }
})
```
