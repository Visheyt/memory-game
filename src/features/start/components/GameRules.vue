<script setup lang="ts">
import router from '@/router'
import CustomButton from '@/shared/CustomButton.vue'
import GameContainer from '@/shared/game-container/GameContainer.vue'
import { useGameStore } from '@/store/game/index'
import type { Mode } from '@/store/game/types'

const store = useGameStore()

const startGame = (mode: Mode) => {
  store.setMode(mode)
  store.startGame()
  router.push('/game')
}
</script>

<template>
  <GameContainer>
    <template #content>
      <h1>Welcome to the Genshin impact Memory game</h1>
      <ul class="rules">
        <h3>The rules of the game are as follows:</h3>

        <li>
          1. For a limited amount of time, cards with character icons will appear — your task is to
          remember their order.
        </li>
        <li>2. Then the cards will disappear, and you’ll need to open them in pairs.</li>
        <li>
          3. If you correctly match a pair of cards, you earn 1 point! If not, you lose 1 life.
        </li>
        <li>4. Once you run out of lives, you lose the game.</li>
        <li>5. If you manage to open all the cards, you win the game!</li>
        <li>6. The game features music, so please wear headphones!</li>
      </ul>
      <div class="difficulty">
        <h2>Choose difficulty:</h2>
        <div class="buttons">
          <CustomButton @button-click="startGame('easy')">Easy</CustomButton>
          <CustomButton @button-click="startGame('medium')">Medium</CustomButton>
          <CustomButton @button-click="startGame('hard')">Hard</CustomButton>
        </div>
      </div>
    </template>
  </GameContainer>
</template>

<style>
.rules {
  font-size: 20px;
  line-height: 40px;
}
.difficulty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.buttons {
  display: flex;
  gap: 20px;
}
button {
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  background-color: inherit;
  cursor: pointer;
  color: black;
  position: relative;
}
</style>
