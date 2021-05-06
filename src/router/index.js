import { createRouter, createWebHistory } from 'vue-router'
/* ******************  懒加载路径  ******************** */
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
const NotAuth = () => import(/* webpackChunkName: "403" */ '@/views/403.vue')
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
// 页面
const Index = () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
const Home = () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
const Poem = () => import(/* webpackChunkName: "poem" */ '@/views/poem.vue')
const Play = () => import(/* webpackChunkName: "play" */ '@/views/play.vue')
const My = () => import(/* webpackChunkName: "my" */ '@/views/my.vue')
const myPoem = () => import(/* webpackChunkName: "myPoem" */ '@/views/publish/poem.vue')
const User = () => import(/* webpackChunkName: "user" */ '@/views/user.vue')
const Role = () => import(/* webpackChunkName: "role" */ '@/views/role.vue')

const routes = [
  {
    path: '/',
    name: 'container',
    redirect: '/home',
    component: Index,
    children: [
      { path: '/home', name: 'home', component: Home, meta: { auth: [1] } },
      { path: '/poem', name: 'poem', component: Poem, meta: { auth: [1] } },
      { path: '/playing', name: 'play', component: Play },
      { path: '/myself/my', name: 'my', component: My },
      { path: '/publish/myPoem', name: 'myPoem', component: myPoem },
      { path: '/system/user', name: 'user', component: User },
      { path: '/system/role', name: 'role', component: Role },
      { path: '/403', name: 'notAuth', component: NotAuth },
      { path: '/404', name: 'notFound', component: NotFound }
    ]
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/:pathMatch(.*)', redirect: '/404' }
]

/**
 * createWebHistory: 创建一个routerHistory对象 或 输入 mode: history来切换到history模式
 * createWebHashHistory: 创建一个routerHistory对象 或 输入 mode: hash来切换到hash模式
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')
  // 用户未登录
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.auth) {
    // 权限判断
    const auth = to.meta.auth
    auth.includes(+role) ? next() : next('/403')
  } else {
    next()
  }
})

export default router
