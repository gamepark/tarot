import { ItemContext, ItemLocator, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export class TarotTableLocator extends ItemLocator {
  locationDescription = new TableLocationDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    console.log("item", item)
    switch (relativePlayerIndex) {
      case 1:
        return { x: -5, y: 0, z: item.location.z!*0.1 }
      case 2:
        return { x: 0, y: -5, z: item.location.z!*0.1 }
      case 3:
        return { x: 5, y: 0, z: item.location.z!*0.1 }
    }
    return { x: 0, y: 5, z: item.location.z!*0.1 }
  }

  getRotation(item: MaterialItem, context: ItemContext): number {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return 90
      case 2:
        return 180
      case 3:
        return -90
      default:
        return 0
    }
  }
}


class TableLocationDescription extends LocationDescription {
  location = { type: LocationType.Table }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}
