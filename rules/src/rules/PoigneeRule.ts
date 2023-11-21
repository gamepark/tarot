import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
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

        moves.push(this.rules().startRule(RuleId.PlayCard))
        moves.push(...cards.moveItems({ type: LocationType.Hand, player: this.player }))

        return moves
    }
}