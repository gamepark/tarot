import { isMoveItemTypeAtOnce, MaterialMove, MoveItemsAtOnce } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { getPoigneeMinTrumps, poignees } from '@gamepark/tarot/rules/Poignee'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import equal from 'fast-deep-equal'

export const getValidPoignee = (rules: TarotRules, legalMoves: MaterialMove<number, MaterialType, LocationType>[]) => {
  const selectedCards = rules.material(MaterialType.Card).location(LocationType.Hand).selected()
  const selectedIndexes = selectedCards.getIndexes().sort()
  const move = legalMoves.find((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && equal(move.indexes, selectedIndexes))
  const poigneeMinTrumps = getPoigneeMinTrumps(rules.game.players.length)
  const validPoignee = poignees.find((p) => poigneeMinTrumps[p] === selectedIndexes.length)
  return { validPoignee, move: move as MoveItemsAtOnce | undefined }
}