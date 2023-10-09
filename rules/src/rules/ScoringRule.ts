import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import { PlayerBid } from "./BidRule";
import { sumBy } from "lodash";
import { cardValue, isOudler } from "../Card";


export class ScoringRule extends MaterialRulesPart {


    onRuleStart() {
        const moves: MaterialMove[] = []

        const playerbids = this.remind<PlayerBid[]>(Memory.Bids)
        const playerbid = playerbids[playerbids.length - 1]


        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ rotation: { y: 0 } })
        )

        const points = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(playerbid.player).getItems(), item => cardValue(item.id))
        const oudlers = this.material(MaterialType.Card).location(LocationType.Tricks).player(playerbid.player).id(isOudler).length
        const contrat = points - getContrat(oudlers)
        const score = (contrat >= 0 ? contrat + 25 : contrat - 25) * playerbid.bid;
        //const chelem = this.remind(Chelem,player)
        //const petit au bout 
        //cont poignée = this.remid(Handle,...,player) ... = Little, Medium,...

        this.memorize(Memory.Score, (score * (this.game.players.length - 1)), playerbid.player)
        for (const player of this.game.players) {
            if (player !== playerbid.player) {
                this.memorize(Memory.Score, -score, player)
            }
        }


        moves.push(this.rules().endGame())

        return moves
    }


}

function getContrat(oudlers: number): number {
    switch (oudlers) {
        case 0:
            return 56
        case 1:
            return 51
        case 2:
            return 46
    }
    return 41
}






