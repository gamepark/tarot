import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { cardValue, isOudler } from '../../Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Bid } from '../Bid'
import { Memory } from '../Memory'
import { Poignee } from '../Poignee'
import { RulesUtil } from '../RulesUtil'
import { poigneeScores } from '../ScoringRule'
export class ScoringHelper extends MaterialRulesPart {

  private ruleUtils
  constructor(game: MaterialGame, private readonly player: number) {
    super(game)
    this.ruleUtils = new RulesUtil(this.game)
  }

  get trickPoints() {
    return sumBy(
      this.material(MaterialType.Card)
        .location(LocationType.Tricks)
        .player(player => this.ruleUtils.isPreneurSide(player))
        .getItems(), item => cardValue(item.id))
  }

  get ecartPoints() {
    return sumBy(
      this.material(MaterialType.Card)
        .location(LocationType.Ecart)
        .getItems(), item => cardValue(item.id)
    )
  }

  get trickOudlers() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tricks)
      .player(this.ruleUtils.preneur)
      .id(isOudler).length
  }

  get ecartOudlers() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Ecart)
      .id(isOudler)
      .length
  }

  get bid() {
    return this.remind<Bid>(Memory.Bid, this.ruleUtils.preneur)
  }

  get chelem() {
    const preneur = this.ruleUtils.preneur
    const preneurHasChelem = new RulesUtil(this.game).hasChelem(preneur!)
    const defenseHasChelem = !preneurHasChelem && this.game.players.some(player => new RulesUtil(this.game).hasChelem(player))

    const chelemAnnonce = this.remind(Memory.ChelemAnnounced)
    if (chelemAnnonce && preneurHasChelem) {
      return 400
    } else if (preneurHasChelem) {
      return 200
    } else if (chelemAnnonce || defenseHasChelem) {
      return -200
    }

    return 0
  }

  get oudlers() {
    if (this.bid === Bid.GuardAgainstTheKitty) {
      return this.trickOudlers
    }

    return this.trickOudlers + this.ecartOudlers
  }

  get points() {
    if (this.bid === Bid.GuardAgainstTheKitty) {
      return this.trickPoints
    }

    return this.trickPoints + this.ecartPoints
  }

  get contrat() {
    switch (this.oudlers) {
      case 0:
        return 56
      case 1:
        return 51
      case 2:
        return 41
    }
    return 36
  }

  get contratScore() {
    const contrat = this.contrat
    let points = this.points - this.contrat
    if (points < contrat) {
      points = Math.floor(points)
    } else if (points > contrat) {
      points = Math.round(points)
    }

    return (points >= 0 ? points + 25 : points - 25)
  }

  get score() {
    const score = ((this.contratScore + this.petitAuBout) * this.bid) + this.chelem + this.poignees
    return score * this.scoreFactor
  }

  get petitAuBout() {
    const petitAuBout = this.remind(Memory.PetitLastTrick)
    if (petitAuBout !== undefined) {
      if (this.ruleUtils.preneur === petitAuBout) {
        return 10
      } else {
        return - 10
      }
    }

    return 0
  }

  get scoreFactor() {
    const preneur = this.ruleUtils.preneur
    let factor = 1
      if (this.game.players.length === 3 || this.game.players.length === 4) {
        if (this.player !== preneur) {
          factor = -1
        } else {
          factor = this.game.players.length - 1
        }
      }

      if (this.game.players.length === 5) {
        const calledPlayer = this.remind(Memory.CalledPlayer)
        const calledCard = this.remind(Memory.CalledCard)
        if (this.player !== preneur && this.player !== calledPlayer) {
          factor = -1
        }
        if (this.player === preneur) {
          factor = 2
        }
        if (this.player === calledPlayer) {
          factor = 1
        }
        if (this.player === preneur && this.player === calledPlayer || this.player === preneur && this.isThisCardInTheEcart(calledCard, this.material(MaterialType.Card).location(LocationType.Ecart).getItems().map(item => item.id))) {
          factor = 4
        }
      }

    return factor
  }

  isThisCardInTheEcart(searchedCard: number, ecartCard: number[]): boolean {
    return ecartCard.filter(card => card === searchedCard).length === 1
  }

  get poignees() {
    let poigneeScore = 0
    for (const player of this.game.players) {
      const poignee = this.remind<Poignee | undefined>(Memory.Poigne, player)
      if (poignee) {
        poigneeScore += poigneeScores[poignee]
      }
    }

    return poigneeScore
  }

}