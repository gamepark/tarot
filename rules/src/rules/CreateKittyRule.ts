import { isMoveItem, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { PlayerBid } from './BidRule'
import { Bid } from './Bid'



export class CreateKittyRule extends PlayerTurnRule {




  onRuleStart() {
    const bids = this.remind<PlayerBid[]>(Memory.Bids)
    const bid = bids[bids.length - 1].bid

    switch (bid) {
      case Bid.Small:
      case Bid.Guard:
        return [
          ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ rotation: { y: 0 } }),

          ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Hand, player: this.player } })
        ]

      case Bid.GuardWithoutTheKitty:
        return [
          ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Tricks, player: this.player }, rotation: { y: 1 } }),
          this.rules().startPlayerTurn(RuleId.PlayCard, 1)
        ]

      case Bid.GuardAgainstTheKitty:
        const facingPlayer = this.game.players[(this.game.players.indexOf(this.player) + 2) % this.game.players.length]

        return [
          ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Tricks, player: facingPlayer }, rotation: { y: 1 } }),
          this.rules().startPlayerTurn(RuleId.PlayCard, 1)
        ]

    }
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
        ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Tricks, player: this.player }, rotation: { y: 1 } }),
        this.rules().startPlayerTurn(RuleId.PlayCard, 1)
      ]
    }


    return []
  }

}
