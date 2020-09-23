import transactionApi from '../../services/transactionApi.js'
import moment from 'moment'


const state = {
  username : null,
  transactions : []
}

const getters = {
  username({username}){
    return username
  },
  transactions ({ transactions }) {
    const choices = {
      'a' : 'Cash',
      'b' : 'Card'
    }
    return transactions.map(
      elem => {
        return { 
          id: elem.id,
          total_price: elem.total_price,
          trans_id : elem.trans_id,
          date: moment(elem.date).format('DD-MMMM-YYYY'), 
          data_source: elem.order_source,
          payMode: choices[elem.payment_mode]
        };
      }
    );
  }
 
}

const actions = {
  async getUserName ({ commit }) {
    return transactionApi.fetchUserName()
    .then(username => {
      commit('setUserName', username)
    })
  },
  async getTransactions ({ commit }){
    return transactionApi.fetchTransactions()
    .then(transactions => {commit('setTransactions', transactions)})
  }
}

const mutations = {
  setUserName (state, username) {
    state.username = username.toUpperCase()
  },
  setTransactions(state, transactions){
    state.transactions = transactions
  }
 
 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}