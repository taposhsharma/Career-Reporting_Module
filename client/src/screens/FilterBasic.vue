<template>
    <h1>{{ completeData }}</h1>
</template>

<script>
import axios from 'axios'


 export default{
    name:"FilterBasic",
    data(){
        return{

        
        completeData:[]
        }
    },
    methods:{
        allData(){
            axios.get('http://localhost:5000/data/allData')
        .then(response => {
          this.completeData = response.data
        })
        .catch(error => {
          console.log(error)
        })
        }
    }

 }
</script>

<style scoped>

</style>
