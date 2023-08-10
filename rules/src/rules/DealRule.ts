import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'

export class DealRule extends MaterialRulesPart {
  getAutomaticMoves() {
    const moves: MaterialMove[] = []
    moves.push(
      ...this.material(MaterialType.Card)
        .location(LocationType.Deck)
        .limit(this.game.players.length === 5 ? 3 : 6)
        .moveItems({ location: { type: LocationType.Kitty } }))

    moves.push(
      ...this.material(MaterialType.Card)
        .location(LocationType.Deck)
        .limit(this.game.players.length === 3 ? 24 : (this.game.players.length === 4 ? 18 : 15))
        .sort(item => -item.location.x!).limit(6)
        .moveItems({ location: { type: LocationType.Hand, player:0   } }))
      

    moves.push(
      ...this.material(MaterialType.Card)
        .location(LocationType.Deck)
        .limit(this.game.players.length === 3 ? 24 : (this.game.players.length === 4 ? 18 : 15))
        .moveItems({ location: { type: LocationType.Hand, player:1  } }))



    moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.game.players[0]))

    return moves
  }
}