import { ScoringDescription } from '@gamepark/react-game'
import { Memory } from '@gamepark/tarot/rules/Memory'
import { RoundSummary } from '@gamepark/tarot/rules/RoundSummary'
import { TarotRules } from '@gamepark/tarot/TarotRules'
import { GameOverHeader } from '../headers/GameOverHeader'
import { RoundScoringHeader, TotalScoringHeader } from './ScoringHeaders'

type ScoringKey = number | 'total'

const getRoundSummaries = (rules: TarotRules): RoundSummary[] => rules.remind(Memory.RoundSummary) ?? []

class TarotScoring implements ScoringDescription<number, TarotRules, ScoringKey> {
  ResultHeader = GameOverHeader

  getScoringKeys(rules: TarotRules): ScoringKey[] {
    return [...getRoundSummaries(rules).map((_, index) => index + 1), 'total' as const]
  }

  getScoringHeader(key: ScoringKey, rules: TarotRules) {
    return key === 'total' ? <TotalScoringHeader /> : <RoundScoringHeader round={key} total={getRoundSummaries(rules).length} />
  }

  getScoringPlayerData(key: ScoringKey, player: number, rules: TarotRules) {
    if (key === 'total') return rules.getScore(player)
    return getRoundSummaries(rules)[key - 1]?.players.find((entry) => entry.id === player)?.score ?? null
  }
}

export const tarotScoring = new TarotScoring()
