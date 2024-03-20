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
    async fetchDesignations () {
      let httpClient = await this.$api.get('/items/designations')
      this.rows = httpClient.data.data
    }
  },
  created () {
    this.fetchDesignations()
  }
}

</script>
