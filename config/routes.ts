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
    component: './XMind',
  },
  {
    path: '/thought',
    name: '随想录',
    hideInMenu: true,
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
    component: './About',
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
        redirect: '/admin/user-profile',
      },
      {
        path: '/admin/user-profile',
        name: '用户信息管理',
        component: './admin/UserProfile',
      },
      {
        path: '/admin/navigation',
        name: '导航站数据管理',
        component: './admin/Navigation',
      },
      {
        path: '/admin/wiki/project',
        name: 'Wiki 数据管理',
        component: './admin/wiki/WikiProject',
      },
      {
        path: '/admin/wiki/document',
        name: 'Wiki 文档管理',
        component: './admin/wiki/WikiDocument',
        hideInMenu: true,
        menuRender: false,
        headerRender: false,
        footerRender: false,
      },
      {
        path: '/admin/xmind/project',
        name: '思维导图管理',
        component: './admin/xmind/XMindProject',
      },
      {
        path: '/admin/xmind/editor',
        name: '思维导图编辑',
        component: './admin/xmind/XMindEditor',
        hideInMenu: true,
        menuRender: false,
        headerRender: false,
        footerRender: false,
      },
      {
        path: '/admin/about',
        name: '关于页数据管理',
        component: './admin/About',
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
