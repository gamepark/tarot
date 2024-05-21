import { HandLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

export class PoigneeLocator extends HandLocator {

  locationDescription = new PoigneeLocationDescription()


  getCoordinates() {
    return { x: 0, y: 10, z: 10 }
  }

  getMaxAngle() {
    return 20
  }

  getItemIndex(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const cards = context.rules.material(MaterialType.Card).location(LocationType.Poigne).getItems().map(item => item.id)
    cards.sort((a, b) => a - b)
    return cards.indexOf(item.id)
  }

  navigationSorts = [(item: MaterialItem) => item.id]
}


class PoigneeLocationDescription extends LocationDescription {
  location = { type: LocationType.Poigne }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}