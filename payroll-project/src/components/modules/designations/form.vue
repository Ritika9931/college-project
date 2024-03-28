<template>
  <q-form ref="form" class="q-gutter-md" :class="{'bg-amber':mode === 'edit'}">
    <div class="column">
      <div class="text-h6 q-my-md">Designation Form</div>
    </div>
    <div class="column q-gutter-sm">
      <q-input outlined label="Designation Name" v-model="formData.name" />
      <q-select outlined label="Department" :options="department.options" option-value="id" option-label="name"
        map-options emit-value v-model="formData.department_id"></q-select>
      <q-select outlined label="Status" emit-value
        :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
    </div>
    <div ref="div" class="row q-gutter-sm">
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" v-if="mode ==='add'" />
    <q-btn label="Update" color="amber"unelevated @click="updateform" :loading="formSubmitting"
    :disable="formSubmitting" v-if="mode ==='edit'"></q-btn>
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </div>
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
  name: 'DesignationForm',
  props:['mode','id'],
  data () {
    return {
      formData: {},
      department: {
        option: [],
        loading: false,
        error: false
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
          setTimeout(this.fetchSkillOptions, 1000)

        } else {
          this.department.error = 'Failed to load options'

        }

      }
      if (!!!this.department.error || (!!this.department.error && this.department.loadingAttempt > 5)) {
        this.department.loading = false
      }


    },
    async submit () {
      let httpClient = await this.$api.post('/items/designations', this.formData)

      this.$q.dialog({
        title: 'Successfull',
        message: 'Data Submitted'
      }).onOk(() => {
        this.$mitt.emit('module-data-changed:designations')
        this.$router.go(-1)
      }).onCancel(() => {
        // console.log('Cancel')
      })

    }
  },
  created () {
    this.fetchDepartments()
  }
}
</script>
