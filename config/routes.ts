export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/navigation',
    name: '导航站',
    component: './Navigation',
  },
  {
    path: '/wiki',
    name: '知识库',
    component: '@/components/layout/ContentFooterLayout',
  },
  {
    path: '/xmind',
    name: '思维导图',
    component: '@/components/layout/ContentFooterLayout',
  },
  {
    path: '/thought',
    name: '随想录',
    component: '@/components/layout/ContentFooterLayout',
  },
  {
    path: '/guestbook',
    name: '留言板',
    component: '@/components/layout/ContentFooterLayout',
  },
  {
    path: '/about',
    name: '关于',
    component: '@/components/layout/ContentFooterLayout',
  },
  {
    path: '/admin',
    name: '管理后台',
    layout: false,
    hideInMenu: true,
    component: '@/components/layout/AdminSecurityLayout',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/navigation',
      },
      {
        path: '/admin/navigation',
        name: '导航站数据管理',
        component: './admin/Navigation',
      },
    ],
  },
  {
    path: '/',
    redirect: '/navigation',
  },
  {
    component: './404',
  },
];
