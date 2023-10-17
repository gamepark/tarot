import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Poignee } from "./Poignee";
import { Memory } from "./Memory";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import { cardValue, isOudler } from "../Card";
import { Bid } from "./Bid";


export class ScoringRule extends MaterialRulesPart {


    onRuleStart() {
        const moves: MaterialMove[] = []

        const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
        const bid = this.remind<Bid>(Memory.Bid, preneur)

        const numberCardTrkickPreneur = this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).length



        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ rotation: { y: 0 } })
        )

        const points = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).getItems(), item => cardValue(item.id))
        const oudlers = this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).id(isOudler).length
        const contrat = points - getContrat(oudlers)
        let chelem = 0
        let score = (contrat >= 0 ? contrat + 25 : contrat - 25) * bid;
        const chelemAnnonce = this.remind(Memory.Chelem)
        //const petit au bout
        for (const player of this.game.players) {
            const poignee = this.remind<Poignee | undefined>(Memory.Poigne, player)
            if (poignee) {
                score += poigneeScore[poignee]
            }

            if (chelemAnnonce) {
                chelem = numberCardTrkickPreneur >= 77 ? 400 : -400
            } else if (numberCardTrkickPreneur >= 77) {
                chelem = + 200
            } else if (numberCardTrkickPreneur <= 0) {
                chelem = -200
            }

        }

        this.memorize(Memory.Score, (score * (this.game.players.length - 1)) + (chelem * (this.game.players.length - 1)), preneur)
        for (const player of this.game.players) {
            if (player !== preneur) {
                this.memorize(Memory.Score, -score - chelem, player)
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

export const poigneeScore: Record<Poignee, number> = {
    [Poignee.Simple]: 20,
    [Poignee.Double]: 30,
    [Poignee.Triple]: 40,
}




