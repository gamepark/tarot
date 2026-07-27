import { Card } from '../Card'
import { Bid } from './Bid'

/**
 * Score details of one player for one round, memorized at the end of each round (see {@link Memory.RoundSummary}).
 */
export type PlayerRoundSummary = {
  id: number
  score: number
  bid: Bid
  contrat: number
  contratScore: number
  points: number
  petitAuBout: number
  poignee: number
  chelem: number
  factor: number
}

export type RoundSummary = {
  preneur?: number
  calledPlayer?: number
  calledCard?: Card
  players: PlayerRoundSummary[]
}
