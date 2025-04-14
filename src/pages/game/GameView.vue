<script setup lang="ts">
import { gameService } from '@/services/game-service'
import GameContainer from '@/shared/game-container/GameContainer.vue'
import GameCard from './game-card/GameCard.vue'
import GameHeader from './game-header/GameHeader.vue'
import { useGame } from '@/composables/useGame'
import { ref, watch } from 'vue'

import GameEnd from './game-end/GameEnd.vue'

const { cards, openCards, state } = useGame()

const handleOpen = (cardKey: number, id: number) => {
  if (!openCards[id]) {
    openCards[id] = true
    gameService.playGame(cardKey, id)
  }
}

const isModalOpen = ref(false)

watch(gameService.isGameLoose, (newVal) => {
  if (newVal) {
    isModalOpen.value = true
  }
})

const restartGame = () => {
  gameService.restartGame()
  isModalOpen.value = false
}
</script>

<template>
  <div class="page">
    <img :src="`/${state.gameMode}.webp`" alt="" class="background" />
    <GameContainer class="game-container">
      <template #content>
        <GameHeader :lives="state.lives" />
        <div class="cards-container">
          <GameCard
            v-for="(card, index) in cards"
            :key="index"
            :img-src="card.imgSrc"
            :card-key="card.key"
            :id="card.id"
            :is-open="openCards[card.id] || false"
            @open="handleOpen"
          />
        </div>
      </template>
    </GameContainer>
    <GameEnd :is-open="isModalOpen">
      <template #header>
        <h2>You've run out of lives.</h2>
      </template>
      <template #content>
        <div>
          <p>Do you want to restart game?</p>
        </div>
      </template>
      <template #buttons>
        <button @click="restartGame">Yes</button>
        <button>NO</button>
      </template>
    </GameEnd>
  </div>
</template>

<style>
.background {
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}
.cards-container {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
.game-container {
  padding: 10px;
  max-width: 580px;
}
</style>
