import { DeckLocator, getRelativePlayerIndex, ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { playerHandLocator } from './PlayerHandLocator'
import { PlayerName } from './PlayerName'

export class TricksLocator extends DeckLocator {
  locationDescription = new TricksLocatorDescription()
  gap = { x: -0.03, y: -0.03, z: 0.1 }

  getLocations(context: MaterialContext): Partial<Location>[] {
    return context.rules.players.map((player) => ({ player }))
  }

  hasEcart(location: Location, context: MaterialContext) {
    return context.rules.material(MaterialType.Card).location(LocationType.Ecart).player(location.player).length > 0
  }

  getPositionDependencies(location: Location, context: MaterialContext) {
    return { items: this.countItems(location, context), ecart: this.hasEcart(location, context) }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const hasEcart = this.hasEcart(location, context)
    const angle = playerHandLocator.getPlayerAngle(location.player!, context) - (hasEcart ? 21 : 0)
    const radius = hasEcart ? 18 : 17
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = -Math.sin((angle * Math.PI) / 180) * radius
    return { x, y, z: 0 }
  }

  /**
   * The trick piles are stacked around the players, but the location itself displays the player name banner,
   * which sits closer to the center of the table.
   */
  getLocationCoordinates(location: Location, context: MaterialContext, index = this.getLocationIndex(location, context)): Partial<Coordinates> {
    if (index !== undefined) return super.getLocationCoordinates(location, context, index)
    const angle = playerHandLocator.getPlayerAngle(location.player!, context)
    const radius = 15
    return {
      x: Math.cos((angle * Math.PI) / 180) * radius,
      y: -Math.sin((angle * Math.PI) / 180) * radius,
      z: 10
    }
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

class TricksLocatorDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1

  content = PlayerName
}
