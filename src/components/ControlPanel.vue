<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import IconLeft from './icons/IconLeft.vue'
import IconNext from './icons/IconNext.vue'
import IconBin from './icons/IconBin.vue'

interface SettingControl {
  value: HTMLElement | null
}

const props = defineProps({
  index: Number,
  imgLength: Number
})

const isOpen = ref(false)

const showSetting = () => {
  isOpen.value = !isOpen.value
}

const settingControl: SettingControl = ref(null)

const handleClickOutside = (event: MouseEvent) => {
  if (settingControl.value && !settingControl.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const emit = defineEmits(['onClickLeft', 'onClickRight', 'onDelete'])

const handleClickLeft = () => {
  emit('onClickLeft', props.index)
  isOpen.value = false
}

const handleClickRight = () => {
  emit('onClickRight', props.index)
  isOpen.value = false
}
const handleDelete = () => {
  emit('onDelete', props.index)
  isOpen.value = false
}
</script>

<template>
  <div ref="settingControl" class="settingControlWrapper">
    <button data-test="settingButton" class="settingButton" @click="showSetting">设定</button>
    <div v-if="isOpen" data-test="buttonContent" class="buttonContent">
      <button
        v-if="index !== 0"
        @click="handleClickLeft"
        ref="btnPrevious"
        class="btnControl borderBottom"
      >
        <IconLeft /> 左へ移動
      </button>
      <button
        v-if="index !== props.imgLength"
        @click="handleClickRight"
        ref="btnRight"
        class="btnControl borderBottom"
      >
        <IconNext />右へ移動
      </button>
      <button @click="handleDelete" ref="btnDelete" class="btnControl redColor">
        <IconBin />面像を削除
      </button>
    </div>
  </div>
</template>

<style scoped>
.settingControlWrapper {
  position: relative;
  display: inline-block;
}
.settingButton {
  background-color: var(--vt-c-dark-crytal);
  color: var(--vt-c-white);
  font-size: 1rem;
  padding: 7px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.buttonContent {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 150px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 2px 5px;
  background-color: var(--vt-c-white);
  border-radius: 4px;
}
.btnControl {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  background-color: var(--vt-c-white);
}
.borderBottom {
  border-bottom: 1px solid var(--vt-c-dark-crytal);
}
</style>
