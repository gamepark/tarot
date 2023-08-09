import { MaterialGameSetup } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { TarotOptions } from './TarotOptions'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class TarotSetup extends MaterialGameSetup<number, MaterialType, LocationType, TarotOptions> {
  setupMaterial(_options: TarotOptions) {
  }

  start() {
    return { id: RuleId.PlayerTurn, player: this.game.players[0] }
  }
}