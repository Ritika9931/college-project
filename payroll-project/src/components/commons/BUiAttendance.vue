<template>
  <div class="columns q-gutter-sm">

    <q-table :rows="attendanceMatrix" :columns="columns" :pagination="{ rowsPerPage: 0 }" hide-pagination
      style="max-height:80vh">
      <template v-slot:top>
        <div class="row items-center q-gutter-sm">
          <div class="text-h6">Attendance</div>
          <div>
            <q-btn size="sm" unelevated color="green" label="Export" @click="exportCSV"></q-btn>
          </div>

        </div>

      </template>
      <template v-slot:[bodyCellDay]="{ value }" v-for="bodyCellDay of    bodyCellDays   ">

        <q-td>

          <q-btn v-if="value !== null" flat
            :color="value.status === 'P' ? 'green' : (value.status === 'A' ? 'red' : (value.status === 'S' ? 'grey' : 'primary'))"
            :label="value.status">
            <q-popup-proxy v-if="value.status === 'P'">
              <q-card>
                <div class="column q-gutter-sm">
                  <div>
                    In: <b-display :value="value?.in?.timestamp" :field="{ type: 'datetime' }"
                      :config="{ format: 'h:m a' }"></b-display>
                    <q-btn flat dense color="primary" icon="location_on" type="a"
                      :href="'https://maps.google.com/maps?q=' + value.in.latitude + ',' + value.in.longitude"
                      target="_blank"></q-btn>
                  </div>
                  <div>
                    Out: <b-display :value="value?.out?.timestamp" :field="{ type: 'date' }"
                      :config="{ format: 'h:m a' }"></b-display>
                    <q-btn flat dense color="primary" icon="location_on" type="a"
                      :href="'https://maps.google.com/maps?q=' + value.out.latitude + ',' + value.out.longitude"
                      target="_blank"></q-btn>
                  </div>
                </div>
              </q-card>
            </q-popup-proxy>
          </q-btn></q-td>
      </template>
    </q-table>
  </div>
</template>
<style scoped>
:deep(th:first-of-type),
:deep(td:first-of-type) {
  background: #fff;
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>
<script>
import { date } from 'quasar'
import _ from 'lodash'
export default {
  props: ['attendances', 'fields', 'employees', 'leaves', 'month'],
  methods: {
    async exportCSV () {
      const self = this
      let headings = Object.keys(this.attendanceMatrix[0])
      let csvData = headings.join(',').replaceAll('_', ' ').toUpperCase() + '\n' + this.attendanceMatrix.map(row => { return headings.map((heading) => { return typeof row[heading] === 'object' ? row[heading].status : row[heading] }).join(',') }).join('\n')
      let encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvData)
      window.open(encodedUri)
    },
  },
  computed: {
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
    bodyCellDays () {
      let bodyCellDays = []
      for (let i = 1; i <= this.totalDays; i++) {
        bodyCellDays.push('body-cell-day' + i)
      }
      return bodyCellDays
    },
    totalDays () {
      if (this.monthMeta) {
        return parseInt(date.formatDate(this.monthMeta.end, 'D'))
      }
      return 0
    },
    monthData () {
      let monthData = []
      if (this.monthMeta) {
        monthData = this.attendances.filter(attendance => {
          let attendanceDate = attendance[this.fields?.date]
          if (attendanceDate) {
            return date.isBetweenDates(attendanceDate, this.monthMeta.start, this.monthMeta.end)
          } else {
            return false
          }
        })
      }
      return monthData
    },
    columns () {
      if (!(this.employees?.length > 0)) {
        return []
      }
      let columns = []
      const self = this
      Object.keys(this.employees?.[0]).forEach(field => {
        if (field === 'id') {
          return
        }
        columns.push({
          label: field,
          align: 'left',
          field: field
        })
      })
      for (let i = 1; i <= this.totalDays; i++) {
        columns.push({
          label: i,
          align: 'center',
          name: 'day' + i,
          field: 'day' + i
        })
      }
      columns.push({
        label: 'Total Present',
        align: 'center',
        name: 'total_present',
        field: 'total_present'
      })
      columns.push({
        label: 'Total Absent',
        align: 'center',
        name: 'total_absent',
        field: 'total_absent'
      })
      columns.push({
        label: 'Total Leave',
        align: 'center',
        name: 'total_leave',
        field: 'total_leave'
      })
      return columns
    },
    attendanceMatrix () {
      if (!(this.employees?.length > 0)) {
        return []
      }
      return this.employees.map(employee => {
        let row = {
          ...employee,

        }
        let currentDate = new Date()
        let total_present = 0
        let total_leave = 0
        let total_absent = 0
        for (let day = 1; day <= this.totalDays; day++) {
          let dayDate = date.buildDate({ date: day, month: this.monthMeta.month, year: this.monthMeta.year })
          if (date.getDateDiff(dayDate, currentDate, 'days') > 0) {
            row['day' + day] = null
            continue
          }
          // let iterationDate = date.buildDate({ date: day })
          let _in = this.attendances.find(log => {
            let logDate = log[this.fields?.date]
            let logDay = parseInt(date.formatDate(new Date(logDate), 'D'))
            return day === logDay && log[this.fields?.employee] === employee.id && log.log_type === 'log_in'
          })
          let out = this.attendances.find(log => {
            let logDate = log[this.fields?.date]
            let logDay = parseInt(date.formatDate(new Date(logDate), 'D'))
            return day === logDay && log[this.fields?.employee] === employee.id && log.log_type === 'log_out'
          })
          let status = ''
          let sunday = false
          let leave = false

          if (_in || out) {
            status = 'P'
            total_present++
          } else {
            status = 'A'
            total_absent++
            leave = this.leaves.find(l => {
              if (l.employee_id !== employee.id) {
                return false
              }
              let from = new Date(l.date_from)
              let to = new Date(l.date_to)
              const unit = 'days'
              const valid = date.getDateDiff(dayDate, from, unit) >= 0 && date.getDateDiff(to, dayDate, unit) >= 0

              return l.employee_id === employee.id && valid
            })
            if (leave) {

              status = 'L'
              total_leave++
              total_absent--
            }
            if (date.formatDate(dayDate, 'E') == 7) {

              status = 'S'
              sunday = true
              total_absent--
            }
          }
          row['day' + day] = { in: _in, out, status, sunday, leave }
        }
        row['total_present'] = total_present
        row['total_absent'] = total_absent
        row['total_leave'] = total_leave
        return row
      })
    }
  }
}
</script>
