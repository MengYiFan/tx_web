/**
 * md5加密数据
 * @data  {[string]} data [description]
 * @return {[string]}      [description]
 */
const crypto = require('crypto')
export const md5 = (data) => {
  return crypto.createHash('md5')
    .update(data, 'utf8')
    .digest('hex')
}

/**
 * 简单通过随机数和时间戳生成nonce
 * @return {[type]} [返回生成的Nonce]
 */
export const createNonce = () => {
  return Math.random().toString(36).substr(2) + (+new Date()).toString(36)
}

export const requestAnimationFrame = (callback) => {
  return  (window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          })(callback)
}