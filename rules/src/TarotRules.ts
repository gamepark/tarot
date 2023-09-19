import { hideItemId, hideItemIdToOthers, MaterialItem, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import { DealRule } from './rules/DealRule'
import { BidRule } from './rules/BidRule'
import { CreateKittyRule } from './rules/CreateKittyRule'
import { PlayCardRule } from './rules/PlayCardRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class TarotRules extends SecretMaterialRules<number, MaterialType, LocationType> {

  isOver(): boolean {
    return false
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Kitty]: new PositiveSequenceStrategy(),
      [LocationType.Table]: new PositiveSequenceStrategy(),
      [LocationType.Tricks]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers,
      [LocationType.Kitty]: (item: MaterialItem) => item.rotation?.y ? ['id'] : [],
      [LocationType.Tricks]: hideItemId
    }
  }

  rules = {
    [RuleId.Deal]: DealRule,
    [RuleId.Bid]: BidRule,
    [RuleId.CreateKitty]: CreateKittyRule,
    [RuleId.PlayCard]: PlayCardRule
  }
}