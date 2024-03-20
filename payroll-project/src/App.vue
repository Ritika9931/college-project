<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created () {
    let token = localStorage.getItem('access_token')
    if (token) {
      this.$api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      this.$router.push('/login')
    }
  }
})
</script>
