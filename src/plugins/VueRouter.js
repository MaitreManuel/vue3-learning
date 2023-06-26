import { createRouter, createWebHashHistory } from 'vue-router';

import About from '@Src/routes/About.vue';
import Home from '@Src/routes/Home.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;