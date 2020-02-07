import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuActive: 'trash',
}

const getters = {
}

const mutations = {
  setMenu (state, payload) {
    state.menuActive = payload
  },
}

const store = () => new Vuex.Store({
  state,
  getters,
  mutations,
})

export default store;
