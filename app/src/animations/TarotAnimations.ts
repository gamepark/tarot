import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

export const tarotAnimations = new MaterialGameAnimations()

tarotAnimations.when().rule(RuleId.Deal).move(isMoveItem).duration(0.2)
tarotAnimations.when()
  .move(move => isMoveItem(move) && move.location.type === LocationType.Tricks)
  .duration(0.3)
