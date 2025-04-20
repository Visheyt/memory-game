import type { Mode } from './types'

export const delayMap: Record<Mode, number> = {
  easy: 7000,
  medium: 5000,
  hard: 3000,
}

export const livesMap: Record<Mode, number> = {
  easy: 3,
  medium: 2,
  hard: 1,
}
