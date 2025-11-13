import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bom-dom',
      name: 'BOM-DOM',
      component: () => import('../components/basic/bom-dom.vue'),
    },
    {
      path: '/priority',
      name: 'Priority',
      component: () => import('../components/cssBasic/priority.vue'),
    },

  ],
})

export default router
