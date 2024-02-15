<template>
    <q-page class="q-pa-md ">
        <div class="column items-center q-my-md">
            <div class="text-h6  text-black-3"> leave</div>
            
            <q-card class="q-pa-md q-mt-md" style="width:380px">
                
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="employee">Employee Id</label>
                <q-input outlined v-model="text"/></div>
        </div> 
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="Designation">Designation Id</label>
                <q-input outlined v-model="text"/></div>
        </div> 
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="Apply">Apply Date</label>
                <q-input outlined v-model="text" /></div>
            </div> 
  

    
        <div class="row q-pa-sm">
            <div class="coloumn col" style="margin-right: 20px;" >
                <label for="status">Current Status</label>
            </div>
                <q-select outlined :option="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"></q-select>
                  
        </div>
        <q-btn class="q-my-lg" label="Submit" color="primary"/>
        <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)"/> 

     
        
        </q-card>
    </div>
           
    </q-page>
   </template>
    <script>
    export default {
    
    }
    </script>