<template>
  
  <!-- App.vue เป็นเพียง layout หลัก -->
  <div>
    <SidebarMenu />
    <main>
      <router-view></router-view>
      <!-- Router จัดการการแสดง components ตาม URL , ไม่ต้องกำหนด HomePage ใน App.vue เพราะ router จะจัดการให้ -->
    </main>
  </div>


</template>

<script>
import SidebarMenu from './components/SidebarMenu.vue'




export default {
  name: 'App',
  components: {
    SidebarMenu,
  }
}
</script>

<style scoped>



</style>
