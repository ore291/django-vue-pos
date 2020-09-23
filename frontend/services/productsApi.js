import api from './api.js'

export default {
  async fetchProducts() {
    const response = await api.get(`products/`)
    return response.data
  },
  async addProduct(payload){
    try {
      const response = await api.post(`products/`, payload)
      return response.data
    } catch (err) {
      return err.response.data
    }
        
  }
  
}