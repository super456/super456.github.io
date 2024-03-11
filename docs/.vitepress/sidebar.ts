/** 左侧边栏配置 */
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

export default {
  '/posts/growth-record/': { base: '/posts/growth-record/base/html/', items: sidebarGuide() },
}
