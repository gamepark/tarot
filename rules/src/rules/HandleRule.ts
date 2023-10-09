import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Card, isTrumpValue } from "../Card";
import { Memory } from "./Memory";
import { getHandleMinTrumps } from "./PlayCardRule";
import { Handle } from "./Handle";
import { RuleId } from "./RuleId";

export class HandleRule extends PlayerTurnRule {
    getPlayerMoves(): MaterialMove<number, number, number>[] {

        let cards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).id(isTrumpValue)

        if (!cards.length) {
            cards = this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).id(Card.Excuse)
        }
        return cards.moveItems({ location: { type: LocationType.Handle } })
    }


    afterItemMove() {

        const handle = this.remind<Handle>(Memory.Handle, this.player)
        const cardsHandle = getHandleMinTrumps(this.game.players.length)[handle]
        const handleCards = this.material(MaterialType.Card).location(LocationType.Handle);

        if (handleCards.length === cardsHandle) {
            return [
                this.rules().startRule(RuleId.PlayCard),
                ...handleCards.moveItems({ location: { type: LocationType.Hand, player: this.player } })
            ]

        }
        return []
    }
}