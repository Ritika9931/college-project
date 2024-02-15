<template>
    <q-form>
        <div class="column">
            <div class="text-h6">Employee details</div>


            <div class="col-12 col-md-3 q-ma-sm">
                <label for="Name">First Name</label>
                <q-input outlined v-model="formData.name" />
            </div>

            <div class="col-12 col-md-3 q-ma-sm">
                <label for="Name">MiddleName</label>
                <q-input outlined v-model="text" />
            </div>

            <div class="col-12 col-md-3 q-ma-sm">
                <label for="Name">MiddleName</label>
                <q-input outlined v-model="text" />
            </div>

            <div class="col-12 col-md-3 q-ma-sm">
                <label for="Name">LastName</label>
                <q-input outlined v-model="text" />
            </div>
            <div class="col-12 col-md-3 q-ma-sm">
                <label for="number">Contact</label>
                <q-input outlined v-model="text" />
            </div>

            <div class="col-12 col-md-3 q-ma-sm">
                <label for="email">Email</label>
                <q-input outlined v-model="text" />
            </div>
        </div>

        <div class="col-12 col-md-3 q-ma-sm">
            <label for="state">State</label>
            <q-input outlined v-model="text" />
        </div>

        <div class="col-12 col-md-3 q-ma-sm">
            <label for="PAN">PAN Number</label>
            <q-input outlined v-model="text" />
        </div>
          <div class="col-12 col-md-3 q-ma-sm">
                <label for="Adhar">Adhar Number</label>
                <q-input outlined v-model="text" />
            </div>
            <div class="col-12 col-md-3 q-ma-sm">
                <label for="Adhar">Status</label>
        <q-select emit-value :option="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
        v-model="formData.status"></q-select>
</div>
        <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" />
        <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
    </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
    name:"EmployeeDetails",
    data() {
        return{
        formData: {}
    }
},

methods:{
    async submit() {
        let httpClient = await this.$axios.post('http://localhost:8055/items/employees', this.formData)
            
            this.$q.dialog({
                title: 'Successfull',
                message: 'Data Submitted'
            }).onOk(() => {
                this.$router.go(-1)
            }).onCancel(() => {
                // console.log('Cancel')
            }).onDismiss(() => {
                this.$router.go(-1)
            })

    }
}


}
</script>