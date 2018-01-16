// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import vuex from 'vuex'
import store from './store'

import VueRouter from 'vue-router'

import Weui from 'weui'
import Axios from './config/axios';

Vue.use(Weui)
Vue.use(vuex)

// Object.definePrototype(Vue.prototype, '$axios', { value: Axios })
Vue.prototype.$axios = Axios

Vue.config.productionTip = false
Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

