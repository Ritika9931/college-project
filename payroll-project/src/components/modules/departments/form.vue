<template>
     <q-form >
                <div class="row">
                    <div class="text-h6">Department Form</div>
                </div>
        <q-input label="Department Name"/>
        <q-select :option="[{label:'Active', value:'active'},{label:'In-Active', value: 'in_active'}]"></q-select>
        <q-btn class="q-my-lg" label="Submit" color="primary"/>
        <q-btn class="q-my-lg" label="Cancel" color="negative" @click="$router.go(-1)"/>
       </q-form>
</template>
<script>
export default {

}
</script>