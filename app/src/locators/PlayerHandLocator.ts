import { HandLocator, ItemContext} from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/tarot/material/LocationType'
import { MaterialType } from '@gamepark/tarot/material/MaterialType'



export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: ItemContext) {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, location.player!)
    const players = context.rules.players.length
    const angle = 270 - relativePlayerIndex * 360 / players
    const radiusX = players === 5? 35 : players === 4? 35 : 35
    const radiusY = players === 5? 30 : players === 4? 30 : 25
    const x = Math.cos(angle*Math.PI/180)*radiusX
    const y = -Math.sin(angle*Math.PI/180)*radiusY //TODO Affichage
    return { x, y, z: 10 }
  }

  getBaseAngle(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const relativePlayerIndex = this.getRelativePlayerIndex(context, item.location.player!)
    const players = context.rules.players.length
    return relativePlayerIndex * 360 / players  
  }


  getMaxAngle(_item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
    const players = context.rules.players.length
    
    switch (players) {
      case 3:
          return 25
      case 4:
          return 20
  }
  return 15
  }

  isHidden(_item: MaterialItem, _context: ItemContext): boolean {
    return false //item.location.player !== context.player
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
