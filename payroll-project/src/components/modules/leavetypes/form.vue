<template>
  <q-form class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
    <div class="column">
      <div class="text-h6  text-black-3"> New leave</div>
      <div class="column q-gutter-sm">
        <q-select ref="type_input" outlined label="type" v-model="formData.type"></q-select>
        <q-input outlined label="Cause" v-model="formData.cause" />
        <q-input outlined label="From" v-model="formData.from" />
        <q-date v-model="days" multiple />
        <q-input outlined label="To" v-model="formData.to" />

        <q-select outlined label="Status" emit-value
          :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
          v-model="formData.status"></q-select>
      </div>
    </div>
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode ==='add'" />
    <q-btn label="Update" color="amber"unelevated @click="updateForm" :loading="formSubmitting"
     :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "Leave Type",
  props:['mode','id'],
  data () {
    return {
      formData: {},
      status: {
        loading: false,
        error: false,
        options: [],
        loadingAttempt: 0
      }
    }
  },
  
  methods: {
      async submitForm () {
        let valid = await this.$refs.form.validate()
        console.log(sal)
        if (!valid){
          return
        }
        this.formSubmitting = true
        try{
          let httpClient = await this.$api.post('/items/leave_types', this.formData)
          this.formSubmitting = false
          this.formData = {}
          this.$mitt.emit('module-data-changed:leave_types')
          
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
        let httpClient = await this.$api.patch('items/leave_types/' + this.formData.id, this.formData)
        this.formSubmitting = false
        this.formData = {}
        this.$mitt.emit('module-data-changed:leave_types')
        console.log
        this.$q.dialog({
          message: 'Data Update Successfully'
        })

        this.$refs.type_input.$el.focus()
      } catch (err) {
        this.formSubmitting = false
        this.$q.dialog({
          message: 'Data Updation Failed'
        })
      }
    },
    async fetchData () {
      let httpClient = await this.$api.get('items/leave_types/' + this.id)
      this.formData = httpClient.data.data
    }

  },
  created () {
    this.fetchData()
    if (this.mode === 'edit') {
      this.fetchData()
    }


  }




}
</script>
