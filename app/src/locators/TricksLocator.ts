/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext, LocationDescription, MaterialContext, getRelativePlayerIndex  } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { PlayerName } from './PlayerName'


export class TricksLocator extends DeckLocator {
  locationDescription = new TricksLocatorDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, item.location.player) * 360 / players
    const radiusX = players === 5 ? 30 : players === 4 ? 30 : 20
    const radiusY = players === 5 ? 15 : players === 4 ? 15 : 10
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    const z = 10 + (item.id === Card.Excuse? 100: 0)
    return { x, y, z }
  }
}

class TricksLocatorDescription extends LocationDescription {
  width = 25 
  height = 4.6
  borderRadius = 1
  alwaysVisible = true

  /* getLocations(context: MaterialContext): Location[] {
    return context.rules.players.map((player) => ({
      type: LocationType.PlayerName,
      player
    }))
  } */

  getCoordinates(location: Location, context: ItemContext) {
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, location.player) * 360 / players
    const radiusX = players === 5 ? 30 : players === 4 ? 30 : 20
    const radiusY = players === 5 ? 15 : players === 4 ? 15 : 10
    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY
    const z = 10
    return { x, y, z }
  }


  content = PlayerName
} 