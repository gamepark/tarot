import { DeckLocator, ItemContext, LocationDescription, getRelativePlayerIndex } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class ExcuseLocator extends DeckLocator {
  locationDescription = new TarotDeckLocatorDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(item: MaterialItem<number, number>, context: ItemContext) {
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, item.location.player) * 360 / players
    const radiusX = players === 5 ? 30 : players === 4 ? 30 : 20
    const radiusY = players === 5 ? 15 : players === 4 ? 15 : 10
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    return { x, y, z: 20 }
  }

  getRotateZ(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const players = context.rules.players.length
    return getRelativePlayerIndex(context, item.location.player) * -360 / players + 90
  }
}

class TarotDeckLocatorDescription extends LocationDescription {
} 