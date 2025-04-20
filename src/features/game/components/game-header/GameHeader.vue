<script setup lang="ts">
import HeartIcon from '@/shared/icons/HeartIcon.vue'

import { useGameStore } from '@/store/game/index'
import GameMusic from '../game-music/GameMusic.vue'

const gameStore = useGameStore()
</script>

<template>
  <header>
    <div class="icons">
      <HeartIcon v-for="n in gameStore.lives" :key="n" />
    </div>
    <GameMusic :music-src="gameStore.musicSrc" />
  </header>
</template>

<style>
header {
  padding-inline: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.icons {
  display: flex;
  gap: 5px;
}
.icons svg {
  width: 25px;
}
</style>
