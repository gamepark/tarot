/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'
import { PlayerHandDescription } from './description/PlayerHandDescription'



export class PlayerHandLocator extends HandLocator {

  locationDescription = new PlayerHandDescription()

  getCoordinates(location: Location, context: ItemContext) {
    const { rules, type, index } = context
    const item = rules.material(type).index(index).getItem()
    const players = context.rules.players.length
    const angle = -90 + getRelativePlayerIndex(context, location.player) * 360 / players
    const radiusX = players === 5 ? 40 : players === 4 ? 40 : 30
    const radiusY = players === 5 ? 25 : players === 4 ? 25 : 20
    const x = Math.cos(angle * Math.PI / 180) * radiusX - (item?.selected? 2: 0)
    const y = -Math.sin(angle * Math.PI / 180) * radiusY - (item?.selected? 2: 0)
    return { x, y, z: 10 }
  }

  getBaseAngle(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const players = context.rules.players.length
    return  getRelativePlayerIndex(context, item.location.player) * -360 / players
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

  getItemIndex(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    if (item.location.player === context.player) {
      const cards = context.rules.material(MaterialType.Card).location(LocationType.Hand).player(context.player).getItems().map(item => item.id)
      cards.sort((a, b) => a - b)
      return cards.indexOf(item.id)
    } else {
      return super.getItemIndex(item, context)
    }
  }

}



