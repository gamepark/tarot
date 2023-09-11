import { LocationDescription, PileLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export class TarotTableLocator extends PileLocator {
  coordinates = { x: 0, y: 0, z: 0 }

  locationDescription = new TableLocationDescription()
}


class TableLocationDescription extends LocationDescription {
  location = {type:LocationType.Table}
  width = 50
  ratio = 1
  borderRadius = this.width/2
}