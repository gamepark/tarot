import { MaterialGameSetup} from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import { cards } from './Card'
import { Memory } from './rules/Memory'
import { TarotRules } from './TarotRules'

/**
 * This class creates a new Game based on the game options
 */
export class TarotSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  Rules = TarotRules

  setupMaterial() {
    this.material(MaterialType.Card).createItems(cards.map(card => ({ id: card, location: { type: LocationType.Deck } })))
    for (const player of this.game.players) {
      this.memorize(Memory.Score,0,player)
    }
    this.memorize(Memory.Round,1)
  }

  dealCards() {
    const cardsPerPlayer = this.game.players.length === 3 ? 24 : 4 ? 18 : 15
    for (const player of this.players) {
      this.dealPlayerCards(player, cardsPerPlayer)
    }
  }

  dealPlayerCards(player: number, quantity: number) {
    this.material(MaterialType.Card).location(LocationType.Deck)
      .sort(item => -item.location.x!).limit(quantity)
      .moveItems({ location: { type: LocationType.Hand, player } })
  }


  start() {
    this.startPlayerTurn(RuleId.Deal, this.players[this.players.length-1])
  }
}