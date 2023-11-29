import { CustomMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { maxBy } from 'lodash'
import max from 'lodash/max'
import { Card, isTrump } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid, bids } from './Bid'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'


export class BidRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove, previousRules: RuleStep) {
    if (previousRules.id !== RuleId.Bid) {
      if (this.game.players.some(player => this.smallTrumpOnly(player))) {
        return [
          this.rules().startPlayerTurn(RuleId.Deal, this.player)
        ]
      }
    }
    return []
  }

  smallTrumpOnly(player: number) {
    const playerCards = this.material(MaterialType.Card).player(player).getItems().map(item => item.id)
    return playerCards.every(card => !isTrump(card) || card === Card.Trump1) && playerCards.some(card => card === Card.Trump1)
  }

  get lastBid(): Bid | undefined {
    return max(this.game.players.map(player => this.remind(Memory.Bid, player)))
  }

  getPlayerMoves() {
    const moves = [this.rules().customMove(CustomMoveType.Pass)]
    const lastBid = this.lastBid
    const filteredBids = bids.filter(bid => !lastBid || lastBid < bid)
    moves.push(...filteredBids.map(bid => this.rules().customMove(CustomMoveType.Bid, bid)))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Bid) {
      const bid = move.data
      this.memorize(Memory.Bid, bid, this.player)
      if (bid === Bid.GuardAgainstTheKitty) {
        return this.goToChelemMove(this.player)
      }
    }
    if (this.isLastPlayer) {
      const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
      if (!preneur) {
        return this.goToDealMoves
      } if (this.game.players.length === 5) {
        return [
          this.rules().startPlayerTurn(RuleId.CallKing, preneur)
        ]
      }
      return this.goToChelemMove(preneur)
    }
    return [this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer)]
  }

  get isLastPlayer() {
    return this.nextPlayer === this.remind(Memory.StartPlayer)
  }

  goToChelemMove(player: number) {
    this.memorize(Memory.IsKittyStarted, { bool: false })
    return [
      this.rules().startPlayerTurn(RuleId.Chelem, player)
    ]
  }

  get goToDealMoves() {
    return [
      ...this.material(MaterialType.Card).moveItems({ type: LocationType.Deck }),
      this.rules().startPlayerTurn(RuleId.Deal, this.nextPlayer)
    ]
  }
}
