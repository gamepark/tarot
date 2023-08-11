import { PlayerTurnRule } from '@gamepark/rules-api'
import { bids } from './Bid'
import { CustomMoveType } from './CustomMoveType'

export class BidRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves = [this.rules().customMove(CustomMoveType.Pass)]
    moves.push(...bids.map(bid => this.rules().customMove(CustomMoveType.Bid,bid)))
    return moves
  }
}