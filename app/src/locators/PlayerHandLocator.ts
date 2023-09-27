import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

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

  isHidden(_item: MaterialItem, _context: ItemContext): boolean {
    return false //item.location.player !== context.player
  }

  getItemIndex(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    if (item.location.player === context.player) {
      const cards = context.rules.material(MaterialType.Card).location(LocationType.Hand).player(context.player).getItems().map(item => item.id)
      cards.sort((a,b)=>a-b)
      return cards.indexOf(item.id)
    } else {
      return item.location.x!
    }
  }
}
