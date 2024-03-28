<template>
  <q-form class="q-gutter-md" :class="{'bg-amber':mode ==='edit'}">
    <div class="column">
      <div class="text-h6  text-black-3"> New leave</div>
      <div class="column q-gutter-sm">
        <q-select outlined label="type" v-model="formData.type"></q-select>
        <q-input outlined label="Cause" v-model="formData.cause" />
        <q-input outlined label="From" v-model="formData.from" />
        <q-date v-model="days" multiple />
        <q-input outlined label="To" v-model="formData.to" />

        <q-select outlined label="Status" emit-value
          :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
          v-model="formData.status"></q-select>
      </div>
    </div>
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" v-if="mode ==='add'" />
    <q-btn label="Update" color="amber"unelevated @click="updatedForm" :loading="formSubmitting"
     :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "leave Type",
  props:['mode','id'],
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
