<template>
  <div class="patient-height">
    <change-data
    @inputHandle="inputHandle"
    @rightHandle="rightHandle"
    @changeCanSubmit="changeCanSubmit"
    :canSubmit="canSubmit"
    :plcaeholderValue="plcaeholderValue"></change-data>
  </div>
</template>

<script>
  import changeData from '../components/changeData'
  import { alterEmergencyContactName, alterEmergencyContactPhone, alterPatientRecordDetail } from '../utils/getData'

  export default {
    data() {
      return {
        canSubmit: false,
        type: '',
        plcaeholderValue: '请输入'
      }
    },
    components: {
      changeData
    },
    methods: {
      changeCanSubmit(data) {
        this.canSubmit = data
      },
      rightHandle(data) {
        let openid = this.$route.params.openid,
            requestHandle
        switch(this.type) {
          case 'contactname': {
            requestHandle = alterEmergencyContactName(openid, { emergencyContactName: data })
            break
          }
          case 'contactphone': {
            requestHandle = alterEmergencyContactPhone(openid, { emergencyContactPhone: data })
            break
          }
          case 'height': {
            requestHandle = alterPatientRecordDetail(openid, { height: data }, 'height')
            break
          }
          case 'weight': {
            requestHandle = alterPatientRecordDetail(openid, { weight: data }, 'weight')
            break
          }
          default: {
            alert('出错了')
            return
          }
        }
        requestHandle.then(res => {
          console.log(res)
          if (res.ret) {
            this.$router.go(-1)
          }
        })
      },
      inputHandle(data) {
        switch(this.type) {
          case 'height':
          case 'weight' : {
            let length = data.length
            if (data == '' || length < 2) {
              this.canSubmit = false
            } else {
              this.canSubmit = true
            }
            break
          }
          case 'contactname': {
            let length = data.length
            if (data == '' || length < 2 || length > 10) {
              this.canSubmit = false
            } else {
              this.canSubmit = true
            }
            break
          }
          case 'contactphone': {
            if (data == '' || !/^(1[0-9]{10})$/.test(data)) {// 紧急联系人电话号码的规则
              this.canSubmit = false
            } else {
              this.canSubmit = true
            }
            break
          }
        }
      }
    },
    mounted() {
      this.type = this.$route.params.type || ''
      this.plcaeholderValue += this.$route.query.plcaeholder || ''
      document.querySelector('.weui-input').focus()
    }
  }
</script>

<style lang="stylus">  
</style>