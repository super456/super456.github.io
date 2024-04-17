/** 夜航西飞——左侧边栏配置 */
export default function yehangxifeiSidebarGuide() {
  return [
    {
      text: '念念不忘，必有回响',
      collapsed: false,
      items: [
        { text: '我失业了', link: '/2024/lose-job' },
        { text: '逆向生长，保持路上', link: '/2023/stay-on-road' },
        { text: '自我发展规划觉察', link: '/2023/self-planning-awareness' },
        { text: '浅谈职业规划', link: '/2022/career-planning' },
      ],
    },
    {
      text: '好青年 21 天训练营',
      collapsed: true,
      items: [
        { text: '参加 7 期训练营总结', link: '/2023/camp-7-summary' },
        { text: '第十一期训练营茶话会分享', link: '/2023/camp-11th-share' },
        { text: '第十期训练营茶话会分享', link: '/2022/camp-10th-share' },
        { text: '第七期训练营茶话会分享', link: '/2022/camp-7th-share' },
        { text: '第七期训练营总结', link: '/2022/camp-7th-summary' },
      ],
    },
  ]
}
