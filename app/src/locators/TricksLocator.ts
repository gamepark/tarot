/** @jsxImportSource @emotion/react */
import { DeckLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Card } from '@gamepark/tarot/Card'
import { playerHandLocator } from './PlayerHandLocator'
import { PlayerName } from './PlayerName'


export class TricksLocator extends DeckLocator {
  locationDescription = new TricksLocatorDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const angle = playerHandLocator.getPlayerAngle(item.location.player!, context)
    const radius = 15
    const x = Math.cos(angle * Math.PI / 180) * radius
    const y = -Math.sin(angle * Math.PI / 180) * radius
    const z = 10 + (item.id === Card.Excuse ? 100 : 0)
    return { x, y, z }
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