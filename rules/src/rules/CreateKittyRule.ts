import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { Memory } from "./Memory"
import { BidMemory } from "./BidRule"

export class CreateKittyRule extends MaterialRulesPart {
    onRuleStart() {
        const moves: MaterialMove[] = []
        const player = this.remind<BidMemory>(Memory.Bid).player

        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ rotation: { y: 0 } }),

            ...this.material(MaterialType.Card).location(LocationType.Kitty).moveItems({ location: { type: LocationType.Hand, player } })
        )



        return moves
    }
}