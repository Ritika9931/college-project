<template>
  <q-form class="q-gutter-md" :class="{ 'bg-amber': mode === 'edit' }" ref="form">
    <div class="column">
      <div class="text-h6  text-black-3"> New leave</div>
      <div class="column q-gutter-sm">
        <q-select ref="type_input" outlined label="type" v-model="formData.type"></q-select>
        <q-input outlined label="Cause" v-model="formData.cause" />
        <q-input type="date" outlined label="From" v-model="formData.from" :rules="[required]" />
        <!-- <DateTime v-model="formData.to" range /> -->
        {{ formData.to }}
        <q-input mask="##-##-####" outlined label=" To" v-model="toDateDisplay" :rules="[required, validateTo]"
          :disable="!formData.from">
          <template v-slot:append>
            <q-icon name="calendar_month">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="formData.to" mask="YYYY-MM-DD" :options="validateDay">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>


        <q-select outlined label="Status" emit-value
          :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
          v-model="formData.status"></q-select>
      </div>
    </div>
    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submitForm" v-if="mode === 'add'" />
    <q-btn label="Update" color="amber" unelevated @click="updateForm" :loading="formSubmitting"
      :disable="formSubmitting" v-if="mode === 'edit'"></q-btn>
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import moment from 'moment'
import DateTime from 'components/commons/DateTime.vue'
export default {
  components: { DateTime },
  name: "Leave Type",
  props: ['mode', 'id'],
  data () {
    return {
      date: { from: null, to: null },
      formData: {},
      status: {
        loading: false,
        error: false,
        options: [],
        loadingAttempt: 0
      },

    }
  },
  computed: {
    toDateDisplay: {
      set (value) {
        let dateArray = value.split('-')
        if (dateArray?.[0].length === 2 && dateArray?.[1].length === 2 && dateArray?.[2].length === 4) {
          let dateMoment = moment(value, 'DD-MM-YYYY')

          this.formData.to = dateMoment.format('YYYY-MM-DD')
        }

      },
      get () {
        let dateMoment = moment(this.formData.to)
        return dateMoment.format('DD-MM-YYYY')
      }
    }
  },

  methods: {
    validateDay (date) {
      let from = this.formData.from
      let to = date
      let fromDate = moment(from)
      let toDate = moment(to)
      let leaveForDays = toDate.diff(fromDate, 'days') + 1

      return leaveForDays > 0
    },
    async required (value) {
      return !!value || 'Mandatory Field'
    },
    async validateTo () {
      console.log(this.formData.to)
      let from = this.formData.from
      let to = this.formData.to
      let fromDate = moment(from)
      let toDate = moment(to)
      let leaveForDays = toDate.diff(fromDate, 'days') + 1

      return leaveForDays > 0 || 'Not Valid'
    },
    async submitForm () {
      let valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.formSubmitting = true
      try {
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

      } catch (err) {
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
    if (this.mode === 'edit') {
      this.fetchData()
    }


  }




}
</script>
