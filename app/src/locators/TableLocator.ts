import { ItemContext, LocationDescription, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export class TarotTableLocator extends PileLocator {
  locationDescription = new TableLocationDescription()

  getCoordinates(item: MaterialItem<number, number>, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return { x: -20, y: 0, z: 10 }
      case 2:
        return { x: 0, y: -10, z: 10 }
      case 3:
        return { x: 20, y: 0, z: 10 }
    }
    return { x: 0, y: 10, z: 10 }

  }

}


class TableLocationDescription extends LocationDescription {
  location = { type: LocationType.Table }
  width = 50
  ratio = 1
  borderRadius = this.width / 2
}
