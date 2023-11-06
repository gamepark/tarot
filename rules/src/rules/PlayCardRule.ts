import { CustomMove, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from "./Bid";
import { getKittySize } from "./CreateKittyRule";
import { RuleId } from './RuleId'
import { Card, cardColor, cardValue, clubKing, diamondKing, heartKing, isClub, isColor, isDiamond, isHeart, isKing, isSameColor, isSpade, isTrump, isTrumpValue, spadeKing } from '../Card'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { Poignee, poignees } from './Poignee'
import { RulesUtil } from './RulesUtil';
import { Colors } from './Colors';

export class PlayCardRule extends PlayerTurnRule {

  onRuleStart() {

    const moves: MaterialMove[] = []


    if (this.material(MaterialType.Card).location(LocationType.Table).length === 0) {

      const excuseInTrick = this.material(MaterialType.Card).location(LocationType.Tricks).id(Card.Excuse)

      if (excuseInTrick.length && !excuseInTrick.getItem()?.location.rotation) {

        const cardsToTrade = this.material(MaterialType.Card).location(LocationType.Tricks).player(player => this.isSameSide(player!, excuseInTrick.getItem()?.location.player!)).id(id => cardValue(id as Card) === 0.5);
        if (cardsToTrade.length > 0) {
          moves.push(
            excuseInTrick.rotateItem(false)
          )

          const opponent = this.game.players.find(player => !this.isSameSide(player!, excuseInTrick.getItem()?.location.player!) && this.material(MaterialType.Card).location(LocationType.Tricks).player(player).length > 0)
          moves.push(
            cardsToTrade.moveItem({ type: LocationType.Tricks, player: opponent })
          )
        }
      }
    }
    return moves
  }

  isSameSide(player1: number, player2: number) {
    return new RulesUtil(this.game).isSameSide(player1, player2)
  }


  getPlayerMoves() {
    let cardsToPlay = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
    const firstCardPlayed = this.firstMeaningfullCardPlayed
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

    if (this.game.players.length === 5 && this.isFirstTrick && this.material(MaterialType.Card).location(LocationType.Table).length === 0) {

      const callKing = this.remind(Memory.CallKing)
      const color = callKing.color

      if (color === Colors.Heart) {
        cardsToPlay = cardsToPlay.filter(item => !isHeart(item.id) || item.id === Card.Excuse || heartKing(item.id))
      } else if (color === Colors.Diamond) {
        cardsToPlay = cardsToPlay.filter(item => !isDiamond(item.id) || item.id === Card.Excuse || diamondKing(item.id))
      } else if (color === Colors.Club) {
        cardsToPlay = cardsToPlay.filter(item => !isClub(item.id) || item.id === Card.Excuse || clubKing(item.id))
      } else if (color === Colors.Spade) {
        cardsToPlay = cardsToPlay.filter(item => !isSpade(item.id) || item.id === Card.Excuse || spadeKing(item.id))
      }

    }

    const moves: MaterialMove[] = cardsToPlay.moveItems({ type: LocationType.Table, player: this.player, z: cardsPlayed.length })
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

  get firstMeaningfullCardPlayed(): Card | undefined {
    const card = this.cardsPlayed[0];
    return card != Card.Excuse ? card : this.cardsPlayed[1]
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
    const firstCardPlayed = this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.z!).getItem()!
    if (this.isLastTrick && firstCardPlayed.id === Card.Excuse && new RulesUtil(this.game).hasChelem(firstCardPlayed.location.player!)) {
      return firstCardPlayed.location.player!
    }
    const cardsPlayed = this.cardsPlayed
    const trumps = cardsPlayed.filter(isTrumpValue)
    if (trumps.length > 0) {
      const bestTrump = Math.max(...trumps)!
      return this.material(MaterialType.Card).id(bestTrump).getItem()!.location.player!
    }
    const firstCard = this.firstMeaningfullCardPlayed!
    const cardsSameColor = cardsPlayed.filter(card => isSameColor(card, firstCard))
    const bestCard = Math.max(...cardsSameColor)!
    return this.material(MaterialType.Card).id(bestCard).getItem()!.location.player!
  }

  get isLastTrick() {
    return this.material(MaterialType.Card).location(LocationType.Hand).length === 0
  }


  onCustomMove(move: CustomMove): MaterialMove[] {

    if (move.type === CustomMoveType.Poignee) {
      this.memorize(Memory.Poigne, move.data, this.player)
      return [this.rules().startRule(RuleId.Poignee)]
    }

    return []
  }


  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.location.type === LocationType.Table) {

      const moves: MaterialMove[] = []
      const numberPlayedCards = this.cardsPlayed.length

      if (numberPlayedCards === this.game.players.length) {
        const trickWinner = this.trickWinner
        const petitOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Trump1);

        if (petitOnTable) {
          this.memorize(Memory.PetitLastTrick, trickWinner)
        } else if (this.material(MaterialType.Card).location(LocationType.Table).player(trickWinner).getItem()?.id !== Card.Excuse) {
          this.forget(Memory.PetitLastTrick)
        }

        const excuseOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Excuse);

        if (excuseOnTable.length === 1 && !this.isSameSide(trickWinner, excuseOnTable.getItem()!.location.player!) && !this.isLastTrick) {
          moves.push(
            excuseOnTable.moveItem( { type: LocationType.Tricks, player: excuseOnTable.getItem()?.location.player }),
            excuseOnTable.rotateItem(true)
          )

          moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Table).id(id => id !== Card.Excuse).moveItems( { type: LocationType.Tricks, player: trickWinner})
          )
        } else {
          moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Table).moveItems( { type: LocationType.Tricks, player: trickWinner } )
          )
        }

        if (this.game.players.length === 5) {
          const callKing = this.remind(Memory.CallKing)
          const colorCall = callKing.color
          const kingOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(isKing);

          if (kingOnTable) {

            if (colorCall === cardColor) {
              //TODO : Equipe ici
            }
          }
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
