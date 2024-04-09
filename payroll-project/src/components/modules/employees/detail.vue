<template>
       <div class="column q-gutter-md q-pa-md">


<q-card class="q-pa-md column">
  <div class="text-h5 q-my-md text-bold">Employee Details</div>
  <div class="row">
    <div>
      <q-img width="150px" fit="contain" :src="'http://localhost:8055/assets/' + detail?.user_id?.avatar"></q-img>
    </div>
    <div class="col q-pa-md">
      <div class="column">
        <div class="row">
          <div><span class="text-bold text-primary">Name:</span></div>
          <div class="col q-mx-sm"> {{ detail?.name }} </div>

        </div>
        <div class="row">
          <div><span class=" text-bold text-primary">Contact Number :</span></div>
          <div class="col q-mx-sm"> {{ detail?.contact }}</div>

        </div>
        <div class="row">
          <div><span class=" text-bold text-primary">Email :</span></div>
          <div class="col q-mx-sm"> {{ detail?.email }}</div>
          
        </div>
        <div class="row">
          <div><span class=" text-bold text-primary">Account Number :</span></div>
          <div class="col q-mx-sm"> {{ detail?.account_number }}</div>
          
        </div>
       
      </div>
    </div>
  </div>
</q-card>


</div>

</template>
     
<script>
export default{
    name:'EmployeeDetails',
    props: ['dataId'],
  data () {
return {
  detail: null

}
},
watch: {
dataId: {
  handler () {
    this.fetchData()
  },
  immediate: true
}
},
methods: {
async fetchData () {
  let httpClient = await this.$api.get('/items/employees/' + this.dataId, {
    params: {
      fields: [
        '*',
        'id.*',
       
      ]
    }
  })
  this.detail = httpClient.data.data
}
}
}
</script>

