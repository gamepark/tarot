import { MaterialMove, MaterialRulesPart, RuleMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from './Bid'
import { ScoringHelper } from './helper/ScoringHelper'
import { Memory } from './Memory'
import { Poignee } from './Poignee'
import { RuleId } from './RuleId'
import { RulesUtil } from './RulesUtil'

export class ScoringRule extends MaterialRulesPart {

  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      this.material(MaterialType.Card).moveItemsAtOnce({ rotation: true })
    )
    if (this.remind(Memory.Round) === 4) {
      moves.push(this.rules().endGame())
      return moves
    }
    this.memorize(Memory.Round, (this.remind(Memory.Round) + 1))
    moves.push(this.rules().startPlayerTurn(RuleId.Deal, this.remind(Memory.StartPlayer)))
    return moves
  }


  onRuleEnd<RuleId extends number>(_move: RuleMove<number, RuleId>): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const round = this.remind(Memory.Round)
    for (const player of this.game.players) {
      const score = new ScoringHelper(this.game, player).score
      this.addSummary(round, player, score)
      this.memorize(Memory.Score, (actualScore: number) => actualScore + score, new RulesUtil(this.game).preneur)
    }

    moves.push(this.material(MaterialType.Card).moveItemsAtOnce({ type: LocationType.Deck }))
    return moves

  }

  addSummary = (round: number, player: number, score: number) => {
    const preneur = new RulesUtil(this.game).preneur
    this.memorize(Memory.RoundSummary, (r = []) => {
      const rounds = r ? [...r]: []
      if (!rounds[round - 2]) {
        rounds.push([])
      }

      rounds[round - 2].push({
        player,
        score,
        bid: this.remind<Bid>(Memory.Bid, ),
        chelem: this.remind(Memory.ChelemAnnounced),
        preneur: preneur,
        calledCard: this.remind(Memory.CalledCard),
        petitAuBout: this.remind(Memory.PetitLastTrick)

      })
      return rounds
    })
  }
}

export const poigneeScores: Record<Poignee, number> = {
  [Poignee.Simple]: 20,
  [Poignee.Double]: 30,
  [Poignee.Triple]: 40
}

