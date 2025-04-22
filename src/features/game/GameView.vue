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
        <Transition name="slide-fade-height" mode="out-in">
          <div :key="gameStore.isGameWin || gameStore.isGameLoose ? 'end' : 'cards'">
            <GameEnd
              v-if="gameStore.isGameLoose || gameStore.isGameWin"
              @to-start-screen="backToStartScreen"
              @new-game="newGame"
            />
            <div v-else class="cards-container">
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
          </div>
        </Transition>
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

.slide-fade-height-enter-active,
.slide-fade-height-leave-active {
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
  overflow: hidden;
}

.slide-fade-height-enter-from,
.slide-fade-height-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-fade-height-enter-to,
.slide-fade-height-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
