<template>
  <div class="select-data mi-cells">
    <ms-dialog
      :dialog="dialog"
      @leftHandle="leftHandle"
      @rightHandle="rightHandle"
      ></ms-dialog>
    <div class="weui-cells weui-cells_radio">
      <label v-for="(item, index) in options"
      class="weui-cell weui-check__label" :for="index">
        <div class="weui-cell__bd">
          <p>{{item}}</p>
        </div>
        <div class="weui-cell__ft">
          <input
            v-model="value"
            :value="index"
            type="radio" class="weui-check ms-input" name="relation" :id="index">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
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
  import msDialog from '../components/dialog'

  export default {
    data() {
      return {
        dialog: {
          title: '是否要保存信息',
          leftBtn: '不保存',
          rightBtn: '保存',
          switch: false
        },
        value: '',
        canSubmit: false,
      }
    },
    props: [
      'options'
    ],
    components: {
      msDialog
    },
    watch: {
      value(newVal, oldVal) {
        if (newVal != '' || newVal == 0) {
          this.canSubmit =  true
        }
      }
    },
    methods: {
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
    }
  }
</script>

<style lang="stylus">
  .select-data
    min-height 100vh
    background-color #f4f4f4
  
  .weui-cells_radio .weui-check:checked + .weui-icon-checked:before
    color #164DBA

</style>