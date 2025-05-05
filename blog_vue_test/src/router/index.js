import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/views/TopPage.vue'
import PostView from '@/views/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TopPage,
    meta: {title:"ブログ",description:"トップページ"}
  },
  {
    path: '/blog',
    name: 'blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticleList.vue'),
    meta: {title:"ブログ | ブログ",description:"ブログ"}
  },
  {
    path: '/tech',
    name: 'tech',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TechList.vue'),
    meta: {title:"技術系 | ブログ",description:"ラジオ"}
  },
  {
    path: '/post:id',
    name: 'post',
    component: PostView,
    meta: {title:"投稿",description:"投稿"}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
