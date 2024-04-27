import { h, watch } from 'vue'
import type { EnhanceAppContext } from 'vitepress'
import { inBrowser, useData } from 'vitepress'
import BlogTheme from '@sugarat/theme'
import googleAnalytics from 'vitepress-plugin-google-analytics'
import busuanzi from 'busuanzi.pure.js'
import MyLayout from './components/MyLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import CustomImage from './components/CustomImage.vue'
import LayoutBottom from './components/LayoutBottom.vue'

// 自定义样式重载
import './styles/index.scss'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: BlogTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()
    // 添加自定义 class
    if (frontmatter.value?.layoutClass)
      props.class = frontmatter.value.layoutClass

    return h(MyLayout, props, {
      'layout-bottom': () => h(LayoutBottom),
    })
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    // 添加全局组件注册
    app.component('MNavLinks', MNavLinks)
    app.component(CustomImage.name as string, CustomImage)

    // 添加谷歌分析
    googleAnalytics({
      id: 'G-TYD5MCZ577', // 跟踪 ID
    })

    // 添加不蒜子浏览统计
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
