<template>
    <q-form>
        <div class="column">
            <div class="text-h6  text-black-3"> New leave</div> 
                
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
        
       <div>
        <q-btn class="q-my-lg" label="Submit" color="primary"/>
        <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)"/> 
    </div>
       
    </div>
           
    </q-form>
   </template>
     <script>
     export default {
     
     }
     </script>