import { MaterialMove, MaterialRulesPart, RuleMove } from '@gamepark/rules-api'
import maxBy from 'lodash/maxBy'
import sumBy from 'lodash/sumBy'
import { cardValue, isOudler } from '../Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Bid } from './Bid'
import { Memory } from './Memory'
import { Poignee } from './Poignee'
import { RuleId } from './RuleId'
import { RulesUtil } from './RulesUtil'


export class ScoringRule extends MaterialRulesPart {


    onRuleStart() {
        const moves: MaterialMove[] = []
        moves.push(
            ...this.material(MaterialType.Card).moveItemsAtOnce({ rotation: true })
        )
        if (this.remind(Memory.Round) === 4) {
            moves.push(this.rules().endGame())
            return moves
        }
        this.memorize(Memory.Round, (this.remind(Memory.Round) + 1))
        moves.push(this.rules().startPlayerTurn(RuleId.Deal, this.remind(Memory.StartPlayer)))
        return moves
    }

    isSameSide(player1: number, player2: number) {
        return new RulesUtil(this.game).isSameSide(player1, player2)
    }

    isThisCardInTheEcart(searchedCard: number, ecartCard: number[]): boolean {
        return ecartCard.filter(card => card === searchedCard).length === 1
    }


    onRuleEnd<RuleId extends number>(_move: RuleMove<number, RuleId>): MaterialMove<number, number, number>[] {
        const moves: MaterialMove[] = []
        const preneur = maxBy(this.game.players, (player) => this.remind(Memory.Bid, player))
        const bid = this.remind<Bid>(Memory.Bid, preneur)
        const rulesUtil = new RulesUtil(this.game)
        const pointsTricks = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(player => rulesUtil.isPreneurSide(player)).getItems(), item => cardValue(item.id))
        const pointsEcart = sumBy(this.material(MaterialType.Card).location(LocationType.Ecart).getItems(), item => cardValue(item.id))
        const oudlersIntricks = this.material(MaterialType.Card).location(LocationType.Tricks).player(preneur).id(isOudler).length
        const oudlersInEcart = this.material(MaterialType.Card).location(LocationType.Ecart).id(isOudler).length
        let points = 0
        let oudlers = 0

        if (this.remind(Memory.Bid, bid) === 6) {
            points = pointsTricks
            oudlers = oudlersIntricks
        } else {
            points = pointsTricks + pointsEcart
            oudlers = oudlersIntricks + oudlersInEcart
        }
        let contrat = points - getContrat(oudlers)

        if (contrat < getContrat(oudlers)) {
            contrat = Math.floor(contrat)
        } else if (contrat > getContrat(oudlers)) {
            contrat = Math.round(contrat)
        }

        let score = (contrat >= 0 ? contrat + 25 : contrat - 25) * bid;
        const chelemAnnonce = this.remind(Memory.ChelemAnnounced)
        const petitAuBout = this.remind(Memory.PetitLastTrick)
        for (const player of this.game.players) {
            const poignee = this.remind<Poignee | undefined>(Memory.Poigne, player)
            if (poignee) {
                score += poigneeScore[poignee]
            }
        }

        if (petitAuBout !== undefined) {
            if (preneur === petitAuBout) {
                score += 10
            } else {
                score -= 10
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



        for (const player of this.game.players) {

            if (this.game.players.length === 3 || this.game.players.length === 4) {
                if (player !== preneur) {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore - score, player)
                } else {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore + (score * (this.game.players.length - 1)), preneur)
                }
            }

            if (this.game.players.length === 5) {
                const calledPlayer = this.remind(Memory.CalledPlayer)
                const calledCard = this.remind(Memory.CalledCard)
                if (player !== preneur && player !== calledPlayer) {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore - score, player)
                }
                if (player === preneur) {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore + (score * 2), preneur)
                }
                if (player === calledPlayer) {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore + score, calledPlayer) //Joueur appelé 
                }
                if (player === preneur && player === calledPlayer || player === preneur && this.isThisCardInTheEcart(calledCard, this.material(MaterialType.Card).location(LocationType.Ecart).getItems().map(item => item.id))) {
                    this.memorize(Memory.Score, (actualScore: number) => actualScore + (score * 4), preneur) //Joueur qui s'est auto appelé.
                }
            }
        }

        moves.push(...this.material(MaterialType.Card).moveItemsAtOnce({ type: LocationType.Deck }))



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

