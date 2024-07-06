<template>
  <Teleport to="body">    <!-- Let's modify <MyModal> to use <Teleport> -> Structure ex. <Teleport to="body"> it's provides a clean way to work -->
    <!-- ย้ายเนื้อหาทั้งหมดภายใน Teleport ไปไว้ที่ <body> ของเอกสาร HTML -->
    <Transition name="modal-outer">
      <!-- ใช้ชื่อ "modal-outer" สำหรับ CSS classes ในการทำ animation -->
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white self-start mt-32 max-w-screen-md"
          >
            <slot />
            <button
              class="text-white mt-8 bg-weather-primary py-2 px-6"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
.modal-outer-enter-active, /* enter-active ใช้สำหรับช่วงที่ element กำลังเข้ามาในหน้าจอ */
.modal-outer-leave-active { /* leave-active ใช้สำหรับช่วงที่ element กำลังออกจากหน้าจอ */
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
 
  
}

.modal-outer-enter-from, /* enter-from = กำหนดสถานะเริ่มต้นของ element ก่อนที่จะเริ่มเข้ามา */
.modal-outer-leave-to { /* leave-to = กำหนดสถานะสุดท้ายของ element หลังจากที่ออกไปแล้ว */
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
