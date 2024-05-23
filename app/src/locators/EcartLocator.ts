import { DeckLocator, getRelativePlayerIndex, ItemContext, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { playerHandLocator } from './PlayerHandLocator'


export class EcartLocator extends DeckLocator {
  locationDescription = new EcartLocationDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const angle = playerHandLocator.getPlayerAngle(item.location.player!, context) + 21
    const radius = 18
    const x = Math.cos(angle * Math.PI / 180) * radius
    const y = -Math.sin(angle * Math.PI / 180) * radius
    const z = 0 + (item.id === Card.Excuse ? 5 : 0)
    return { x, y, z }
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const players = context.rules.players.length
    return getRelativePlayerIndex(context, item.location.player) * 360 / players + 90
  }

}

class EcartLocationDescription extends LocationDescription {
  location = { type: LocationType.Ecart }
  width = 15
  ratio = 1
  borderRadius = this.width / 2
}