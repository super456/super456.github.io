import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '纵倾童鞋',
  description: '分享前端技术知识、阅读思考、生活心得等内容',
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录',
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.jpg',
    lastUpdated: {
      text: '最近更新于',
    },
    // 编辑当前页面的链接
    editLink: {
      pattern:
        'https://github.com/super456/super456.github.io/tree/main/docs/:path',
      text: '去 GitHub 上编辑内容',
    },
    nav,
    sidebar,
    darkModeSwitchLabel: '外观',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/super456/super456.github.io',
      },
    ],
  },
})
