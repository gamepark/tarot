import { ItemContext, ItemLocator, LocationDescription, getRelativePlayerIndex } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'

export class TarotTableLocator extends ItemLocator {
  locationDescription = new TableLocationDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, item.location.player) * 360 / players
    const radiusX = 5
    const radiusY = players === 5 ? 5 : players === 4 ? 5 : 0
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    return { x, y, z: item.location.z! * 0.1 }
  }
}

class TableLocationDescription extends LocationDescription {
  location = { type: LocationType.Table }
  width = 30
  ratio = 1
  borderRadius = this.width / 2
}
