import { h } from 'vue'
import { EnhanceAppContext, useData } from 'vitepress'
import BlogTheme from '@sugarat/theme'
import MNavLinks from './components/MNavLinks.vue'

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

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(BlogTheme.Layout, props)
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('MNavLinks', MNavLinks)
  }
}

