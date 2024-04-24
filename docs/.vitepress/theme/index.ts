import { h } from 'vue'
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
import './style.scss'

// 自定义主题色
// import './user-theme.css'

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
  },
}
