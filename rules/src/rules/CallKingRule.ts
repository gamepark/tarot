import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";
import { Colors } from "./Colors";


export class CallKingRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const move = [this.rules().customMove(CustomMoveType.CallKing, Colors.Heart),
    this.rules().customMove(CustomMoveType.CallKing, Colors.Diamond),
    this.rules().customMove(CustomMoveType.CallKing, Colors.Club),
    this.rules().customMove(CustomMoveType.CallKing, Colors.Spade)]
    return move
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.CallKing) {
      switch (move.data) {
        case Colors.Heart:
          this.memorize(Memory.CallKing, { player: this.player, color: Colors.Heart })
          break;
        case Colors.Diamond:
          this.memorize(Memory.CallKing, { player: this.player, color: Colors.Diamond })
          break;
        case Colors.Club:
          this.memorize(Memory.CallKing, { player: this.player, color: Colors.Club })
          break;
        default:
          this.memorize(Memory.CallKing, { player: this.player, color: Colors.Spade })
      }
    }

    return [
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}