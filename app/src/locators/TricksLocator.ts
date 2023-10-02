import { DeckLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class TricksLocator extends DeckLocator {
  locationDescription = new TarotDeckLocatorDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  
  isHidden(item: MaterialItem) {
    return item.rotation?.y===1;
   }

  getCoordinates(item: MaterialItem<number, number>, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return { x: -44, y: 21, z: 0 }
      case 2:
        return { x: -25, y: -25, z: 0 }
      case 3:
        return { x: 44, y: -21, z: 0 }
    }
    return { x: 25, y: 25, z: 0 }
  }

  getRotation(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    return relativePlayerIndex % 2 === 0 ? 90 : 0
  }
}


class TarotDeckLocatorDescription extends LocationDescription {


} 