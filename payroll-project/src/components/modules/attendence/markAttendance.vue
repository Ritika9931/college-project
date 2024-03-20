<template>
  <div>
    <q-btn label="Attendance" color="green" @click="openDialog = true"></q-btn>

    <q-dialog v-model="openDialog">
      <q-card class="q-pa-md">
        <div class="text-h5 q-my-md ">Mark Attendance</div>
        <div v-if="checkedout" class="column q-gutter-md">
          {{ location }}
          <div class="text-red" v-if="locationErrorMessage">{{ locationErrorMessage }}: Please allow permission to
            continue</div>
          <div>Last checkin : 18 March 2024 09:30am</div>
          <div>Last checkout: 18 March 2024 06:00am</div>
          <div class="row">
            <q-btn label="CheckIn" color="green" v-if="checkedout" :disabled="locationErrorMessage"></q-btn>
            <q-btn label="CheckOut" color="red" v-if="checkedin"></q-btn>
            <q-btn label="History" color="grey" flat></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkedout: true,
      openDialog: false,
      location: {},
      locationErrorMessage: null
    }
  },
  methods: {
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
  }
}
</script>
