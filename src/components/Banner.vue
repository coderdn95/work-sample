<script setup lang="ts">
const props = defineProps({
  images: []
})
</script>

<template>
  <aside class="banner">
    <p class="bannerDes">商品写真</p>
    <div class="previewBox" v-for="(item, index) in props.images" :key="index">
      <img :src="item.path" data-test="imageItem" class="imageItem" />
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
