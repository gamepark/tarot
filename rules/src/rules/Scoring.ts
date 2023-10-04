import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import { PlayerBid } from "./BidRule";
import { sumBy } from "lodash";
import { cardValue } from "../Card";

export class Scoring extends MaterialRulesPart {

    onRuleStart() {
        const moves: MaterialMove[] = []

        const playerbids = this.remind<PlayerBid[]>(Memory.Bids)
        const playerbid = playerbids[playerbids.length - 1]


        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ rotation: { y: 0 } })
        )

        const points = sumBy(this.material(MaterialType.Card).location(LocationType.Tricks).player(playerbid.player).getItems(), item => cardValue(item.id))
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
        const score = points - getContrat.length // TODO


        this.memorize(Memory.Score, (((score + 25) * playerbid.bid) * (this.game.players.length - 1)), playerbid.player)
        for (const player of this.game.players) {
            if (player !== playerbid.player) {
                this.memorize(Memory.Score, (-score - 25) * playerbid.bid, player) //TODO si score positif alors +25 si score négatif alors -25
            }
        }

        
        moves.push(this.rules().endGame())

        return moves
    }

}







