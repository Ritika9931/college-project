<template>
  <q-form>
    <div class="column">
      <div class="text-h6  text-black-3"> New leave</div>


      <div class="column q-gutter-sm">
        <q-input outlined label="Type" v-model="formData.type" />
        <q-input outlined label="Cause" v-model="formData.cause" />
        <q-input outlined label="From" v-model="formData.from" />
        <q-date v-model="days" multiple />
        <q-input outlined label="To" v-model="formData.to" />

        <q-select outlined label="Status" emit-value
          :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
          v-model="formData.status"></q-select>
      </div>
    </div>
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "leave Type",
  data () {
    return {
      formData: {}
    }
  },

  methods: {
    async submit () {
      let httpClient = await this.$api.post('/items/leave_types', this.formData)

      this.$q.dialog({
        title: 'Successfull',
        message: 'Data Submitted'
      }).onOk(() => {
        this.$mitt.emit('module-data-changed:leavetypes')
        this.$router.go(-1)
      }).onCancel(() => {
        // console.log('Cancel')
      })

    }
  }


}
</script>
