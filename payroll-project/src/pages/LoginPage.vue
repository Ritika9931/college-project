<template>
    <q-page class="q-pa-md bg-grey-2">
        <div class="row items-cente q-my-md">
            <div class="text-h5">login form</div>
            <div><q-btn label="Add" to="/add" color="green" rounded></q-btn></div>
        </div>
        <div class="row q-gutter-md q-my-md">
            <q-card v-if="mode" class="q-pa-md" style="width:360px">
          <router-view/> 
        </q-card>

        <LoginTable class="col"/>
        </div>
    
        
    </q-page>
    </template>
    <script>
    
    import loginTable from 'components/modules/login/table.vue'
  
     export default {
        props: ['mode'],
        components: {loginTable,}
     }
  
    </script>