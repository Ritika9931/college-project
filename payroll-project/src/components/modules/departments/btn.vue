<template>
<q-btn :label="counter" @click="counter++"></q-btn>
</template>
<script>

export default {
    data(){
        return {counter:0}
    }
}
</script>