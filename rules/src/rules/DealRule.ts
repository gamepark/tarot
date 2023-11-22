import { ItemMove, MaterialMove, PlayerTurnRule, isShuffle } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'

export class DealRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }

  onRuleStart() {
    this.forget(Memory.Bid)
    this.forget(Memory.CalledCard)
    this.forget(Memory.CalledPlayer)
    this.forget(Memory.Chelem)
    this.forget(Memory.PetitLastTrick)
    this.forget(Memory.Poigne)
    this.forget(Memory.ChelemAnnounced)
    this.forget(Memory.IsKittyStarted)
    this.forget(Memory.PetitLastTrick)
    this.forget(Memory.CardInKitty)

    return [this.material(MaterialType.Card).location(LocationType.Deck).shuffle()]
  }

  afterItemMove(move: ItemMove) {
    if (!isShuffle(move)) {
      return []
    }
    const moves: MaterialMove[] = []
    let kittyCardsLeft = this.game.players.length === 5 ? 3 : 6
    const deck = this.material(MaterialType.Card).location(LocationType.Deck).deck()
    const startPlayerIndex = this.game.players.indexOf(this.nextPlayer)
    const players = this.game.players.slice(startPlayerIndex, this.game.players.length).concat(this.game.players.slice(0, startPlayerIndex))


    while (deck.length > 0) {

      for (const player of players) {
        moves.push(
          ...deck.deal({ type: LocationType.Hand, player }, 3))
        if (Math.floor(Math.random() * deck.length / 3) < kittyCardsLeft) {
          moves.push(
            deck.dealOne({ type: LocationType.Kitty })
          )
          kittyCardsLeft--
        }
      }
    }

    this.memorize(Memory.StartPlayer, this.nextPlayer)
    moves.push(this.rules().startPlayerTurn(RuleId.Bid, this.nextPlayer))
    return moves
  }
}