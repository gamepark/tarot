import { MaterialMove, MaterialRulesPart, RuleMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
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

    this.memorize(Memory.Round, (this.remind(Memory.Round) + 1))
    // TODO: Extract 4 from options
    if (this.remind(Memory.Round) > 4) {
      moves.push(this.rules().endGame())
      return moves
    }
    moves.push(this.rules().startPlayerTurn(RuleId.Deal, this.remind(Memory.StartPlayer)))
    return moves
  }


  onRuleEnd<RuleId extends number>(_move: RuleMove<number, RuleId>): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      this.addSummary(player)
    }

    moves.push(this.material(MaterialType.Card).moveItemsAtOnce({ type: LocationType.Deck }))
    return moves

  }

  hasWin = (player: number) => new ScoringHelper(this.game, player)

  addSummary = (player: number) => {
    const preneur = new RulesUtil(this.game).preneur
    const scoring = new ScoringHelper(this.game, player)
    const round = this.remind(Memory.Round)
    this.memorize(Memory.RoundSummary, (r = []) => {
      const rounds = r ? [...r]: []
      if (!rounds[round - 2]) {
        rounds.push({
          preneur: preneur,
          calledPlayer: this.remind(Memory.CalledPlayer),
          calledCard: this.remind(Memory.CalledCard),
          players: []
        })
      }

      rounds[round - 2].players.push({
        id: player,
        score: scoring.score,
        bid: scoring.bid,
        contrat: scoring.contrat,
        contratScore: scoring.contratScore,
        points: scoring.points,
        petitAuBout: scoring.petitAuBout,
        poignee: scoring.poignees,
        chelem: scoring.chelem,
        factor: scoring.scoreFactor,
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

