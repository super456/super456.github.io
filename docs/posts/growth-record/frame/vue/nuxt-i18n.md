---
title: Nuxt 搭建 i18n 国际化
date: 2020-04-30 20:00:00
tags:
 - Vue
 - Nuxt
categories:
 - 前端进击
---
# Nuxt 搭建 i18n 国际化
### 一、需求背景
因公司发展，业务需求，需要支持会员端的英文版本展示，所以 PC 端和移动端需要支持语言环境切换的选项供用户选择。

### 二、技术分析
#### 2.1. Nuxt 介绍：
Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI 渲染**。我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。

Nuxt.js 预设了利用 Vue.js 开发**服务端渲染**的应用所需要的各种配置。除此之外，我们还提供了一种命令叫：`nuxt generate` ，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（Microservices）的 Web 应用迈开的新一步。
作为框架，Nuxt.js 为 `客户端/服务端` 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。

#### 2.2. i18n 介绍：
具有动态 json 存储的轻量级简单翻译模块。 支持 Node.js 应用程序，并且应与任何暴露了传入 res 和 req 对象的 `app.use()` 方法的框架（例如 express，restify 以及更多）一起使用。 在应用程序和模板中使用通用的__（'...'）语法。 将语言文件存储在与 webtranslateit json 格式兼容的 json 文件中。 首次在您的应用中使用时，即时添加新字符串。 无需额外的解析。

#### 2.3. Nuxt 和 i18n 结合：
因为 Nuxt 是属于 SSR 应用框架，跟 Vue-Cli 脚手架不同的是，前端代码再服务端运行解析，然后返回给我浏览器呈现效果，所以很多 JavaScript 代码和 DOM 操作需要特定的环境才能执行，未能能让 Nuxt 应用国际化，官方文档给出的解决方案是通过插件引入方式实现国际化程序初始化配置（plugins），用户根据选项切换语言环境时，通过url路径新增语言标识符切换当前路径，执行中间件（middleware）改变i18n语言配置项，和 Vuex 的 store 存储，来达到语言切换的目的。

如图看一下 Nuxt 生命周期理解一下：

<CustomImage src='/growth-record/frame/vue/nust-i18n.svg' />

### 三、解决步骤：
#### 3.1. 简单说明：

- 安装 vue-i18n 并且创建 `store.js`（Vuex 状态管理）文件；
- 创建一个（middleware）中间件，用来管理不同的语言；
- 创建不同语言的 json 文件作为语言包（例如： `~locales/en.json`）；
- 在 pages 文件夹下创建文件，并进行翻译。

#### 3.2. 详细步骤：
**注：此处以 photon-member-fe 项目创建过程为例进行说明。**

- （1）先安装 vue-i18n:

`yarn add vue-i18n``--save`

- （2）配置 store 文件：

`store/state.js`:（配置默认值）
```javascript
export default () => ({
	fallbackLocale: 'zh-cn', // 默认显示语言
	locale: 'zh-cn', // 当前配置访问语言
	locales: ['en', 'zh-cn'], // 配置可选语言
 ...

```

`store/mutations.js`: （配置修改语言参数事件）
```javascript
export default {
  SET_LANG(state, payload) {
		if (state.locales.includes(payload)) {
			state.locale = payload
		}
	},
  ...
```

- （3）配置 plugins 文件：

plugins 目录下新建 `i18n.js` 文件及配置如下：
```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../lang'

Vue.use(VueI18n)

export default ({ app, store: { state } }) => {
	const { fallbackLocale, locale } = state

	app.i18n = new VueI18n({
		locale,
    fallbackLocale, // 设置默认选中语言
		messages,
		silentTranslationWarn: true // 是否取消本地化失败时输出的警告。
	})

	app.i18n.path = (link) => {
		// 根据选中的语言切换路径转换调用方法 ，可在页面调用转换路径
		if (app.i18n.locale === app.i18n.fallbackLocale) {
			return `/${link}`
		}
		return `/${app.i18n.locale}/${link}`
	}
}

```

- （4）配置语言 lang 文件：

在 client 目录下新建 lang 文件夹，文件夹下新增 `index.js` 文件，配置语言参数对应包文件内容：
```javascript
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocal from './en'
import zhLocal from './zh-CN'

export default {
	'zh-cn': {
		...zhLocal,
		...zhLocale
	},
	en: {
		...enLocal,
		...enLocale
	}
}

```

在 lang 文件夹下 新增 `zh-CN.js` 文件和 `en.js` 文件，两者 JSON 数据格式，两者内容 key 字段对齐，如：
`zh-CN.js`:
```javascript
export default {
	lang: 'zh-cn',
	app: {
		confirm: {
			systemIncompatibilityTips: '温馨提示',
			systemIncompatibilityTipsContent:
				'您好！当前使用的 IE 浏览器可能导致部分系统功能不能正常使用，建议使用 IE 10 及以上或更换其他浏览器，感谢您的配合！'
		},
  ...
```

