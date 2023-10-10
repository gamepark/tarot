import { CustomMove, isMoveItemLocation, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from "./Bid";
import { PlayerBid } from "./BidRule";
import { getKittySize } from "./CreateKittyRule";
import { RuleId } from './RuleId'
import { Card, excuse, isColor, isSameColor, isTrump, isTrumpValue } from '../Card'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { Poignee, poignees } from './Poignee'

export class PlayCardRule extends PlayerTurnRule {

  onRuleStart() {
    // si pas de carte sur la table
    // et excuse face visible dans les plis d'un joueur
    // et ce joueur a une carte 0,5 dans trick
    // renvoyer 2 moves : retourner excuse, carte à 0,5 camp adverse TODO
    return []
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

    }
    const moves: MaterialMove[] = cardsToPlay.moveItems({ location: { type: LocationType.Table, player: this.player, z: cardsPlayed.length } })
    if (this.isFirstTrick && !this.remind(Memory.Poigne, this.player)) {
      const handleMinTrumps = getPoigneeMinTrumps(this.game.players.length)
      const numberOfTrumps = this.playerTrumpsForPoignee.length
      for (const handle of poignees) {
        if (numberOfTrumps >= handleMinTrumps[handle]) {
          moves.push(this.rules().customMove(CustomMoveType.Poignee, handle))
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
    const bids = this.remind<PlayerBid[]>(Memory.Bids)
    const bid = bids[bids.length - 1].bid
    if (bid < Bid.GuardWithoutTheKitty) {
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

        // TODO : Gérer l'Excuse !
        // si excuse jouée 
        // si pli remporté par camp adverse
        // déplacer excuse dans ses plis face visible et autre carte face cachée au camp vainqueur

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
