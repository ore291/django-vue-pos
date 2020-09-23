import categoryApi from '../../services/categoryApi.js'


const state = {
  categories: []
}

const getters = {
  categoriesList: state => {
    return state.categories
  }
}

const actions = {
  async getCategories ({ commit }) {
    return categoryApi.fetchCategories()
      .then(categories => {
        commit('setCategories', categories)
      })
  },
  async addCategories ({dispatch}, payload){
    try {
      console.log(payload)
      const res = await categoryApi.addCategories(payload)
      return res
    
    } catch (error) {
      console.log(error)
    }
    
  }
}

const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}