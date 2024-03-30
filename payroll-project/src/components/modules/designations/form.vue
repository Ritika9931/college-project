<template>
  <q-form ref="form" class="q-gutter-md" :class="{ 'bg-amber': mode === 'edit' }">
    <div class="column">
      <div class="text-h6 q-my-md">Designation Form</div>
    </div>
    <div class="column q-gutter-sm">
      <q-input ref="name_input" outlined label="Designation Name" v-model="formData.name"
        :rules="[val => !!val || 'Mandatory Field']" :disable="mode === 'edit'"></q-input>
      <q-select outlined label="Department" :options="department.options" option-value="id" option-label="name"
        map-options emit-value v-model="formData.department_id"></q-select>
      <q-select outlined label="Status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
    </div>
    <div ref="div" class="row q-gutter-sm">
      <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode === 'add'" />
      <q-btn label="update" color="amber" unelevated @click="updateForm" :loading="formSubmitting"
        :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
      <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
    </div>
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
  name: 'DesignationForm',
  props: ['mode', 'id'],
  data () {
    return {
      formData: {},
      department: {
        option: [],
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
    async fetchDepartments () {
      this.department.loading = true
      try {
        this.department.loadingAttempt++
        let httpClient = await this.$api.get('/items/departments')
        this.department.loadingAttempt = 0
        this.department.error = false
        this.department.options = httpClient?.data?.data
      } catch (err) {
        if (this.department.loadingAttempt <= 5) {
          // this.department.error = 'Please wait loading options'
          setTimeout(this.fetchDepartments, 1000)

        } else {
          this.department.error = 'Failed to load options'

        }

      }
      if (!!!this.department.error || (!!this.department.error && this.department.loadingAttempt > 5)) {
        this.department.loading = false
      }


    },


    async submitForm () {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.formSubmitting = true
      try {

        let httpClient = await this.$api.post('/items/designations', this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:designations')
        this.$router.go(-1)
        this.$q.dialog({
          title: 'Successfull',
          message: 'Data Submitted'
        })
        this.$refs.name_input.$el.focus()

      } catch (err) {
        console.log(err)
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
        let httpClient = await this.$api.patch('items/designations/' + this.formData.id, this.formData)
        console.log(1)
        this.formSubmitting = false
        console.log(2)
        this.formData = {}
        console.log(3, this.$mitt)
        this.$mitt.emit('module-data-changed:designations')
        console.log(4)
        this.$q.dialog({
          message: 'Data Update Successfully'
        })
        console.log(5)
        this.$refs.name_input.$el.focus()
      } catch (err) {
        console.log(err)
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Data Updation Failed'
        })
      }
    },
    async fetchData () {
      let httpClient = await this.$api.get('items/designations/' + this.id)
      this.formData = httpClient.data.data
    }

  },
  created () {
    this.fetchDepartments()
    if (this.mode === 'edit') {
      this.fetchData()
    }

  }
}
</script>
