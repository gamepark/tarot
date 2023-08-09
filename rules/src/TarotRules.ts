import { MaterialRules, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import { Deal } from './rules/Deal'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class TarotRules extends MaterialRules<number, MaterialType, LocationType> {
  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy()
    }
  }

  rules = {
    [RuleId.Deal]: Deal
  }
}