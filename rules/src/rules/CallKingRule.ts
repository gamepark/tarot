import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";


export class CallKingRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const move = [this.rules().customMove(CustomMoveType.CallKing, "heart"),
    this.rules().customMove(CustomMoveType.CallKing, "diamond"),
    this.rules().customMove(CustomMoveType.CallKing, "club"),
    this.rules().customMove(CustomMoveType.CallKing, "spade")]
    return move
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.CallKing) {

      switch (move.data) {
        case "heart":
          this.memorize(Memory.CallKing, { player: this.player, color: "heart" })
          break;
        case "diamond":
          this.memorize(Memory.CallKing, { player: this.player, color: "diamond" })
          break;
        case "club":
          this.memorize(Memory.CallKing, { player: this.player, color: "club" })
          break;
        default:
          this.memorize(Memory.CallKing, { player: this.player, color: "spade" })
      }

    }

    return [
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}