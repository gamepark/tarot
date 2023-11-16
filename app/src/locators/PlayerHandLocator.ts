import { HandLocator, ItemContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'



export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: ItemContext) {
    const players = -context.rules.players.length
    const angle = 270 - getRelativePlayerIndex(context, location.player) * 360 / players
    const radiusX = players === 5 ? 35 : players === 4 ? 35 : 35
    const radiusY = players === 5 ? 30 : players === 4 ? 30 : 25
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    return { x, y, z: 10 }
  }

  getBaseAngle(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const players = -context.rules.players.length
    return  getRelativePlayerIndex(context, item.location.player) * 360 / players
  }

  getMaxAngle(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const players = context.rules.players.length
    const relativePlayerIndex = getRelativePlayerIndex(context, item.location.player)
    switch (players) {
      case 3:
        if (relativePlayerIndex === 1 || relativePlayerIndex === 2) {
          return 25
        }
        return 40
      case 4:
        if (relativePlayerIndex === 1 || relativePlayerIndex === 2 || relativePlayerIndex === 3) {
          return 20
        }
        return 30
    }
    if (relativePlayerIndex === 1 || relativePlayerIndex === 2 || relativePlayerIndex === 3 || relativePlayerIndex === 4) {
      return 15
    }
    return 30
  }

  isHidden(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== context.player
  }

  getItemIndex(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    if (item.location.player === context.player) {
      const cards = context.rules.material(MaterialType.Card).location(LocationType.Hand).player(context.player).getItems().map(item => item.id)
      cards.sort((a, b) => a - b)
      return cards.indexOf(item.id)
    } else {
      return item.location.x!
    }
  }
}
