/** 前端进击——左侧边栏配置 */
export default function qianduanjinjiSidebarGuide() {
  return [
    {
      text: 'HTML',
      collapsed: false,
      items: [
        // { text: '什么是 HTML', link: '/base/html/what-is-html' },
        // { text: '语义化标签', link: '/base/html/semantic-label' },
      ],
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [
        // { text: '什么是 CSS', link: '/base/css/what-is-css' },
        { text: 'CSS 实战手册学习', link: '/base/css/practical-manual' },
        { text: 'CSS-BEM-书写规范', link: '/base/css/bem-rule' },
        { text: '绝对定位元素布局遮挡问题', link: '/base/css/absolute-element-shelter' },
        { text: '两个模块列自适应', link: '/base/css/tow-block-adaptive' },
      ],
    },
    {
      text: 'JavaScript',
      collapsed: false,
      items: [
        // { text: '什么是 JavaScript', link: '/base/javascript/what-is-javascript' },
      ],
    },
    {
      text: 'Vue',
      collapsed: false,
      items: [
        // { text: '什么是 Vue', link: '/frame/vue/what-is-vue' },
      ],
    },
    {
      text: 'React',
      collapsed: false,
      items: [
        // { text: '什么是 React', link: '/frame/vue/what-is-vue' },
      ],
    },
    {
      text: 'Node',
      collapsed: false,
      items: [
        // { text: '什么是 Node', link: '/frame/node/what-is-node' },
      ],
    },
    {
      text: '跨平台',
      collapsed: false,
      items: [
        // { text: '什么是小程序', link: '/platform/applet/what-is-applet' },
        // { text: '什么是 App', link: '/platform/app/what-is-app' },
        // { text: '什么是 H5', link: '/platform/h5/what-is-h5' },
      ],
    },
    {
      text: '前端工程化',
      collapsed: false,
      items: [
        { text: '什么是前端工程化', link: '/engineering/index' },
        // { text: '性能优化', link: '/engineering/performance/' },
        { text: 'Webpack 基础语法', link: '/engineering/webpack/intro' },
        { text: '异常监控管理工具调研', link: '/engineering/tools/anomaly-monitoring-research' },
        { text: 'DevOps 了解', link: '/engineering/tools/dev-ops' },
        { text: '框架选型指南', link: '/engineering/other/frame-selection' },
      ],
    },
    {
      text: '计算机基础',
      collapsed: false,
      items: [
        // { text: '数据结构与算法', link: '/computer/algorithm/' },
        // { text: '计算机网络', link: '/computer/network/' },
        // { text: '浏览器', link: '/computer/browser/' },
      ],
    },
    {
      text: '技术复盘',
      collapsed: false,
      items: [
        { text: '从《关于语雀 23 日故障的公告》学习复盘', link: '/other/softSkills/yuque-bug-study' },
        { text: '用技术的眼光看世界', link: '/other/softSkills/technology-for-the-world' },
      ],
    },
    {
      text: '工具指南',
      collapsed: false,
      items: [
        { text: '开发常用命令行', link: '/other/toolGuide/common-command-line' },
        { text: '脚手架及 CLI 工具使用', link: '/other/toolGuide/scaffold-cli' },
        // { text: 'VS Code 常用快捷键', link: '/other/toolGuide/' },
      ],
    },
    {
      text: '产品业务',
      collapsed: false,
      items: [
        // { text: '业务思考', link: '/other/productBusiness/' },
      ],
    },
    {
      text: 'UI 设计交互',
      collapsed: false,
      items: [
        // { text: '设计', link: '/other/productBusiness/' },
      ],
    },
  ]
}
