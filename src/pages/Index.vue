<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getUserId } from '../utils/getData'
  import store from '../store/index'

  export default {
    name: 'Index',
    data() {
      return {
        userId: ''
      }
    },
    methods: {
      ...mapGetters(['getUserId']),
      ...mapActions(['saveUserId'])
    },
    mounted() {
      let self = this
      self.userId = self.getUserId()

      if (!self.userId) {
        getUserId().then((res) => {
          store.state.userId = res.data.userId
          window.localStorage.setItem('userId', res.data.userId)
          this.saveUserId(res.data.userId)
          self.$router.push({
            path: '/patient/add',
            query: {
              type: 'new'
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus">

</style>