`en.js`:
```javascript
export default {
	lang: 'en',
	app: {
		confirm: {
			systemIncompatibilityTips: 'Tips',
			systemIncompatibilityTipsContent: 'Hello! The currently used IE browser may cause some system functions to not work properly. It is recommended to use IE 10 or above or replace other browsers. Thank you for your cooperation!'
		},
  ...
```

- （5）配置 middleware 中间件：

在 middleware 文件夹下 新建 `i18n.js` 文件（配置url语言切换路径）：
```javascript
export default function ({
	isHMR,
	app,
	store,
	route,
	params,
	error,
	redirect
}) {
	const defaultLocale = app.i18n.fallbackLocale
	// If middleware is called from hot module replacement, ignore it
	if (isHMR) {
		return
	}
	// Get locale from params
	let locale = params.lang || defaultLocale

	// 404/500 报错翻译问题，获取不到 params.lang 参数
	if (!params.lang) {
		store.state.locales.forEach(element => {
			if (route.fullPath.indexOf(`/${element}/`) === 0) {
				locale = element
			}
		})
	}

	if (!store.state.locales.includes(locale)) {
		return error({
			message: 'This page could not be found.',
			statusCode: 404
		})
	}

	// Set locale 需注意 ，vuex 页面刷新后状态将不再保存，若需保存，可使用 localstorage
	store.commit('SET_LANG', locale)
	app.i18n.locale = store.state.locale

	// If route is /<defaultLocale>/... -> redirect to /...
	if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
		const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
		const re = new RegExp(toReplace)
		return redirect(
			route.fullPath.replace(re, '/')
		)
	}
}

```

- （6）配置 `nuxt.config.js` 文件：
```javascript
// 引入初始化 i18n 配置：
	plugins: [
		'@/plugins/i18n',
    ...
   ],

  router: {
    // 配置中间件
		middleware: ['checkHome', 'i18n'],
		extendRoutes(routes, resolve) {
			routes.push({
				path: '/',
				children: [
					// 不带路径, 默认访问首页
					{
						path: '',
						redirect: '/login'
					}
				]
			})
		}
	},
```

- （7）修改 pages 文件夹下相应的页面：

在 pages 文件夹下新建 `_lang` 文件夹，之后在此文件夹下新建对应的页面文件（访问路径一致），例如：
默认访问中文页面登录页：`localhost:8121/login`
英文访问路径：`localhost:8121/en/login`
👇创建对应 login 文件
`@/pages/_lang/login.vue`

```javascript
<script>
import Index from '~/pages/login'
export default Index
</script>
```

组件中显示语言配置，如：
```
{{ $t('app.label.login') }}
```

切换语言环境：可以通过 `location.pathname` 设置 url。

- 配置 request 请求链接 header 带语言参数：

`plugins/route.js` (只会在浏览器执行)：
```javascript
export default ({ app, route, redirect }) => {
	// 设置语言
	if (process.client) {
		localStorage.setItem('helpers__lang', app.store.state.locale)
	}
 ...
```

`plugins/api/request.js` (配置请求头语言参数)：
```javascript
export const request = (url, options) => {
	// 设置请求语言
	if (process.client) {
		services.defaults.headers.helpers__lang = localStorage.getItem('helpers__lang')
	}
  ...
```

js 文件引用国际化：
`utils/i18n.js` (配置国际化模块化)：
```javascript
import VueI18n from 'vue-i18n'
import state from '@/store/state.js'
import messages from '@/lang'

let locale = state().fallbackLocale // 设置默认语言环境

//设置缓存里的语言环境设置
if (process.client) {
	locale = location.pathname.includes('/en/') ? 'en' : 'zh-cn'
}

const i18n = new VueI18n({
	locale,
	messages
})

export default i18n
```

引用的 js 文件：
```javascript
import i18n from '@/utils/i18n'

const emailStr = i18n.t('app.validator.email')
```

### 四、总结归纳：

1. 切换语言，不刷新页面。【只需要在切换的时候，设置 store 中的 locale 值为对应的 language 值，不做其他操作】，目前做不到，不管是 Vue-cli 还是 Nuxt 都是需要的；
2. 刷新页面之后，还是当前语言。【这个需要将设置好的语言保存起来，放到本地缓存中，是个不错的选择，但是不利于分享，因为 Nuxt 是 SSR 原因，更好的是通过 url 设置语言环境去设置页面显示的语言】；
3. 根据浏览器的语言，显示语言。【使用 `navigator.language` 来获取浏览器默认语言，之后将其赋值给为 store 中的 locale 值，可以尝试做】；
4. 显示何种语言，是由 `$i18n.locale` 决定的。

官方网站案例：
- [https://zh.nuxtjs.org/examples/i18n](https://zh.nuxtjs.org/examples/i18n)
