import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, { token, user} ){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://192.168.2.52:8080/api/v1/users/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.data.tokens
            const user = resp.data.data.user
            localStorage.setItem('token', token.token)
            axios.defaults.headers.common['Authorization'] = token.token
            commit('auth_success', { token, user })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    eligibilities({commit}, params) {
      console.log('called');
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    exams({commit}) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://192.168.2.52:8080/api/v1/exams', method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })

      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})