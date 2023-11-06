import { LocationDescription, PileLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export class KittyLocator extends PileLocator {
  rotate = true
  coordinates = { x: 0, y: 0, z: 0 }
  radius = 3
  locationDescription = new KittyLocationDescription()
}

class KittyLocationDescription extends LocationDescription {
  location = { type: LocationType.Kitty }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}