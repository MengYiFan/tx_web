<template>
  <div class="list-page">
    <div class="weui-cells__title">选择／添加需要就诊的人员</div>
    <div class="list-items">
      <div
        v-for="item in data.rows" 
        :class="currentPatientOpenid == item.patientOpenid ? 'current-patient' : ''"
        :data-openid="item.patientOpenid" class="list-item">
        <div class="item-info">
          <router-link 
            class="name"
            v-bind:to="'/patient/' + item.patientOpenid + '/info'">
            {{item.patientName}}
            <label
            :class="item.feeType == 1 ? 'fee-type-yb' : ''" 
            class="fee-type">{{item.feeTypeText}}</label>
          </router-link>
          <p class="medical-card">
            就诊卡号：{{item.medicalCard}}
          </p>
        </div>
        <div 
          @click="changeCurrentHandle"
          class="item-flag"
          :data-openid="item.patientOpenid">
          <label v-if="currentPatientOpenid == item.patientOpenid">当前就诊人</label>
        </div>
      </div>
    </div>
    <router-link 
      v-bind:to="'/patient/add'"
      class="weui-btn weui-btn_plain-primary list-add-btn">添加就诊人</router-link>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPatientsList, setCurrentPatient } from '../utils/getData'

  export default {
    data() {
      return {
        currentPatientOpenid: '',
        data: {
          rows: []
        },
        userId: ''
      }
    },
    methods: {
      ...mapGetters(['getUserId']),
      changeCurrentHandle(e) {
        let openid = e.srcElement.getAttribute('data-openid')
        setCurrentPatient(this.userId, openid).then(res => {
          if (res.ret) {
            this.currentPatientOpenid = openid
          } else {
            alert('设置失败了~请稍候再试。')
          }
        })
      }
    },
    mounted() {
      this.userId = this.getUserId()
      getPatientsList(this.userId).then(res => {
        if (res.ret) {
          let data = res.data
          this.data = Object.assign(data)
          this.currentPatientOpenid = data.rows[0].currentPatientOpenid
          this.flag = true
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import '../assets/stylus/fn'
  .list-page
    position relative
    background #F4F4F4
    min-height 100vh
    padding-bottom 30px

  .list-item
    width rem(690)
    height rem(200)
    margin 0 auto rem(20)
    border-radius rem(14)
    display flex
    color #2b2b2b
    border 1px solid #e5e5e5
    background-color #FFF
    
  .list-item:first-child
    margin-top rem(26)
    
  .list-item.current-patient
    color #fff
    background-image linear-gradient(0deg, #4343E8 0%, #164DBA 100%)
  
  .item-info .fee-type-yb.fee-type
    color #164DBA
    background-color rgba(53, 93, 199, 0.1)
    
  .current-patient .fee-type-yb.fee-type
    color #FFF
    background-color #355dc7
    
  .item-info
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
      color #FF8940
      background-color rgba(255, 137, 64, 0.1)
      padding 2px 4px
      border-radius 3px
      vertical-align text-top
    .medical-card
      font-size rem(30)
      margin-top 5px
      opacity .8
      
  .item-flag
    position relative
    width rem(270)
    float right
    padding rem(30) 0 0 0
    &:before
      content ''
      position absolute
      left 0px
      top 0px
      width 100%
      height 100%
      background url('../assets/images/mask2.png') left center no-repeat
      background-size 100% 100%
  
  .current-patient .item-info .name
      color #fff
   .current-patient .item-flag:before
    opacity 0.05

      
  .list-add-btn
    width rem(690)
    background-color #fff
    border-color #e5e5e5
    border-radius rem(14)
</style>