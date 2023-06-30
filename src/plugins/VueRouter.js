import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@Src/routes/Home.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: () => import('@Src/routes/About.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;