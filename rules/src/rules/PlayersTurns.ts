import { ItemMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { LocationType } from "../material/LocationType"
import { MaterialType } from "../material/MaterialType"
import { RuleId } from "./RuleId"



export class PlayersTurns extends PlayerTurnRule {


    getPlayerMoves() {
        const playerCards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
        
        return playerCards.moveItems({ location: { type: LocationType.Table, player:this.player } })

    }

    afterItemMove(_move: ItemMove<number, number, number>): MaterialMove<number, number, number>[] {
        return [
            this.rules().startPlayerTurn(RuleId.PlayersTurns, this.nextPlayer)
        ]
    }
    
}


