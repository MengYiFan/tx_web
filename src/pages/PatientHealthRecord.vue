<template>
  <div class="health-record mi-cells">
    <div class="weui-cells__title">建立个人健康档案，可提高就诊效率与自我健康管理</div>
    <div class="weui-cells">
      <router-link
        v-bind:to="'/patient/' + openid + '/input/change/height?plcaeholder=身高(cm)&value=' + data.height"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>身高</p>
        </div>
        <div class="weui-cell__ft">{{ data.height || '未填写'}}cm</div>
      </router-link>
      <router-link
        v-bind:to="'/patient/' + openid + '/input/change/weight?plcaeholder=体重(kg)&value=' + data.weight"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>体重</p>
        </div>
        <div class="weui-cell__ft">{{ data.weight || '未填写'}}kg</div>
      </router-link>
      <router-link
        v-bind:to="'/patient/' + openid + '/select/data/change/blood?value=' + data.bloodType"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>血型</p>
        </div>
        <div class="weui-cell__ft">{{ data.bloodTypeText || '未选择'}}</div>
      </router-link>
    </div>
    <div class="weui-cells">
      <router-link
        v-bind:to="'/patient/' + openid + '/select/data/change/smoking?value=' + data.smokingSituation"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>抽烟情况</p>
        </div>
        <div class="weui-cell__ft">{{ data.smokingSituationText || '未选择'}}</div>
      </router-link>
      <router-link
        v-bind:to="'/patient/' + openid + '/select/data/change/drinking?value=' + data.drinkingSituation"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>喝酒情况</p>
        </div>
        <div class="weui-cell__ft">{{ data.drinkingSituationText || '未选择'}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { getPatientRecord } from '../utils/getData'

  export default {
    data() {
      return {
        openid: '',
        data: {}
      }
    },
    methods: {

    },
    mounted() {
      this.openid = this.$route.params.openid
      getPatientRecord(this.openid).then(res => {
        if (res.ret) {
          let data = res.data
          this.data = Object.assign(res.data)
        }
      })
    }
  }
</script>

<style lang="stylus">

</style>