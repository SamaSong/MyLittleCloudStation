import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/bom-dom',
      name: 'BOM-DOM',
      component: () => import('../components/basic/bom-dom.vue'),
    },
    {
      path: '/event',
      name: 'Event',
      component: () => import('../components/basic/event.vue'),
    },
    {
      path: '/object',
      name: 'Object',
      component: () => import('../components/basic/object.vue'),
    },
    {
      path: '/priority',
      name: 'Priority',
      component: () => import('../components/cssBasic/priority.vue'),
    },
    {
      path: '/trivial',
      name: 'Trivial',
      component: () => import('../components/basic/trivial.vue'),
    },
    {
      path: '/dataStructure',
      name: 'DataStructure',
      component: () => import('../components/agorithmBasic/dataStructure.vue'),
    },
  ],
})

export default router
