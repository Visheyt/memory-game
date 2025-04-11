<script setup lang="ts">
import router from '@/router'
import { gameService } from '@/services/game-service'
import GameContainer from '@/shared/game-container/GameContainer.vue'

import GameCard from './game-card/GameCard.vue'
import GameHeader from './game-header/GameHeader.vue'
import { onMounted, reactive, watch } from 'vue'

const cards = gameService.getCards()
const state = gameService.getState()
const openCards = reactive<Record<number, boolean>>({})

cards.forEach((card) => {
  openCards[card.id] = true
})

const misMatchEvent = gameService.getMismatchEvent()

watch(misMatchEvent, (value) => {
  if (value) {
    const { firstCardId, secondCardId } = value
    setTimeout(() => {
      openCards[firstCardId] = false
      openCards[secondCardId] = false
    }, 1000)
  }
})

if (!state.isGameStarted) {
  router.push('/')
}

const handleOpen = (cardKey: number, id: number) => {
  if (!openCards[id]) {
    openCards[id] = true
    gameService.playGame(cardKey, id)
  }
}

onMounted(() => {
  setTimeout(() => {
    cards.forEach((card) => {
      openCards[card.id] = false
    })
  }, 2000)
})
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
