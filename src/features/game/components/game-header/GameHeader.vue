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
    <h3>
      {{
        `${gameStore.mode[0].toUpperCase() + gameStore.mode.slice(1, gameStore.mode.length)} level`
      }}
    </h3>
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
  width: 22px;
}
@media (max-width: 500px) {
  .icons svg {
    width: 17px;
  }
}
</style>
