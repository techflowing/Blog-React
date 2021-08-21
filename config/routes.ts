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
    routes: [
      {
        path: '/wiki',
        redirect: '/wiki/list',
      },
      {
        path: '/wiki/list',
        component: './wiki/WikiProject',
      },
      {
        path: '/wiki/detail',
        component: './wiki/WikiDocument',
      },
    ],
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
    component: './GuestBook',
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
      {
        path: '/admin/wiki',
        name: 'Wiki 数据管理',
        component: './admin/Wiki',
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
