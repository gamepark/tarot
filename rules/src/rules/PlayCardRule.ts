import { CustomMove, isMoveItemLocation, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from "./Bid";
import { getKittySize } from "./CreateKittyRule";
import { RuleId } from './RuleId'
import { Card, cardValue, excuse, isColor, isSameColor, isTrump, isTrumpValue } from '../Card'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { Poignee, poignees } from './Poignee'
import maxBy from 'lodash/maxBy';

export class PlayCardRule extends PlayerTurnRule {

  onRuleStart() {

    const moves: MaterialMove[] = []


    if (this.material(MaterialType.Card).location(LocationType.Table).length === 0) {

      const excuseInTrick = this.material(MaterialType.Card).location(LocationType.Tricks).id(Card.Excuse)

      if (excuseInTrick.length && !excuseInTrick.getItem()!.rotation?.y) {

        const cardsToTrade = this.material(MaterialType.Card).location(LocationType.Tricks).player(player => this.isSameSide(player!, excuseInTrick.getItem()?.location.player!)).id(id => cardValue(id as Card) === 0.5);
        if (cardsToTrade.length > 0) {
          moves.push(
            excuseInTrick.moveItem({ rotation: { y: 1 } })
          )

          const opponent = this.game.players.find(player => !this.isSameSide(player!, excuseInTrick.getItem()?.location.player!) && this.material(MaterialType.Card).location(LocationType.Tricks).player(player).length > 0)
          moves.push(
            cardsToTrade.moveItem({ location: { type: LocationType.Tricks, player: opponent }, rotation: { y: 1 } })
          )
        }
      }
    }


    return moves
  }

  isSameSide(player1: number, player2: number) {
    if (player1 === player2) {
      return true
    }


    const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))

    return player1 !== preneur && player2 !== preneur //TODO : 5 joueurs
  }


  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstCardPlayed
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrumpValue)
    const bestTrump = Math.max(...trumps)
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

      if (excuse(firstCardPlayed)) {
        //TODO
      }
    }


    const moves: MaterialMove[] = cardsToPlay.moveItems({ location: { type: LocationType.Table, player: this.player, z: cardsPlayed.length } })
    if (this.isFirstTrick && !this.remind(Memory.Poigne, this.player)) {
      const poigneeMinTrumps = getPoigneeMinTrumps(this.game.players.length)
      const numberOfTrumps = this.playerTrumpsForPoignee.length
      for (const poignee of poignees) {
        if (numberOfTrumps >= poigneeMinTrumps[poignee]) {
          moves.push(this.rules().customMove(CustomMoveType.Poignee, poignee))
        }
      }
    }
    return moves
  }

  get firstCardPlayed(): Card | undefined {
    return this.cardsPlayed[0]
  }

  get isFirstTrick() {
    return this.material(MaterialType.Card).location(LocationType.Tricks).length === getKittySize(this.game.players.length)
  }

  get playerTrumpsForPoignee() {
    const playerTrumps = this.material(MaterialType.Card).player(this.player).id(isTrump)

    // Lorsque le preneur possède 4 Rois et 15 atouts, l’atout écarté doit être remontré avec la triple Poignée qui est alors comptabilisée.
    const bid = this.remind<Bid | undefined>(Memory.Bid, this.player)
    if (bid && bid < Bid.GuardWithoutTheKitty) {
      return playerTrumps
    } else {
      return playerTrumps.location(LocationType.Hand)
    }
  }

  get cardsPlayed(): Card[] {
    return this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.z!).getItems().map(item => item.id)
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

    if (move.type === CustomMoveType.Poignee) {
      this.memorize(Memory.Poigne, move.data, this.player)
      return [this.rules().startRule(RuleId.Poignee)]
    }

    return []
  }


  afterItemMove(move: ItemMove) {
    if (isMoveItemLocation(move) && move.position.location.type === LocationType.Table) {

      const moves: MaterialMove[] = []
      const numberPlayedCards = this.cardsPlayed.length




      if (numberPlayedCards === this.game.players.length) {
        const trickWinner = this.trickWinner
        const petitOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Trump1);



          if (this.material(MaterialType.Card).location(LocationType.Tricks).length === 78 - this.game.players.length && petitOnTable ) {
            this.memorize(Memory.Petit, trickWinner)
          }



        const excuseOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Excuse);

        if (excuseOnTable.length === 1 && !this.isSameSide(trickWinner, excuseOnTable.getItem()!.location.player!)) {
          moves.push(
            excuseOnTable.moveItem({ location: { type: LocationType.Tricks, player: excuseOnTable.getItem()?.location.player }, rotation: { y: 0 } })
          )

          moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Table).id(id => id !== Card.Excuse).moveItems({ location: { type: LocationType.Tricks, player: trickWinner }, rotation: { y: 1 } })
          )
        } else {
          moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Table).moveItems({ location: { type: LocationType.Tricks, player: trickWinner }, rotation: { y: 1 } })
          )
        }

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


export function getPoigneeMinTrumps(numberPlayer: number): Record<Poignee, number> {
  switch (numberPlayer) {
    case 3:
      return {
        [Poignee.Simple]: 13,
        [Poignee.Double]: 15,
        [Poignee.Triple]: 18,
      }

    case 4:
      return {
        [Poignee.Simple]: 10,
        [Poignee.Double]: 13,
        [Poignee.Triple]: 15,
      }

    default:
      return {
        [Poignee.Simple]: 8,
        [Poignee.Double]: 10,
        [Poignee.Triple]: 13,
      }
  }
}
