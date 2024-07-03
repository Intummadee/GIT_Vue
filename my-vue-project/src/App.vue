<template>
  <section>
    <h1>Hello world</h1>
    <h1>{{ firstname }}</h1>
    <h1>{{ getFullname() }}</h1>



    <ListData />

  </section>
</template>





<script>  
import ListData from "./componenst/HelloWorld.vue";


export default {
  name: 'App',
  components:{
    ListData // import component
  }
  
}
</script>





<style></style>
