import { ItemContext, LocationDescription, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { tarotCardDescription } from '../material/CardDescription'

export class KittyLocator extends PileLocator {

  coordinates = { x: 0, y: -3, z: 0 }
  radius = 3
  locationDescription = new KittyLocationDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    if (item.location.rotation) {
      const x = item.location.x!
      return {
        x: (x % 3) * (tarotCardDescription.width + 1) - 7,
        y: Math.floor(x / 3) * (tarotCardDescription.height + 1) - 9,
        z: 1
      }
    }
    return super.getCoordinates(item, context)
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    if (item.location.rotation) {
      return 0
    }
    return super.getRotateZ(item, context)
  }
}

class KittyLocationDescription extends LocationDescription {
  location = { type: LocationType.Kitty }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}