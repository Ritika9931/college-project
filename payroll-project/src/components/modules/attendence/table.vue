<template>
  <q-table :rows="rows"></q-table>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
    }
  },
  methods: {
    async fetchAttendences () {
      let httpClient = await this.$api.get('http://localhost:8055/items/attendences')
      this.rows = httpClient.data.data
    }
  },
  created () {
    this.fetchAttendences()
  }
}

</script>
