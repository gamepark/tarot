import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { cards } from '../Card'

export class DealRule extends MaterialRulesPart {
  getAutomaticMoves() {
    const moves: MaterialMove[] = []
    const kittySize = this.game.players.length === 5 ? 3 : 6
    const handSize = (cards.length - kittySize) / this.game.players.length

    for (const player of this.game.players) {
      moves.push(
        ...this.material(MaterialType.Card)
          .filter(item => item.location.x! >= (player - 1) * handSize && item.location.x! < (player) * handSize)
          .moveItems({ location: { type: LocationType.Hand, player } }))
    }


    moves.push(
      ...this.material(MaterialType.Card)
        .sort(item => - item.location.x!)
        .limit(kittySize)
        .moveItems({ location: { type: LocationType.Kitty }, rotation: { y: 1 } }))

    moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.game.players[0]))


    return moves
  }
  
}