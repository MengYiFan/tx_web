<template>
  <div class="add-patient left">
    <div class="weui-cells__title">个人基本信息</div>
    <div class="weui-cells weui-cells_form">
      <!-- 姓名 -->
      <div class="weui-cell"
      :class="{ 'weui-cell_warn': warn.patientName }">
        <div class="weui-cell__hd"><label for="" class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input 
            v-model="data.patientName"
            @blur="blurHandle('patientName')"
            @input="inputHandle('patientName')"
            maxlength="12" class="weui-input" type="text" placeholder="请输入姓名">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!-- 就诊卡 -->
      <div class="weui-cell"
      :class="{ 'weui-cell_warn': warn.medicalCard }">
        <div class="weui-cell__hd"><label for="" class="weui-label">就诊卡</label></div>
        <div class="weui-cell__bd">
          <input 
            v-model="data.medicalCard"
            @blur="blurHandle('medicalCard')"
            @input="inputHandle('medicalCard')"
            maxlength="12" class="weui-input" type="number" 
            pattern="[0-9]*" placeholder="请输入就诊卡号">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!-- 手机号 -->
      <div class="weui-cell"
      :class="{ 'weui-cell_warn': warn.mobileNumber }">
        <div class="weui-cell__hd"><label for="" class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input 
            v-model="data.mobileNumber"
            @blur="blurHandle('mobileNumber')"
            @input="inputHandle('mobileNumber')"
            class="weui-input" type="tel" placeholder="请输入手机号" maxlength="11">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!-- 身份证号码 -->
      <div class="weui-cell"
      :class="{ 'weui-cell_warn': warn.identityCard }">
        <div class="weui-cell__hd"><label for="" class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <input 
            v-model="data.identityCard"
            @blur="blurHandle('identityCard')"
            @input="inputHandle('identityCard')"
            maxlength="18" class="weui-input" type="text" 
            pattern="[0-9Xx]*" value="" placeholder="请输入身份证号">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
    </div>
    <div class="weui-cells "
    :class="{ 'weui-cell_warn': warn.feeType }">
      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">费别</label>
        </div>
        <div class="weui-cell__bd">
          <select 
             v-model="data.feeType"
             @blur="blurHandle('feeType')"
             @change="inputHandle('feeType')"
             class="weui-select" name="select">
            <option disabled value="">请选择</option>
            <option value="1">社保</option>
            <option value="2">自费</option>
          </select>
        </div>
      </div>
    </div>
    <div 
      @click="submit"
      class="weui-btn-area">
      <a :class="canSubmit ? 'weui-btn_primary' : 'weui-btn_disabled'" 
         class="weui-btn" href="javascript:" id="showTooltips">保存</a>
    </div>
    <div id="toast" :style="{ opacity: opacity, display: display}">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-icon-success-no-circle weui-icon_toast"></i>
          <p class="weui-toast__content">成功, 即将跳转.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { requestAnimationFrame } from '../utils/common'
  import { createPatientsInfo } from '../utils/getData'

  export default {
    data() {
      return {
        data: {
          patientName: '',
          medicalCard: '',
          mobileNumber: '',
          identityCard: '',
          feeType: '',
          type: this.$route.query.type || 'ADD'
        },
        warn: {
          patientName: false,
          medicalCard: false,
          mobileNumber: false,
          identityCard: false,
          feeType: false
        },
        canSubmit: false,
        opacity: 0,
        display: 'none'
      }
    },
    methods: {
      ...mapGetters(['getUserId']),
      detection(type) {
        let number = this.data[type]
        if (number == '') {
          this.warn[type] = false
          return 
        }

        switch(type) {
          case 'patientName': {
            if (number.length < 2 || number.length > 12) {
              this.canSubmit = false
              this.warn[type] = true
            } else {
              this.warn[type] = false
            }
            break
          }
          case 'medicalCard': {
            if (number.length < 6 || number.length > 18) {
              this.canSubmit = false
              this.warn[type] = true
            } else {
              this.warn[type] = false
            }
            break
          }
          case 'mobileNumber': {
            if (!/^(1[0-9]{10})$/.test(number)) {
              this.warn[type] = true
              this.canSubmit = false
            } else {
              this.warn[type] = false
            }
            break
          }
          case 'identityCard': {
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(number)) {
              this.warn[type] = true
              this.canSubmit = false
            } else {
              this.warn[type] = false
            }
            break
          }
          default:
            break
        }
        // 检测数据是否都合法
        let flag = true
        for (var k in this.data) {
          if (this.data[k] == '' || this.warn[k] == true) {
            flag = false
            break
          }
        }
        this.canSubmit = flag
      },
      blurHandle(type) {
        this.detection(type)
      },
      inputHandle(type) {
        this.detection(type)
      },
      submit() {
        let self = this
        if (this.canSubmit) {
          let userId = this.getUserId()
          console.log(this.getUserId)
          createPatientsInfo(userId, this.data)
          .then(res => {
            console.log(res)
            if (res.ret) {
              self.display = 'block'
              // 显示toast动画
              let show = () => {
                self.opacity += 0.2
                if(self.opacity < 1) {
                  requestAnimationFrame(show)
                } else {
                  setTimeout(() => {
                    self.$router.push({
                      path: '/patient'
                    })
                  }, 1000)
                }
              }
              show()
            }
          })
        }
      }
    },
    mounted() {      
    }
  }
</script>

<style lang="stylus" scoped>
  .add-patient
    min-height 100vh
    background-color #F4F4F4
</style>