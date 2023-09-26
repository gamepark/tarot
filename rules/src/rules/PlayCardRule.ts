import { isMoveItemLocation, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { Card, isColor, isSameColor, isTrump } from '../Card'
import maxBy from 'lodash/maxBy'

export class PlayCardRule extends PlayerTurnRule {


  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstCardPlayed
    if (firstCardPlayed !== undefined) {
      if (isTrump(firstCardPlayed) && cardsToPlay.getItems().some(item => isTrump(item.id))) {
        cardsToPlay = cardsToPlay.filter(item => item.id > firstCardPlayed).filter(item => !isColor(item.id) || item.id === Card.Excuse)
      }
      if (isColor(firstCardPlayed) && cardsToPlay.getItems().some(item => isSameColor(item.id, firstCardPlayed))) {
        cardsToPlay = cardsToPlay.filter(item => isSameColor(item.id, firstCardPlayed) || item.id === Card.Excuse)
      }
    }
    return cardsToPlay.moveItems({ location: { type: LocationType.Table, player: this.player } })
  }

  get firstCardPlayed(): Card | undefined {
    const cardsPlayed = this.cardsPlayed
    return cardsPlayed.length > 0 ? cardsPlayed[0].id : undefined
  }

  get cardsPlayed() {
    return this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.x!).getItems()
  }

  get trickWinner() {
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(card => isTrump(card.id))
    if (trumps.length > 0) {
      const bestTrump = maxBy(trumps, trump => trump.id)!
      return bestTrump.location.player!
    }
    const firstCard = cardsPlayed[0].id
    const cardsSameColor = cardsPlayed.filter(card => isSameColor(card.id, firstCard))
    return maxBy(cardsSameColor, card => card.id)!.location.player!
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemLocation(move) && move.position.location.type === LocationType.Table) {
      const moves: MaterialMove[] = []
      const numberPlayedCards = this.cardsPlayed.length
      if (numberPlayedCards === this.game.players.length) {
        const trickWinner = this.trickWinner
        moves.push(
          ...this.material(MaterialType.Card).location(LocationType.Table).moveItems({ location: { type: LocationType.Tricks, player: trickWinner } })
        )
        if (this.material(MaterialType.Card).location(LocationType.Hand).length > 0) {
          moves.push(this.rules().startPlayerTurn(RuleId.PlayCard, trickWinner))
        } else {
          moves.push(this.rules().endGame())
        }
        return moves
      } else {
        return [this.rules().startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
      }
    }
    return []
  }
}

