// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'xxx'
// const RSS: Theme.RSSOptions = {
//   title: '纵倾童鞋',
//   baseUrl,
//   copyright: 'Copyright (c) 2024-present, 纵倾童鞋',
//   description: '何以解忧，唯有热爱（前端技术分享）',
//   language: 'zh-cn',
//   image: 'xxx',
//   favicon: 'xxx',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: false,

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: '纵倾童鞋',

  // 热门文章设置
  hotArticle: {
    title: '🔥 精选文章',
    nextText: '换一组',
    pageSize: 6,
    empty: '暂无精选内容'
  },

  // 推荐文章
  recommend: {
    title: '🔍 相关文章',
    nextText: '换一组',
    pageSize: 6,
    empty: '暂无相关文章',
    style: 'sidebar',
    sort: 'date'
  },

  // 评论设置
  comment: {
    repo: 'super456/blog-comments',
    repoId: 'MDEwOlJlcG9zaXRvcnk5ODQyMDI2OQ==',
    category: 'Announcements',
    categoryId: 'DIC_kwDOBd3GLc4Cdh0r',
  },

  // 友链设置
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top',
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/',
    },
  ],

  // 页脚
  footer: {
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License | 纵倾童鞋',
    // icpRecord: {
    //   name: 'xxx',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },
})

export { blogTheme }
