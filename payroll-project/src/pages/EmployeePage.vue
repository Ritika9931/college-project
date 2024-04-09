<template>

  <q-page class="q-pa-md bg-grey-2">

    <div class="row items-cente q-my-md">
      <div class="text-h5">Employees</div>
      <div><q-btn label="Add" to="./add" color="green" rounded></q-btn></div>
    </div>

    <div class="row q-gutter-md q-my-md">
      <q-card v-if="mode" class="q-pa-md" style="width:360px">
        <router-view v-bind="{ mode, id }" />
      </q-card>

      <EmployeeTable class="col" />
    </div>



  </q-page>
</template>

<script>
import EmployeeTable from 'components/modules/employees/table.vue'
import EmployeeDetails from 'components/modules/employees/detail.vue'
export default {
  props: ['mode', 'id'],
  components: { EmployeeTable,EmployeeDetails }

}
</script>
