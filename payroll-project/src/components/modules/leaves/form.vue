<template>
    <q-form ref="form" class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
        <div class="column">
   
            <div class="text-h6  text-black-3"> leave</div> 
                
        <div class="column q-gutter-sm">
           
                
                <q-select outlined label="Employee Id" v-model="formData.employee_id"/>
                <q-select outlined label="Leave Type Id" v-model="formData.leave_type_Id"/>
                <q-select outlined label="Department Id" v-model="formData.department_Id"/>
                <q-input outlined label="Apply Date" v-model="formData.apply_data" type="date"/>
                
                <q-select outlined label="Status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
              
                </div>
            </div> 
            <div ref="div" class="row-q-gutter-sm">
        <q-btn class="q-my-sm" label="Submit" color="primary" @click="submit" v-if="mode ==='add'" />
        <q-btn label="Update" color="amber"unelevated @click="updatedForm" :loading="formSubmitting"
     :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
        <q-btn class="q-my-sm" label="Cancel" color="negative" @click="$router.go(-1)"/> 
  
            </div>  
    </q-form>
   </template>
  <script>
  import { useQuasar } from 'quasar'
  export default {
    name: 'Leave',
    props:['mode','id'],
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
          this.$mitt.emit('module-data-changed:leaves')
          this.$router.go(-1)
        }).onCancel(() => {
          // console.log('Cancel')
        })
  
      }
    }
  }
  </script>