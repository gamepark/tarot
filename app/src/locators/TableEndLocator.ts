import { HandLocator } from '@gamepark/react-game'

export class TableEndLocator extends HandLocator {

  getCoordinates() {
    return { x: 0, y: 0, z: 10 }
  }

  getMaxAngle() {
    return 20
  }
}
