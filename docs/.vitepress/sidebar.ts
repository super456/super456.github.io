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
        { text: '第 39 本《牧羊少年奇幻之旅》', link: '/2024/39th' },
        { text: '第 38 本《悉达多》', link: '/2024/38th' },
        { text: '第 37 本《不再是一个人吃饭啦》', link: '/2024/37th' },
        { text: '第 36 本《今天我请客，想请你快乐》', link: '/2024/36th' },
        { text: '第 35 本《胖虎下山》', link: '/2024/35th' },
        { text: '第 34 本《程序员的 README》', link: '/2024/34th' },
        { text: '第 33 本《没事，一起都会好起来的》', link: '/2024/33th' },
        { text: '第 32 本《雪中悍刀行》', link: '/2024/32th' },
        { text: '第 31 本《小王子》', link: '/2024/31th' },
        { text: '第 30 本《憋说话，吻我》', link: '/2024/30th' },
        { text: '第 29 本《半小时漫画中国史 0》', link: '/2024/29th' },
        { text: '第 28 本《第一次活，请多指教》', link: '/2024/28th' },
        { text: '第 27 本《我在北京送快递》', link: '/2024/27th' },
      ],
    },
  ]
}

export default {
  '/posts/growth-record/': { base: '/posts/growth-record/base/html/', items: sidebarGuide() },
  '/posts/read-book/': { base: '/posts/read-book/', items: zhaohuaxishiSidebarGuide() },
}
