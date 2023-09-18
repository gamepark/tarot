import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'
import { isKittyStarted } from './BidRule'
import { RuleId } from './RuleId'

export class CreateKittyRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ rotation: { y: 0 } }),

      ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Hand, player: this.player } })
    )

    return moves
  }

  getPlayerMoves() {
    const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)

    return playerCards.moveItems({ location: { type: LocationType.Kitty }, rotation: { y: 1 } })
  }


  afterItemMove() {

    const kittySize = this.game.players.length === 5 ? 3 : 6
    const kittyStarted = this.remind<isKittyStarted>(Memory.IsKittyStarted).bool


    if (this.material(MaterialType.Card).location(LocationType.Kitty).length == kittySize && kittyStarted == true) {
      this.memorize(Memory.NumberPlayedCards, { value: 0 })
      return [
        this.rules().startPlayerTurn(RuleId.PlayersTurns, 1)
      ]
    } else if (this.material(MaterialType.Card).location(LocationType.Kitty).length === 1) {
      this.memorize(Memory.IsKittyStarted, { bool: true })
    }

    return []
  }

}
