<template>
  <q-form>
    <div class="row">
      <div class="text-h6">Department Form</div>
    </div>
    <q-input outlined label="Department Name" v-model="formData.name"></q-input>
    <q-select outlined label="Status" v-model="formData.status" emit-value :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]" 
    
    ></q-select>
    <q-btn type="button" class="q-my-lg" label="Submit" color="primary" @click="submit" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
  name: 'DepartmentForm',
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    async submit () {
      let httpClient = await this.$api.post('/items/departments', this.formData)

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
