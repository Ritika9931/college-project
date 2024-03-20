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
    async fetchLeaves () {
      let httpClient = await this.$api.get('http://localhost:8055/items/leaves')
      this.rows = httpClient.data.data
    }
  },
  created () {
    this.fetchLeaves()
  }
}

</script>
