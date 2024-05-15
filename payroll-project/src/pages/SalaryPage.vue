<template>
  <div class="column q-pa-md">
    <div class="text-h6">Salary Sheet </div>
    <q-table dense flat :rows="salaryData" :pagination="{ rowsPerPage: -1 }">
      <template v-slot:top="props">
        <div class="row">
          <q-input v-model="month" type="month" />
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      month: null,
      salaryData: [],
    }
  },
  watch: {
    month () {
      this.getSalaryData()
    }
  },
  methods: {
    async getSalaryData () {
      this.salaryData = []
      let params = { month: this.month }
      let response = await this.$api.get('/modules/salary_sheet', { params })
      if (response?.data?.data) {
        this.salaryData = response.data.data
      }
    }
  }
}
</script>
