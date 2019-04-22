import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人信息', icon: 'association-info' }
    }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/corporation',
    component: Layout,
    meta: {
      roles:['ADMIN']
    },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/corporation/index'),
        meta: { title: '社团信息', icon: 'association-info'}
      }
    ]
  },
  {
    path: '/categoryManage',
    component: Layout,
    meta: {
      roles:['SYSADMIN']
    },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/categoryManage'),
        meta: { title: '社团分类', icon: '成员管理'}
      }
    ]
  },
  {
    path: '/collegeManage',
    component: Layout,
    meta: {
      roles:['SYSADMIN']
    },
    children: [
      {
        path: 'collegeManage',
        name: 'collegeManage',
        component: () => import('@/views/classAndCollege/collegeManage'),
        meta: { title: '班级管理', icon: '荣誉列表'}
      }
    ]
  },

  {
    path: '/eventsManage',
    component: Layout,
    meta: {
      roles:['SYSADMIN']
    },
    children: [
      {
        path: 'eventsManage',
        name: 'eventsManage',
        component: () => import('@/views/event/eventManage'),
        meta: { title: '活动管理', icon: '活动-列表'}
      }
    ]
  },

  {
    path: '/corporationManage',
    component: Layout,
    meta: {
      roles:['SYSADMIN']
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/corporation/manage'),
        meta: { title: '社团管理', icon: 'association-info'}
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/member',
    name: 'personManage',
    meta: {
      title: '成员管理',
      icon: '成员管理', 
      roles:['ADMIN']
    },
    children: [
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/person/member/memberList'),
        meta: { title: '成员列表', icon: 'person' }
      }, {
        path: 'apply',
        name: 'memberApply',
        component: () => import('@/views/person/apply/applyList'),
        meta: { title: '成员申请', icon: '申请' }
      }
    ]
  },
  {
    path: '/event',
    component: Layout,
    redirect: '/event/eventList',
    name: 'eventManage',
    meta: {
      title: '活动管理',
      icon: '社团活动',
      roles:['ADMIN']
    },
    children: [
      {
        path: 'eventList',
        name: 'eventList',
        component: () => import('@/views/event/eventList/eventList'),
        meta: { title: '活动列表', icon: '活动-列表' }
      }, {
        path: 'eventApply',
        name: 'eventApply',
        component: () => import('@/views/event/eventApplay/eventApplay'),
        meta: { title: '活动申请', icon: '活动申请' }
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('@/views/event/apply/apply'),
        meta: { title: '评论管理', icon: '评论' }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/financeIn',
    name: 'financeManage',
    meta: {
      title: '财政管理',
      icon: '社团账户',
      roles:['ADMIN']
    },
    children: [
      {
        path: 'finaceIn',
        name: 'finaceIn',
        component: () => import('@/views/finance/financeIn'),
        meta: { title: '入账管理', icon: '收入账单' }
      }, {
        path: 'finaceOut',
        name: 'finaceOut',
        component: () => import('@/views/finance/financeOut'),
        meta: { title: '出帐管理', icon: '支出账单' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/newsList',
    name: 'newsManage',
    meta: {
      title: '新闻管理',
      icon: '新闻',
      roles:['ADMIN']
    },
    children: [
      {
        path: 'newsList',
        name: 'newsList',
        component: () => import('@/views/news/newsList'),
        meta: { title: '新闻列表', icon: '新闻列表' }
      }, {
        path: 'newNews',
        name: 'newNews',
        component: () => import('@/views/news/newNews'),
        meta: { title: '新增新闻', icon: '新增' }
      }
    ]
  },
  // {
  //   path: '/honor',
  //   component: Layout,
  //   redirect: '/honor/honorList',
  //   name: 'honorManage',
  //   meta: {
  //     title: '荣誉管理',
  //     icon: '荣誉',
  //     roles: ['ADMIN']
  //   },
  //   children: [
  //     {
  //       path: 'honorList',
  //       name: 'honorList',
  //       component: () => import('@/views/honor/honorList'),
  //       meta: { title: '荣誉列表', icon: '荣誉列表' }
  //     }, {
  //       path: 'apply',
  //       name: 'honorApply',
  //       component: () => import('@/views/honor/newHonor'),
  //       meta: { title: '新增荣誉', icon: '新增'}
  //     }
  //   ]
  // }
]
