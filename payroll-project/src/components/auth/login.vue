<template>

  <div class="column items-center">
    
 <q-form class="q-pa-md q-mt-md bg-white" style="width:400px">
      <q-card class="q-pa-md shadow-2 my_card" bordered>
        <div>
      
      <h4 class="text-center text-weight-bold text-black">LOGIN</h4>
      <q-input outlined label="Email" v-model="auth.email" />
      <q-input outlined label="Password" v-model="auth.password" />
      
      </div>
      
      <div class="full-width q-my-md column q-gutter-sm">
        <q-checkbox v-model="check" label="Remember Me"></q-checkbox>
        <div class="">
      <q-btn :label=" authSucess? 'Success':'LOGIN'"  class="full-width"
      :color="authSucess?'green':'primary'" @click="login" :disabled="authInProgress||authSuccess"
      :loading="authInProgress"></q-btn>
    </div>
    </div>
    </q-card>
    </q-form>

  </div>
</template>
<script>


export default {
  data () {
    return {
      auth: {},
      authInProgress: false,
      authSuccess: false
    }
  },
  methods: {
    async login () {
      this.$axios.defaults.headers.common['Authorization'] = null;
      this.authInProgress = true
      let httpRequest
      try {
        httpRequest = await this.$api.post('/auth/login', this.auth)
      } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
          this.$q.dialog({
            message: err?.response?.data?.errors?.[0]?.message
          })
        }
        this.authInProgress = false
        return

      }
      this.authSuccess = true
      this.authInProgress = false
      let access_token = httpRequest.data.data.access_token
      this.$api.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      localStorage.setItem('access_token', access_token)

      this.$mitt.emit('login-successfull')
      setTimeout(() => {
        this.$router.replace('/')
      }, 1000)
  }
}
}


</script>
