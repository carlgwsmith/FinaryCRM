import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/DashboardPage.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'clients',
        name: 'ClientList',
        component: () => import('pages/ClientListPage.vue'),
        meta: { title: 'Clients' }
      },
      {
        path: 'clients/:id',
        name: 'ClientDetail',
        component: () => import('pages/ClientDetailPage.vue'),
        meta: { title: 'Client Detail' }
      },
      {
        path: 'clients/create',
        name: 'CreateClient',
        component: () => import('pages/CreateClientPage.vue'),
        meta: { title: 'Create Client' }
      },
      {
        path: 'clients/:id/trades',
        name: 'TradeHistory',
        component: () => import('pages/TradeHistoryPage.vue'),
        meta: { title: 'Trade History' }
      },
      {
        path: 'quick-analysis',
        name: 'QuickAnalysis',
        component: () => import('pages/QuickAnalysisPage.vue'),
        meta: { title: 'Quick Analysis' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/SettingsPage.vue'),
        meta: { title: 'Settings' }
      },
      {
        path: 'support',
        name: 'Support',
        component: () => import('pages/SupportPage.vue'),
        meta: { title: 'Support' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
    meta: { title: 'Login', guest: true }
  },
  // Catch-all 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
