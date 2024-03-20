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
        <q-input outlined v-model="formData.Middle_name" />
      </div>

      <div class="col-12 col-md-3 q-ma-sm">
        <label for="Name">LastName</label>
        <q-input outlined v-model="formData.last_Name" />
      </div>

      <div class="col-12 col-md-3 q-ma-sm">
        <label for="gender">Gender</label>
        <q-input outlined v-model="formData.Gender" />
      </div>

      <div class="col-12 col-md-3 q-ma-sm">
        <label for="number">Contact</label>
        <q-input outlined v-model="formData.contact" />
      </div>

      <div class="col-12 col-md-3 q-ma-sm">
        <label for="email">Email</label>
        <q-input outlined v-model="formData.email" />
      </div>
    </div>

    <div class="col-12 col-md-3 q-ma-sm">
      <label for="state">State</label>
      <q-input outlined v-model="formData.state" />
    </div>
    <div class="col-12 col-md-3 q-ma-sm">
      <label for="state">Designation</label>
      <q-select :options="designation.options" option-value="id" use-input
        :option-label="option => `${option.name} (${option.department_id.name})`" map-options emit-value outlined
        v-model="formData.designation_id" @filter="filterDesignations">
        <template v-slot:option="props">
          <q-item clickable v-bind="props.itemProps">
            <div class="column">
              <div><span class="text-bold">Designation : </span>{{ props.opt.name }}</div>
              <div><span class="text-bold">Department : </span>{{ props.opt.department_id.name }}</div>
            </div>

          </q-item>
        </template>

      </q-select>
    </div>
    <div class="col-12 col-md-3 q-ma-sm">
      <label for="PAN">PAN Number</label>
      <q-input outlined v-model="formData.pan_number" />
    </div>
    <div class="col-12 col-md-3 q-ma-sm">
      <label for="Adhar">Adhar Number</label>
      <q-input outlined v-model="formData.adhar_number" />
    </div>

    <q-select emit-value :options="[{ label: 'Active', value: 'active' }, { label: 'In-Active', value: 'in_active' }]"
      v-model="formData.status"></q-select>

    <q-btn class="q-my-lg" label="Submit" color="primary" @click="submit" />
    <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)" />
  </q-form>
</template>
<script>
import { useQuasar } from 'quasar';
export default {
  name: "EmployeeDetails",
  data () {
    return {
      formData: {},
      designation: {
        searchText: '',
        option: [],
        loading: false,
        error: false
      }
    }
  },

  methods: {
    async filterDesignations (inputValue, doneFn, abortFn) {
      this.designation.searchText = inputValue
      await this.fetchDesignations()
      doneFn()
      console.log(inputValue)
    },
    async fetchDesignations () {
      this.designation.loading = true
      try {
        this.designation.loadingAttempt++
        let params = {
          fields: [
            '*',
            'department_id.*'
          ]
        }
        if (this.designation.searchText) {
          params.filter = {
            name: {
              _contains: this.designation.searchText
            }
          }
        }
        let httpClient = await this.$api.get('/items/designations', { params })
        this.designation.loadingAttempt = 0
        this.designation.error = false
        this.designation.options = httpClient?.data?.data
      } catch (err) {
        if (this.designation.loadingAttempt <= 5) {
          // this.designation.error = 'Please wait loading options'
          setTimeout(this.fetchSkillOptions, 1000)

        } else {
          this.designation.error = 'Failed to load options'

        }

      }
      if (!!!this.designation.error || (!!this.designation.error && this.designation.loadingAttempt > 5)) {
        this.designation.loading = false
      }


    },
    async submit () {
      let httpClient = await this.$api.post('http://localhost:8055/items/employees', this.formData)

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
  },
  created () {
    this.fetchDesignations()
  }


}
</script>
