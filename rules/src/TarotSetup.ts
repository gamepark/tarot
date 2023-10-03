import { MaterialGameSetup, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import { cards } from './Card'
import { Memory } from './rules/Memory'

/**
 * This class creates a new Game based on the game options
 */
export class TarotSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy()
    }
  }

  setupMaterial() {
    this.material(MaterialType.Card).createItems(cards.map(card => ({ id: card, location: { type: LocationType.Deck } })))
    this.material(MaterialType.Card).shuffle()
    for (const player of this.game.players) {
      this.memorize(Memory.Score,0,player)
    }
  }

  start() {
    return { id: RuleId.Deal }
  }
}