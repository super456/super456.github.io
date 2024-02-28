import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '纵倾童鞋',
  description: '纵倾童鞋的前端技术博客',
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.jpg',
    lastUpdated: {
      text: '最近更新于'
    },
    // 编辑当前页面的链接
    editLink: {
      pattern:
        'https://github.com/super456/super456.github.io/tree/main/docs/:path',
      text: '去 GitHub 上编辑内容'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '前端进击',
        items: [
          {
            text: '三剑客',
            items: [
              {
                text: 'HTML',
                link: '/posts/growth-record/html/'
              },
              {
                text: 'CSS',
                link: '/posts/growth-record/css/'
              },
              {
                text: 'JavaScript',
                link: '/posts/growth-record/javascript/'
              }
            ]
          },
          {
            text: '框架',
            items: [
              {
                text: 'Vue',
                link: '/posts/growth-record/vue/'
              },
              {
                text: 'React',
                link: '/posts/growth-record/react/'
              },
            ]
          }
        ]
      },
      { text: '前端导航', link: '/posts/navigator/' },
      { text: '朝花夕拾', link: '/posts/read-book/' },
      { text: '夜航西飞', link: '/posts/random-thought/' },
      { text: '关于作者', link: '/posts/about/' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/super456/super456.github.io'
      }
    ],
  }
})
