<template>
    
    <div class="column items-center q-my-md">
            <div class="text-h5 text-bold text-black">Log In</div>
            
            <q-card class="q-pa-md q-mt-md bg-white" style="width:400px">
                
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="email">Email Id</label> 
                <q-input outlined v-model="text" Placeholder="e.g.riti123@gmail.com"/></div>
        </div>  
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="password">Password</label>
                <q-input outlined v-model="text" Placeholder="e.g.23@3$"/></div>
        </div>  
        <div><q-btn label="Log In" color="blue" rounded @click="login"></q-btn></div> 
         
    
        </q-card>
    </div>
           


    </template>
    <script>
    
    
     export default {
        data () {
    return {
      auth: {},
    }
  },
  methods: {
    async login () {
      let httpRequest = await this.$axios.post('https://localhost:8055/auth/login', this.auth)
      console.log(httpRequest)
      let access_token = httpRequest.data.data.access_token
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      localStorage.setItem('access_token', access_token)
    },
    
     }
  
  
    </script>