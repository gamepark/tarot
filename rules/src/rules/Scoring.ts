import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";

export class Scoring extends MaterialRulesPart {

    onRuleStart() {
        const moves: MaterialMove[] = []

        //const playerbid = this.remind<PlayerBid[]>(Memory.Bids).length


        moves.push(
            ...this.material(MaterialType.Card).location(LocationType.Tricks).moveItems({ rotation : {y:0} } )
          )

          moves.push(this.rules().endGame())

        return moves
    }

}







