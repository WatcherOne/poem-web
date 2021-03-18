/**
 *  author: watcher
 *  emails: 286154864@qq.com
 *  function: some static data
 *  createdTime: 2021-03-12 14:28
 */

// 主题颜色切换
export const themeArr = ['drak-theme', 'light-theme', 'pink-theme']
// 导航栏
export const siderData = [
  { title: '首页', key: 'home', link: '/home', hasChild: false, children: [] },
  { title: '诗歌列表', key: 'poem', link: '/404', hasChild: false, children: [] },
  { title: '文章列表', key: 'circle', link: '/403', hasChild: false, children: [] },
  { title: '有趣', key: 'playing', link: '/playing', hasChild: false, children: [] },
  {
    title: '我的主页',
    key: 'myself',
    hasChild: true,
    children: [
      { title: '资料信息', key: 'my', link: '/myself/my', hasChild: false, children: [] }
    ]
  },
  {
    title: '测试页面',
    key: 'test',
    hasChild: true,
    children: [
      { title: '测试信息', key: 'detest', link: '/403', hasChild: false, children: [] }
    ]
  }
]
