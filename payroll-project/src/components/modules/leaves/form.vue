<template>
    <q-form>
        <div class="column">
   
            <div class="text-h6  text-black-3"> leave</div> 
                
        <div class="column q-gutter-sm">
           
                
                <q-input outlined label="Employee Id" v-model="formData.employee_id"/>
       
                <q-input outlined label="Designation Id" v-model="formData.Designation_Id"/>
                <q-input outlined label="Apply Date" v-model="formData.apply_data"/>
                
                <q-select outlined label="Status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
              
                </div>
            </div> 
        <q-btn class="q-my-sm" label="Submit" color="primary" @click="submit" />
        
        <q-btn class="q-my-sm" label="Cancel" color="negative" @click="$router.go(-1)"/> 
  
          
    </q-form>
   </template>
  <script>
  import { useQuasar } from 'quasar'
  export default {
    name: 'Leave',
    data () {
      return {
        formData: {}
      }
    },
    methods: {
      async submit () {
        let httpClient = await this.$api.post('/items/leaves', this.formData)
  
        this.$q.dialog({
          title: 'Successfull',
          message: 'Data Submitted'
        }).onOk(() => {
          this.$router.go(-1)
        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          this.$router.go(-1)
        })
  
      }
    }
  }
  </script>