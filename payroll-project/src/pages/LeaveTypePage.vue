<template>
    <q-page class="q-pa-md ">
        <div class="column items-center q-my-md">
            <div class="text-h6  text-black-3"> New leave</div>
            
            <q-card class="q-pa-md q-mt-md" style="width:380px">
                
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="type">Type</label>
                <q-input outlined v-model="text"/></div>
        </div> 
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="cause">Cause</label>
                <q-input outlined v-model="text"/></div>
        </div> 
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="from">From</label>
                <q-input outlined v-model="text" /></div>
            </div> 
            <div class="q-pa-md">
    <div class="q-pb-sm">
      Model: {{ days }}
    </div>

    <q-date v-model="days" multiple />
  </div> 

    
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="to">To</label>
                <q-input outlined v-model="text" /></div>
                  
        </div>
        <q-btn color="primary" label="APPLY" />
        
        </q-card>
    </div>
           
    </q-page>
   </template>
    <script>
    export default {
    
    }
    </script>