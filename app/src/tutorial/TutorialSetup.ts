import { hand1 } from '@gamepark/tarot/Card'
import { TarotSetup } from '@gamepark/tarot/TarotSetup'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

export class TutorialSetup extends TarotSetup {

  dealCards() {
    super.dealCards()

    this.material(MaterialType.Card).id(hand1).moveItems({ location: { type: LocationType.Hand, player: this.players } })
    this.material(MaterialType.Card).id(hand2).moveItems({ location: { type: LocationType.Hand, player: this.players } })
    this.material(MaterialType.Card).id(hand4).moveItems({ location: { type: LocationType.Hand, player: this.players } })
    this.material(MaterialType.Card).id(hand3).moveItems({ location: { type: LocationType.Hand, player: this.players } })

  }

}