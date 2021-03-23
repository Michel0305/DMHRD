import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '工作台', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/docbase',
    component: Layout,
    redirect: '/docbase/leave',
    name: 'docbase',
    meta: {
      title: '电子表单',
      icon: 'form'
    },
    children: [
      {
        path: 'leave',//请假单
        component: () => import('@/views/dmleave/index'),
        name: 'leave',
        meta: { title: '请假单', icon: 'skill' }
      },
      {
        path: 'overtime',//加班单
        component: () => import('@/views/dmovertime/index'),
        name: 'overtime',
        meta: { title: '加班单', icon: 'el-icon-guide' }
      },
      {
        path: 'leaveinlieu',//调休单
        component: () => import('@/views/example/list'),
        name: 'leaveinlieu',
        meta: { title: '调休单', icon: 'education' }
      },
      {
        path: 'abnormal ',//补卡单
        component: () => import('@/views/example/list'),
        name: 'abnormal ',
        meta: { title: '补卡单', icon: 'el-icon-tickets' }
      },
      {
        path: 'business ',//出差单
        component: () => import('@/views/example/list'),
        name: 'business ',
        meta: { title: '出差单', icon: 'el-icon-truck' }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人设置', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  //报表管理
  {
    path: '/reports',
    component: Layout,
    redirect: '/reports/page',
    alwaysShow: true, // will always show the root menu
    name: 'reports',
    meta: {
      title: '报表管理',
      icon: 'el-icon-date',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'attendancereport',
        component: () => import('@/views/permission/directive'),
        name: 'attendancereport',
        meta: {
          title: '出勤报表',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'el-icon-document-delete'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'abnormal',
        component: () => import('@/views/permission/directive'),
        name: 'abnormal',
        meta: {
          title: '考勤异常',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'el-icon-document-delete'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'overtimereport',
        component: () => import('@/views/permission/page'),
        name: 'overtimereport',
        meta: {
          title: '加班报表',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'el-icon-tickets'
        }
      },
      {
        path: 'tiemsreport',
        component: () => import('@/views/permission/directive'),
        name: 'tiemsreport',
        meta: {
          title: '休假报表',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'el-icon-document-checked'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  //人事管理
  {
    path: '/personnelfiles',
    component: Layout,
    redirect: '/personnelfiles/personnel',
    alwaysShow: true, // will always show the root menu
    name: 'personnelfiles',
    meta: {
      title: '人事资料',
      icon: 'peoples',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'personnel',
        component: () => import('@/views/dmpersonnel/index'),
        name: 'personnel',
        meta: {
          title: '人员管理',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'people'
        }
      },
      {
        path: 'organization',
        component: () => import('@/views/dmorganizationchart/index'),
        name: 'organization',
        meta: {
          title: '组织架构',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'tree-table'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'department',
        component: () => import('@/views/dmdepartment/index'),
        name: 'department',
        meta: {
          title: '部门管理',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'list'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'tiemstype',
        component: () => import('@/views/dmtimes/index'),
        name: 'tiemstype',
        meta: {
          title: '考勤班次',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'el-icon-coffee-cup'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  //系统设定菜单
  {
    path: '/seeting',
    component: Layout,
    redirect: '/seeting/page',
    alwaysShow: true, // will always show the root menu
    name: 'seeting',
    meta: {
      title: '系统设定',
      icon: 'el-icon-setting',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'purview',
        component: () => import('@/views/permission/page'),
        name: 'purview',
        meta: {
          title: '权限设置',
          roles: ['admin'], // or you can only set roles in sub nav
          icon: 'peoples'
        }
      },
      {
        path: 'formmaintaining',
        component: () => import('@/views/permission/directive'),
        name: 'Formmaintaining',
        meta: {
          title: '表单维护',
          roles: ['admin'],
          icon: 'lock'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'workflow',
        component: () => import('@/views/permission/role'),
        name: 'Workflow',
        meta: {
          title: '流程设定',
          roles: ['admin'],
          icon: 'tree'
        }
      }
    ]
  },


  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
