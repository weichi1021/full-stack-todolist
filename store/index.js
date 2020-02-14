import axios from 'axios'

export const state = () => ({
  menuActive: 'notes',
  tagList: [],
  noteList: [],
  tagMaintainModalVisible: false,
})

export const getters = {
  isTrash: state => (state.menuActive == 'trash'),
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
  setTagMaintainModalVisible (state, payload) {
    state.tagMaintainModalVisible = payload
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
  async queryNoteList({commit, getters}) {
    try{
      const resp = await axios.post('/api/note-list',  {
        action: 'query_note_list',
        data: {
          active: !getters.isTrash
        }
      })
      commit('setNoteList', resp.data);
      // console.log(resp)
    }catch(err){
      // console.log('query_note_list', err)
    }
  },
  async getNoteByTid({commit}, tid) {
    try{
      const resp = await axios.post(`/api/tags/${tid}`)
      commit('setNoteList', resp.data);
      // console.log(resp)
    }catch(err){
      // console.log(`tags ${id}`, err)
    }
  },
  async getNoteListByMenu({dispatch ,state}) {
    console.log(state.menuActive)
    if(/tag/.test(state.menuActive)){
      const tid = state.menuActive.replace('tag-', '')
      await dispatch('getNoteByTid', tid)
    }else{
      await dispatch('queryNoteList')
    }
  }
}
