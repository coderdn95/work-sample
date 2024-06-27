<script setup lang="ts">
import IconFolder from './icons/IconFolder.vue'
const props = defineProps({
  event: Event
})
const emit = defineEmits(['onFileChange'])
</script>

<template>
  <div class="uploadBtnWrapper">
    <input
      type="file"
      multiple
      name="upload-file"
      id="upload-file"
      v-on:change="emit('onFileChange')"
      hidden
    />
    <label for="upload-file" refs="upload-file" class="uploadBtn"
      ><IconFolder />ファイルを選択する</label
    >
  </div>
</template>

<style scoped>
.uploadBtnWrapper {
  display: inline-block;
}
.uploadBtn {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--vt-c-dark-light);
  border: 1px solid var(--vt-c-dark);
  padding: 4px;
  border-radius: 4px;
  font-weight: normal;
}
</style>
