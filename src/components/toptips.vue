<template>
  <div
    :style="{transform: toptips.switch ? 'translateY(0)' : 'translateY(-30px)'}" 
    :class="'toptips-' + (toptips.type || 'base')"
    class="toptips weui-toptips">
      {{toptips.content}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        setTim: ''
      }
    },
    props: ['toptips'],
    watch: {
      toptips(newVal, oldVal) {
        if (newVal.switch) {
          clearTimeout(this.setTim)
          this.setTim = setTimeout(() => {
            this.toptips.switch = false
            this.$emit('changeToptipsSwitch', false)
          }, this.toptips.overtime || 10000)
        }
      }
    },
    mounted() {
      clearTimeout(this.setTim)
      this.setTim = setTimeout(() => {
        this.toptips.switch = false
        this.$emit('changeToptipsSwitch', false)
      }, this.toptips.overtime || 10000)
    }
  }
</script>

<style lang="stylus" scope>
  @import '../assets/stylus/fn'
  div.toptips
    transition all .5s
    display block
    padding 0
    height 30px
    line-height 30px
    font-weight bold

  .toptips-base
    background-color rgba(22, 77, 186, .85)
  
  .toptips-warn
    background-color rgba(230, 172, 64, .85)
    
  .toptips-error
    background-color #E64340
</style>