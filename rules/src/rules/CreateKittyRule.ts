import { ItemMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { Memory } from "./Memory"
import { BidMemory } from "./BidRule"
import { RuleId } from "./RuleId"

export class CreateKittyRule extends PlayerTurnRule {
    onRuleStart() {
        const moves: MaterialMove[] = []
        const player = this.remind<BidMemory>(Memory.Bid).player

        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ rotation: { y: 0 } }),

            ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Hand, player } })
        )

        return moves
    }
    getPlayerMoves() {
        //const moves: MaterialMove[] = []
        const player = this.remind<BidMemory>(Memory.Bid).player
        const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(player)

        return playerCards.moveItems({ location: { type: LocationType.Kitty }, rotation: { y: 1 } })
    }


    afterItemMove(_move: ItemMove<number, number, number>): MaterialMove[] {

        const kittySize = this.game.players.length === 5 ? 3 : 6

        if (this.material(MaterialType.Card).location(LocationType.Hand).length == kittySize) {
            return [
                this.rules().startPlayerTurn(RuleId.PlayersTurns, this.nextPlayer)
            ]
        }

        return[]
    }

}
