import { AnimationStep } from '@gamepark/react-client'
import { MaterialGameAnimationContext, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType, isMoveItemTypeAtOnce, isStartRule, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

class TarotMaterialAnimation extends  MaterialGameAnimations {
  getDuration(move: MaterialMove, context: MaterialGameAnimationContext): number {
    if (isStartRule(move) && move.id === RuleId.SolveTrick && context.step === AnimationStep.AFTER_MOVE) return 2 + (context.game.players.length === 5? 0.5: 0)
    return super.getDuration(move, context)
  }
}

export const tarotAnimations = new TarotMaterialAnimation()

tarotAnimations.when().rule(RuleId.Deal).move(isMoveItem).duration(0.2)
tarotAnimations.when()
  .move(move => isMoveItem(move) && move.location.type === LocationType.Tricks)
  .duration(0.3)

tarotAnimations.when()
  .move(move => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Table)
  .duration(0.4)

tarotAnimations
  .when()
  .move(isMoveItemTypeAtOnce(MaterialType.Card))
  .duration(0.2)
