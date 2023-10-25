import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";


export class ChelemRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {

    const move = [this.rules().customMove(CustomMoveType.TakeChelem)]

  
    this.memorize(Memory.ChelemAnnounced, this.player)

      return move
  }


  afterItemMove() {

    return [
      this.rules().startRule(RuleId.CreateKitty),
    ]

  }
}