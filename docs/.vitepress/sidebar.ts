/** 前端进击——左侧边栏配置 */
function sidebarGuide() {
  return [
    {
      text: 'HTML',
      collapsed: false,
      items: [
        { text: '什么是 HTML', link: 'what-is-html' },
        { text: '语义化标签', link: 'semantic-label' },
      ],
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [
        { text: '什么是 CSS', link: 'what-is-css' },
      ],
    },
  ]
}

/** 朝花夕拾——左侧边栏配置 */
function zhaohuaxishiSidebarGuide() {
  return [
    {
      text: '2024 年',
      collapsed: false,
      items: [
        { text: '第 40 本《我想偶尔停一会儿》', link: '/2024/40th' },
      ],
    },
  ]
}

export default {
  '/posts/growth-record/': { base: '/posts/growth-record/base/html/', items: sidebarGuide() },
  '/posts/read-book/': { base: '/posts/read-book/', items: zhaohuaxishiSidebarGuide() },
}
