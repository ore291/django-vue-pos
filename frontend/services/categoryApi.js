import api from './api.js'

export default {
  async fetchCategories() {
    const response = await api.get(`categories/`)
    return response.data
  },
  async addCategories(payload){
    try {
      const response = await api.post(`categories/`, {'title': payload })
      return response.data
    } catch (error) {
      return error.response.data
    }
   
  }
  
}