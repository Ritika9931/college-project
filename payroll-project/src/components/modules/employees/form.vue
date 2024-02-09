<template>
    <q-form >
               <div class="row">
                   <div class="text-h6">employee details</div>
               </div>
       <q-input label="employee Name"/>
       <div class="q-pa-md">
  
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
  
     
      </div>
       <q-select :option="[{label:'Active', value:'active'},{label:'In-Active', value: 'in_active'}]"></q-select>
       <q-btn class="q-my-lg" label="Submit" color="primary"/>
       <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)"/>
      </q-form>
</template>
<script>
export default {

}
</script>