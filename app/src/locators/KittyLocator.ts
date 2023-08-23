import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class KittyLocator extends PileLocator {
  rotate = true
  coordinates = { x: 0, y: 0, z: 0 }
  radius = 3

  isHidden(item: MaterialItem) {
   return item.rotation?.y===1;
  }
}