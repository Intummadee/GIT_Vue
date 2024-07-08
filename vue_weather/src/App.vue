<template>
  
  <!-- App.vue เป็นเพียง layout หลัก -->
  <div class="bg-first h-full max-h-full flex flex-row">
    <SidebarMenu class="pt-6"  />
    <main class="px-6 pt-6 w-full">
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
