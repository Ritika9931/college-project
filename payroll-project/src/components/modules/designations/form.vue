<template>
    <q-form >
               <div class="row">
                   <div class="text-h6">Designation Form</div>
               </div>
       <q-input label="Designation Name" v-model="formData.name"/>
       <q-select emit-value :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
            v-model="formData.status"></q-select>
       <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit"/>
       <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)"/>
       
      </q-form>
</template>
<script>
import { useQuasar } from 'quasar'
export default {
    name: 'DesignationForm',
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        async submit() {
            let httpClient = await this.$axios.post('http://localhost:8055/items/designations', this.formData)
            
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