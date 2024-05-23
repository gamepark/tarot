import {
  CompetitiveScore,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { AcknowledgePoigneeRule } from './rules/AcknowledgePoigneeRule'
import { BidRule } from './rules/BidRule'
import { CallCardRule } from './rules/CallCardRule'
import { ChelemRule } from './rules/ChelemRule'
import { CreateKittyRule } from './rules/CreateKittyRule'
import { DealRule } from './rules/DealRule'
import { Memory } from './rules/Memory'
import { PlayCardRule } from './rules/PlayCardRule'
import { PoigneeRule } from './rules/PoigneeRule'
import { RuleId } from './rules/RuleId'
import { ScoringRule } from './rules/ScoringRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class TarotRules extends SecretMaterialRules<number, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number> {

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Kitty]: new PositiveSequenceStrategy(),
      [LocationType.Tricks]: new PositiveSequenceStrategy(),
      [LocationType.Ecart]: new PositiveSequenceStrategy()

    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers,
      [LocationType.Kitty]: (item: MaterialItem) => item.location.rotation ? [] : ['id'],
      [LocationType.Tricks]: (item: MaterialItem) => item.location.rotation ? [] : ['id'],
      [LocationType.Ecart]: (item: MaterialItem) => item.location.rotation ? [] : ['id']
    }
  }

  rules = {
    [RuleId.Deal]: DealRule,
    [RuleId.Bid]: BidRule,
    [RuleId.Chelem]: ChelemRule,
    [RuleId.CallKing]: CallCardRule,
    [RuleId.CreateKitty]: CreateKittyRule,
    [RuleId.PlayCard]: PlayCardRule,
    [RuleId.Scoring]: ScoringRule,
    [RuleId.Poignee]: PoigneeRule,
    [RuleId.AcknownledgePoignee]: AcknowledgePoigneeRule
  }

  /*keepMoveSecret(move: MaterialMove<number, MaterialType, LocationType>, playerId?: number): boolean {
    if (this.game.rule?.id === RuleId.CreateKitty) {
      const preneur = new RulesUtil(this.game).preneur!
      console.log(preneur, playerId)
      if (preneur === playerId) return false
      return (isCustomMoveType(CustomMoveType.AcknowledgeKitty)(move) && move.data === preneur)
        || (isMoveItemType(MaterialType.Card)(move) && !move.location.rotation)
    }
    return false
  }*/

  getScore(player: number): number {
    return this.remind(Memory.Score, player)
  }

}