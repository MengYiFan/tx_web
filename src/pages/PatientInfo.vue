<template>
  <div class="patient-info">
    <div class="weui-cells__title">个人基本信息</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__ft">{{data.patientName}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>就诊卡</p>
        </div>
        <div class="weui-cell__ft">{{data.medicalCard}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>手机号</p>
        </div>
        <div class="weui-cell__ft">{{this.data.mobileNumber}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>身份证号</p>
        </div>
        <div class="weui-cell__ft">{{data.identityCard}}</div>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>费别</p>
        </div>
        <div class="weui-cell__ft">{{data.feeTypeText}}</div>
      </div>
    </div>
    <div class="weui-cells__title">紧急联系人信息</div>
    <div class="weui-cells">
      <router-link 
        v-bind:to="'/patient/' + openid + '/input/change/contactname?plcaeholder=紧急联系人姓名&value=' + data['emergencyContactName']" 
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>紧急联系人</p>
        </div>
        <div class="weui-cell__ft">{{data.emergencyContactName || '未填写'}}</div>
      </router-link>
      <router-link 
        v-bind:to="'/patient/' + openid + '/select/data/change/relation?value=' + data['emergencyContactRelation']" 
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>关系</p>
        </div>
        <div class="weui-cell__ft">{{data.emergencyContactRelationText || '未选择'}}</div>
      </router-link>
      <router-link 
        v-bind:to="'/patient/' + openid + '/input/change/contactphone?plcaeholder=紧急联系人电话&value=' + data['emergencyContactPhone']"  
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机号</p>
        </div>
        <div class="weui-cell__ft">{{data.emergencyContactPhone || '未填写'}}</div>
      </router-link>
    </div>
    <router-link
      v-show="data.canUnbundling"
      :style="{opacity: data.canUnbundling ? 1 : 0}"
      v-bind:to="'/patient/' + openid + '/unbundling'"
      class="weui-btn patient-info-unbundling">解绑该就诊卡</router-link>
    <div
      class="weui-footer patient-info-footer" v-if="!data.canUnbundling">
      <p 
        @click="clickHandle"
        class="weui-footer__text must-unbundling">点击这里提前解绑</p>
      <p class="weui-footer__text">就诊卡在{{data.overtime}}后可解绑</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPatientInfo } from '../utils/getData'

  export default {
    data() {
      return {
        data: {},
        openid: ''
      }
    },
    methods: {
      clickHandle() {
        this.data.canUnbundling = true
      }
    },
    mounted() {
      let openid = this.$route.params.openid
      this.openid = openid
      getPatientInfo(openid).then(res => {
        if (res.ret) {
          let data = res.data
          this.data = data
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/fn'
  .patient-info
    position relative
    background #F4F4F4
    min-height 100vh
    padding-bottom rem(120)
    box-sizing border-box
    
  .patient-info-footer
    position absolute
    left 0px
    bottom 0px
    width 100%
    padding-bottom rem(30)
    
  .patient-info-unbundling
    background #FFFFFF
    border 1px solid rgba(5, 5, 5, 0.10)
    border-radius rem(10)
    margin rem(30)
    color #F54949
    cursor pointer
    &:active
      background-color #f4f4f4
      
  .must-unbundling
    margin-bottom 6px
    color #F54949
    cursor pointer
</style>