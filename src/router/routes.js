const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/MainPage.vue')
      },
      {
        path: 'scan',
        name: 'scan',
        component: () => import('pages/ScanPage.vue')
      },
      {
        path: 'question/:id',
        name: 'question',
        component: () => import('pages/QuestionPage.vue')
      },
      {
        path: 'questions',
        name: 'questions',
        component: () => import('pages/QuestionListPage.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'newquestion',
        name: 'newquestion',
        component: () => import('pages/NewQuestionPage.vue')
      },
      {
        path: 'report/:id',
        component: () => import('pages/ReportPage.vue')
      },
      {
        path: 'bad-page',
        name: 'badpage',
        props: { messageTitle: true },
        component: () => import('pages/BadPage.vue')
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
