<template>
  <div>
    <q-btn label="Attendance" color="green" @click="openDialog = true"></q-btn>

    <q-dialog v-model="openDialog" full-height>
      <q-card style="width:380px">
        <div class="text-h5 bg-primary q-pa-md text-white">Mark Attendance</div>
        <div class="column q-gutter-md q-pa-md">
          <div>
            <div class="text-h6">{{ employee?.name }} - {{ employee?.employee_code }}</div>
            <div class="text-grey">{{ employee?.designation_id.name }}</div>
          </div>
          <div class="row justify-center" style="height:130px">
            <q-spinner-ball style="font-size:90px" color="primary" v-if="!gps.initiated">
            </q-spinner-ball>
            <div class="row justify-center" v-else>
              <div class="column items-center" v-if="formData.latitude && formData.longitude">
                <div class="text-h6 q-my-md">Location Locked</div>
                <div class="column items-center" style="font-size:18px">
                  <div class="q-my-sm" v-if="todayLoginDateTime">
                    Login at {{ todayLoginDateTime }}
                  </div>
                  <div class="q-my-sm" v-if="todayLogoutDateTime">
                    Logout at {{ todayLogoutDateTime }}
                  </div>
                  <q-btn rounded v-if="!todayLoginDateTime" label="Log In" color="green"
                    style="padding:10px 30px 10px 30px; font-size:20px" unelevated
                    @click="markAttendance('log_in')"></q-btn>
                  <q-btn v-if="todayLoginDateTime && !todayLogoutDateTime" label="Log Out" color="amber" size="lg"
                    unelevated @click="markAttendance('log_out')"></q-btn>
                </div>

              </div>
              <div v-else>
                <h6>Location Locking Failed</h6>
              </div>



            </div>
          </div>
          <div class="col">
            <div class="text-h6 q-ma-md">Attendance History</div>
            <q-list separator class="scroll" style="height: calc(100vh - 430px)">
              <q-item clickable v-for="log of pastLogSummary">
                <q-item-section avatar>
                  <q-avatar :class="[log.avatarColor]" class="text-white">
                    {{ log.day }}
                  </q-avatar>

                </q-item-section>
                <q-item-section v-if="log.attendance === 'P'">
                  <div>
                    Login: {{ log?.login_time }}
                  </div>
                  <div>Logout: {{ log?.logout_time }}</div>
                </q-item-section>
                <q-item-section v-if="log.attendance === 'A'">
                  Absent
                </q-item-section>
                <q-item-section v-if="log.attendance === 'S'">
                  Sunday
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      openDialog: false,
      formData: {},
      todayLogs: null,
      pastLogs: [],
      gps: {
        initiated: false,
        error: false
      },
      user: null,
      employee: null
    };
  },
  computed: {
    todayLogoutDateTime () {
      if (this.todayLogs) {
        let todaysLogout = this.todayLogs.find(log => log.log_type === 'log_out')
        if (todaysLogout) {
          let logoutTime = new Date(todaysLogout.timestamp)
          return date.formatDate(logoutTime, 'hh:mm:a')
        }
      }
      return null
    },
    todayLoginDateTime () {
      if (this.todayLogs !== null) {
        let todaysLogin = this.todayLogs.find(log => log.log_type === 'log_in')
        if (todaysLogin) {
          let loginTime = new Date(todaysLogin.timestamp)
          return date.formatDate(loginTime, 'hh:mm:a')
        }
      }

      return null
    },
    pastLogSummary () {
      let days = []
      let currentDate = new Date()
      let today = date.formatDate(currentDate, 'D')
      for (let day = 1; day <= 30; day++) {
        if (day > today) {
          break
        }
        let iterationDate = date.buildDate({ date: day })
        let dayLog = { day, login: null, logout: null, attendance: 'A', avatarColor: 'bg-red' }
        console.log(date.formatDate(iterationDate, 'E'))
        if (date.formatDate(iterationDate, 'E') == 7) {
          dayLog.attendance = 'S'
          dayLog.avatarColor = 'bg-grey'
        }
        let login = this.pastLogs.find(log => {
          let loginTime = new Date(log.timestamp)
          return log.log_type === 'log_in' && day == parseInt(date.formatDate(loginTime, 'D'))
        })
        if (login) {
          dayLog.login = login
          dayLog.attendance = 'P'
          dayLog.avatarColor = 'bg-green'
          let login_time = new Date(login.timestamp)
          dayLog.login_time = date.formatDate(login_time, 'hh:mm a')
        }
        let logout = this.pastLogs.find(log => {
          let logoutTime = new Date(log.timestamp)
          return log.log_type === 'log_out' && day == parseInt(date.formatDate(logoutTime, 'D'))
        })
        if (logout) {
          dayLog.logout = logout
          dayLog.attendance = 'P'
          let logout_time = new Date(logout.timestamp)
          dayLog.logout_time = date.formatDate(logout_time, 'hh:mm a')
        }
        days.push(dayLog)
      }
      return days
    }
  },
  methods: {
    async fetchEmployee () {
      let httpClient = await this.$api.get('users/me')
      this.user = httpClient.data.data
      let httpClient2 = await this.$api.get('items/employees', {
        params: {
          fields: ['*', 'designation_id.*'],
          filter: {
            user_id: {
              _eq: this.user.id
            }
          }
        }
      })
      this.employee = httpClient2?.data?.data?.[0]
    },
    async initiateGPS () {
      let self = this
      navigator.geolocation.getCurrentPosition((position) => {
        self.gps.initiated = true
        self.formData.latitude = position.coords.latitude;
        self.formData.longitude = position.coords.longitude;
      }, (error) => {
        self.gps.initiated = true
        self.gps.error = true
      });
    },
    async getTodayStatus () {
      let params = { fields: '*,employee_id.user_id,employee_id.id' }
      let currentDate = Date.now()
      params.filter = {
        employee_id: {
          user_id: this.user.id
        },
        timestamp: {
          _gt: date.formatDate(currentDate, 'YYYY-MM-DD 00:00:00')
        }
      }
      params.filter = JSON.stringify(params.filter)
      let response = await this.$api.get('/items/attendences', { params })
      this.todayLogs = response.data.data
    },
    async markAttendance (logType) {
      const self = this;
      const response = await self.$api.post(
        "/items/attendences/",
        { log_type: logType, latitude: this.formData.latitude, longitude: this.formData.longitude, employee_id: this.employee.id }
      );
      this.getTodayStatus()
    },
    async fetchPreviousRecords () {
      let currentDate = Date.now()
      let params = {
        fields: '*,employee_id.user_id,employee_id.id', filter: {
          employee_id: {
            user_id: this.user.id
          },
          timestamp: {
            _gt: date.formatDate(currentDate, 'YYYY-MM-01 00:00:00')
          }
        }
      }
      let response = await this.$api.get('/items/attendences', { params })
      this.pastLogs = response.data.data.filter((attendance) => {
        return attendance.employee_id.user_id === this.user.id
      })
    }
  },
  async created () {
    this.initiateGPS()
    await this.fetchEmployee()
    this.getTodayStatus()
    this.fetchPreviousRecords()
  },
};
</script>
