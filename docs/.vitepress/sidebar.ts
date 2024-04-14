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
      collapsed: true,
      items: [
        { text: '第 48 本《我想偶尔停一会儿》', link: '/2024/woxiangouertingyihuier' },
        { text: '第 47 本《牧羊少年奇幻之旅》', link: '/2024/muyangshaonianqihuanzhilu' },
        { text: '第 46 本《悉达多》', link: '/2024/xidaduo' },
        { text: '第 45 本《不再是一个人吃饭啦》', link: '/2024/buzaishiyigerenchifanla' },
        { text: '第 44 本《今天我请客，想请你快乐》', link: '/2024/jintianwoqingke' },
        { text: '第 43 本《胖虎下山》', link: '/2024/panghuxiashan' },
        { text: '第 42 本《程序员的 README》', link: '/2024/chengxuyuandeREADME' },
        { text: '第 41 本《没事，一起都会好起来的》', link: '/2024/meishiyiqidouhuihaoqilaide' },
        { text: '第 40 本《雪中悍刀行》', link: '/2024/xuezhonghandaoxing' },
        { text: '第 39 本《小王子》', link: '/2024/xiaowangzi' },
        { text: '第 38 本《憋说话，吻我》', link: '/2024/bieshuohuawenwo' },
        { text: '第 37 本《半小时漫画中国史 0》', link: '/2024/banxiaoshimanhuazhongguoshi0' },
        { text: '第 36 本《第一次活，请多指教》', link: '/2024/diyicihuoqingduozhijiao' },
        { text: '第 35 本《我在北京送快递》', link: '/2024/wozaibeijingsongkuaidi' },
      ],
    },
    {
      text: '2023 年',
      collapsed: false,
      items: [
        { text: '第 34 本《人间值得》', link: '/2023/renjianzhide' },
        { text: '第 33 本《快乐一天是一天》', link: '/2023/kuaileyitianshiyitian' },
        { text: '第 32 本《带壳的牡蛎是大人的心脏》', link: '/2023/daikedemulishidarendexinzang' },
        { text: '第 31 本《就是想看你笑的样子》', link: '/2023/jiushixiangkannixiaodeyangzi' },
        { text: '第 30 本《成功的聪明人太多了，我必须为笨蛋争口气》', link: '/2023/chenggongdecongmingrentaiduole' },
        { text: '第 29 本《这里是中国》', link: '/2023/zhelishizhongguo' },
        { text: '第 28 本《循序渐进 Vue.js 3 前端开发》', link: '/2023/xunxujianjinVue3' },
        { text: '第 27 本《啊呜一口，吃掉烦恼》', link: '/2023/awuyikou' },
        { text: '第 26 本《给青年的十二封信》', link: '/2023/geiqingniandeshierfengxin' },
        { text: '第 25 本《生活百般滋味，人生需要笑对》', link: '/2023/shenghuobaibanziwei' },
        { text: '第 24 本《Vue.js 设计与实现》', link: '/2023/vueshejiyushixian' },
        { text: '第 23 本《半小时漫画世界名著（全 3 册）》', link: '/2023/banxiaoshimanhuashijiemingzhu' },
        { text: '第 22 本《好诗好在哪里》', link: '/2023/haoshihaozainali' },
        { text: '第 21 本《可复制的沟通力：樊登的 10 堂表达课》', link: '/2023/kefuzhidegoutongli' },
        { text: '第 20 本《半小时漫画中国地理：西藏、青海、云南、贵州》', link: '/2023/banxiaoshimanhuazhongguodili' },
        { text: '第 19 本《这样读书就够了》', link: '/2023/zheyangdushujiugoule' },
        { text: '第 18 本《从你的全世界路过》', link: '/2023/congnidequanshijieluguo' },
        { text: '第 17 本《鲜衣怒马少年时》', link: '/2023/xianyinumashaonianshi' },
        { text: '第 16 本《番茄工作法》', link: '/2023/fanqiegongzuofa' },
        { text: '第 15 本《现代 JavaScript 库开发：原理、技术与实战》', link: '/2023/xiandaiJavaScriptkukaifa' },
        { text: '第 14 本《谁能拒接一只快乐的小狗呢》', link: '/2023/shuinengjujieyizhikuailedexiaogoune' },
        { text: '第 13 本《JavaScript 高级程序设计（第 4 版）》', link: '/2023/javascriptgaojichengxusheji4' },
      ],
    },
    {
      text: '2022 年',
      collapsed: true,
      items: [
        { text: '第 12 本《被讨厌的勇气》', link: '/2022/beitaoyandeyongqi' },
        { text: '第 11 本《福格行为模型》', link: '/2022/fugexingweimoxing' },
        { text: '第 10 本《天堂旅行团》', link: '/2022/tiantanglvxingtuan' },
        { text: '第 9 本《认知驱动》', link: '/2022/renzhiqudong' },
        { text: '第 8 本《能力陷阱》', link: '/2022/nenglixianjing' },
        { text: '第 7 本《蛤蟆先生去看心理医生》', link: '/2022/hamaxianshengkanxingliyisheng' },
        { text: '第 6 本《男孩、鼹鼠、狐狸和马》', link: '/2022/nanhaiyanshuhulihema' },
        { text: '第 5 本《漫画科普：比知识有趣的冷知识（1-3 册）》', link: '/2022/manhuakepu' },
        { text: '第 4 本《跃迁：成为高手的技术》', link: '/2022/yueqian' },
        { text: '第 3 本《认知觉醒》', link: '/2022/renzhijuexing' },
        { text: '第 2 本《JavaScript DOM 编程艺术（第二版）》', link: '/2022/javascriptdom2' },
        { text: '第 1 本《遇见你真好》', link: '/2022/yujiannizhenhao' },
      ],
    },
  ]
}

export default {
  '/posts/growth-record/': { base: '/posts/growth-record/base/html/', items: sidebarGuide() },
  '/posts/read-book/': { base: '/posts/read-book/', items: zhaohuaxishiSidebarGuide() },
}
