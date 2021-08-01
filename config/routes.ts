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
    component: './Coming',
  },
  {
    path: '/wiki',
    name: '知识库',
    component: './Coming',
  },
  {
    path: '/xmind',
    name: '思维导图',
    component: './Coming',
  },
  {
    path: '/thought',
    name: '随想录',
    component: './Coming',
  },
  {
    path: '/guestbook',
    name: '留言板',
    component: './Coming',
  },
  {
    path: '/about',
    name: '关于',
    component: './Coming',
  },

  {
    path: '/',
    redirect: '/navigation',
  },
  {
    component: './404',
  },
];
