<script setup lang="ts">
import GameContainer from '@/shared/game-container/GameContainer.vue'
import { onMounted, ref, watch } from 'vue'
import { useGameStore } from '@/store/game/index'
import GameHeader from '@/features/game/components/game-header/GameHeader.vue'
import GameCard from '@/features/game/components/game-card/GameCard.vue'
import GameEnd from '@/features/game/components/game-end/GameEnd.vue'
import { useGame } from '@/features/game/composables/useGame'
import router from '@/router'

const { cards, openCards, startGame, playGame, restartGame } = useGame()

const gameStore = useGameStore()

const handleOpen = (cardKey: number, id: number) => {
  if (!openCards[id]) {
    openCards[id] = true
    playGame(cardKey, id)
  }
}

const isModalOpen = ref(false)

watch(
  () => gameStore.isGameLoose,
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

const backToStartScreen = () => {
  gameStore.reset()
  gameStore.isGameStarted = false
  router.push('/')
}
</script>

<template>
  <div class="page">
    <img :src="`/${gameStore.mode}.webp`" alt="" class="background" />
    <GameContainer class="game-container">
      <template #content>
        <GameHeader />
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
        <h2 v-if="gameStore.isGameLoose">You've run out of lives.</h2>
        <h2 v-else>Congratulations you win!</h2>
      </template>
      <template #content>
        <div>
          <p>Do you want to restart the game, or try another level of difficulty?</p>
        </div>
      </template>
      <template #buttons>
        <button @click="newGame">Yes</button>
        <button @click="backToStartScreen">NO</button>
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
.game-container {
  min-height: auto;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  height: 100%;
  padding: 10px;
  justify-items: center;
}
.game-container {
  padding: 10px;
  max-width: 580px;
}
</style>
