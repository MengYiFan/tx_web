<template>
  <div class="mi-cells">
    <select-data
    :options="options"
    @changeCanSubmit="changeCanSubmit"
    @rightHandle="rightHandle"></select-data>
  </div>
</template>

<script>
  import { getFieldsArray, alterEmergencyContactRelation, alterPatientRecordDetail } from '../utils/getData'
  import selectData from '../components/selectData'

  export default {
    data() {
      return {
        options: [],
        canSubmit: false,
        type: ''
      }
    },
    components: {
      selectData
    },
    methods: {
      changeCanSubmit(data) {
        this.canSubmit = data
      },
      rightHandle(data) {
        let openid = this.$route.params.openid,
            requestHandle
        switch(this.type) {
          case 'relation': {
            requestHandle = alterEmergencyContactRelation(openid, { emergencyContactRelation: '' + data})
            break
          }
          case 'blood': {
            requestHandle = alterPatientRecordDetail(openid, { bloodType: data }, 'blood')
            break
          }
          case 'smoking': {
            requestHandle = alterPatientRecordDetail(openid, { smokingSituation: data }, 'smoking')
            break
          }
          case 'drinking': {
            requestHandle = alterPatientRecordDetail(openid, { drinkingSituation: data }, 'drinking')
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
      }
    },
    mounted() {
      getFieldsArray().then(res => {
        if (!res) {
          alert('程序没法获得字段数组')
          return
        }
        let typeList = res
        this.type = this.$route.params.type || ''
        this.options = typeList[this.type]
      })
    }
  }
</script>

<style lang="stylus">
</style>