<template>
  <div class="dialog">
    <div
      :class="dialog.switch ? 'dialog-show' : 'dialog-hidden'" 
      class="js_dialog" id="iosDialog">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div
          v-if="dialog.title" 
          class="weui-dialog__hd">
          <strong class="weui-dialog__title">{{dialog.title}}</strong>
        </div>
        <div
          v-if="dialog.content" 
          v-html="dialog.content || ''"
          class="weui-dialog__bd dialog-content"></div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" 
            @click="leftHandle"
            class="weui-dialog__btn weui-dialog__btn_default">{{dialog.leftBtn || '取消'}}</a>
          <a href="javascript:;" 
            @click="rightHandle"
            class="weui-dialog__btn weui-dialog__btn_primary">{{dialog.rightBtn || '确定'}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    props: ['dialog'],
    methods: {
      leftHandle() {
        this.$emit('leftHandle')
      },
      rightHandle() {
        this.$emit('rightHandle')
      }
    }
  }
</script>

<style lang="stylus" scope>
  @import '../assets/stylus/fn'
  #iosDialog
    .weui-dialog__hd
      display flex
      justify-content center
      align-items center
      font-size rem(36)
      color #000
      padding rem(50) 20px  
    .dialog-content
      color #888
      font-size rem(30)
      margin-top rem2(20)
    
  #iosDialog .weui-dialog__btn_primary
    color #164DBA  

  .js_dialog
    transition all .5s
    
  .dialog-hidden
    opacity 0
    display none
  
  .dialog-show
    opacity 1
    display block

</style>