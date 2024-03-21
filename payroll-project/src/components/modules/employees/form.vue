<template>
  <q-form>
    <div class="column">
      <div class="text-h6">Employee details</div>

      <div class="column q-gutter-sm">
  
        <q-input outlined label="First Name" v-model="formData.name" />
      
        <q-input outlined label="Middle Name" v-model="formData.Middle_name" />
      
        <q-input outlined label="Last Name" v-model="formData.last_Name" />

        <q-input outlined label="Gender" v-model="formData.Gender" />
   
        <q-input outlined label="contact" v-model="formData.contact" />
     
        <q-input outlined label="Email" v-model="formData.email" />

      <q-input outlined label="State" v-model="formData.state" />

      <q-input outlined label="PAN Number" v-model="formData.pan_number" />
      <q-input outlined label="Address" v-model="formData.Address" type="textarea"/>
    
    <q-input outlined label="Adhar Number" v-model="formData.adhar_number" />
   
      <q-select outlined label="Designation" :options="designation.options" option-value="id" use-input
        :option-label="option => `${option.name} (${option.department_id.name})`" map-options emit-value 
        v-model="formData.designation_id" @filter="filterDesignations">
        <template v-slot:option="props">
          <q-item clickable v-bind="props.itemProps">
            <div class="column">
              <div><span class="text-bold">Designation : </span>{{ props.opt.name }}</div>
              <div><span class="text-bold">Department : </span>{{ props.opt.department_id.name }}</div>
            </div>

          </q-item>
        </template>

      </q-select>
    
    </div>
     

  
    <q-select outlined label="Status" emit-value :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
      v-model="formData.status"></q-select>
      </div>
  
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "EmployeeDetails",
  data () {
    return {
      formData: {},
      designation: {
        searchText: '',
        option: [],
        loading: false,
        error: false
      }
    }
  },

  methods: {
    async filterDesignations (inputValue, doneFn, abortFn) {
      this.designation.searchText = inputValue
      await this.fetchDesignations()
      doneFn()
      console.log(inputValue)
    },
    async fetchDesignations () {
      this.designation.loading = true
      try {
        this.designation.loadingAttempt++
        let params = {
          fields: [
            '*',
            'department_id.*'
          ]
        }
        if (this.designation.searchText) {
          params.filter = {
            name: {
              _contains: this.designation.searchText
            }
          }
        }
        let httpClient = await this.$api.get('/items/designations', { params })
        this.designation.loadingAttempt = 0
        this.designation.error = false
        this.designation.options = httpClient?.data?.data
      } catch (err) {
        if (this.designation.loadingAttempt <= 5) {
          // this.designation.error = 'Please wait loading options'
          setTimeout(this.fetchSkillOptions, 1000)

        } else {
          this.designation.error = 'Failed to load options'

        }

      }
      if (!!!this.designation.error || (!!this.designation.error && this.designation.loadingAttempt > 5)) {
        this.designation.loading = false
      }


    },
    async submit () {
      let httpClient = await this.$api.post('/items/employees', this.formData)

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
  },
  created () {
    this.fetchDesignations()
  }


}
</script>
