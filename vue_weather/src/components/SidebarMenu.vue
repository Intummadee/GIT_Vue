<template>
  <div>
    <div class="flex flex-col" style="width:25%">
      <!-- ใช้ v-for สำหรับการวนลูปในรายการ navLinks -->
      <div v-for="list in navLinks" :key="list.id">
        <h1>{{ list.title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      navLinks: [
        {id:1, title:"Home"},
        {id:2, title:"Weather"}
      ],
    }
  },
}
</script>

<style>

</style>
