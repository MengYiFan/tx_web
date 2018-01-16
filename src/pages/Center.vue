<template>
  <div class="center-page">
    <div class="current-patient">
      <div class="patient-info">
        <p class="name">
          {{data.patientName}}
          <label
            :class="data.feeType == 1 ? 'fee-type-yb' : ''"
            class="fee-type">{{data.feeTypeText}}</label>
        </p>
        <p class="medical-card">
          就诊卡号：{{data.medicalCard}}
        </p>
        <router-link
          class="switch-patient"
          v-bind:to="'/patient/list'">切换就诊人</router-link>
      </div>
      <div class="patient-qrcode">
        <span class="qrcode-pic">
          <div id="qrcode"></div>
        </span>
        <p
          @click="showQrcodeHandle" 
          class="qrcode-text">点击出示就诊二维码</p>
      </div>
    </div>
    <div class="patient-select">
      <router-link 
        v-bind:to="'/patient/' + data.patientOpenid + '/info'"
        class="weui-cell weui-cell_access patient-personal">
        <div class="weui-cell__bd">
            <p>
              <i class="personal-icon"></i>
              个人信息
            </p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link >
      <router-link 
        v-bind:to="'/patient/' + data.patientOpenid + '/health/record'" 
        class="weui-cell weui-cell_access patient-health">
        <div class="weui-cell__bd">
            <p>
              <i class="health-icon"></i>
              健康档案
            </p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link >
    </div>
    <div 
      :style="{display: showQrcode ? 'block' : 'none'}"
      class="patient-qrcode-container">
      <div class="patient-qrcode-content">
        <p class="patient-qrcode-name">{{data.patientName}}</p>
        <p class="patient-qrcode-medicalCard">就诊卡号：{{data.medicalCard}}</p>
        <div id="patientQrcode"></div>
        <p class="patient-qrcode-txt">出示就诊二维码给医务人员</p>
        <div @click="hiddenQrcodeHandle" class="patient-qrcode-btn">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPatientsCurrent } from '../utils/getData'
  let QRCode = require('../utils/qrcode')

  export default {
    data() {
      return {
        data: {},
        flag: false,
        showQrcode: false
      }
    },
    methods: {
      ...mapGetters(['getUserId']),
      personalHandle() {
        if (this.flag) {
          this.$router.push({
            path: '/patient/' + this.data.openid + '/info'
          })
        }
      },
      showQrcodeHandle() {
        this.showQrcode = true
      },
      hiddenQrcodeHandle() {
        this.showQrcode = false
      }
    },
    mounted() {
      let userId = this.getUserId()
      getPatientsCurrent(userId).then(res => {
        if (res.ret) {
          let data = res.data
          this.data = Object.assign(data)
          this.flag = true
          new QRCode(document.getElementById("qrcode"), res.data.medicalCard)
          new QRCode(document.getElementById("patientQrcode"), res.data.medicalCard)
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/fn'

  .current-patient
    position relative
    display flex
    margin rem(30)
    width rem(690)
    height rem(343.3)
    background-color #fff
    border-radius 7px
    box-sizing border-box
    background-color #2c48cf
    color #fff
  
  .patient-info
    position relative
    padding rem(30) 0 0 rem(30)
    flex 1
    .name
      height rem(50)
      line-height rem(50)
      font-size rem(36)
      font-weight 600
    .fee-type
      font-size rem(22)
      font-weight normal
      margin-left rem(20)
      color #ff8940
      background-color rgba(255,137,64,0.1)
      padding 2px 4px
      border-radius 3px
      vertical-align text-top
    .fee-type.fee-type-yb
      color #fff
      background-color #355dc7
    .medical-card
      font-size rem(30)
      margin-top 5px
      opacity .8
    &:before
      content ''
      position absolute
      left 0px
      top 0px
      width 100%
      height 100%
      opacity 0.05
      background url('../assets/images/Mask.png') left center no-repeat
      background-size 100% 100%
    .switch-patient
      position absolute
      bottom rem(30)
      display block
      width rem(156)
      height rem(48)
      font-size rem(24)
      padding 0 4px
      line-height rem(48)
      text-align center
      border 1px solid #ccc
      color #fff
      border-radius rem(10)
      &:before
        content ''
        display inline-block
        width rem(15)
        height rem(15)
        margin-right rem(8px)
        background url('../assets/images/switch.png') center center no-repeat
        background-size 100% 100%
        vertical-align middle
    
  .patient-qrcode
    width rem(240)
    float right
    padding rem(30) rem(30) 0 0
    .qrcode-pic
      display block
      width rem(240)
      height rem(240)
      border-radius 6px
      background-color #FFF
      #qrcode
        max-width 100%
        padding 3px
        margin 0 auto
    .qrcode-text
      display block
      margin-top rem(13)
      font-size rem(26)
      color #fff
      
  .patient-personal,
  .patient-health
    font-size rem(30)
    color #000
    padding rem(34) rem(30)
  
  .personal-icon
    background url('../assets/images/personal.png') center center no-repeat
 
 .health-icon
    background url('../assets/images/health.png') center center no-repeat
    
  .personal-icon,
  .health-icon
    display inline-block
    width rem(42)
    height rem(42)
    margin-right rem(24)
    background-size 100% 100%
    vertical-align text-bottom
    
  .patient-qrcode-container
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    width 100%
    z-index 999
    background-color #fff
    overflow-y scroll
    padding-bottom 50px
    .patient-qrcode-content
      width rem(506)
      height rem(506)
      margin rem(100) auto 0
    .patient-qrcode-name
      font-size rem(48)
      color #2B2B2B
    .patient-qrcode-medicalCard
      color #888
      font-size rem(30)
      padding-bottom rem(42)
      border-bottom 1px solid #ccc
    #patientQrcode
      width rem(506)
      height rem(506)
      margin rem(50) auto rem(42)
    img
      margin 0 auto
    .patient-qrcode-txt
      width 100%
      text-align center
      color #888
      opacity .8
      font-size rem(30)
    .patient-qrcode-btn
      width rem(360)
      height rem(70)
      line-height rem(70)
      text-align center
      margin rem(74) auto 0
      border 1px solid #E5E5E5
      border-radius 10px
      font-size rem(32)
      color #2b2b2b
      cursor pointer
      &:active
        opacity .8
        border-color #AAA
</style>