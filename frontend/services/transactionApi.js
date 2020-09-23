import api from './api.js'

export default {
  async fetchUserName() {
    const response = await api.get(`user-auth/`)
    return response.data
  },
  async fetchTransactions(){
    const response = await api.get(`transactions/`)
    return response.data
  }
  
}