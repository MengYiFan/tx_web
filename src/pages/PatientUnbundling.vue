<template>
  <div class="unbundling-page">
    <ms-dialog
      :dialog="dialog"
      @leftHandle="leftHandle"
      @changeToptipsSwitch="changeToptipsSwitch"
      @rightHandle="rightHandle($event)"
      ></ms-dialog>
    <ms-toptips
    :toptips="toptips"></ms-toptips>
    <div class="weui-cells__title">为了保障安全性，手机验证通过后才可解绑，解绑后将无法查看之前的就诊记录，请慎重操作</div>
    <div class="weui-cells ">
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
            <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input 
            :value="mobileNumber"
            class="weui-input" disabled readonly
            type="tel" placeholder="请输入手机号">
        </div>
        <div class="weui-cell__ft">
          <button 
            @click="getVerificationCodeHandle"
            class="weui-vcode-btn">
              获取验证码
            </button>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input
            @input="inputHandle($event)" 
            class="weui-input" type="text" maxlength="6" placeholder="请输入验证码">
        </div>
      </div>
    </div>
    <div 
      @click="submit"
      class="weui-btn-area">
      <a :class="canSubmit ? 'weui-btn_primary' : 'weui-btn_disabled'" 
         class="weui-btn" href="javascript:" id="showTooltips">确定解锁</a>
    </div>
  </div>
</template>

<script>
  import msDialog from '../components/dialog'
  import msToptips from '../components/toptips'
  import { getPatientsPhone, patientsUnbundling } from '../utils/getData'

  export default {
    data() {
      return {
        canSubmit: false,
        dialog: {
          title: '操作确认',
          content: '解绑后将无法查看之前的就诊记录<br>请慎重操作',
          leftBtn: '不保存',
          rightBtn: '保存',
          switch: false
        },
        toptips: {
          switch: false,
          content: 'content',
          type: 'error'
        },
        mobileNumber: '',
        verificationCode: '',
        verificationCodeFlag: false,
        openid: ''
      }
    },
    components: {
      msDialog, msToptips
    },
    methods: {
      changeToptipsSwitch(data) {
        this.toptips.switch = data
      },
      getVerificationCodeHandle() {
        if (this.mobileNumber.length == 11 && !this.verificationCodeFlag) {
          this.verificationCodeFlag = true
          setTimeout(() => {          
            this.toptips.switch = true
            this.verificationCode = Math.random().toString(10).substr(2).slice(0, 6)
            this.toptips.content = '验证码: ' + this.verificationCode
          }, 1000)
        }
      },
      leftHandle() {
        this.dialog.switch = false
      },
      rightHandle() {
        patientsUnbundling(this.openid)
        .then(res => {
          if(res.ret) {
            this.$router.push({
              path: '/patient'
            })
          } else {
            this.dialog.switch = false
            alert(res.errMsg || '出错了')
            this.$router.go(-1)
          }
        })
      },
      inputHandle(e) {
        let value = e.target.value
        if (value == this.verificationCode) {
          this.canSubmit = true
        } else {
          this.canSubmit = false
        }
      },
      submit() {
        if (this.canSubmit) {
          this.dialog.switch = true
        }
      }
    },
    mounted() {
      this.openid = this.$route.params.openid
      getPatientsPhone(this.openid)
      .then(res => {
        if (res.ret) {
          this.mobileNumber = res.data.mobileNumber
        } else {
          alert('获得手机号码错误')
        }
      })
    }
  }
</script>

<style lang="stylus">
  .unbundling-page 
    min-height 100vh
    background-color #f4f4f4
    .weui-cells
      margin-top 12px
    .weui-vcode-btn
      color #164DBA
      &:active
        opacity .7

</style>