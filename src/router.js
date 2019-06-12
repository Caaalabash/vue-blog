import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index.vue'
import BlogBody from '@/components/BlogBody.vue'
import Manage from '@/views/Manage.vue'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    //错误处理 放在后面error会被/:user动态路由匹配到
    {
      name: 'error',
      path: '/error',
      component: () => import('@/views/error.vue'),
      props: true
    },
    //重定向
    {
      path: '/',
      redirect: '/Calabash'
    },
    {
      path: '/:user',
      component: index,
      props: true,
      children: [
        {
          path: '',
          component: BlogBody,
          props: true
        },{
          path: 'articles/:id',
          component: () => import('@/components/BlogArticle.vue'),
          props: true
        }
      ]
    },{
      path: '/:user/manage',
      component: Manage,
      props: true,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          redirect: 'new-idea'
        },
        {
          name: 'new-idea',
          path: 'new-idea',
          component: () => import('@/components/ManageYourIdea.vue'),
          props: ({query, params}) => ({ blogDate: query.blogDate, userName: params.userName })
        },
        {
          name: 'ideas',
          path: 'ideas',
          component: () => import('@/components/ManageIdea.vue')
        }, {
          name: 'setting',
          path: 'setting',
          component: () => import('@/components/ManageSetting.vue')
        }, {
          name: 'pv',
          path: 'pv',
          component: () => import('@/components/ManagePv.vue')
        }, {
          name: 'chat',
          path: 'chat',
          component: () => import('@/components/Chat.vue')
        }, {
          name: 'MaxeanoOnly',
          path: 'MaxeanoOnly',
          component: () => import('@/components/MaxeanoOnly.vue')
        }, {
          name: 'TestMonitor',
          path: 'TestMonitor',
          component: () => import('@/components/TestMonitor.vue')
        }
      ]
    }
  ],
  mode:'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.userName !== to.params.user) {
      next({
        name: 'error',
        params: { type:'权限不足' }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
