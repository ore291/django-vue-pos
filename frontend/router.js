import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from './components/Dashboard.vue'
// import Products from './components/Products.vue'
import Cashier from './components/Cashier.vue'
// import Categories from './components/Categories.vue'
// import Transactions from './components/Transactions.vue'
// import NotFound from './components/404.vue'


Vue.use(VueRouter)

export default new VueRouter({
mode: 'history',
routes: [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./components/Dashboard.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('./components/Products.vue')
  },
  {
    path: '/pos',
    name: 'pos',
    component: Cashier
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('./components/Categories.vue')
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('./components/Transactions.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('./components/404.vue')
  },
]
})