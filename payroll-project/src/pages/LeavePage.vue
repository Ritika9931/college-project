<template>
    
        <q-page class="q-pa-md bg-grey-2">
        <div class="row items-center q-my-md">
            <div class="text-h5">leave Details</div>
  
        <div class="row q-pa-sm">
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="id">employee_id</label>
                
            </div>
         
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="current">current status</label>
                <q-input outlined v-model="text"/>
            </div>
            
        </div>
        <div class="row q-pa-sm">
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="department">department_id</label>
                <q-input outlined v-model="text"/>
            </div>
         
        </div>
  
     
</div>

    </q-page>
    </template>
    <script>
    export default {
    
    }
    </script>