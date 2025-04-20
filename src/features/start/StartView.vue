<script setup lang="ts">
import GameRules from '@/features/start/components/GameRules.vue'
</script>

<template>
  <main class="page">
    <img src="/bg.webp" alt="" class="background" />
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
