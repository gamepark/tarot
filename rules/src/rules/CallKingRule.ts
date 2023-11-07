import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";
import { Card, isColor } from "../Card";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";


export class CallKingRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return this.cardsICanCall.map(card => this.rules().customMove(CustomMoveType.CallKing, card))
  }

  get cardsICanCall(): Card[] {
    const cards: Card[] = []
    const playerHand = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    let figure = 14 //kings    
    do {
      cards.push(...cards.filter(card => isColor(card) && card % 100 === figure))
      figure--
    } while (cards.every(card => playerHand.id(card).length > 0))

    return cards
  }

  onCustomMove(move: CustomMove): MaterialMove[] {

    if (move.type === CustomMoveType.CallKing) {
      this.memorize(Memory.CallKing, move.data)
    }

    return [
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}