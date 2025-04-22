<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>
<template>
  <div class="container" :class="{ appear: isVisible }">
    <slot name="content"></slot>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.737);
  border-radius: 5px;
  padding: 50px;
  min-height: 580px;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  justify-content: space-between;
  overflow: hidden;
  opacity: 0;
  transform: scale(0);
  transition:
    transform 0.7s ease,
    opacity 0.9s ease;
  @media (max-width: 768px) {
    padding: 20px;
  }
}
.container.appear {
  opacity: 1;
  transform: scale(1);
}
</style>
