/** 顶部导航配置 */
export default [
  { text: '首页', link: '/' },
  { text: '前端进击', items: [
    {
      text: '三剑客',
      items: [
        {
          text: 'HTML',
          link: '/posts/growth-record/base/html/',
          activeMatch: '/posts/growth-record/base/html/',
        },
        {
          text: 'CSS',
          link: '/posts/growth-record/base/css/',
        },
        {
          text: 'JavaScript',
          link: '/posts/growth-record/base/javascript/',
        },
      ],
    },
    {
      text: '框架',
      items: [
        {
          text: 'Vue',
          link: '/posts/growth-record/frame/vue/',
        },
        {
          text: 'React',
          link: '/posts/growth-record/frame/react/',
        },
        {
          text: 'Node',
          link: '/posts/growth-record/frame/node/',
        },
      ],
    },
    {
      text: '工程化',
      items: [
        {
          text: '现代化构建',
          link: '/posts/growth-record/engineering/tools',
        },
        {
          text: '性能优化',
          link: '/posts/growth-record/engineering/performance/',
        },
      ],
    },
    {
      text: '计算机基础',
      items: [
        {
          text: '数据结构与算法',
          link: '/posts/growth-record/computer/algorithm/',
        },
        {
          text: '计算机网络',
          link: '/posts/growth-record/computer/network/',
        },
        {
          text: '浏览器',
          link: '/posts/growth-record/computer/browser/',
        },
      ],
    },
    {
      text: '跨平台',
      items: [
        {
          text: '小程序',
          link: '/posts/growth-record/platform/applet/',
        },
        {
          text: 'App',
          link: '/posts/growth-record/platform/app/',
        },
        {
          text: 'H5',
          link: '/posts/growth-record/platform/h5/',
        },
      ],
    },
    {
      text: '其他',
      items: [
        {
          text: '软技能',
          link: '/posts/growth-record/other/softSkills/',
        },
        {
          text: '产品业务',
          link: '/posts/growth-record/other/productBusiness/',
        },
        {
          text: 'UI 设计交互',
          link: '/posts/growth-record/other/design/',
        },
      ],
    },
  ] },
  { text: '前端导航', link: '/posts/navigator/' },
  { text: '工具指南', link: '/posts/tools/' },
  { text: '朝花夕拾', link: '/posts/read-book/' },
  { text: '夜航西飞', link: '/posts/random-thought/' },
  { text: '关于作者', link: '/posts/about/' },
]
