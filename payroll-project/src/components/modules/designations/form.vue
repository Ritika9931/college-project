<template>
  <q-form>
    <div class="row">
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

    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />

  </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
  name: 'DesignationForm',
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
      let httpClient = await this.$api.post('http://localhost:8055/items/designations', this.formData)

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
    this.fetchDepartments()
  }
}
</script>
