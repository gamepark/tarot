import { isMoveItemLocation, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { Card, isColor, isSameColor, isTrump } from '../Card'

export class PlayCardRule extends PlayerTurnRule {


  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstCardPlayed
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrump)
    const bestTrump = Math.max(...trumps)

    if (trumps.length > 0 && cardsToPlay.getItems().some(item => isTrump(item.id) && item.id > bestTrump)) {
      cardsToPlay = cardsToPlay.filter(item => !isTrump(item.id) || item.id > bestTrump)
    }

    if (firstCardPlayed !== undefined) {
      if (isTrump(firstCardPlayed) && cardsToPlay.getItems().some(item => isTrump(item.id))) {
        cardsToPlay = cardsToPlay.filter(item => isTrump(item.id) || item.id === Card.Excuse)

      }
      if (isColor(firstCardPlayed)) {
        if (cardsToPlay.getItems().some(item => isSameColor(item.id, firstCardPlayed))) {
          cardsToPlay = cardsToPlay.filter(item => isSameColor(item.id, firstCardPlayed) || item.id === Card.Excuse)

        } else if (cardsToPlay.getItems().some(item => isTrump(item.id))) {
          cardsToPlay = cardsToPlay.filter(item => isTrump(item.id) || item.id === Card.Excuse)
        }
      }


    }
    return cardsToPlay.moveItems({ location: { type: LocationType.Table, player: this.player, z: cardsPlayed.length } })
  }

  get firstCardPlayed(): Card | undefined {
    return this.cardsPlayed[0]
  }

  get cardsPlayed(): Card[] {
    return this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.z!).getItems().map(item => item.id)
  }

  get trickWinner() {
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrump)
    if (trumps.length > 0) {
      const bestTrump = Math.max(...trumps)!
      return this.material(MaterialType.Card).id(bestTrump).getItem()!.location.player!
    }
    const firstCard = cardsPlayed[0]
    const cardsSameColor = cardsPlayed.filter(card => isSameColor(card, firstCard))
    const bestCard = Math.max(...cardsSameColor)!
    return this.material(MaterialType.Card).id(bestCard).getItem()!.location.player!
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

