let cart = localStorage.getItem('vuex')

const state = {
  cart: cart ? JSON.parse(cart) : []
}

const getters = {
  cartIds: state => {
    return state.cart
  },
  productsList:(state, getters,  rootState, rootGetters) => {
    return rootGetters['products/products']
  },
  cartItemsTotal({cart}, getters) {
    return cart.map(({ id, quantity }) => {
      var product = getters.productsList.find((p) => p.id === id);
      return {
        price: product.price,
        quantity,
      };
    });
  },
}


const actions = {
    removeFromCart: ({commit}, product) => {
      commit('removeFromCart', product)
      
    },
    changeQuantity: ({commit}, index) =>{
      commit('changeQuantity', index)
    },
    addToCart({ commit }, product){
        commit('addToCart', {
          id: product
        })
     },
    clearCart: ({commit}) => {
      commit('clearCart')
    }
   
} 

const mutations = {
  addToCart (state, id) {
    const record = state.cart.find(p => p.id === id.id)
        if (!record) {
                state.cart.push({
                'id': id.id,
                quantity: 1
                })
            } else {
                record.quantity++
            }
            
     },
  removeFromCart (state, product){
    if (product > -1){
      state.cart.splice(product, 1);
    }
  },
  changeQuantity (state, index){
    const record = state.cart.find(p => p.id === index.index)
    if (record){
      record.quantity = index.quantity
    }
  },
  clearCart (state){
    state.cart = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}