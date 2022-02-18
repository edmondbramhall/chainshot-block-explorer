import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Block from '../views/Block.vue'
import Account from '../views/Account.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/block/:hash',
      name: 'block',
      component: Block
    },
    {
      path: '/account/:hash',
      name: 'account',
      component: Account
    }
  ]
})

export default router
