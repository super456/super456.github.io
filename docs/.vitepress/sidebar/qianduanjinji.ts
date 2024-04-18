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
      text: 'JavaScript',
      collapsed: true,
      items: [
        { text: '什么是 JavaScript', link: '/base/javascript/what-is-javascript' },
      ],
    },
    {
      text: 'Vue',
      collapsed: true,
      items: [
        { text: '什么是 Vue', link: '/frame/vue/what-is-vue' },
      ],
    },
    {
      text: 'React',
      collapsed: true,
      items: [
        { text: '什么是 React', link: '/frame/vue/what-is-vue' },
      ],
    },
    {
      text: 'Node',
      collapsed: true,
      items: [
        { text: '什么是 Node', link: '/frame/node/what-is-node' },
      ],
    },
    {
      text: '跨平台',
      collapsed: true,
      items: [
        { text: '什么是小程序', link: '/platform/applet/what-is-applet' },
        { text: '什么是 App', link: '/platform/app/what-is-app' },
        { text: '什么是 H5', link: '/platform/h5/what-is-h5' },
      ],
    },
    {
      text: '前端工程化',
      collapsed: true,
      items: [
        { text: '什么是前端工程化', link: '/engineering/tools/' },
        { text: '性能优化', link: '/engineering/performance/' },
      ],
    },
    {
      text: '计算机基础',
      collapsed: true,
      items: [
        { text: '数据结构与算法', link: '/computer/algorithm/' },
        { text: '计算机网络', link: '/computer/network/' },
        { text: '浏览器', link: '/computer/browser/' },
      ],
    },
    {
      text: '技术复盘',
      collapsed: true,
      items: [
        { text: '从《关于语雀 23 日故障的公告》学习复盘', link: '/other/softSkills/yuque-bug-study' },
      ],
    },
    {
      text: '工具指南',
      collapsed: true,
      items: [
        { text: 'VS Code 常用快捷键', link: '/other/toolGuide/' },
      ],
    },
    {
      text: '产品业务',
      collapsed: true,
      items: [
        { text: '业务思考', link: '/other/productBusiness/' },
      ],
    },
    {
      text: 'UI 设计交互',
      collapsed: true,
      items: [
        { text: '设计', link: '/other/productBusiness/' },
      ],
    },
  ]
}
