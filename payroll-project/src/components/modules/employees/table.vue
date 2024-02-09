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
            async fetchEmployees(){
             let httpClient = await this.$axios.get('http://localhost:8055/items/employees')
             this.rows = httpClient.data.data
            }
        },
        created(){
            this.fetchEmployees()
        }
    }
    
    </script>