import { ItemMove, MaterialMove, PlayerTurnRule, isShuffle } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { cards } from '../Card'
import { Memory } from './Memory'

export class DealRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }

  onRuleStart() {
    return [this.material(MaterialType.Card).location(LocationType.Deck).shuffle()]
  }

  afterItemMove(move: ItemMove) {
    if (!isShuffle(move)) {
      return []
    }
    const moves: MaterialMove[] = []
    const kittySize = this.game.players.length === 5 ? 3 : 6
    const handSize = (cards.length - kittySize) / this.game.players.length
    for (const player of this.game.players) {
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Deck)
          .filter(item => item.location.x! >= (player - 1) * handSize && item.location.x! < (player) * handSize)
          .moveItems({ type: LocationType.Hand, player }))
    }
    moves.push(
      ...this.material(MaterialType.Card)
        .sort(item => - item.location.x!)
        .limit(kittySize)
        .moveItems({ type: LocationType.Kitty }))

    this.memorize(Memory.StartPlayer, this.nextPlayer)
    moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer))
    return moves
  }
}