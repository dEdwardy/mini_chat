import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    users: [],
    onlineUsers: []
  },
  getters: {
    username: state => state.username,
    users: state => state.users,
    onlineUsers: state => state.onlineUsers
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setUsers (state, users) {
      state.users = users
    },
    setOnlineUsers (state, onlineUsers) {
      state.onlineUsers = onlineUsers
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
