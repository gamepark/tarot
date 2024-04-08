import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { maxBy } from 'lodash'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'


export class ChelemRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return [this.rules().customMove(CustomMoveType.TakeChelem, true), this.rules().customMove(CustomMoveType.TakeChelem, false)]
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.TakeChelem && move.data === true) {
      this.memorize(Memory.ChelemAnnounced, this.player)
    }

    if (this.game.players.length === 5) {
      const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
      return [
        this.rules().startPlayerTurn(RuleId.CallKing, preneur!)
      ]
    }
    return [
      this.rules().startSimultaneousRule(RuleId.CreateKitty)
    ]
  }
}