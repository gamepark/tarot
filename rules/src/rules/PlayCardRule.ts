import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, cardValue, isColor, isSameColor, isTrump, isTrumpValue } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from './Bid'
import { Memory } from './Memory'
import { getPoigneeMinTrumps, poignees } from './Poignee'
import { RuleId } from './RuleId'
import { RulesUtil } from './RulesUtil'

export class PlayCardRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = []

    const poigneeMinTrumps = getPoigneeMinTrumps(this.game.players.length)
    const numberOfTrumps = this.playerTrumpsForPoignee.length
    let maxCards = 0
    for (const poignee of poignees) {
      if (numberOfTrumps >= poigneeMinTrumps[poignee]) {
        maxCards = poigneeMinTrumps[poignee]
      }
    }

    if (maxCards && this.isFirstTrick && !this.hasChosenPoignee) {
      return [this.rules().startRule(RuleId.Poignee)]
    }

    if (this.material(MaterialType.Card).location(LocationType.Table).length === 0) {
      const excuseInTrick = this.material(MaterialType.Card).location(LocationType.Tricks).id(Card.Excuse)
      if (excuseInTrick.length === 1 && excuseInTrick.getItem()?.location.rotation && ( this.game.players.length === 5 ? this.remind(Memory.CalledPlayer) : true)) {
        const cardsToTrade = this.material(MaterialType.Card).location(LocationType.Tricks).player(player => this.isSameSide(player!, excuseInTrick.getItem()?.location.player!)).id<Card | undefined>(id => id !== undefined && cardValue(id) === 0.5);
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
      const calledCard = this.remind<Card>(Memory.CalledCard)
      cardsToPlay = cardsToPlay.filter(item => !isSameColor(item.id, calledCard) || item.id === calledCard)
    }

    const moves: MaterialMove[] = cardsToPlay.moveItems({ type: LocationType.Table, player: this.player, z: cardsPlayed.length })
    return moves
  }


  get firstMeaningfullCardPlayed(): Card | undefined {
    const card = this.cardsPlayed[0];
    return card != Card.Excuse ? card : this.cardsPlayed[1]
  }

  get isFirstTrick() {
    return this.material(MaterialType.Card).location(LocationType.Tricks).length === 0
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


  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.location.type === LocationType.Table) {
      if (this.game.players.length === 5 && this.remind(Memory.CalledCard) === this.cardsPlayed[this.cardsPlayed.length - 1]) {
        this.memorize(Memory.CalledPlayer, this.player)
      }

      this.material(MaterialType.Card).player(this.player).selected(true).getItems().forEach((item) => delete item.selected)
      const numberPlayedCards = this.cardsPlayed.length

      if (numberPlayedCards === this.game.players.length) {
        return [this.rules().startRule(RuleId.SolveTrick)]
      } else {
        return [this.rules().startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
      }
    }
    return []
  }

  get hasChosenPoignee() {
    return this.remind(Memory.Poigne, this.player) !== undefined
  }
}
