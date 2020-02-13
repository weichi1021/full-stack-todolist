export const state = () => ({
  menuActive: 'notes',
  tagList: [],
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
}
