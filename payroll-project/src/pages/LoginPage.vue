<template>
    <q-page class="q-pa-md bg-grey-7">
        <div class="column items-center q-my-md">
            <div class="text-h5 text-bold text-grey-1">Log In</div>
            
            <q-card class="q-pa-md q-mt-md" style="width:380px">
                
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
        <div><q-btn label="Log In" color="blue" rounded></q-btn></div> 
         
    
        </q-card>
    </div>
           
    </q-page>
    </template>
    <script>
    
    
     export default {
     }
  
    </script>