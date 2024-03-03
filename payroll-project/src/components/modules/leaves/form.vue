<template>
    <q-form>
        <div class="column">
   
            <div class="text-h6  text-black-3"> leave</div> 
                
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
                <q-input outlined v-model="text" /></div>
            </div> 

      <div>  
        <q-btn class="q-my-sm" label="Submit" color="primary"/>
        <q-btn class="q-my-sm" label="Cancel" color="negative" @click="$router.go(-1)"/> 
    </div>
      </div>     
    </q-form>
   </template>
    <script>
    export default {
    
    }
    </script>