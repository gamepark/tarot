/** @jsxImportSource @emotion/react */
import { DeckLocator, getRelativePlayerIndex, ItemContext, LocationDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { playerHandLocator } from './PlayerHandLocator'
import { PlayerName } from './PlayerName'


export class TricksLocator extends DeckLocator {
  locationDescription = new TricksLocatorDescription()
  delta = { x: -0.03, y: -0.03, z: 0.1 }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const hasEcart = context.rules.material(MaterialType.Card).location(LocationType.Ecart).player(item.location.player).length > 0
    const angle = playerHandLocator.getPlayerAngle(item.location.player!, context) - (hasEcart? 21: 0)
    const radius = hasEcart? 18: 17
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

class TricksLocatorDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1
  alwaysVisible = true

  getCoordinates(location: Location, context: ItemContext) {
    const angle = playerHandLocator.getPlayerAngle(location.player!, context)
    const radius = 15
    const x = Math.cos(angle * Math.PI / 180) * radius
    const y = -Math.sin(angle * Math.PI / 180) * radius
    const z = 10
    return { x, y, z }
  }


  content = PlayerName
} 