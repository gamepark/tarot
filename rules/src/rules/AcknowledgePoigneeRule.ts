import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AcknowledgePoigneeRule extends SimultaneousRule {

  getActivePlayerLegalMoves(playerId: number): MaterialMove<number, number, number>[] {
    return [this.rules().endPlayerTurn(playerId)]
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    const poigneePlayer = this.game.players.find((p) => {
      return this.remind(Memory.Poigne, p) !== undefined
    })!

    if (!poigneePlayer) {
      console.error("There is a issue while searching poignee player")
    }

    return [
      this.poignee.moveItemsAtOnce({ type: LocationType.Hand, player: poigneePlayer }),
      this.rules().startPlayerTurn(RuleId.PlayCard, poigneePlayer)
    ]
  }

  get poignee() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Poigne)
  }
}