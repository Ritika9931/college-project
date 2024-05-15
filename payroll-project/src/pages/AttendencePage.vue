<template>
  <div class="q-ma-md">
    <div class="row q-gutter-sm items-center"><q-input style="width:160px" type="month" v-model="month"></q-input>
      <q-btn label="Refresh" unelevated rounded color="primary" @click="fetchAttendance()"></q-btn>
    </div>
    <b-ui-attendance :employees="gridEmployees" :attendances="attendances" :leaves="leaves" :month="month"
      :fields="{ employee: 'employee_id', type: 'log_type', date: 'timestamp' }">
    </b-ui-attendance>
    <!-- <b-list-detail :params="{limit: 10}" :parent-params="{filter: { status: 'active', user_id: { _or: [{ role: { name: 'marketing' } }, { role: { name: 'administrator' } }] }} }" :parentModule="{name:'employees', collection:'parties'}" :module="{name: 'employee_attendance', collection: 'employee_attendance'}" group-by="employee_id">
     </b-list-detail> -->
  </div>
</template>

<script>
import { date } from 'quasar'
import BUiAttendance from 'components/commons/BUiAttendance.vue'
export default {
  components: { BUiAttendance },
  data () {
    return {
      month: false,
      employees: [],
      attendances: [],
      leaves: []
    }
  },
  computed: {
    gridEmployees () {
      return this.employees.map(employee => {
        return {
          id: employee.id,
          name: employee.name
        }
      })
    },
    monthMeta () {
      let monthMeta = false
      if (this.month) {
        let month = new Date(this.month)
        monthMeta = {
          start: date.startOfDate(month, 'month'),
          end: date.endOfDate(month, 'month'),
          month: date.formatDate(month, 'M'),
          year: date.formatDate(month, 'YYYY')
        }
      }
      return monthMeta
    },
  },
  watch: {
    month (val) {
      if (val) {
        this.fetchAttendance()
      }
    }
  },
  methods: {
    async fetchAttendance () {
      let filter = {}
      filter._and = [
        { timestamp: { _gte: date.formatDate(this.monthMeta.start, 'YYYY-MM-DD') } },
        { timestamp: { _lt: date.formatDate(date.addToDate(this.monthMeta.start, { months: 1 }), 'YYYY-MM-DD') } },
      ]
      let response = await this.$api.get('/items/attendences', { params: { limit: -1, filter } })
      this.attendances = response.data.data
    },
    async fetchEmployees () {
      let response = await this.$api.get('/items/employees', { params: { limit: -1, } })
      this.employees = response.data.data
    },
    async fetchLeaves () {
      let filter = {}
      filter._and = [
        { timestamp: { _gte: date.formatDate(this.monthMeta.start, 'YYYY-MM-DD') } },
        { timestamp: { _lt: date.formatDate(date.addToDate(this.monthMeta.start, { months: 1 }), 'YYYY-MM-DD') } },
      ]
      let response = await this.$api.get('/items/leaves', { params: { limit: -1 } })
      this.leaves = response.data.data
    },
  },
  created () {
    let today = new Date()
    this.month = date.formatDate(today, 'YYYY-MM')

    this.fetchAttendance()
    this.fetchEmployees()
    this.fetchLeaves()
  }
}
</script>
