import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
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


  afterItemMove(move: ItemMove) {

    const kittySize = this.game.players.length === 5 ? 3 : 6

    if (isMoveItem(move) && move.position.location?.type === LocationType.Kitty
      && this.material(MaterialType.Card).location(LocationType.Kitty).length == kittySize) {
      return [
        ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Tricks, player: this.player } }),
        this.rules().startPlayerTurn(RuleId.PlayCard, 1)
      ]
    }

    return []
  }

}
