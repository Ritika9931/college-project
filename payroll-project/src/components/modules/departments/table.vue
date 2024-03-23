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
        { label: ' Department Name', field: 'name', name: 'name', align: 'left' },
        { label: 'Action', field: '', name: 'actionControl' },
      ]
    }
  },
    

  methods: {
    async fetchDepartments () {
      let httpClient = await this.$api.get('/items/departments')
      this.rows = httpClient.data.data
    },
    async deleteData (id) {
      this.$q.dialog({
        title: 'Deleting Data',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        let httpClient = await this.$api.delete('/items/departments/' + id)
        this.fetchData()
      })
    }
    
  },
  created () {
    this.$mitt.on('module-data-changed:departments', this.fetchData)
    this.fetchDepartments()
  }
}

</script>
