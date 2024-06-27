<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import IconSuccess from './icons/IconSuccess.vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const state = reactive({
  show: true
})

const closeModal = () => {
  state.show = false
}

const autoClose = () => {
  setTimeout(() => {
    closeModal()
  }, props.duration)
}

onMounted(() => {
  autoClose()
})
</script>

<template>
  <transition name="modalFade">
    <div class="successModal" v-if="state.show">
      <div class="modalOverlay" @click="closeModal"></div>
      <div class="modalContent">
        <div class="iconContainer">
          <IconSuccess />
        </div>
        <div class="textContainer">
          <h2 class="modalTitle">Success!</h2>
          <p class="message">{{ message }}</p>
        </div>
        <button class="closeButton" @click="closeModal">Close</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.successModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modalOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modalContent {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
  position: relative;
}

.textContainer {
  margin-bottom: 20px;
}

.modalTitle {
  font-size: 24px;
  color: #333;
}

.message {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.closeButton {
  background-color: var(--vt-c-green);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.closeButton:hover {
  background-color: var(--vt-c-green-light);
}
</style>
