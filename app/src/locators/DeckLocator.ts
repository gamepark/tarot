import { DeckLocator } from '@gamepark/react-game'

export class TarotDeckLocator extends DeckLocator {
  hidden = true
  coordinates = { x: -10, y: -10, z: 0 }
  delta = { x: -0.05, y: -0.05, z: 0.1 }
}