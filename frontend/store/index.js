import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import category from './modules/category'
import cart from './modules/cart'
import transaction from './modules/transaction'
import createPersistedState from 'vuex-persistedstate'

const dataState = createPersistedState({
  paths: ['cart.cart']
})



Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    products : products,
    category : category,
    cart: cart,
    transaction: transaction
  },
  plugins: [dataState]
  
})