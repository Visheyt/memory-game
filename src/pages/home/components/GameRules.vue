<script setup lang="ts">
import router from '@/router'
import { gameService, type Mode } from '@/services/game-service'
import GameContainer from '@/shared/game-container/GameContainer.vue'

const startGame = (mode: Mode) => {
  gameService.chooseMode(mode)

  router.push('/game')
}
</script>

<template>
  <GameContainer>
    <template #content>
      <h1>Welcome to the Genshin impact Memory game</h1>
      <div class="rules">
        <p>
          The rules of the game are as follows: <br />
          1. For a limited amount of time, cards with character icons will appear — your task is to
          remember their order. <br />
          2. Then the cards will disappear, and you’ll need to open them in pairs. <br />
          3. If you correctly match a pair of cards, you earn 1 point! If not, you lose 1 life.
          <br />
          4. Once you run out of lives, you lose the game. <br />
          5. If you manage to open all the cards, you win the game! <br />
          6. The game features music, so please wear headphones!
        </p>
      </div>
      <div class="difficulty">
        <h2>Choose difficulty:</h2>
        <div class="buttons">
          <button @click="startGame('easy')">Easy</button>
          <button @click="startGame('medium')">Medium</button>
          <button @click="startGame('hard')">Hard</button>
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
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(148, 148, 148, 0.345);
  cursor: pointer;
}
</style>
