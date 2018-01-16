import * as types from '../types'

const state = {
  userId: ''
}

const getters = {
  getUserId: state => {
    return state.userId
  }
}

const mutations = {
  [types.SAVE_USERID] (state, userId) {
    state.userId = userId
  }
}

const actions = {
  saveUserId ({ commit }, userId) {
    commit(types.SAVE_USERID, userId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
