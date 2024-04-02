<template>
  <q-input v-model="inputDisplay" @focus="focus = true" @blur="focus = false">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date mask="YYYY-MM-DD" today-btn v-model="dateTime" :range="range">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import moment from 'moment'
import { date } from 'quasar'
import _ from 'lodash'
export default {
  name: "bBusyDateTime",
  props: {
    modelValue: [String, Object],
    format: {
      type: String,
      default: 'DD-MM-YYYY'
    },
    range: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    focus (val) {
      if (!val) {
        this.inputText = this.inputDisplay
      }

    },
    inputDisplay (val) {
      if (!this.focus) {
        this.inputText = this.inputDisplay
      }
    },
    modelValue: {
      handler (val) {
        if (typeof val === 'object' && (this.dateTime?.from !== val?.from || this.dateTime?.to !== val?.to)) {
          alert('Object')
          this.dateTime = val
        } else if (typeof val === 'string' && this.dateTime !== val) {
          this.dateTime = val
          this.inputText = moment(val).format('DD-MM-YYYY')
        }
      },
      deep: true,
      immediate: true
    },
    emitValue: {
      handler (val) {
        if (val) {
          this.$emit('update:model-value', this.emitValue)
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      dateTime: null,
      inputText: '',
      focus: false
    }
  },
  computed: {
    inputDisplay: {
      get () {
        return this.focus ? this.inputText : this.dateRangeDisplay
      },
      set (val) {
        this.inputText = val
      }

    },
    emitValue () {
      let dateTime = ''
      if (this.range) {
        dateTime = { from: null, to: null }

        if (typeof this.dateTime === 'object' && this.dateTime?.from && this.dateTime?.to) {
          dateTime.from = moment(this.dateTime.from, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          dateTime.to = moment(this.dateTime.to, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD HH:mm:ss')
        } else if (this.dateTime && typeof this.dateTime === 'string') {
          dateTime.from = moment(this.dateTime, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD HH:mm:ss')
          dateTime.to = moment(this.dateTime, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
      } else {
        dateTime = this.dateObject?.format('YYYY-MM-DD')
      }

      return dateTime
    },
    mask () {
      let mask = this.format.replaceAll('D', '#').replaceAll('M', '#').replaceAll('Y', '#')
      if (this.range) {
        mask = mask + ' to ' + mask
      }
      return mask
    },
    dateObject () {
      let inputTextArray = this.inputText.split(/[\/.-]/)
      let today = moment()
      let formatOrder = this.format.split('-')
      let datePreObject = (_.zipObject(formatOrder, inputTextArray))
      let date = moment((datePreObject.YYYY || today.year()) + '-' + (datePreObject.MM || (today.month() + 1)) + '-' + (datePreObject.DD || today.date()))

      return date
    },
    dateRangeDisplay: {
      get: function () {
        let displayDate = this.dateObject.format(this.format)

        if (this.dateTime?.from && this.dateTime?.to) {

          displayDate = (
            date.formatDate(this.dateTime.from, this.format.replaceAll('-', '')) +
            ' to ' +
            date.formatDate(this.dateTime.to, this.format.replaceAll('-', ''))
          )
        } else if (this.dateTime && typeof this.dateTime === 'string') {

          displayDate = date.formatDate(this.dateTime, this.format)
        }

        return displayDate

      }
    },
  }
}

</script>
