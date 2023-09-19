import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { Card, isColor, isSameColor, isTrump } from '../Card'

export type NumberPlayedCards = {
  value: number
}

export class PlayCardRule extends PlayerTurnRule {


  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstCardPlayed
    if (firstCardPlayed !== undefined) {
      if (isTrump(firstCardPlayed) && cardsToPlay.getItems().some(item => isTrump(item.id))) {
        cardsToPlay = cardsToPlay.filter(item => !isColor(item.id))
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

  afterItemMove() {
    const moves: MaterialMove[] = []
    const numberPlayedCards = this.remind<NumberPlayedCards>(Memory.NumberPlayedCards)
    this.memorize(Memory.NumberPlayedCards, { value: numberPlayedCards.value + 1 })


    if (numberPlayedCards.value < this.game.players.length - 1) {
      return [this.rules().startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
    } else {
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Table).moveItems({ location: { type: LocationType.Tricks, player: this.player } })
      )
      this.memorize(Memory.NumberPlayedCards, { value: 0 })

      return moves
    }

  }

}

