import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Bid, bids } from './Bid'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'

type BidMemory = {
  player: number,
  bid: Bid
}

export class BidRule extends PlayerTurnRule {
  getPlayerMoves() {
    const moves = [this.rules().customMove(CustomMoveType.Pass)]
    const lastBid = this.remind<BidMemory>(Memory.Bid)?.bid
    const filteredBids = bids.filter(bid => !lastBid || lastBid < bid)
    moves.push(...filteredBids.map(bid => this.rules().customMove(CustomMoveType.Bid, bid)))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (this.isLastPlayer) {
      const bid = this.remind(Memory.Bid)
      if (!bid) {
        return this.goToDealMoves
      }

      return this.goToKittyCreationMoves
    }

    if (move.type === CustomMoveType.Pass) {
      return [
        this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer)
      ]
    }

    if (move.type === CustomMoveType.Bid) {
      const bid = move.data
      this.memorize(Memory.Bid, { bid, player: this.player })

      if (bid === Bid.GuardAgainstTheKitty) {
        return this.goToKittyCreationMoves
      }

      return [
        this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer)
      ]
    }

    return []
  }

  afterItemMove(_move: ItemMove<number, number, number>): MaterialMove[] {
    if (this.material(MaterialType.Card).location(LocationType.Hand).length === 0) {
      return [
        this.material(MaterialType.Card).location(LocationType.Deck).shuffle()
      ]
    }

    return []
  }

  get isLastPlayer() {
    return this.player === this.game.players[this.game.players.length - 1]
  }

  get goToKittyCreationMoves() {
    const player = this.remind<BidMemory>(Memory.Bid).player
    return [
      this.rules().startPlayerTurn(RuleId.CreateKitty, player)
    ]
  }

  get goToDealMoves() {
    return [
      ...this.material(MaterialType.Card).location(LocationType.Hand).moveItems({ location: { type: LocationType.Deck }}),
      this.rules().startRule(RuleId.Deal)
    ]
  }
}