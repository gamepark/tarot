import { CustomMove, isCustomMoveType, isMoveItem, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { isColor, isKing } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from './Bid'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { RulesUtil } from './RulesUtil'


export class CreateKittyRule extends SimultaneousRule {

  onRuleStart() {
    const preneur = new RulesUtil(this.game).preneur!
    const bid = this.remind<Bid>(Memory.Bid, preneur)
    switch (bid) {
      case Bid.Small:
      case Bid.Guard:
        return this.material(MaterialType.Card).location(LocationType.Kitty).sort(item => item.location.x!).rotateItems(true)
      case Bid.GuardWithoutTheKitty:
        return [
          this.material(MaterialType.Card).location(LocationType.Kitty).moveItemsAtOnce({ type: LocationType.Ecart, player: preneur }),
          this.rules().startPlayerTurn(RuleId.PlayCard, this.remind(Memory.StartPlayer))
        ]
      case Bid.GuardAgainstTheKitty:
        const facingPlayer = this.game.players[(this.game.players.indexOf(preneur) + 2) % this.game.players.length]
        if (this.game.players.length === 5) {
          return [
            this.material(MaterialType.Card).location(LocationType.Kitty).moveItemsAtOnce({ type: LocationType.Ecart, player: preneur }),
            this.rules().startPlayerTurn(RuleId.PlayCard, this.remind(Memory.StartPlayer))
          ]
        }
        return [
          this.material(MaterialType.Card).location(LocationType.Kitty).moveItemsAtOnce({ type: LocationType.Ecart, player: facingPlayer }),
          this.rules().startPlayerTurn(RuleId.PlayCard, this.remind(Memory.StartPlayer))
        ]
    }
  }

  getActivePlayerLegalMoves(playerId: number): MaterialMove<number, number, number>[] {
    const preneur = new RulesUtil(this.game).preneur!
    const bid = this.remind<Bid>(Memory.Bid, preneur)
    if (bid > Bid.Guard) return []
    if (playerId === preneur) {
      if (this.material(MaterialType.Card).location(LocationType.Kitty).length === this.kittySize) {
        return [this.rules().customMove(CustomMoveType.AcknowledgeKitty, playerId)]
      } else {
        const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(playerId).filter(card => isColor(card.id) && !isKing(card.id))
        return playerCards.moveItems({ type: LocationType.Ecart, player: playerId })
      }
    } else {
      return [this.rules().customMove(CustomMoveType.AcknowledgeKitty, playerId)]
    }
  }

  get kittySize() {
    return getKittySize(this.game.players.length)
  }

  onCustomMove(move: CustomMove) {
    if (isCustomMoveType(CustomMoveType.AcknowledgeKitty)(move)) {
      const preneur = new RulesUtil(this.game).preneur!
      if (move.data === preneur) {
        return [
          this.material(MaterialType.Card)
            .location(LocationType.Kitty)
            .sort(item => -item.location.x!)
            .moveItemsAtOnce({ type: LocationType.Hand, player: preneur }),
          this
            .material(MaterialType.Card)
            .filter(item => item.location.type === LocationType.Kitty || (item.location.type === LocationType.Hand && item.location.player === preneur))
            .shuffle()
        ]
      } else {
        return [this.rules().endPlayerTurn(move.data)]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.location.type === LocationType.Ecart
      && this.material(MaterialType.Card).location(LocationType.Ecart).length === this.kittySize) {
      return [this.rules().endPlayerTurn(new RulesUtil(this.game).preneur!)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    return [this.rules().startPlayerTurn(RuleId.PlayCard, this.remind(Memory.StartPlayer))]
  }
}

export const getKittySize = (players: number) => players === 5 ? 3 : 6
