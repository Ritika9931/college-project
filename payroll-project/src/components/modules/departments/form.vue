<template>
  <q-form ref="form" class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
    <div class="column">
      <div class="text-h6">Department Form</div>
    </div>
    <div class="column q-gutter-sm">
    <q-input outlined label="Department Name" v-model="formData.name"></q-input>
    <q-select outlined label="Status" v-model="formData.status" emit-value 
    :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]" 
    :loading="status.loading" :error-message="status.error" :error="!!status.error"
    ></q-select>
    </div>
    <div ref="div" class="row-q-gutter-sm">
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" v-if="mode==='add'"/>
    <q-btn label="update" color="amber"unelevated @click="updatedForm" :loading="formSubmitting"
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
    async submit () {
      let httpClient = await this.$api.post('/items/departments', this.formData)

      this.$q.dialog({
        title: 'Successfull',
        message: 'Data Submitted'
      }).onOk(() => {
        this.$mitt.emit('module-data-changed:departments')
        this.$router.go(-1)
      }).onCancel(() => {
        // console.log('Cancel')
      })

    }
  }
}
</script>
