import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { cards } from '../Card'
import { Memory } from './Memory'

export class DealRule extends MaterialRulesPart {
  onRuleStart() {

    const moves: MaterialMove[] = []
    const kittySize = this.game.players.length === 5 ? 3 : 6
    const handSize = (cards.length - kittySize) / this.game.players.length
    const nextPlayer = this.remind(Memory.GoToDealMoves)

    for (const player of this.game.players) {
      let i=0
      i++
      console.log("je distribue : ",i)
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Deck)
          .filter(item => item.location.x! >= (player - 1) * handSize && item.location.x! < (player) * handSize)
          .moveItems({ type: LocationType.Hand, player } ))
    }


    moves.push(
      ...this.material(MaterialType.Card)
        .sort(item => - item.location.x!)
        .limit(kittySize)
        .moveItems({ type: LocationType.Kitty, rotation: true } ))


    if (nextPlayer === undefined) {
      moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.game.players[0]))

    } else { moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.game.players[nextPlayer])) 
    }

    return moves
  }

}