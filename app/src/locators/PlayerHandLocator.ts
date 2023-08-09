import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return { x: -20, y: 0, z: 10 }
      case 2:
        return { x: 0, y: -20, z: 10 }
      case 3:
        return { x: 20, y: 0, z: 10 }
    }
    return { x: 0, y: 20, z: 10 }
  }
}