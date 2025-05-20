<script setup lang="ts">
import GameRules from '@/features/start/components/GameRules.vue'

const {} = useImageLoading()
</script>

<template>
  <img
    src="/bg.webp"
    alt=""
    class="background"
    @load="handleImageLoad"
    :style="`${!isImageLoaded ? 'display:none' : 'display:block'}`"
  />
  <div v-if="!isImageLoaded" class="loader">
    <div class="spinner"></div>
  </div>
  <main class="page" v-else>
    <GameRules />
  </main>
</template>

<style>
.background {
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
