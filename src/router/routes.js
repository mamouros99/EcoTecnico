const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MainPage.vue')
      },
      {
        path: 'scan',
        component: () => import('pages/ScanPage.vue')
      },
      {
        path: 'report/:id',
        component: () => import('pages/ReportPage.vue')
      },
      {
        path: 'bad-scan',
        component: () => import('pages/BadScanPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
