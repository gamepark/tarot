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
import { RuleId } from "./RuleId";


export class ScoringRule extends MaterialRulesPart {


    onRuleStart() {
        const moves: MaterialMove[] = []

        const preneur = maxBy(this.game.players, player => this.remind(Memory.Bid, player))
        const bid = this.remind<Bid>(Memory.Bid, preneur)

        moves.push(
            ...this.material(MaterialType.Card).rotateItems(true)
        )

        const pointsTricks = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).getItems(), item => cardValue(item.id)) //TODO : Pb de comptage de score.
        const pointsEcart = sumBy(this.material(MaterialType.Card).location(LocationType.Ecart).getItems(), item => cardValue(item.id))
        let points = 0

        if (this.remind(Memory.Bid, bid) === 6) {
            points = pointsTricks
        } else {
            points = pointsTricks + pointsEcart
        }

        console.log(points, 'points')

        const oudlersIntricks = this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).id(isOudler).length //TODO : Ne marche pas.
        const oudlersInEcart = this.material(MaterialType.Card).location(LocationType.Ecart).id(isOudler).length //TODO : A traiter en cas de Garde Contre.
        const oudlers = oudlersIntricks + oudlersInEcart
        const contrat = points - getContrat(oudlers)
        console.log(oudlers, 'oudlers')
        console.log(oudlersInEcart, 'oudlersin ecart')
        console.log(oudlersIntricks, 'oudler in trick')
        console.log(contrat, 'contrat')
        let score = (contrat >= 0 ? contrat + 25 : contrat - 25) * bid;
        console.log(score, 'score')
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
                const calledPlayer = this.remind(Memory.CalledPlayer)
                const calledCard = this.remind(Memory.CalledCard)
                if (player !== preneur && player !== calledPlayer) {
                    this.memorize(Memory.Score, -score, player)
                }
                if (player === preneur) {
                    this.memorize(Memory.Score, score * 2, preneur)
                }
                if (player === calledPlayer) {
                    this.memorize(Memory.Score, score, calledPlayer) //Joueur appelé 
                }
                if (player === preneur && player === calledPlayer || player === preneur && this.isThisCardInTheEcart(calledCard, this.material(MaterialType.Card).location(LocationType.Ecart).getItems().map(item => item.id))) {
                    this.memorize(Memory.Score, score * 4, preneur) //Joueur qui s'est auto appelé.
                }
            }
        }

        if (this.remind(Memory.Round) === 4) {
            moves.push(this.rules().endGame())
            return moves
        }
        this.memorize(Memory.Round, (this.remind(Memory.Round)+1)) 
        moves.push(...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ type: LocationType.Deck }))
        moves.push(...this.material(MaterialType.Card).location(LocationType.Ecart).moveItems({ type: LocationType.Deck }))


        moves.push(this.rules().startPlayerTurn(RuleId.Deal, this.remind(Memory.StartPlayer)))

        return moves


    }

    isSameSide(player1: number, player2: number) {
        return new RulesUtil(this.game).isSameSide(player1, player2)
    }

    isThisCardInTheEcart(searchedCard: number, ecartCard: number[]): boolean {
        return ecartCard.filter(card => card === searchedCard).length === 1
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