import { reactive, readonly, ref } from 'vue'
import { Cards } from './data/cards'

export type Mode = 'easy' | 'medium' | 'hard'

type GameStats = {
  isGameStarted: boolean
  gameMode: Mode
  lives: number
}

type MismatchEvent = { firstCardId: number; secondCardId: number } | null

export class GameService {
  private gameState = reactive<GameStats>({
    isGameStarted: false,
    gameMode: 'easy',
    lives: 3,
  })

  private gameCards = Cards

  private scoreCounter = 12

  private firstCardId: null | number = null

  private secondCardId: null | number = null

  private pressedCardKey: null | number = null

  private mismatchEvent = ref<MismatchEvent>(null)

  public startGame = () => {
    this.gameState.isGameStarted = true
    this.shuffleCards()
  }

  public restartGame = () => {
    this.gameState.lives = 3
  }

  public chooseMode = (mode: Mode) => {
    switch (mode) {
      case 'easy':
        this.easyMode()
        break
      case 'medium':
        this.mediumMode()
        break
      case 'hard':
        this.hardMode()
        break
    }
  }

  private easyMode = () => {
    this.gameState.gameMode = 'easy'
    this.gameState.lives = 3
    this.gameState.isGameStarted = true
  }

  private mediumMode = () => {
    this.gameState.gameMode = 'medium'
    this.gameState.lives = 2
    this.gameState.isGameStarted = true
  }

  private hardMode = () => {
    this.gameState.gameMode = 'hard'
    this.gameState.lives = 1
    this.gameState.isGameStarted = true
  }

  public playGame = (key: number, id: number) => {
    if (!this.pressedCardKey) {
      this.pressedCardKey = key
      this.firstCardId = id
      return
    }

    if (this.pressedCardKey === key) {
      this.scoreCounter -= 1
      this.resetCardsId()
    } else {
      this.secondCardId = id
      this.mismatchEvent.value = { firstCardId: this.firstCardId!, secondCardId: this.secondCardId }
      this.gameState.lives -= 1

      setTimeout(() => {
        this.resetCardsId()
        this.mismatchEvent.value = null
      }, 100)
    }
  }

  public getMismatchEvent = () => this.mismatchEvent

  private resetCardsId = () => {
    this.firstCardId = null
    this.secondCardId = null
    this.pressedCardKey = null
  }

  private shuffleCards = () => {
    this.gameCards = this.gameCards.map((card) => ({ ...card })).sort(() => Math.random() - 0.5)
  }

  public getCards = () => {
    return this.gameCards
  }

  public getState = () => readonly(this.gameState)
}

export const gameService = new GameService()
