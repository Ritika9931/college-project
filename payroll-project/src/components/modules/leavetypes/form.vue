<template>
  <q-form>
    <div class="column">
      <div class="text-h6  text-black-3"> New leave</div>

      <div class="row q-pa-sm">
        <div class="coloumn col" style="margin-right: 20px;">
          <label for="type">Type</label>
          <q-input outlined v-model="formData.type" />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="coloumn col" style="margin-right: 20px;">
          <label for="cause">Cause</label>
          <q-input outlined v-model="formData.cause" />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="coloumn col" style="margin-right: 20px;">
          <label for="from">From</label>
          <q-input outlined v-model="formData.from" />
        </div>
      </div>
      <div class="q-pa-md">
        <div class="q-pb-sm">
          Model: {{ days }}
        </div>

        <q-date v-model="days" multiple />
      </div>


      <div class="row q-pa-sm">
        <div class="coloumn col" style="margin-right: 20px;">
          <label for="to">To</label>
          <q-input outlined v-model="formData.to" />
        </div>

      </div>
    </div>
    <q-select emit-value :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
      v-model="formData.status"></q-select>

    <q-btn class="q-my-lg" label="Submit" color="primary" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />




  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "New leave",
  data () {
    return {
      formData: {}
    }
  },

  methods: {
    async submit () {
      let httpClient = await this.$api.post('http://localhost:8055/items/leave_types', this.formData)

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
