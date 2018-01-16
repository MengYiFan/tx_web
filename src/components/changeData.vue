<template>
  <div class="emergency-contact-phone mi-cells">
    <ms-dialog
      :dialog="dialog"
      @leftHandle="leftHandle"
      @rightHandle="rightHandle($event)"
      ></ms-dialog>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd ms-input">
          <i 
            :class="closeFlag ? 'content-show' : 'content-hidden'"
            @click="closeHandle"
            class="close"></i>
          <input
            v-model="value"
            @input="inputHandle($event)"
            class="weui-input" type="tel" 
            :placeholder="plcaeholderValue || '请输入'" maxlength="11">
        </div>
      </div>
    </div>
    <div 
      @click="submit"
      class="weui-btn-area">
      <a :class="canSubmit ? 'weui-btn_primary' : 'weui-btn_disabled'" 
         class="weui-btn" href="javascript:" id="showTooltips">保存</a>
    </div>
  </div>
</template>

<script>
  import { alterEmergencyContactPhone } from '../utils/getData'
  import msDialog from './dialog'

  export default {
    data() {
      return {
        value: '',
        dialog: {
          title: '是否要保存信息',
          leftBtn: '不保存',
          rightBtn: '保存',
          switch: false
        },
        closeFlag: true
      }
    },
    watch: {
      canSubmit(newVal, oldVal) {
        // console.log(newVal, oldVal)
      }
    },
    components: {
      msDialog
    },
    props: [
      'canSubmit', 'plcaeholderValue'
    ],
    methods: {
      closeHandle() {
        this.value = ''
        this.canSubmit = this.closeFlag = false
        this.$emit('changeCanSubmit', false)
        document.querySelector('.weui-input').focus()
      },
      inputHandle(e) {
        this.closeFlag = e.target.value ? true : false
        this.$emit('inputHandle', e.target.value)
      },
      leftHandle() {
        this.dialog.switch = false
      },
      rightHandle() {
        this.$emit('rightHandle', this.value)
      },
      submit() {
        if (this.canSubmit) {
          this.dialog.switch = true
        }
      }
    },
    mounted() {
      this.value = this.$route.query.value || ''
      this.closeFlag = this.value ? true : false
      document.querySelector('.weui-input').focus()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/fn'

  .ms-input
    position relative
    .close
      content ''
      position absolute
      right 0px
      top 50%
      margin-top rem2(12.5)
      background url('../assets/images/close.png') left center no-repeat
      background-size 100% 100%
      display block
      width rem(25)
      height rem(25)
      transition all .5s
</style>