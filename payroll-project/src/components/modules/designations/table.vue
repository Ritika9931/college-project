<template>
    <q-table :rows="rows"></q-table>
    </template>
    <script>
    export default {
        data(){
            return {
                rows: [],
            }
        },
        methods: {
            async fetchDesignations(){
             let httpClient = await this.$axios.get('http://localhost:8055/items/designations')
             this.rows = httpClient.data.data
            }
        },
        created(){
            this.fetchDesignations()
        }
    }
    
    </script>