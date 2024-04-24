/** 前端进击——左侧边栏配置 */
export default function qianduanjinjiSidebarGuide() {
  return [
    {
      text: 'HTML',
      collapsed: false,
      items: [
        { text: 'HTML 知识点', link: '/posts/growth-record/base/html/basics-knowledge' },
      ],
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [
        { text: 'CSS 实战手册学习', link: '/posts/growth-record/base/css/practical-manual' },
        { text: 'CSS BEM 书写规范', link: '/posts/growth-record/base/css/bem-rule' },
        { text: '绝对定位元素布局遮挡问题', link: '/posts/growth-record/base/css/absolute-element-shelter' },
        { text: '两个模块列自适应布局问题', link: '/posts/growth-record/base/css/tow-block-adaptive' },
        { text: 'CSS 之实现图片叠加的层叠层问题', link: '/posts/growth-record/base/css/image-index' },
        { text: 'DIV + CSS 设置水平垂直居中方法', link: '/posts/growth-record/base/css/center-horizontally-vertically' },
      ],
    },
    {
      text: 'JavaScript',
      collapsed: false,
      items: [
        { text: 'JavaScript 优化技巧', link: '/posts/growth-record/base/javascript/javascript-optimization-tips' },
        { text: '容易被忽略的知识点（二）', link: '/posts/growth-record/base/javascript/ignore-knowledge-02' },
        { text: 'JavaScript 布尔值为 false 的六种情况', link: '/posts/growth-record/base/javascript/boolean-false-six' },
        { text: '主流浏览器事件兼容写法', link: '/posts/growth-record/base/javascript/browser-event-compatible' },
        { text: '容易被忽略的知识点（一）', link: '/posts/growth-record/base/javascript/ignore-knowledge-01' },
        { text: 'TypeScript 学习笔记', link: '/posts/growth-record/base/javascript/typescript-study' },
        { text: 'TypeScript 开发实战笔记', link: '/posts/growth-record/base/javascript/typescript-dev-practice' },
        { text: 'TypeScript 全面进阶指南学习笔记', link: '/posts/growth-record/base/javascript/typescript-advanced-guide-study' },
        { text: 'TypeScript 面试知识点', link: '/posts/growth-record/base/javascript/typescript-interview' },
        { text: 'TypeScript 优化技巧', link: '/posts/growth-record/base/javascript/typescript-optimization-tips' },
        { text: 'TypeScript 常用总结', link: '/posts/growth-record/base/javascript/typescript-common-summary' },
        { text: 'Three.js 学习参考', link: '/posts/growth-record/base/javascript/three-learning-reference' },
      ],
    },
    {
      text: 'Vue',
      collapsed: false,
      items: [
        { text: 'Vue3 学习笔记（三）', link: '/posts/growth-record/frame/vue/vue3-study-03' },
        { text: 'Vue3 学习笔记（二）', link: '/posts/growth-record/frame/vue/vue3-study-02' },
        { text: 'Vue3 学习笔记（一）', link: '/posts/growth-record/frame/vue/vue3-study-01' },
        { text: 'Vue3 学习参考', link: '/posts/growth-record/frame/vue/vue3-learning-reference' },
        { text: 'Naive UI 组件库源码分析', link: '/posts/growth-record/frame/vue/naive-ui-source-code' },
        { text: 'Vue3 语法规范尝鲜', link: '/posts/growth-record/frame/vue/vue3-grammatical-norm' },
        { text: '推荐新手源码学习', link: '/posts/growth-record/frame/vue/source-code-learning' },
        { text: '大数据虚拟列表优化实战', link: '/posts/growth-record/frame/vue/virtual-scrolling-list-practice' },
        { text: 'Vue 优化技巧', link: '/posts/growth-record/frame/vue/optimization-tips' },
        { text: 'Vue2 学习笔记', link: '/posts/growth-record/frame/vue/vue2-study' },
        { text: 'Vue 开发问题总结', link: '/posts/growth-record/frame/vue/vue-question-summary' },
        { text: 'Nuxt 学习笔记', link: '/posts/growth-record/frame/vue/nuxt-study' },
        { text: 'Nuxt 搭建 i18n 国际化', link: '/posts/growth-record/frame/vue/nuxt-i18n' },
        { text: 'Nuxt 开发问题总结', link: '/posts/growth-record/frame/vue/nuxt-question-summary' },
        { text: 'Vue2 基础知识易错点', link: '/posts/growth-record/frame/vue/basics-knowledge' },
        { text: 'Vue2 入门实战项目：快餐系统', link: '/posts/growth-record/frame/vue/newcomer-project' },
        { text: 'Vue-CLI2 跨域请求 Demo（fetch、axios、proxyTable）', link: '/posts/growth-record/frame/vue/cross-domain-request' },
        { text: 'Vue-CLI2 中的 Vue-Router 和 Vue-Resource 实战', link: '/posts/growth-record/frame/vue/router-resource' },
        { text: 'Vue-CLI2 中的 render: h => h(App) 解析', link: '/posts/growth-record/frame/vue/render-app' },
        { text: 'Vue2 生命周期的理解与应用', link: '/posts/growth-record/frame/vue/vue2-life-cycle' },
        { text: 'Vue2 基础知识点（一）', link: '/posts/growth-record/frame/vue/vue2-basics-knowledge' },
        { text: 'Vue-CLI2 入门 Demo 游戏', link: '/posts/growth-record/frame/vue/newcomer-game' },
        { text: 'Vue2 父子组件动态传值', link: '/posts/growth-record/frame/vue/vue2-component-props' },
      ],
    },
    {
      text: 'React',
      collapsed: false,
      items: [
        { text: 'React 学习笔记', link: '/posts/growth-record/frame/react/react-study' },
        { text: 'React 学习参考', link: '/posts/growth-record/frame/react/react-learning-reference' },
      ],
    },
    {
      text: 'Node',
      collapsed: false,
      items: [
        { text: 'Node.js Corepack 使⽤指南', link: '/posts/growth-record/frame/node/corepack-guide' },
      ],
    },
    {
      text: '跨平台',
      collapsed: false,
      items: [
        { text: 'iOS SiriKit 开发指南', link: '/posts/growth-record/platform/app/sirikit' },
        { text: 'Uni-app 项⽬开发问题及解决⽅案记录', link: '/posts/growth-record/platform/uni/uni-app-question' },
        { text: '微信网页授权开发指南', link: '/posts/growth-record/platform/applet/weapp-auth-dev' },
        { text: '微信小程序之自定义对话框组件弹窗动画', link: '/posts/growth-record/platform/applet/custom-dialog' },
        { text: '微信小程序之animation底部弹窗动画（两种方法）', link: '/posts/growth-record/platform/applet/bottom-popup-animation' },
        { text: '微信小程序之物流状态时间轴', link: '/posts/growth-record/platform/applet/status-timeline' },
        { text: '微信小程序之 swiper 组件上传图片删除后其余不显示', link: '/posts/growth-record/platform/applet/swiper-image-no-display' },
        { text: '微信小程序之 Grid 表格布局', link: '/posts/growth-record/platform/applet/grid-table-layout' },
        { text: '微信小程序之自定义 table 表格布局', link: '/posts/growth-record/platform/applet/custom-table-layout' },
        { text: '微信小程序之真机键盘弹窗遮挡样式问题', link: '/posts/growth-record/platform/applet/real-keyboard-masking' },
        { text: '微信小程序之页面跳转传参数据： JSON 字符串转对象报错', link: '/posts/growth-record/platform/applet/page-url-json-error' },
        { text: '微信小程序之下拉菜单的三级联动筛选框', link: '/posts/growth-record/platform/applet/three-tier-screening' },
        { text: '微信小程序之简单双向调节的 Slider 滑动选择器', link: '/posts/growth-record/platform/applet/slider' },
        { text: '微信小程序之 scroll-view 横向滚动不能显示', link: '/posts/growth-record/platform/applet/scroll-view' },
        { text: '微信小程序之去除 Button 默认样式', link: '/posts/growth-record/platform/applet/button-default-style' },
        { text: '微信小程序之图片遮罩层 Demo', link: '/posts/growth-record/platform/applet/image-masking-demo' },
        { text: '微信小程序之登录欢迎页面 Demo', link: '/posts/growth-record/platform/applet/login-welcome-demo' },
        { text: 'wux-weapp 的微信小程序筛选框：FilterBar 组件分析', link: '/posts/growth-record/platform/applet/filter-bar' },
      ],
    },
    {
      text: '前端工程化',
      collapsed: false,
      items: [
        { text: '什么是前端工程化', link: '/posts/growth-record/engineering/index' },
        { text: 'Webpack 基础语法', link: '/posts/growth-record/engineering/webpack/intro' },
        { text: '异常监控管理工具调研', link: '/posts/growth-record/engineering/tools/anomaly-monitoring-research' },
        { text: 'DevOps 了解', link: '/posts/growth-record/engineering/tools/dev-ops' },
        { text: '框架选型指南', link: '/posts/growth-record/engineering/other/frame-selection' },
        { text: '浏览器兼容性方案调研', link: '/posts/growth-record/engineering/other/browser-compatibility-research' },
      ],
    },
    {
      text: '计算机基础',
      collapsed: false,
      items: [
        { text: 'HTTP 学习笔记', link: '/posts/growth-record/computer/network/http' },
        { text: '算法学习心得', link: '/posts/growth-record/computer/algorithm/experience' },
        { text: '算法基础学习', link: '/posts/growth-record/computer/algorithm/basics-knowledge' },
        { text: '算法学习记录', link: '/posts/growth-record/computer/algorithm/learning-reference' },
      ],
    },
    {
      text: '技术复盘',
      collapsed: false,
      items: [
        { text: '从《关于语雀 23 日故障的公告》学习复盘', link: '/posts/growth-record/other/softSkills/yuque-bug-study' },
        { text: '用技术的眼光看世界', link: '/posts/growth-record/other/softSkills/technology-for-the-world' },
      ],
    },
    {
      text: '工具指南',
      collapsed: false,
      items: [
        { text: '开发常用命令行', link: '/posts/growth-record/other/toolGuide/common-command-line' },
        { text: '脚手架及 CLI 工具使用', link: '/posts/growth-record/other/toolGuide/scaffold-cli' },
        { text: 'Web 服务器 live-server 的安装及使用', link: '/posts/growth-record/other/toolGuide/live-server' },
        { text: '常用的 Markdown 语法格式来编写文章', link: '/posts/growth-record/other/toolGuide/markdown' },
        { text: 'VS Code 编程软件常用技巧', link: '/posts/growth-record/other/toolGuide/vscode-common' },
      ],
    },
    {
      text: '产品业务',
      collapsed: false,
      items: [
        // { text: '业务思考', link: '/posts/growth-record/other/productBusiness/' },
      ],
    },
    {
      text: 'UI 设计交互',
      collapsed: false,
      items: [
        { text: 'UI 设计与交互体验', link: '/posts/growth-record/other/productBusiness/ui-interactive-experience' },
      ],
    },
  ]
}