import { getRelativePlayerIndex, ItemContext, ItemLocator, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { tarotCardDescription } from '../material/CardDescription'
import { playerHandLocator } from './PlayerHandLocator'

export class TarotTableLocator extends ItemLocator {
  locationDescription = new TableLocationDescription()

  getPosition(item: MaterialItem, context: ItemContext) {
    const angle = playerHandLocator.getPlayerAngle(item.location.player!, context)
    const radiusX = 5
    const radiusY = 5
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    return { x, y, z: 5 + (item.location.z! * tarotCardDescription.width) }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const players = context.rules.players.length
    return getRelativePlayerIndex(context, item.location.player) * 360 / players
  }
}

class TableLocationDescription extends LocationDescription {
  location = { type: LocationType.Table }
  width = 30
  ratio = 1
  borderRadius = this.width / 2
}
