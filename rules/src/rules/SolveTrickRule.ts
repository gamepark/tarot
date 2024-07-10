import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Card, isSameColor, isTrumpValue } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { RulesUtil } from './RulesUtil'

export class SolveTrickRule extends MaterialRulesPart {
  onRuleStart() {
    const petitOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Trump1)
    const moves: MaterialMove[] = []
    const trickWinner = this.trickWinner
    this.memorize(Memory.TrickWinner, trickWinner)
    if (petitOnTable.length === 1 && this.isLastTrick) {
      this.memorize(Memory.PetitLastTrick, trickWinner)
    } else if (this.material(MaterialType.Card).location(LocationType.Table).player(trickWinner).getItem()?.id !== Card.Excuse) {
      this.forget(Memory.PetitLastTrick)
    }

    const excuseOnTable = this.material(MaterialType.Card).location(LocationType.Table).id(Card.Excuse)
    if (excuseOnTable.length === 1 && !this.isSameSide(trickWinner, excuseOnTable.getItem()!.location.player!) && !this.isLastTrick) {
      moves.push(
        excuseOnTable.moveItem({ type: LocationType.Tricks, player: excuseOnTable.getItem()?.location.player, rotation: true })
      )
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Table).id(id => id !== Card.Excuse).moveItems({
          type: LocationType.Tricks,
          player: trickWinner
        })
      )
    } else {
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Table).moveItems({ type: LocationType.Tricks, player: trickWinner })
      )
    }


    if (this.material(MaterialType.Card).location(LocationType.Hand).length > 0) {
      moves.push(this.rules().startPlayerTurn(RuleId.PlayCard, trickWinner))
    } else {
      moves.push(this.rules().startRule(RuleId.Scoring))
    }
    return moves
  }


  get isLastTrick() {
    return this.material(MaterialType.Card).location(LocationType.Hand).length === 0
  }

  isSameSide(player1: number, player2: number) {
    return new RulesUtil(this.game).isSameSide(player1, player2)
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

  get cardsPlayed(): Card[] {
    return this.material(MaterialType.Card).location(LocationType.Table).sort(item => item.location.z!).getItems().map(item => item.id)
  }


  get firstMeaningfullCardPlayed(): Card | undefined {
    const card = this.cardsPlayed[0]
    return card != Card.Excuse ? card : this.cardsPlayed[1]
  }

  onRuleEnd() {
    return []
  }
}