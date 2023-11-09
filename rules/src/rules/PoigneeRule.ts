import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Card, isTrumpValue } from "../Card";
import { Memory } from "./Memory";
import { getPoigneeMinTrumps as getPoigneeMinTrumps } from "./PlayCardRule";
import { Poignee } from "./Poignee";
import { RuleId } from "./RuleId";

export class PoigneeRule extends PlayerTurnRule {
    getPlayerMoves(): MaterialMove<number, number, number>[] {
        let cards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).id(isTrumpValue)
        if (!cards.length) {
            cards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).id(Card.Excuse)
        }
        return cards.moveItems({ type: LocationType.Poigne })
    }

    afterItemMove() {
        const poignee = this.remind<Poignee>(Memory.Poigne, this.player)
        const cardsPoignee = getPoigneeMinTrumps(this.game.players.length)[poignee]
        const poigneeCards = this.material(MaterialType.Card).location(LocationType.Poigne);
        if (poigneeCards.length === cardsPoignee) {
            return [
                this.rules().startRule(RuleId.PlayCard),
                ...poigneeCards.moveItems({ type: LocationType.Hand, player: this.player })
            ]
        }
        return []
    }
}