import { DeckLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'


export class EcartLocator extends DeckLocator {
  locationDescription = new EcartLocationDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(_item: MaterialItem<number, number>, _context: ItemContext) {
    return { x: 40, y: 30, z: 10 }
  }

  getRotateZ(_item: MaterialItem<number, number>, _context: ItemContext<number, number, number>): number {
    return 90
  }
}

class EcartLocationDescription extends LocationDescription {
  location = { type: LocationType.Ecart }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}