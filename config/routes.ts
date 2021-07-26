export default [
  {
    path: '/user',
    layout: false,
    routes: [{ path: '/user', routes: [{ path: '/user/login', component: './user/Login' }] }],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [{ path: '/admin/sub-page', icon: 'smile', component: './Welcome' }],
  },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
