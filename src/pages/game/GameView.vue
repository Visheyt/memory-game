<script setup lang="ts">
import GameContainer from '@/shared/game-container/GameContainer.vue'
import GameCard from './game-card/GameCard.vue'
import GameHeader from './game-header/GameHeader.vue'
import { useGame } from '@/composables/useGame'
import { onMounted, ref, watch } from 'vue'

import GameEnd from './game-end/GameEnd.vue'
import { useGameStore } from '@/store/game'

const { cards, openCards, startGame, playGame, restartGame } = useGame()

const store = useGameStore()

const handleOpen = (cardKey: number, id: number) => {
  if (!openCards[id]) {
    openCards[id] = true
    playGame(cardKey, id)
  }
}

const isModalOpen = ref(false)

watch(
  () => store.isGameLoose,
  (newVal) => {
    if (newVal) {
      isModalOpen.value = true
    }
  },
)

const newGame = () => {
  restartGame()
  isModalOpen.value = false
}

onMounted(() => {
  startGame()
})
</script>

<template>
  <div class="page">
    <img :src="`/${store.mode}.webp`" alt="" class="background" />
    <GameContainer class="game-container">
      <template #content>
        <GameHeader :lives="store.lives" />
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
        <button @click="newGame">Yes</button>
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
