/** 前端进击——左侧边栏配置 */
export default function qianduanjinjiSidebarGuide() {
  return [
    {
      text: 'HTML',
      collapsed: true,
      items: [
        { text: '什么是 HTML', link: '/base/html/what-is-html' },
        { text: '语义化标签', link: '/base/html/semantic-label' },
      ],
    },
    {
      text: 'CSS',
      collapsed: true,
      items: [
        { text: '什么是 CSS', link: '/base/css/what-is-css' },
      ],
    },
    {
      text: '技术复盘',
      collapsed: true,
      items: [
        { text: '从《关于语雀 23 日故障的公告》学习复盘', link: '/other/softSkills/yuque-bug-study' },
      ],
    },
  ]
}
