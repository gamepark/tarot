import { CustomMove, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Bid, bids } from './Bid'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
import { Card, isTrump } from '../Card'
import max from 'lodash/max'
import { maxBy } from 'lodash'


export class BidRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove, previousRules: RuleStep) {


    if (previousRules.id !== RuleId.Bid) {

      if (this.game.players.some(player => this.smallTrumpOnly(player))) {
        return [
          this.rules().startRule(RuleId.Deal)
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
        return this.goToKittyCreationMoves(this.player)
      }
    }

    if (this.isLastPlayer) {
      const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player)) //a vérifié si tout le monde passe
      if (!preneur) {
        return this.goToDealMoves
      } if (this.game.players.length === 5) {
        //TODO appel du roi
      }
      /*if (move.type === CustomMoveType.TakeChelem) {
        if (move.data === true) {          
          this.memorize(Memory.Chelem, this.player)
        } 
      }*/
      return this.goToKittyCreationMoves(preneur)

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
      ...this.material(MaterialType.Card).moveItems({ location: { type: LocationType.Deck } }),
      this.rules().startRule(RuleId.Deal)
    ]
  }
}