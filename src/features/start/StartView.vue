<script setup lang="ts">
import GameRules from '@/features/start/components/GameRules.vue'
import SpinnerComponent from '@/shared/components/SpinnerComponent.vue'
import { useImageLoading } from '@/shared/composables/audio/useImageLoading'

const { handleImageLoad, isImageLoaded } = useImageLoading()
</script>

<template>
  <img
    src="/bg.webp"
    alt=""
    class="background"
    @load="handleImageLoad"
    :style="`${!isImageLoaded ? 'display:none' : 'display:block'}`"
  />
  <SpinnerComponent v-if="!isImageLoaded" />
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
</style>
