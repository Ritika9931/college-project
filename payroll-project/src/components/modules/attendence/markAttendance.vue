<template>
  <div>
    <q-btn label="Attendance" color="green" @click="openDialog = true"></q-btn>

    <q-dialog v-model="openDialog">
      <q-card>
        <div class="text-h5 bg-primary q-pa-md text-white">Mark Attendance</div>
        <div class="column q-gutter-md q-pa-md">
          <div>
            <div class="text-h6">{{ employee.name }} - {{ employee.employee_code }}</div>
            <div class="text-grey">{{ employee.designation_id.name }}</div>
          </div>

          <div class="text-red" v-if="locationErrorMessage">{{ locationErrorMessage }}: Please allow permission to
            continue</div>
          <div v-if="checkedInTime">Last checkin : {{ checkedInTime }}</div>
          <div v-if="checkedOutTime">Last checkout: {{ checkedOutTime }}</div>
          <div class="row">
            <q-btn label="CheckIn" color="green" v-if="!checkedInTime" @click="markAttendance"
              :disabled="locationErrorMessage"></q-btn>
            <q-btn label="CheckOut" color="red" v-if="checkedInTime && !checkedOutTime" @click="markAttendance"></q-btn>
            <q-btn label="History" color="grey" flat></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      openDialog: false,
      location: {},
      locationErrorMessage: null,
      employee: null,
      attendances: []
    }
  },
  computed: {
    checkedInTime () {
      let checkedInTime = false
      if (this.attendances?.[0]) {
        checkedInTime = moment(this.attendances?.[0].log_time).format('DD-MMM-YY hh:mm')
      }
      return checkedInTime
    },
    checkedOutTime () {
      let checkedOutTime = false
      if (this.attendances.length > 1) {
        let checkout = this.attendances[this.attendances.length - 1]
        checkedOutTime = moment(checkout.log_time).format('DD-MMM-YY hh:mm')
      }
      return checkedOutTime
    }
  },
  methods: {
    async fetchAttendances () {
      console.log(moment)
      let today = moment().format('YYYY-MM-DD')
      let httpClient = await this.$api.get('/items/attendences', {
        params: {
          filter: {
            log_time: {
              _gt: today
            },
            employee_id: {
              _eq: this.employee.id
            }
          }
        }
      })
      this.attendances = httpClient.data.data
    },
    async markAttendance () {
      let httpClient = await this.$api.post('/items/attendences', {
        employee_id: this.employee.id,
        log_source: 'in_app',
        location: {
          type: 'Point',
          coordinates: [this.location.longitude, this.location.latitude]
        }
      })
      this.fetchAttendances()
    },
    async fetchEmployee () {
      let httpClient = await this.$api.get('users/me')
      let profile = httpClient.data.data
      let httpClient2 = await this.$api.get('items/employees', {
        params: {
          fields: ['*', 'designation_id.*'],
          filter: {
            user_id: {
              _eq: profile.id
            }
          }
        }
      })
      this.employee = httpClient2?.data?.data?.[0]
      this.fetchAttendances()
    },
    getLocation () {
      console.log(navigator)
      let self = this
      navigator.geolocation.getCurrentPosition(function (value) {
        console.log(value.coords)
        self.location.latitude = value.coords.latitude
        self.location.longitude = value.coords.longitude
        self.location.accuracy = value.coords.accuracy
        self.locationErrorMessage = null
      },
        function (err) {
          self.locationErrorMessage = err.message
        }
      )
    }
  },
  created () {
    this.getLocation()
    this.fetchEmployee()

  }
}
</script>
