import { CustomMove, isMoveItemLocation, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { Card, excuse, isColor, isSameColor, isTrumpValue } from '../Card'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { Handle, handles } from './Handle'

export class PlayCardRule extends PlayerTurnRule {



  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstCardPlayed
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrumpValue)
    const bestTrump = Math.max(...trumps)
    const numberTrump = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).filter(item => isTrumpValue(item.id)).length
    const numberPlayer = this.game.players.length



    if (trumps.length > 0 && cardsToPlay.getItems().some(item => isTrumpValue(item.id) && item.id > bestTrump)) {
      cardsToPlay = cardsToPlay.filter(item => !isTrumpValue(item.id) || item.id > bestTrump)
    }

    if (firstCardPlayed !== undefined) {
      if (isTrumpValue(firstCardPlayed) && cardsToPlay.getItems().some(item => isTrumpValue(item.id))) {
        cardsToPlay = cardsToPlay.filter(item => isTrumpValue(item.id) || item.id === Card.Excuse)

      }
      if (isColor(firstCardPlayed)) {
        if (cardsToPlay.getItems().some(item => isSameColor(item.id, firstCardPlayed))) {
          cardsToPlay = cardsToPlay.filter(item => isSameColor(item.id, firstCardPlayed) || item.id === Card.Excuse)

        } else if (cardsToPlay.getItems().some(item => isTrumpValue(item.id))) {
          cardsToPlay = cardsToPlay.filter(item => isTrumpValue(item.id) || item.id === Card.Excuse)
        }

      }

    }
    const moves: MaterialMove[] = cardsToPlay.moveItems({ location: { type: LocationType.Table, player: this.player, z: cardsPlayed.length } })
    const handleMinTrumps = getHandleMinTrumps(numberPlayer)

    for (const handle of handles) {
      if (this.firstTrickWin < this.game.players.length && numberTrump > handleMinTrumps[handle]) {
        moves.push(this.rules().customMove(CustomMoveType.Handle, handle))
      }
    }
    return moves
  }

  get firstCardPlayed(): Card | undefined {
    return this.cardsPlayed[0]
  }

  get firstTrickWin(): Card {
    return this.TricksWins[0]
  }

  get cardsPlayed(): Card[] {
    return this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.z!).getItems().map(item => item.id)
  }

  get TricksWins(): Card[] {
    return this.material(MaterialType.Card).location(LocationType.Tricks).sort(item => item.location.z!).getItems().map(item => item.id)
  }

  get trickWinner() {
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrumpValue)
    if (trumps.length > 0) {
      const bestTrump = Math.max(...trumps)!
      return this.material(MaterialType.Card).id(bestTrump).getItem()!.location.player!
    }
    const firstCard = cardsPlayed[0]
    const cardsSameColor = cardsPlayed.filter(card => isSameColor(card, firstCard))
    const bestCard = Math.max(...cardsSameColor)!
    return this.material(MaterialType.Card).id(bestCard).getItem()!.location.player!
  }


  onCustomMove(move: CustomMove): MaterialMove[] {

    if (move.type === CustomMoveType.Handle) {
      this.memorize(Memory.Handle, move.data, this.player)
      return [this.rules().startRule(RuleId.Handle)]
    }

    return []
  }


  afterItemMove(move: ItemMove) {
    if (isMoveItemLocation(move) && move.position.location.type === LocationType.Table) {

      const moves: MaterialMove[] = []
      const numberPlayedCards = this.cardsPlayed.length
      if (numberPlayedCards === this.game.players.length) {
        const trickWinner = this.trickWinner

        // TODO : Gérer l'Excuse !

        moves.push(
          ...this.material(MaterialType.Card).location(LocationType.Table).filter(item => !excuse(item.id)).moveItems({ location: { type: LocationType.Tricks, player: trickWinner }, rotation: { y: 1 } })
        )
        moves.push(
          ...this.material(MaterialType.Card).location(LocationType.Table).filter(item => excuse(item.id)).moveItems({ location: { type: LocationType.Tricks, player: this.remind(Memory.Excuse, this.player) }, rotation: { y: 1 } }) //a confirmer

        )
        if (this.material(MaterialType.Card).location(LocationType.Hand).length > 0) {
          moves.push(this.rules().startPlayerTurn(RuleId.PlayCard, trickWinner))
        } else {
          moves.push(this.rules().startRule(RuleId.Scoring))
        }
        return moves
      } else {
        return [this.rules().startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
      }
    }
    return []
  }

}


export function getHandleMinTrumps(numberPlayer: number): Record<Handle, number> {
  switch (numberPlayer) {
    case 3:
      return {
        [Handle.Simple]: 13,
        [Handle.Double]: 15,
        [Handle.Triple]: 18,
      }

    case 4:
      return {
        [Handle.Simple]: 10,
        [Handle.Double]: 13,
        [Handle.Triple]: 15,
      }

    default:
      return {
        [Handle.Simple]: 8,
        [Handle.Double]: 10,
        [Handle.Triple]: 13,
      }
  }
}
