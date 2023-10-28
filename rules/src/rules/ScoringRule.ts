import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Poignee } from "./Poignee";
import { Memory } from "./Memory";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import { cardValue, isOudler } from "../Card";
import { Bid } from "./Bid";
import { RulesUtil } from "./RulesUtil";


export class ScoringRule extends MaterialRulesPart {


    onRuleStart() {
        const moves: MaterialMove[] = []

        const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
        const bid = this.remind<Bid>(Memory.Bid, preneur)

        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ rotation: { y: 0 } })
        )

        const points = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).getItems(), item => cardValue(item.id))
        const oudlers = this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).id(isOudler).length
        const contrat = points - getContrat(oudlers)
        let score = (contrat >= 0 ? contrat + 25 : contrat - 25) * bid;
        const chelemAnnonce = this.remind(Memory.ChelemAnnounced)
        const petitAuBout = this.remind(Memory.PetitLastTrick)
        for (const player of this.game.players) {
            const poignee = this.remind<Poignee | undefined>(Memory.Poigne, player)
            if (poignee) {
                score += poigneeScore[poignee]
            }
        }

        const preneurHasChelem = new RulesUtil(this.game).hasChelem(preneur!)
        const defenseHasChelem = !preneurHasChelem && this.game.players.some(player => new RulesUtil(this.game).hasChelem(player))

        if (chelemAnnonce && preneurHasChelem) {
            score += 400
        } else if (preneurHasChelem) {
            score += 200
        } else if (chelemAnnonce || defenseHasChelem) {
            score -= 200
        }

        if (petitAuBout !== undefined) {
            if (preneur === petitAuBout) {
                score += 10
            } else {
                score -= 10
            }
        }

        for (const player of this.game.players) {

            if (this.game.players.length === 3 || this.game.players.length === 4) {
                if (player !== preneur) {
                    this.memorize(Memory.Score, -score, player)
                } else {
                    this.memorize(Memory.Score, score * (this.game.players.length - 1), preneur)
                }
            }

            if (this.game.players.length === 5) {
                if (player !== preneur && !this.isSameSide(player, preneur!)) {
                    this.memorize(Memory.Score, -score, player)
                } else if (player === preneur) {
                    this.memorize(Memory.Score, score * 2, preneur)
                } else {
                    this.memorize(Memory.Score, score, preneur) //Joueur appelé
                }
            }
        }
        moves.push(this.rules().endGame())
        return moves
    }

    isSameSide(player1: number, player2: number) {
        return new RulesUtil(this.game).isSameSide(player1, player2)
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