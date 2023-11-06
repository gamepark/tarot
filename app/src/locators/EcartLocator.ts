import { DeckLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class EcartLocator extends DeckLocator {
  locationDescription = new TarotDeckLocatorDescription()
  delta = { x: -0.05, y: -0.05, z: 0.1 }

  getCoordinates(item: MaterialItem<number, number>, context: ItemContext) {
    const player = context.rules.players.length

    if(player === undefined) {
      return { x:-20, y: -20, z: 10 }
    }

      //TODO : Coordonnées player indéfini 

    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    const players = context.rules.players.length
    const angle = 270 - relativePlayerIndex * 360 / players
    const radiusX = players === 5 ? 25 : players === 4 ? 25 : 25
    const radiusY = players === 5 ? 20 : players === 4 ? 20 : 15

    const x = Math.cos(angle * Math.PI / 180) * radiusX
    const y = -Math.sin(angle * Math.PI / 180) * radiusY

    return { x, y, z: 10 }
  }

  getRotateZ(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    const players = context.rules.players.length

    return relativePlayerIndex * 360 / players + 90

  }
}



class TarotDeckLocatorDescription extends LocationDescription {


} 