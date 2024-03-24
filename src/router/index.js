import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/UserHome.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/user',
    component: () => import('../views/frontend/UserLayout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/frontend/UserProducts.vue'),
      },
      {
        path: 'products/:id',
        component: () => import('../views/frontend/UserProduct.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/UserAbout.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/backend/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/AdminOrders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
