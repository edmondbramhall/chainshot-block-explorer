import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Block from '../views/Block.vue'
import Account from '../views/Account.vue'
import Transaction from '../views/Transaction.vue'

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
    },
    {
      path: '/transaction/:hash',
      name: 'transaction',
      component: Transaction
    }
  ]
})

export default router
