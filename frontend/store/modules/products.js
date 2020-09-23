import productApi from '../../services/productsApi.js'



const state = {
  products: [],
  errors: null
}

const getters = {
  products(state, getters, rootState, rootGetters) {
    return  state.products.map(
      elem => {
        return {         
          id: elem.id,
          description: elem.description,
          price: elem.price,
          quantity: elem.quantity,
          name: elem.name,
          category: rootGetters['category/categoriesList'].find(p => p.id === elem.category).title
        };
        
      }
    );
  },
  errors(state) {
    return state.errors
  }
}

const actions = {
  async getProducts({ commit }) {
    return productApi.fetchProducts()
      .then(products => {
        commit('setProducts', products)
      })
  },
  async addProduct({ }, payload) {
    try {
      const res = await productApi.addProduct(payload);
      return res
    } catch (err) {
      console.log(err.response);
    }

  }
}

const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setErrors(state, errors) {
    state.errors = errors
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}