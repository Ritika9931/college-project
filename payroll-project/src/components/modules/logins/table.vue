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
            async fetchlogin(){
             let httpClient = await this.$axios.get('http://localhost:8055/items/login')
             this.rows = httpClient.data.data
            }
        },
        created(){
            this.fetchlogin()
        }
    }
    
    </script>