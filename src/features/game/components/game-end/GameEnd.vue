<script setup lang="ts">
import { useGameStore } from '@/store/game'

const gameState = useGameStore()

const emit = defineEmits(['toStartScreen', 'newGame'])

const toStartScreen = () => {
  emit('toStartScreen')
}

const newGame = () => {
  emit('newGame')
}
</script>

<template>
  <div class="game-end">
    <header class="header">
      <h2>
        {{
          gameState.isGameLoose ? "You've run out of lives." : 'Congratulations! You win this game!'
        }}
      </h2>
    </header>
    <div class="content">
      <p>Do you want to restart the game, or try another level of difficulty?</p>
    </div>
    <div class="buttons">
      <button @click="newGame">Yes</button>
      <button @click="toStartScreen">NO</button>
    </div>
  </div>
</template>

<style>
.game-end {
  width: 100%;
  height: 100%;
  gap: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
