import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { LocationType } from "../material/LocationType"
import { MaterialType } from "../material/MaterialType"
import { RuleId } from "./RuleId"
import { Memory } from "./Memory"

export type NumberPlayedCards = {
    value: number
}

export class PlayersTurns extends PlayerTurnRule {


    getPlayerMoves() {
        const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)

        return playerCards.moveItems({ location: { type: LocationType.Table, player: this.player } })

    }

    afterItemMove() {
        const moves: MaterialMove[] = []
        const numberPlayedCards = this.remind<NumberPlayedCards>(Memory.NumberPlayedCards)
        this.memorize(Memory.NumberPlayedCards, { value: numberPlayedCards.value + 1 })


        if (numberPlayedCards.value < this.game.players.length-1) {
           return [this.rules().startPlayerTurn(RuleId.PlayersTurns, this.nextPlayer)]
        }
        else 
 
        { 
                moves.push(
                  ...this.material(MaterialType.Card).location(LocationType.Table).moveItems({ location: { type: LocationType.Trick, player: this.player } })
                )
                this.memorize(Memory.NumberPlayedCards, {value : 0})
                  
            return moves
        }

    }

}

