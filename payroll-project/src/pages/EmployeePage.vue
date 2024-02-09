<template>
    
        <q-page class="q-pa-md bg-grey-2">
        <div class="row items-center q-my-md">
            <div class="text-h5">Employee Details</div>
  
        <div class="row q-pa-sm">
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="Name">FirstName</label>
                <q-input outlined v-model="text"/>
            </div>
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="Name">MiddleName</label>
                <q-input outlined v-model="text"/>
            </div>
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="Name">LastName</label>
                <q-input outlined v-model="text"/>
            </div>

        </div>
        <div class="row q-pa-sm">
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="number">contact</label>
                <q-input outlined v-model="text"/>
            </div>
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="email">email</label>
                <q-input outlined v-model="text"/>
            </div>
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="state">state</label>
                <q-input outlined v-model="text"/>
            </div>

        </div>
        <div class="row  q-pa-sm">
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="PAN">PAN Number</label>
                <q-input outlined v-model="text"/>
            </div>
            <div class="col-12 col-md-3 q-ma-sm" >
                <label for="Adhar">Adhar Number</label>
                <q-input outlined v-model="text"/>
            </div>
          
        </div>
        <div><q-btn label="Add" to="/add" color="green" rounded></q-btn></div>
        <div class="row q-gutter-md q-my-md">
            <q-card v-if="mode" class="q-pa-md" style="width:360px">
          <router-view/> 
        </q-card>
        
        <EmployeeTable class="col"/>
        </div>
  
     
      </div>
    </q-page>
    </template>
   
<script>
   import EmployeeTable from 'components/modules/employees/table.vue'
export default {
    props: ['mode'],
        components: {EmployeeTable,}

}
</script>