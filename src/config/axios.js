import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { createNonce } from '../utils/common'
// axios 配置
axios.defaults.timeout = 5000

// http request 拦截器
axios.interceptors.request.use(
  function(config) {
    if (config.method.toUpperCase() == 'POST') {
      // 给 POST方法加上时间戳和噪音
      config.data = Object.assign(config.data, {
        timestamp: +new Date(),
        nonce: createNonce()
      })
    }
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response.data
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default axios