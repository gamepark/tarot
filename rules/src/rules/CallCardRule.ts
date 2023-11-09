import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";
import { CustomMoveType } from "./CustomMoveType";
import { Card, cards, isColor } from "../Card";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";


export class CallCardRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return this.cardsICanCall.map(card => this.rules().customMove(CustomMoveType.CallKing, card))
  }

  get cardsICanCall(): Card[] {
    const playerHand = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const allCards = cards
    const cardsToReturn: Card[] = []
    let figure = 14 //kings    
    let figuresInPlayerHand: Card[] = []
    do {
      cardsToReturn.push(...allCards.filter(card => isColor(card) && card % 100 === figure))
      figuresInPlayerHand.push(...playerHand.filter(card => isColor(card.id) && card.id % 100 === figure).getItems().map(item => item.id)) 
      figure--
    } while (figuresInPlayerHand.length !== 0 && figuresInPlayerHand.length % 4 === 0)

    return cardsToReturn
  }

  onCustomMove(move: CustomMove): MaterialMove[] {

    if (move.type === CustomMoveType.CallKing) {
      this.memorize(Memory.CalledCard, move.data)
    }

    return [
      this.rules().startRule(RuleId.CreateKitty)
    ]
  }
}