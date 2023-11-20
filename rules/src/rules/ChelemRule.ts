import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";
import { maxBy } from "lodash";


export class ChelemRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const move = [this.rules().customMove(CustomMoveType.TakeChelem, true), this.rules().customMove(CustomMoveType.TakeChelem, false)]
    return move
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
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}