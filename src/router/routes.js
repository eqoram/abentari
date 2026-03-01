const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index-page',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'main/login/',
        name: 'start-login',
        component: () => import('pages/start-login.vue'),
      },
      {
        path: 'main/reset/',
        name: 'start-reset',
        component: () => import('pages/start-login.vue'),
      },
      {
        path: 'main/mfa/',
        name: 'start-mfa',
        component: () => import('pages/start-mfa.vue'),
      },
      {
        path: 'main/login/secret/:psecret?/',
        name: 'start-login-secret',
        component: () => import('pages/start-login.vue'),
      },
      {
        path: 'main/home/',
        name: 'main-home',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/pages/:pageapiname/',
        name: 'main-pages',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/objects/:objectapiname/',
        name: 'main-objects',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/objects/:objectapiname/detail/:pid?/',
        name: 'main-objects-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/history/:objectapiname/',
        name: 'main-history',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/user/mfa-setup/',
        name: 'user-mfa-setup',
        component: () => import('pages/main-page.vue'),
      },
      // setup
      {
        path: 'main/setup/general/',
        name: 'setup-general',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/run/',
        name: 'setup-run',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/history/:objectapiname/',
        name: 'setup-history',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/profiles/',
        name: 'setup-profiles',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/profiles/detail/:pid?/',
        name: 'setup-profiles-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/permissions/detail/:pid?/profile/:pprofileid/',
        name: 'setup-permissions-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/users/',
        name: 'setup-users',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/users/detail/:pid?/',
        name: 'setup-users-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/objects/',
        name: 'setup-objects',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/objects/detail/:pid?/',
        name: 'setup-objects-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/fields/detail/:pid?/object/:pobjectid/',
        name: 'setup-fields-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/cpermissions/',
        name: 'setup-cpermissions',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/cpermissions/detail/:pid?/',
        name: 'setup-cpermissions-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/actions/',
        name: 'setup-actions',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/actions/detail/:pid?/',
        name: 'setup-actions-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/actions/',
        name: 'setup-actions',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/csql/',
        name: 'setup-csql',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/csql/detail/:pid?/',
        name: 'setup-csql-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/pages/',
        name: 'setup-pages',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/pages/detail/:pid?/',
        name: 'setup-pages-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/apps/',
        name: 'setup-apps',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/apps/detail/:pid?/',
        name: 'setup-apps-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/settings/',
        name: 'setup-settings',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/settings/detail/:pid?/',
        name: 'setup-settings-detail',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/retrieve/',
        name: 'setup-retrieve',
        component: () => import('pages/main-page.vue'),
      },
      {
        path: 'main/setup/deploy/',
        name: 'setup-deploy',
        component: () => import('pages/main-page.vue'),
      },
      // guest
      {
        path: 'guest/home/',
        name: 'guest-home',
        component: () => import('pages/guest-page.vue'),
      },
      {
        path: 'guest/pages/:pageapiname/',
        name: 'guest-pages',
        component: () => import('pages/guest-page.vue'),
      },
      {
        path: 'guest/objects/:objectapiname/',
        name: 'guest-objects',
        component: () => import('pages/guest-page.vue'),
      },
      {
        path: 'guest/objects/:objectapiname/detail/:pid?/',
        name: 'guest-objects-detail',
        component: () => import('pages/guest-page.vue'),
      },
      {
        path: 'guest/history/:objectapiname/',
        name: 'guest-history',
        component: () => import('pages/guest-page.vue'),
      },
      /*{
        path: "main/setup/:catchAll(.*)*",
        name: "setup-settings1",
        component: () => import("pages/main-page.vue"),
      },*/
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
