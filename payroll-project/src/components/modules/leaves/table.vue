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
        { label: 'Status', field: 'status', name: 'status', align: 'left' },
        { label: 'Employee ', field: 'employee_id', name: 'employee id', align: 'left' },
        { label: 'Leave Type ', field: 'leave_type_id', name: 'leave type id', align: 'left' },
        { label: 'Department ', field: 'department_id', name: 'department id', align: 'left' },
        { label: 'Apply Date', field: 'apply_date', name: 'apply date', align: 'left' },
        { label: 'Action', field: '', name: 'actionControl' },
      ]
    }
  },
    
  
  methods: {
    async fetchLeaves () {
      let httpClient = await this.$api.get('/items/leaves')
      this.rows = httpClient.data.data
    },
  
    async deleteData (id) {
      this.$q.dialog({
        title: 'Deleting Data',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        let httpClient = await this.$api.delete('/items/leaves/' + id)
        this.fetchLeaves()
      })
    
    }
  },
  
  created () {
    this.$mitt.on('module-data-changed:leaves', this.fetchLeaves)
    this.fetchLeaves()
  }
}

</script>
