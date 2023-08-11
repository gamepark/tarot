import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return { x: -40, y: 0, z: 10 }
      case 2:
        return { x: 0, y: -20, z: 10 }
      case 3:
        return { x: 40, y: 0, z: 10 }
    }
    return { x: 0, y: 20, z: 10 }

  }

  getBaseAngle(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    switch (relativePlayerIndex) {
      case 1:
        return 90
      case 2:
        return 180
      case 3:
        return 270
    }
    return 0
  }


  getMaxAngle() {
    return 20
  }

  isHidden(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== context.player
  }
}
