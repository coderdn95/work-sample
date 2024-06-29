<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images?: string[]
}>()

const localImages = computed(() => props.images ?? [])
</script>

<template>
  <aside class="banner">
    <p class="bannerDes">商品写真</p>
    <div class="previewBox" v-for="(item, index) in localImages" :key="index">
      <img :src="item" data-test="imageItem" class="imageItem" />
    </div>
  </aside>
</template>

<style scoped>
.banner {
  width: 350px;
  min-height: 500px;
  background-color: var(--vt-c-grey-light);
  padding: 20px;
}
.bannerDes {
  font-weight: bold;
}

.imageItem {
  max-width: 100%;
  overflow: hidden;
}
</style>
