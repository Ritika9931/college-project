<template>
  <q-form ref="form" class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
    <div class="column">
      <div class="text-h6">Department Form</div>
    </div>
    <div class="column q-gutter-sm">
    <q-input ref="name_input" outlined label="Department Name" v-model="formData.name"
    :rules="[val => !!val || 'Mandatory Field']":disable="mode === 'edit'"></q-input>
    <q-select outlined label="Status" v-model="formData.status" emit-value 
    :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]" 
    :loading="status.loading" :error-message="status.error" :error="!!status.error"
    ></q-select>
    </div>
    <div ref="div" class="row-q-gutter-sm">
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode==='add'"/>
    <q-btn label="update" color="amber"unelevated @click="updateForm" :loading="formSubmitting"
     :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </div>
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
  name: 'DepartmentForm',
  props:['mode','id'],
  data () {
    return {
      formData: {},
      status:{
        loading: false,
        error: false,
        options: [],
        loadingAttempt: 0

      }
      
    
    }
  },
  methods: {
    async submitForm () { 
      let valid =await this.$refs.form.validate()
      if(!valid){
        return
      }
      this.formSubmitting = true
      try{
        let httpClient = await this.$api.post('/items/departments', this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:departments')
        this.$router.go(-1)
        this.$q.dialog({
        title: 'Successfull',
      
        
        
   
      })
      this.$ref.name_input.$el.focus()
    } catch (err) {
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Form Submission failed'
        })
      } 
      },
      async updateForm (){
      let valid = await this.$refs.form.validate()
      if (!valid){ 
        return
    }
    this.formSubmitting = true
    try{
      let httpClient = await this.$api.patch('items/departments/' + this.formData.id, this.formData)
      this.formSubmitting = false
      this.formData = {}
      this.$mitt.emit('module-data-changed:departments')
      this.$q.dialog({
        message:'Data Update Successfully'
      })
      
      this.$ref.email_input.$el.focus()
    } catch (err){
      this.formSubmitting =false
      this.$q.dialog({
        message: 'Data Updation Failed'
      })
    }
  },
  async fetchData () {
    let httpClient = await this.$api.get('items/departments/'+this.id)
    this.formData = httpClient.data.data
  }
},
  created () {
    if (this.mode === 'edit') {
      this.fetchData()
    }
  }
}
   
  
</script>
