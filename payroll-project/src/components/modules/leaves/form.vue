<template>
    <q-form ref="form" class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
        <div class="column">
   
            <div class="text-h6  text-black-3"> leave</div> 
                
        <div class="column q-gutter-sm">
           
                <q-select ref="employee_input" outlined label="Employee " :options="employee.options" options-value="id" 
                :options-label="name" map-options emit-value v-model:model="formData.employee_id"></q-select> 
                <q-select outlined label="Leave Type " v-model="formData.leave_type_id"/>
                <q-select outlined label="Department ":options="department.options" options-value="id" 
                :options-label="name" map-options emit-value v-model="formData.department_id"></q-select>
                <q-input outlined label="Apply Date" v-model="formData.apply_date" type="date"
                :rules="[val => !!val || 'Mandatory Field']" :disable="mode === 'edit'"></q-input>
                
                <q-select outlined label="Status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
              
                </div>
            </div> 
            <div ref="div" class="row-q-gutter-sm">
              <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode === 'add'" />
      <q-btn label="Update" color="amber" unelevated @click="updateForm" :loading="formSubmitting"
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
        formData: {},
          employee: {
        options: [],
        loading: false,
        error: false

      },
      department: {
        options: [],
        loading: false,
        error: false

      },
        status: {
        loading: false,
        error: false,
        options: [],
        loadingAttempt: 0
      }
      }
    },
    methods: {
      async fetchEmployees(){
        this.employee.loading = true
        try{
          this.employee.loadingAttempt++
        let httpClient = await this.$api.get('/items/employees')
        this.employee.loadingAttempt = 0
        this.employee.error = false
        this.employee.options = httpClient?.data?.data

        }catch (err)  {  
          if (this.employee.loadingAttempt <= 5) {
          setTimeout(this.fetchEmployees, 1000)

        } else {
          this.employee.error = 'Failed to load options'

        }

        }
        if (!!!this.employee.error || (!!this.employee.error && this.employee.loadingAttempt > 5)) {
        this.employee.loading = false
      }

      },
      
      async fetchDepartments(){
        this.department.loading = true
        try{
          this.department.loadingAttempt++
        let httpClient = await this.$api.get('/items/departments')
        this.departemnt.loadingAttempt = 0
        this.department.error = false
        this.department.options = httpClient?.data?.data

        }catch (err)  {  
          if (this.department.loadingAttempt <= 5) {
          setTimeout(this.fetchDepartmens, 1000)

        } else {
          this.department.error = 'Failed to load options'

        }

        }
        if (!!!this.department.error || (!!this.department.error && this.department.loadingAttempt > 5)) {
        this.department.loading = false
      }

      },
    
      async submitForm () {
        let valid =await this.$refs.form.validate()
        if (!valid){
          return
        }
        this.formSubmitting = true
        try{
          let httpClient = await this.$api.post('/items/leaves', this.formData)
          this.formSubmitting = false
          this.formData = {}
          this.$mitt.emit('module-data-changed:leaves')
          
        this.$q.dialog({
          title: 'Successfull',
          message: 'Data Submitted'
        }).onOk(() => {
          this.$router.go(-1)

        })      
  
      }catch(err){
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Data Submission Failed'
        })
      }
    },
    async updateForm () {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.formSubmitting = true
      try {
        let httpClient = await this.$api.patch('items/leaves/' + this.formData.id, this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:leaves')
        this.$q.dialog({
          message: 'Data Update Successfully'
        })

        this.$refs.employee_input.$el.focus()
      } catch (err) {
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Data Updation Failed'
        })
      }
    },
    async fetchData () {
      let httpClient = await this.$api.get('items/leaves/' + this.id)
      this.formData = httpClient.data.data
    }

  },
  created () {
    this.fetchEmployees()
    this.fetchDepartments()
    if (this.mode === 'edit') {
      this.fetchData()
    }


  }



}
</script>

  
  