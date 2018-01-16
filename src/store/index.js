import Vue from 'vue'
import Vuex from 'vuex'

import info from './modules/info'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    info
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
  // plugins: middlewares
})
