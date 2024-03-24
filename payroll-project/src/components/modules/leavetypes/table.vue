<template>
  <q-table :rows="rows" :columns="columns">

    <template v-slot:body-cell-actionControl="props">
      <q-td>
        <q-btn icon="edit" :to="'./edit/' + props.row.id" unelevated color="amber" dense></q-btn>
        <q-btn icon="delete" @click="deleteData(props.row.id)" unelevated color="red" dense></q-btn>
      </q-td>

    </template>>
  </q-table>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        { label: 'ID', field: 'id', name: 'id', align: 'left' },
        { label: 'Cause', field: 'cause', name: 'cause', align: 'left' },
        { label: 'Type', field: 'type', name: ' type ', align: 'left' },
        { label: 'From', field: 'from', name: 'from', align: 'left' },
        { label: 'To', field: 'to', name: 'to', align: 'left' },
        { label: 'Action', field: '', name: 'actionControl' },
      ]
    }
  },
  methods: {
    async fetchLeaveTypes () {
      let httpClient = await this.$api.get('/items/leave_types')
      this.rows = httpClient.data.data
    },

    async deleteData (id) {
      this.$q.dialog({
        title: 'Deleting Data',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        let httpClient = await this.$api.delete('/items/leave_types/' + id)
        this.fetchLeaveTypes()
      })

    }
  },
  created () {
    this.$mitt.on('module-data-changed:leavetypes', this.fetchLeaveTypes)
    this.fetchLeaveTypes()
  }
}

</script>
