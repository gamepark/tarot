import { MaterialRulesPart } from "@gamepark/rules-api";
import { Memory } from "./Memory";
import maxBy from "lodash/maxBy";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Bid } from "./Bid";



export class RulesUtil extends MaterialRulesPart {


    isSameSide(player1: number, player2: number) {
        if (player1 === player2) {
            return true
        }
        const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))

        return player1 !== preneur && player2 !== preneur //TODO : 5 joueurs
    }

    hasChelem(player:number) {
         let opponentsCards = this.material(MaterialType.Card).location(LocationType.Tricks).player(opponent => !this.isSameSide(opponent!, player)).length
         const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
         const bid = this.remind(Memory.Bid, preneur)
         const kittySize = this.game.players.length === 5 ? 3 : 6
         if ((this.isSameSide(player, preneur!) && bid === Bid.GuardWithoutTheKitty) || (!this.isSameSide(player, preneur!) && bid !== Bid.GuardWithoutTheKitty)) {
            opponentsCards -= kittySize 
         }

         return opponentsCards <= 1 //excuse ; TODO : Simplifier code avec Ecart.
    }

}

