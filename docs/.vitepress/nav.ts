/** 顶部导航配置 */
import type { DefaultTheme } from 'vitepress'

export default [
  { text: '首页', link: '/' },
  { text: '前端进击', link: '/posts/growth-record/', activeMatch: '^/posts/growth-record/' },
  { text: '前端导航', link: '/posts/navigator/', activeMatch: '^/posts/navigator/' },
  { text: '朝花夕拾', link: '/posts/read-book/', activeMatch: '^/posts/read-book/' },
  { text: '夜航西飞', link: '/posts/random-thought/', activeMatch: '^/posts/random-thought/' },
  { text: '关于作者', link: '/posts/about/' },
] as DefaultTheme.Config['nav']
