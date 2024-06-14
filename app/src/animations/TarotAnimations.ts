import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { RuleId } from '@gamepark/tarot/rules/RuleId'

export const tarotAnimations = new MaterialGameAnimations()

tarotAnimations.when().rule(RuleId.Deal).move(isMoveItem).duration(0.2)
tarotAnimations.when()
  .move(move => isMoveItem(move) && move.location.type === LocationType.Tricks)
  .duration(0.3)

tarotAnimations.when()
  .move(move => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Table)
  .duration(0.4)

  tarotAnimations.when()
  .move(move => isMoveItemType(MaterialType.Card)(move)  && move.location.type === LocationType.Tricks) // TODO : && Condition 1 seule carte sur la table.
  .duration(1)
