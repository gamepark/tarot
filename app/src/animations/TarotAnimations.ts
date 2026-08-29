import { AnimationStep } from '@gamepark/react-client'
import { and, isRule, MaterialGameAnimationContext, MaterialGameAnimations } from '@gamepark/react-game'
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

tarotAnimations.configure(and(isRule(RuleId.Deal), isMoveItem)).duration(200)
tarotAnimations
  .configure(move => isMoveItem(move) && move.location.type === LocationType.Tricks)
  .duration(300)

tarotAnimations
  .configure(move => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Table)
  .duration(400)

tarotAnimations
  .configure(isMoveItemTypeAtOnce(MaterialType.Card))
  .duration(200)
