import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";


export class CallKingRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const move = [this.rules().customMove(CustomMoveType.TakeChelem, true), this.rules().customMove(CustomMoveType.TakeChelem, false)]
    return move
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.TakeChelem && move.data === true) {
      this.memorize(Memory.ChelemAnnounced, this.player)
    }
    return [
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}