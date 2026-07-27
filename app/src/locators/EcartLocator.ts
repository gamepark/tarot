import { DeckLocator, getRelativePlayerIndex, ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { playerHandLocator } from './PlayerHandLocator'

export class EcartLocator extends DeckLocator {
  locationDescription = new EcartLocationDescription()
  gap = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(location: Location, context: MaterialContext) {
    const angle = playerHandLocator.getPlayerAngle(location.player!, context) + 21
    const radius = 18
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = -Math.sin((angle * Math.PI) / 180) * radius
    return { x, y, z: 0 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y = 0, z = 0 } = super.getItemCoordinates(item, context)
    return { x, y, z: z + (item.id === Card.Excuse ? 5 : 0) }
  }

  getItemRotateZ(item: MaterialItem, context: ItemContext): number {
    const players = context.rules.players.length
    return (getRelativePlayerIndex(context, item.location.player) * 360) / players + 90
  }
}

class EcartLocationDescription extends LocationDescription {
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}
