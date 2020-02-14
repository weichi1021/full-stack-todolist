import axios from 'axios'

export const state = () => ({
  menuActive: 'notes',
  tagList: [],
  noteList: [],
})

export const getters = {
}

export const mutations = {
  setMenu (state, payload) {
    state.menuActive = payload
  },
  setTagList (state, payload) {
    state.tagList = payload
  },
  setNoteList (state, payload) {
    state.noteList = payload
  },
}

export const actions = {
  async getTagList({commit}){
    try{
      const resp = await axios.get('/api/tags')
      commit('setTagList', resp.data);
    }catch(err){
      // console.log(err)
    }
  },
}
