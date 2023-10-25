import { CompetitiveScore, hideItemId, MaterialGame, /*hideItemIdToOthers,*/ MaterialItem, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import { DealRule } from './rules/DealRule'
import { BidRule } from './rules/BidRule'
import { CreateKittyRule } from './rules/CreateKittyRule'
import { PlayCardRule } from './rules/PlayCardRule'
import { ScoringRule } from './rules/ScoringRule'
import { Memory } from './rules/Memory'
import { PoigneeRule } from './rules/PoigneeRule'
import { ChelemRule } from './rules/ChelemRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class TarotRules extends SecretMaterialRules<number, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>
{



  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Kitty]: new PositiveSequenceStrategy(),
      [LocationType.Tricks]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      //[LocationType.Hand]: hideItemIdToOthers,
      [LocationType.Kitty]: (item: MaterialItem) => item.rotation?.y ? ['id'] : [],
      [LocationType.Tricks]: (item: MaterialItem) => item.rotation?.y ? ['id'] : [],
    }
  }

  rules = {
    [RuleId.Deal]: DealRule,
    [RuleId.Bid]: BidRule,
    [RuleId.Chelem]: ChelemRule,
    [RuleId.CreateKitty]: CreateKittyRule,
    [RuleId.PlayCard]: PlayCardRule,
    [RuleId.Scoring]: ScoringRule,
    [RuleId.Poignee]: PoigneeRule,
  }

  getScore(player: number): number {
    return this.remind(Memory.Score, player)
  }

}