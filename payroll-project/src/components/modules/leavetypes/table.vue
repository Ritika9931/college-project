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
    async fetchLeaveTypes () {
      let httpClient = await this.$axios.get('http://localhost:8055/items/leave_types')
      this.rows = httpClient.data.data
    }
  },
  created () {
    this.fetchLeaveTypes()
  }
}

</script>
