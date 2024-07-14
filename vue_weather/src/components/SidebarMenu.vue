<template>
  <div class="flex flex-col bg-second h-screen px-5">
      <!-- ใช้ v-for สำหรับการวนลูปในรายการ navLinks -->
      <div v-for="list in navLinks" :key="list.id" class="pb-10">
        <router-link to="/" class="text-secondary hover:text-white">{{ list.title }}</router-link>
      </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      navLinks: [
        {id:1, title:"Home"},
        {id:2, title:"PM"}
      ],
    }
  },
}
</script>

<style scoped>

</style>
