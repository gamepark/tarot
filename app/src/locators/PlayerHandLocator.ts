import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const angle = this.getPlayerAngle(location.player!, context)
    const radius = 27
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = -Math.sin((angle * Math.PI) / 180) * radius
    return { x, y, z: 0 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z } = super.getItemCoordinates(item, context)
    return { x, y: y - (item.selected ? 2 : 0), z: z + (item.selected ? 10 : 0) }
  }

  getRadius() {
    return 300
  }

  getPlayerAngle(player: number, context: MaterialContext) {
    const players = context.rules.players.length
    return -90 - (getRelativePlayerIndex(context, player) * 360) / players
  }

  getBaseAngle(location: Location, context: MaterialContext): number {
    const players = context.rules.players.length
    return (getRelativePlayerIndex(context, location.player) * 360) / players
  }

  getMaxAngle(location: Location, context: MaterialContext): number {
    const relativePlayerIndex = getRelativePlayerIndex(context, location.player)
    if (relativePlayerIndex === 0) return 20
    const players = context.rules.players.length
    return players === 3 ? 5 : players === 4 ? 6 : 3
  }

  getGapMaxAngle() {
    return 1.1
  }

  getItemIndex(item: MaterialItem, context: ItemContext): number {
    if (item.location.player === context.player) {
      const cards = context.rules
        .material(MaterialType.Card)
        .location(LocationType.Hand)
        .player(context.player)
        .getItems()
        .map((handItem) => handItem.id)
      cards.sort((a, b) => a - b)
      return cards.indexOf(item.id)
    } else {
      return super.getItemIndex(item, context)
    }
  }

  navigationSorts = [(item: MaterialItem) => (!item.id ? item.location.x : item.id)]
}

export const playerHandLocator = new PlayerHandLocator()
