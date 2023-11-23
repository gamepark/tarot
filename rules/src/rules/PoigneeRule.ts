import { ItemMove, MaterialMove, PlayerTurnRule, isMoveItemType } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { RuleId } from "./RuleId";

export class PoigneeRule extends PlayerTurnRule {
    onRuleStart() {
        const cards = this
            .material(MaterialType.Card)
            .player(this.player)
            .filter((item) => !!item.selected)
        const moves: MaterialMove[] = cards.moveItems({ type: LocationType.Poigne, player: this.player })

        moves.push(...cards.moveItems({ type: LocationType.Hand, player: this.player }))
        moves.push(this.rules().startRule(RuleId.PlayCard))

        return moves
    }

    afterItemMove(move: ItemMove) {
       if (!isMoveItemType(MaterialType.Card)(move)) return []
       const item = this.material(MaterialType.Card).index(move.itemIndex).getItem()!
       delete item.selected
       return []
    }
}