import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Bid, bids } from './Bid'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'

export type PlayerBid = {
  player: number,
  bid: Bid
}

export class BidRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove, previousRules: RuleStep) {
    if (previousRules.id !== RuleId.Bid) {
      this.memorize(Memory.Bids, [])
    }
    return []
  }

  get lastBid(): PlayerBid | undefined {
    const bids = this.remind<PlayerBid[]>(Memory.Bids)
    return bids[bids.length - 1]
  }

  getPlayerMoves() {
    const moves = [this.rules().customMove(CustomMoveType.Pass)]
    const lastBid = this.lastBid
    const filteredBids = bids.filter(bid => !lastBid || lastBid.bid < bid)
    moves.push(...filteredBids.map(bid => this.rules().customMove(CustomMoveType.Bid, bid)))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Bid) {
      const bid = move.data
      this.memorize<PlayerBid[]>(Memory.Bids, bids => bids.concat({ bid, player: this.player }))
      if (bid === Bid.GuardAgainstTheKitty) {
        return this.goToKittyCreationMoves(this.player)
      }
    }

    if (this.isLastPlayer) {
      const lastBid = this.lastBid
      if (!lastBid) {
        return this.goToDealMoves
      }
      return this.goToKittyCreationMoves(lastBid.player)
    }

    return [this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer)]
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

  goToKittyCreationMoves(player: number) {
    this.memorize(Memory.IsKittyStarted, { bool: false })
    return [
      this.rules().startPlayerTurn(RuleId.CreateKitty, player)
    ]
  }

  get goToDealMoves() {
    return [
      ...this.material(MaterialType.Card).location(LocationType.Hand).moveItems({ location: { type: LocationType.Deck } }),
      this.rules().startRule(RuleId.Deal)
    ]
  }
}