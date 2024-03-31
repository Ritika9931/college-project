<template>
    
    <q-page class="q-pa-md bg-grey-2">
   
   
    <div><q-btn label="Add" to="./add" color="green" rounded></q-btn></div>
    <div class="row q-gutter-md q-my-md">
        <q-card v-if="mode" class="q-pa-md" style="width:360px">
      <router-view v-bind="{mode,id}"/> 
    </q-card>
    
    <LeaveTypeTable class="col"/>
    </div>

 

</q-page>
</template>

<script>
import LeaveTypeTable from 'components/modules/leavetypes/table.vue'
export default {
props: ['mode','id'],
    components: {LeaveTypeTable,}

}
</script>