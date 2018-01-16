<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { rem } from './utils/rem.js'

export default {
  name: 'MISH',
  mounted() {
    rem()
  }
}
</script>

<style lang="stylus">
  @import './assets/stylus/main'
  #app {
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    
    color #2c3e50
    max-width 100vw
    min-height 100vh
    overflow hidden
    box-sizing border-box
  }
  
  .content-hidden
    opacity 0
    display none
  
  .content-show
    opacity 1
    display block

  .center
    text-align center

  .left
    text-align left

  .right
    text-align right
    
  .mi-cells
    min-height 100vh
    background-color #f4f4f4

  .mi-cells div.weui-cells
    margin-top 0
    border-top solid #f4f4f4 1.17647059em
    
  .weui-cells__title
    margin-top 0
    padding-top .77em

  .weui-btn_primary 
    background-color #164DBA !important

  .weui-btn_primary:active
    background-color #4c78ce !important

  .weui-btn_disabled
    background-color #9bb1dc !important

  .weui-toast
    transition: all .3s;
</style>
