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
  { title: '诗歌列表', key: 'poem', link: '/poem', hasChild: false, children: [] },
  { title: '文章列表', key: 'circle', link: '/403', hasChild: false, children: [] },
  { title: '有趣', key: 'playing', link: '/playing', hasChild: false, children: [] },
  {
    title: '我的主页',
    key: 'myself',
    hasChild: true,
    children: [
      { title: '个人中心', key: 'my', link: '/myself/my', hasChild: false, children: [] }
    ]
  },
  {
    title: '我的发布',
    key: 'publish',
    hasChild: true,
    children: [
      { title: '诗歌发布', key: 'myPoem', link: '/publish/myPoem', hasChild: false, children: [] },
      { title: '文章发布', key: 'publish/circle', link: '/myself/my', hasChild: false, children: [] }
    ]
  },
  {
    title: '管理中心',
    key: 'system',
    hasChild: true,
    children: [
      { title: '用户管理', key: 'user', link: '/system/user', hasChild: false, children: [] },
      { title: '角色管理', key: 'role', link: '/system/role', hasChild: false, children: [] }
    ]
  }
]
