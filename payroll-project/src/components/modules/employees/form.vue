<template>
  <q-form ref="form" class="q-gutter-md" :class="{ 'bg-amber': mode === 'edit' }">
    <div class="column">
      <div class="text-h6">Employee details</div>

      <div class="column q-gutter-sm">

        <q-input ref="name_input" outlined label="First Name" v-model="formData.name" />

        <q-input outlined label="Middle Name" v-model="formData.middle_name" />

        <q-input outlined label="Last Name" v-model="formData.last_name" />

        <q-input outlined label="Gender" v-model="formData.gender" />

        <q-input outlined label="Contact" v-model="formData.contact" />

        <q-input outlined label="Email" v-model="formData.email" :rules="[val => !!val || 'Mandatory Field']"
          :disable="mode === 'edit'" />

        <q-input outlined label="State" v-model="formData.state" />

        <q-input outlined label="Date Of Birth" v-model="formData.date_of_birth" type="date" />

        <q-input outlined label="Address" v-model="formData.address" type="textarea" />

        <q-input outlined label="Adhar Number" v-model="formData.adhar_number" />
        <div class="column q-gutter-m">

        <q-select outlined label="Designation" :options="designation?.options" option-value="id" use-input
          :option-label="option => `${option.name} (${option.department_id?.name})`" map-options emit-value
          v-model="formData.designation_id" @filter="filterDesignations">
          <template v-slot:option="props">
            <q-item clickable v-bind="props.itemProps">
              <div class="column">
                <div><span class="text-bold">Designation : </span>{{ props?.opt?.name }}</div>
                <div><span class="text-bold">Department : </span>{{ props?.opt?.department_id?.name }}</div>
              </div>

            </q-item>
          </template>

        </q-select>

      </div>


      <q-select outlined label="Status" v-model="formData.status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        :loading="status.loading" :error-message="status.error" :error="!!status.error"></q-select>
      </div>
    </div>

    <div ref="div" class="row q-gutter-sm">
      <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode === 'add'" />
      <q-btn label="Update" color="amber" unelevated @click="updateForm" :loading="formSubmitting"
        :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
      <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
    </div>
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "EmployeeDetails",
  props: ['mode', 'id'],
  data () {
    return {

      formData: {},
      designation: {

        searchText: '',
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
          setTimeout(this.fetchDesignations, 1000)

        } else {
          this.designation.error = 'Failed to load options'

        }

      }
      if (!!!this.designation.error || (!!this.designation.error && this.designation.loadingAttempt > 5)) {
        this.designation.loading = false
      }


    },
    async submitForm () {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.formSubmitting = true
      try {

        let httpClient = await this.$api.post('/items/employees', this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:employees')
        this.$q.dialog({
          title: 'Successfull',
          message: 'Data Submitted'
        }).onOk(() => {
          this.$router.go(-1)
          // console.log(this.$refs)
          // this.$nextTick(
          //   () => {
          //     this.$refs.name_input.$el.focus()
          //   }
          // )

        })




      } catch (err) {
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Form Submission failed'
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
        let httpClient = await this.$api.patch('items/employees/' + this.formData.id, this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:employees')
        this.$q.dialog({
          message: 'Data Update Successfully'
        })

        this.$refs.name_input.$el.focus()
      } catch (err) {
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Data Updation Failed'
        })
      }
    },
    async fetchData () {
      let httpClient = await this.$api.get('items/employees/' + this.id)
      this.formData = httpClient.data.data
    }

  },
  created () {
    this.fetchDesignations()
    if (this.mode === 'edit') {
      this.fetchData()
    }


  }



}
</script>
